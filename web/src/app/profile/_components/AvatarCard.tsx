'use client';

import { Camera } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { api, ApiError } from '@/lib/api';
import { cn } from '@/lib/shadcn';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

interface AvatarCardProps {
  name: string | null;
  avatarUrl: string | null;
  onAvatarUpdate: (url: string) => void;
}

function AvatarCard({ name, avatarUrl, onAvatarUpdate }: AvatarCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await api.post<{ avatarUrl: string }>(
        '/v1/users/avatar',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (res?.avatarUrl) {
        onAvatarUpdate(res.avatarUrl);
        toast.success('Đã cập nhật ảnh đại diện');
      }
    } catch (error) {
      let message = 'Không thể tải ảnh lên';
      if (error instanceof ApiError) {
        message = error.message;
      }
      toast.error(message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className='flex flex-col items-center gap-3'>
      <div
        className='relative group cursor-pointer'
        onClick={() => fileInputRef.current?.click()}
      >
        <div
          className={cn(
            'size-20 rounded-full flex items-center justify-center text-xl font-bold text-primary-foreground select-none overflow-hidden',
            avatarUrl ? '' : 'bg-primary',
            uploading && 'opacity-60'
          )}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name ?? ''}
              className='size-full object-cover'
            />
          ) : (
            getInitials(name ?? '?')
          )}
        </div>
        <div className='absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
          <Camera size={20} className='text-white' />
        </div>
        {uploading && (
          <div className='absolute inset-0 rounded-full bg-black/40 flex items-center justify-center'>
            <div className='size-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileSelect}
      />

      <div className='text-center'>
        <p className='font-semibold text-foreground truncate max-w-[200px]'>
          {name ?? 'Người dùng'}
        </p>
      </div>
    </div>
  );
}

export { AvatarCard };
