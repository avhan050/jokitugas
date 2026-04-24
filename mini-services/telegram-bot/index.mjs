import { PrismaClient } from '../../src/generated/prisma/index.js';

const prisma = new PrismaClient();
const TELEGRAM_API_BASE = 'https://api.telegram.org';
const token = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
const pollIntervalMs = Number(process.env.TELEGRAM_BOT_POLL_INTERVAL_MS || 1500);
const requestTimeoutMs = Number(process.env.TELEGRAM_BOT_REQUEST_TIMEOUT_MS || 15000);

if (!token || !adminChatId) {
  console.error('Telegram bot config missing. Set TELEGRAM_BOT_TOKEN and TELEGRAM_ADMIN_CHAT_ID.');
  process.exit(1);
}

let offset = 0;
const REJECT_REASON_PRESETS = {
  topup: [
    { key: 'proof_invalid', label: 'Bukti tidak valid', reason: 'Top up ditolak: bukti transfer tidak valid atau tidak dapat diverifikasi.' },
    { key: 'amount_mismatch', label: 'Nominal tidak cocok', reason: 'Top up ditolak: nominal transfer tidak sesuai dengan pengajuan.' },
    { key: 'duplicate', label: 'Duplikat', reason: 'Top up ditolak: transaksi terdeteksi duplikat.' },
  ],
  withdraw: [
    { key: 'rekening_invalid', label: 'Rekening tidak valid', reason: 'Penarikan ditolak: detail rekening / e-wallet tidak valid.' },
    { key: 'data_incomplete', label: 'Data tidak lengkap', reason: 'Penarikan ditolak: data pencairan tidak lengkap.' },
    { key: 'manual_review', label: 'Perlu review manual', reason: 'Penarikan ditolak: transaksi memerlukan review manual lanjutan.' },
  ],
};

function isDataUrl(value) {
  return typeof value === 'string' && value.startsWith('data:');
}

function dataUrlToBlob(dataUrl) {
  const [meta, base64Data] = dataUrl.split(',', 2);
  const mimeMatch = meta.match(/^data:([^;]+);base64$/);
  const mimeType = mimeMatch?.[1] || 'application/octet-stream';
  const bytes = Buffer.from(base64Data, 'base64');
  return new Blob([bytes], { type: mimeType });
}

function telegramUrl(method) {
  return `${TELEGRAM_API_BASE}/bot${token}/${method}`;
}

function formatRupiah(amount) {
  return `Rp ${Math.abs(amount).toLocaleString('id-ID')}`;
}

function isAuthorizedChat(chatId) {
  return String(chatId) === String(adminChatId);
}

function buildTransactionCaption(tx, user) {
  const label = tx.type === 'topup' ? 'Top Up' : 'Withdraw';
  const sign = tx.type === 'topup' ? '+' : '-';

  return [
    `<b>${label} Pending</b>`,
    '',
    `<b>User:</b> ${user?.name || 'Unknown'} (${user?.email || '-'})`,
    `<b>Jumlah:</b> ${sign}${formatRupiah(tx.amount)}`,
    `<b>Waktu:</b> ${new Date(tx.createdAt).toLocaleString('id-ID')}`,
    `<b>Deskripsi:</b> ${tx.desc}`,
    tx.note ? `<b>Catatan:</b> ${tx.note}` : '',
    tx.bankDetails ? `<b>Bank:</b> ${tx.bankDetails}` : '',
    '',
    `ID: <code>${tx.id}</code>`,
  ]
    .filter(Boolean)
    .join('\n');
}

async function notifyUserChat(chatId, text) {
  if (!chatId) return;
  await callTelegram('sendMessage', {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
  });
}

async function callTelegram(method, payload) {
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

    try {
      const response = await fetch(telegramUrl(method), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Telegram ${method} failed: ${await response.text()}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;

      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 750 * attempt));
      }
    }
  }

  throw lastError;
}

