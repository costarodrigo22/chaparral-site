'use client';
import { Dialog, DialogContent } from '@/components/ui/Dialog';
import React, { useEffect, useState } from 'react';

interface IMediaModal {
  open: boolean;
  onClose: () => void;
  link: string;
}

export default function MediaModal({ onClose, open, link }: IMediaModal) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const extractYouTubeCode = (url: string): string | null => {
    const match =
      url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) ||
      url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/);
    return match ? match[1] : null;
  };

  const videoCode = extractYouTubeCode(link);

  useEffect(() => {
    if (open && videoCode) {
      setVideoSrc(`https://www.youtube.com/embed/${videoCode}?autoplay=1`);
    } else {
      setVideoSrc(null);
    }
  }, [open, videoCode]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[900px]">
        {videoSrc ? (
          <iframe
            width="99%"
            height="500px"
            src={videoSrc}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div>Ocorreu um erro ao buscar o vídeo!</div>
        )}
      </DialogContent>
    </Dialog>
  );
}
