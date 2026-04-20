'use client';

import { useState, useRef } from 'react';
import { useAppStore } from '@/lib/store';
import { formatRupiah } from '@/lib/helpers';
import { UploadCloud, Image, Send, CheckCircle, Loader2 } from 'lucide-react';
import { uploadFile } from '@/lib/supabase';

interface TopupConfirmModalProps {
  amount: number;
  note: string;
  onConfirm: (proofUrl: string) => void;
}

export default function TopupConfirmModal({ amount, note, onConfirm }: TopupConfirmModalProps) {
  const { closeModal, addToast } = useAppStore();
  const [proofUrl, setProofUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addToast('File terlalu besar (maks 5MB)', 'error');
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    
    try {
      const publicUrl = await uploadFile(file, 'proofs');
      setProofUrl(publicUrl);
      addToast('Bukti berhasil diupload', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      addToast('Gagal memproses file bukti.', 'error');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = () => {
    onConfirm(proofUrl);
    closeModal();
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Konfirmasi Top Up
        </h3>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Upload bukti transfer untuk verifikasi
        </p>
      </div>

      {/* Summary */}
      <div
        className="rounded-xl p-4 space-y-2"
        style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
      >
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--muted-foreground)' }}>Jumlah</span>
          <span className="font-bold">{formatRupiah(amount)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span style={{ color: 'var(--muted-foreground)' }}>Metode</span>
          <span>{note}</span>
        </div>
      </div>

      {/* Upload area */}
      <div>
        <label className="block text-sm font-semibold mb-2">Bukti Transfer</label>
        <div
          className="rounded-xl p-6 text-center cursor-pointer transition-all"
          style={{
            background: proofUrl ? 'var(--accent-dim)' : 'var(--bg)',
            border: proofUrl ? '1px solid var(--accent)' : '2px dashed var(--border)',
          }}
          onClick={() => fileRef.current?.click()}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {isUploading ? (
            <div className="space-y-2">
              <Loader2 size={32} className="mx-auto animate-spin" style={{ color: 'var(--muted-foreground)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>Mengupload...</p>
            </div>
          ) : proofUrl ? (
            <div className="space-y-2">
              <CheckCircle size={32} className="mx-auto" style={{ color: 'var(--accent)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{fileName}</p>
              <img
                src={proofUrl}
                alt="Bukti"
                className="mx-auto max-h-32 rounded-lg"
              />
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>Klik untuk ganti</p>
            </div>
          ) : (
            <div className="space-y-2">
              <UploadCloud size={32} className="mx-auto" style={{ color: 'var(--muted-foreground)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                Klik untuk upload bukti
              </p>
              <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                PNG, JPG, JPEG (maks 5MB)
              </p>
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
          disabled={!proofUrl || isUploading}
          className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          style={{ background: 'var(--accent)', color: '#0B1120' }}
        >
          {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          Ajukan Top Up
        </button>
      </div>
    </div>
  );
}