async function sendTelegramPhoto(chatId, photo, caption, replyMarkup) {
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

    try {
      const response = isDataUrl(photo)
        ? await (async () => {
            const formData = new FormData();
            formData.append('chat_id', String(chatId));
            formData.append('caption', caption);
            formData.append('parse_mode', 'HTML');
            if (replyMarkup) {
              formData.append('reply_markup', JSON.stringify(replyMarkup));
            }
            formData.append('photo', dataUrlToBlob(photo), 'proof-transfer.png');

            return fetch(telegramUrl('sendPhoto'), {
              method: 'POST',
              body: formData,
              signal: controller.signal,
            });
          })()
        : await fetch(telegramUrl('sendPhoto'), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chatId,
              photo,
              caption,
              parse_mode: 'HTML',
              reply_markup: replyMarkup,
            }),
            signal: controller.signal,
          });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error(`Telegram sendPhoto failed: ${await response.text()}`);
      }

      return response.json();
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;

      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 750 * attempt));
      }
    }
  }

  throw lastError;
}

async function approveTransaction(transactionId) {
  const tx = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!tx || tx.status !== 'pending') {
    return { ok: false, message: 'Transaksi tidak ditemukan atau sudah diproses.' };
  }

  if (!['topup', 'withdraw'].includes(tx.type)) {
    return { ok: false, message: 'Bot hanya bisa memproses top up dan withdraw.' };
  }

  await prisma.$transaction([
    prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: 'approved',
        rejectionReason: null,
      },
    }),
    prisma.user.update({
      where: { id: tx.userId },
      data: {
        balance: {
          increment: tx.amount,
        },
      },
    }),
  ]);

  const updatedTx = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  const user = await prisma.user.findUnique({
    where: { id: tx.userId },
  });

  if (user?.telegramChatId && updatedTx) {
    await notifyUserChat(
      user.telegramChatId,
      [
        '<b>Update Transaksi</b>',
        '',
        '<b>Status:</b> Disetujui',
        `<b>Tipe:</b> ${tx.type === 'topup' ? 'Top Up' : 'Withdraw'}`,
        `<b>Jumlah:</b> ${tx.type === 'topup' ? '+' : '-'}${formatRupiah(tx.amount)}`,
      ].join('\n')
    ).catch(() => null);
  }

  return {
    ok: true,
    message: `Transaksi ${transactionId} disetujui.`,
    tx: updatedTx,
  };
}

async function rejectTransaction(transactionId, reason) {
  const tx = await prisma.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!tx || tx.status !== 'pending') {
    return { ok: false, message: 'Transaksi tidak ditemukan atau sudah diproses.' };
  }

  if (!['topup', 'withdraw'].includes(tx.type)) {
    return { ok: false, message: 'Bot hanya bisa memproses top up dan withdraw.' };
  }

  const finalReason = typeof reason === 'string' && reason.trim()
    ? reason.trim()
    : tx.type === 'topup'
      ? 'Top up ditolak oleh admin via bot Telegram.'
      : 'Penarikan ditolak oleh admin via bot Telegram.';

  await prisma.transaction.update({
    where: { id: transactionId },
    data: {
      status: 'rejected',
      rejectionReason: finalReason,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: tx.userId },
  });

  if (user?.telegramChatId) {
    await notifyUserChat(
      user.telegramChatId,
      [
        '<b>Update Transaksi</b>',
        '',
        '<b>Status:</b> Ditolak',
        `<b>Tipe:</b> ${tx.type === 'topup' ? 'Top Up' : 'Withdraw'}`,
        `<b>Jumlah:</b> ${tx.type === 'topup' ? '+' : '-'}${formatRupiah(tx.amount)}`,
        `<b>Alasan:</b> ${finalReason}`,
      ].join('\n')
    ).catch(() => null);
  }

  return {
    ok: true,
    message: `Transaksi ${transactionId} ditolak.`,
    reason: finalReason,
  };
}

