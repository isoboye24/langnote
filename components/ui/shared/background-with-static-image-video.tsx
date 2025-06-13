'use client';

import React from 'react';
import Image from 'next/image';
import { BackgroundWithStaticImageOrVideoProps } from '@/types';

const BackgroundWithStaticImageOrVideo: React.FC<
  BackgroundWithStaticImageOrVideoProps
> = ({ backgroundUrl, isVideo = false, children }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {isVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={backgroundUrl}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : backgroundUrl ? (
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={backgroundUrl}
          alt="Background"
        />
      ) : (
        ''
      )}

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex items-center justify-center h-full px-6 text-center text-white">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default BackgroundWithStaticImageOrVideo;
