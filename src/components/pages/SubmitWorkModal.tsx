'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { Send, UploadCloud, CheckCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/supabase';

export default function SubmitWorkModal({ taskId }: { taskId: string }) {
  const { submitWork, closeModal, addToast } = useAppStore();
  const [note, setNote] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      addToast('File terlalu besar (maks 20MB)', 'error');
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    
    try {
      const publicUrl = await uploadFile(file, 'submissions');
      setFileUrl(publicUrl);
      addToast('File hasil joki berhasil diupload', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      addToast('Gagal upload file. Pastikan Supabase Storage sudah dikonfigurasi.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    if (!note.trim()) return;
    useAppStore.getState().submitWork(taskId, note.trim(), fileUrl);
    closeModal();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: 'var(--accent-dim)' }}
        >
          <Send size={20} style={{ color: 'var(--accent)' }} />
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            Kirim Hasil Kerja
          </h3>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            Tambahkan catatan untuk client
          </p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Catatan Pengiriman</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jelaskan ringkasan pekerjaan yang telah selesai..."
          className="form-input"
          rows={4}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Hasil Joki (Opsional)</label>
        <div
          className="rounded-xl p-4 text-center cursor-pointer transition-all"
          style={{
            background: fileUrl ? 'var(--accent-dim)' : 'var(--bg)',
            border: fileUrl ? '1px solid var(--accent)' : '2px dashed var(--border)',
          }}
          onClick={() => !isUploading && fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-1">
              <Loader2 size={24} className="animate-spin" style={{ color: 'var(--muted-foreground)' }} />
              <p className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Mengupload...</p>
            </div>
          ) : fileUrl ? (
            <div className="flex flex-col items-center gap-1">
              <CheckCircle size={24} style={{ color: 'var(--accent)' }} />
              <p className="text-xs font-bold truncate max-w-[200px]" style={{ color: 'var(--accent)' }}>{fileName}</p>
              <p className="text-[10px]" style={{ color: 'var(--muted-foreground)' }}>Klik untuk ganti</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <UploadCloud size={24} style={{ color: 'var(--muted-foreground)' }} />
              <p className="text-xs font-semibold" style={{ color: 'var(--muted-foreground)' }}>Klik untuk upload hasil (maks 20MB)</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={closeModal}
          className="flex-1 py-3 rounded-xl text-sm font-bold"
          style={{ background: 'var(--bg)', color: 'var(--muted-foreground)', border: '1px solid var(--border)' }}
        >
          Batal
        </button>
        <button
          onClick={handleSubmit}
          disabled={!note.trim() || isUploading}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{
            background: note.trim() ? 'var(--accent)' : 'var(--border)',
            color: note.trim() ? '#0B1120' : 'var(--muted-foreground)',
          }}
        >
          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Kirim Hasil
        </button>
      </div>
    </div>
  );
}