async function sendPendingTransactions(chatId) {
  const transactions = await prisma.transaction.findMany({
    where: {
      status: 'pending',
      type: { in: ['topup', 'withdraw'] },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  if (transactions.length === 0) {
    await callTelegram('sendMessage', {
      chat_id: chatId,
      text: 'Tidak ada transaksi pending.',
    });
    return;
  }

  for (const tx of transactions) {
    const user = await prisma.user.findUnique({
      where: { id: tx.userId },
    });
    const caption = buildTransactionCaption(tx, user);
    const replyMarkup = {
      inline_keyboard: [
        [
          { text: 'Approve', callback_data: `approve_tx:${tx.id}` },
          { text: 'Reject', callback_data: `reject_tx:${tx.id}` },
        ],
      ],
    };

    if (tx.type === 'topup' && tx.proofUrl) {
      await sendTelegramPhoto(chatId, tx.proofUrl, caption, replyMarkup);
      continue;
    }

    await callTelegram('sendMessage', {
      chat_id: chatId,
      text: caption,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    });
  }
}

async function handleMessage(message) {
  const chatId = message.chat?.id;
  const text = (message.text || '').trim();

  if (text === '/start') {
    await callTelegram('sendMessage', {
      chat_id: chatId,
      text: [
        'Bot admin JokiTugas aktif.',
        '',
        `Chat ID Anda: ${chatId}`,
        `Admin Chat ID saat ini: ${adminChatId}`,
        isAuthorizedChat(chatId)
          ? 'Status: chat ini sudah diotorisasi sebagai admin.'
          : 'Status: chat ini belum diotorisasi sebagai admin.',
        '',
        'Perintah:',
        '/pending - lihat transaksi pending',
      ].join('\n'),
    });
    return;
  }

  if (text.startsWith('/link ')) {
    const code = text.slice('/link '.length).trim().toUpperCase();
    const user = await prisma.user.findFirst({
      where: { telegramLinkCode: code },
    });

    if (!user) {
      await callTelegram('sendMessage', {
        chat_id: chatId,
        text: 'Kode link tidak valid atau sudah kedaluwarsa.',
      });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        telegramChatId: String(chatId),
        telegramLinkCode: null,
      },
    });

    await callTelegram('sendMessage', {
      chat_id: chatId,
      text: `Telegram berhasil dihubungkan ke akun ${user.email}.`,
    });
    return;
  }

  if (!isAuthorizedChat(chatId)) {
    await callTelegram('sendMessage', {
      chat_id: chatId,
      text: `Akses ditolak.\nChat ID Anda: ${chatId}`,
    });
    return;
  }

  if (text === '/pending') {
    await sendPendingTransactions(chatId);
    return;
  }

  await callTelegram('sendMessage', {
    chat_id: chatId,
    text: 'Perintah tidak dikenali. Gunakan /pending.',
  });
}

async function handleCallbackQuery(callbackQuery) {
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const callbackId = callbackQuery.id;

  if (!isAuthorizedChat(chatId)) {
    await callTelegram('answerCallbackQuery', {
      callback_query_id: callbackId,
      text: 'Akses ditolak.',
      show_alert: true,
    });
    return;
  }

  const data = callbackQuery.data || '';

  if (data.startsWith('approve_tx:')) {
    const transactionId = data.slice('approve_tx:'.length);
    const result = await approveTransaction(transactionId);

    await callTelegram('answerCallbackQuery', {
      callback_query_id: callbackId,
      text: result.message,
      show_alert: !result.ok,
    });

    if (messageId) {
      const baseMessage = callbackQuery.message.caption || callbackQuery.message.text || 'Transaksi';
      const newText = result.ok
        ? `${baseMessage}\n\n✅ Disetujui via bot`
        : `${baseMessage}\n\n⚠️ ${result.message}`;

      if (callbackQuery.message.photo?.length) {
        await callTelegram('editMessageCaption', {
          chat_id: chatId,
          message_id: messageId,
          caption: newText,
          parse_mode: 'HTML',
        }).catch(() => null);
      } else {
        await callTelegram('editMessageText', {
          chat_id: chatId,
          message_id: messageId,
          text: newText,
          parse_mode: 'HTML',
        }).catch(() => null);
      }
    }
  }

  if (data.startsWith('reject_tx:')) {
    const transactionId = data.slice('reject_tx:'.length);
    const tx = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!tx || tx.status !== 'pending' || !['topup', 'withdraw'].includes(tx.type)) {
      await callTelegram('answerCallbackQuery', {
        callback_query_id: callbackId,
        text: 'Transaksi tidak ditemukan atau sudah diproses.',
        show_alert: true,
      });
      return;
    }

    const presets = REJECT_REASON_PRESETS[tx.type] || [];

    await callTelegram('answerCallbackQuery', {
      callback_query_id: callbackId,
      text: 'Pilih alasan penolakan.',
    });

    if (messageId) {
      const baseMessage = callbackQuery.message.caption || callbackQuery.message.text || 'Transaksi';
      const inlineKeyboard = presets.map((preset) => ([
        { text: preset.label, callback_data: `reject_reason:${transactionId}:${preset.key}` },
      ]));

      if (callbackQuery.message.photo?.length) {
        await callTelegram('editMessageCaption', {
          chat_id: chatId,
          message_id: messageId,
          caption: `${baseMessage}\n\nPilih alasan penolakan:`,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: inlineKeyboard,
          },
        }).catch(() => null);
      } else {
        await callTelegram('editMessageText', {
          chat_id: chatId,
          message_id: messageId,
          text: `${baseMessage}\n\nPilih alasan penolakan:`,
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: inlineKeyboard,
          },
        }).catch(() => null);
      }
    }
  }

  if (data.startsWith('reject_reason:')) {
    const [, transactionId, presetKey] = data.split(':');
    const tx = await prisma.transaction.findUnique({
      where: { id: transactionId },
    });

    if (!tx || tx.status !== 'pending' || !['topup', 'withdraw'].includes(tx.type)) {
      await callTelegram('answerCallbackQuery', {
        callback_query_id: callbackId,
        text: 'Transaksi tidak ditemukan atau sudah diproses.',
        show_alert: true,
      });
      return;
    }

    const preset = (REJECT_REASON_PRESETS[tx.type] || []).find((item) => item.key === presetKey);
    const result = await rejectTransaction(transactionId, preset?.reason);

    await callTelegram('answerCallbackQuery', {
      callback_query_id: callbackId,
      text: result.message,
      show_alert: !result.ok,
    });

    if (messageId) {
      const baseMessage = callbackQuery.message.caption || callbackQuery.message.text || 'Transaksi';
      const newText = result.ok
        ? `${baseMessage}\n\n❌ Ditolak via bot\nAlasan: ${result.reason}`
        : `${baseMessage}\n\n⚠️ ${result.message}`;

      if (callbackQuery.message.photo?.length) {
        await callTelegram('editMessageCaption', {
          chat_id: chatId,
          message_id: messageId,
          caption: newText,
          parse_mode: 'HTML',
        }).catch(() => null);
      } else {
        await callTelegram('editMessageText', {
          chat_id: chatId,
          message_id: messageId,
          text: newText,
          parse_mode: 'HTML',
        }).catch(() => null);
      }
    }
  }
}

async function poll() {
  const response = await callTelegram('getUpdates', {
    offset,
    timeout: 10,
    allowed_updates: ['message', 'callback_query'],
  });

  const updates = response.result || [];

  for (const update of updates) {
    try {
      if (update.message) {
        await handleMessage(update.message);
      }

      if (update.callback_query) {
        await handleCallbackQuery(update.callback_query);
      }

      offset = update.update_id + 1;
    } catch (error) {
      console.error('Telegram update handling error:', error);
    }
  }
}

async function start() {
  console.log('Telegram bot started.');

  while (true) {
    try {
      await poll();
    } catch (error) {
      console.error('Telegram bot poll error:', error);
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
    }
  }
}

start()
  .catch((error) => {
    console.error('Telegram bot fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
