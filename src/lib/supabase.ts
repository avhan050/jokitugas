// Supabase connection removed to support local-only mode with Base64
export const supabase = {
  channel: () => ({ on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }) }),
  storage: { from: () => ({ upload: async () => ({ data: null, error: new Error('Supabase disabled') }), getPublicUrl: () => ({ data: { publicUrl: '' } }) }) }
} as any;

/**
 * Mengonversi file menjadi Base64 string agar bisa disimpan di SQLite
 * Tanpa memerlukan layanan storage eksternal seperti Supabase.
 */
export const uploadFile = async (file: File, bucket: string = 'uploads'): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => {
      console.error('Base64 conversion error:', error);
      reject(error);
    };
  });
};
