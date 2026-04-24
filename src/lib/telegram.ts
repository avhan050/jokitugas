import type { Task, Transaction, User } from '@/lib/types';

const TELEGRAM_API_BASE = 'https://api.telegram.org';

function isDataUrl(value: string) {
  return value.startsWith('data:');
}

function dataUrlToBlob(dataUrl: string) {
  const [meta, base64Data] = dataUrl.split(',', 2);
  const mimeMatch = meta.match(/^data:([^;]+);base64$/);
  const mimeType = mimeMatch?.[1] || 'application/octet-stream';
  const bytes = Buffer.from(base64Data, 'base64');
  return new Blob([bytes], { type: mimeType });
}

function isTelegramConfigured() {
  return Boolean(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_ADMIN_CHAT_ID);
}

function formatRupiah(amount: number) {
  return `Rp ${Math.abs(amount).toLocaleString('id-ID')}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function sendTelegramMessage({
  text,
  replyMarkup,
}: {
  text: string;
  replyMarkup?: Record<string, unknown>;
}) {
  if (!isTelegramConfigured()) {
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN as string;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID as string;

  const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
      reply_markup: replyMarkup,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram sendMessage failed: ${errorText}`);
  }
}

export async function sendTelegramMessageToChat({
  chatId,
  text,
}: {
  chatId: string;
  text: string;
}) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !chatId) {
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN as string;

  const response = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram sendMessageToChat failed: ${errorText}`);
  }
}

export async function sendTelegramPhoto({
  photo,
  caption,
  replyMarkup,
}: {
  photo: string;
  caption: string;
  replyMarkup?: Record<string, unknown>;
}) {
  if (!isTelegramConfigured()) {
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN as string;
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID as string;
  const url = `${TELEGRAM_API_BASE}/bot${token}/sendPhoto`;
  const response = isDataUrl(photo)
    ? await (async () => {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('caption', caption);
        formData.append('parse_mode', 'HTML');
        if (replyMarkup) {
          formData.append('reply_markup', JSON.stringify(replyMarkup));
        }
        formData.append('photo', dataUrlToBlob(photo), 'proof-transfer.png');

        return fetch(url, {
          method: 'POST',
          body: formData,
        });
      })()
    : await fetch(url, {
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
      });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Telegram sendPhoto failed: ${errorText}`);
  }
}

export async function notifyPendingTransaction(transaction: Transaction, user: User | null) {
  if (!isTelegramConfigured()) {
    return;
  }

  const typeLabel = transaction.type === 'topup' ? 'Top Up' : 'Withdraw';
  const sign = transaction.type === 'topup' ? '+' : '-';
  const message = [
    '<b>Transaksi Pending Baru</b>',
    '',
    `<b>Tipe:</b> ${typeLabel}`,
    `<b>User:</b> ${escapeHtml(user?.name || 'Unknown')} (${escapeHtml(user?.email || '-')})`,
    `<b>Jumlah:</b> ${sign}${formatRupiah(transaction.amount)}`,
    `<b>Waktu:</b> ${escapeHtml(new Date(transaction.createdAt).toLocaleString('id-ID'))}`,
    `<b>Deskripsi:</b> ${escapeHtml(transaction.desc)}`,
    transaction.note ? `<b>Catatan:</b> ${escapeHtml(transaction.note)}` : '',
    transaction.bankDetails ? `<b>Bank:</b> ${escapeHtml(transaction.bankDetails)}` : '',
    '',
    `ID: <code>${escapeHtml(transaction.id)}</code>`,
  ]
    .filter(Boolean)
    .join('\n');

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: 'Approve', callback_data: `approve_tx:${transaction.id}` },
        { text: 'Reject', callback_data: `reject_tx:${transaction.id}` },
      ],
    ],
  };

  if (transaction.type === 'topup' && transaction.proofUrl) {
    await sendTelegramPhoto({
      photo: transaction.proofUrl,
      caption: message,
      replyMarkup,
    });
    return;
  }

  await sendTelegramMessage({
    text: message,
    replyMarkup,
  });
}

export async function notifyTaskDispute(task: Task, client: User | null, worker: User | null) {
  if (!isTelegramConfigured()) {
    return;
  }

  const message = [
    '<b>Sengketa Tugas Baru</b>',
    '',
    `<b>Judul:</b> ${escapeHtml(task.title)}`,
    `<b>Client:</b> ${escapeHtml(client?.name || 'Unknown')} (${escapeHtml(client?.email || '-')})`,
    `<b>Pekerja:</b> ${escapeHtml(worker?.name || 'Unknown')} (${escapeHtml(worker?.email || '-')})`,
    `<b>Budget:</b> ${formatRupiah(task.budget)}`,
    `<b>Waktu:</b> ${escapeHtml(new Date(task.disputedAt || task.createdAt).toLocaleString('id-ID'))}`,
    '',
    `<b>Alasan:</b> ${escapeHtml(task.disputeReason || '-')}`,
    '',
    `Task ID: <code>${escapeHtml(task.id)}</code>`,
  ].join('\n');

  await sendTelegramMessage({
    text: message,
  });
}

export async function notifyUserTransactionDecision({
  user,
  transaction,
}: {
  user: User | null;
  transaction: Transaction;
}) {
  if (!user?.telegramChatId) {
    return;
  }

  const statusLabel = transaction.status === 'approved' ? 'Disetujui' : 'Ditolak';
  const sign = transaction.type === 'topup' ? '+' : '-';
  const message = [
    '<b>Update Transaksi</b>',
    '',
    `<b>Status:</b> ${statusLabel}`,
    `<b>Tipe:</b> ${transaction.type === 'topup' ? 'Top Up' : 'Withdraw'}`,
    `<b>Jumlah:</b> ${sign}${formatRupiah(transaction.amount)}`,
    `<b>Deskripsi:</b> ${escapeHtml(transaction.desc)}`,
    transaction.rejectionReason ? `<b>Alasan:</b> ${escapeHtml(transaction.rejectionReason)}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  await sendTelegramMessageToChat({
    chatId: user.telegramChatId,
    text: message,
  });
}

export async function notifyUserDisputeDecision({
  user,
  task,
  outcome,
}: {
  user: User | null;
  task: Task;
  outcome: 'pay_worker' | 'refund_client';
}) {
  if (!user?.telegramChatId) {
    return;
  }

  const message = [
    '<b>Update Sengketa Tugas</b>',
    '',
    `<b>Judul:</b> ${escapeHtml(task.title)}`,
    `<b>Budget:</b> ${formatRupiah(task.budget)}`,
    `<b>Keputusan Admin:</b> ${outcome === 'pay_worker' ? 'Pembayaran ke pekerja' : 'Refund ke client'}`,
  ].join('\n');

  await sendTelegramMessageToChat({
    chatId: user.telegramChatId,
    text: message,
  });
}
