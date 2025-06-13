'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BackgroundWithDynamicImageOrVideoProps } from '@/types';

const BackgroundWithDynamicImageOrVideo: React.FC<
  BackgroundWithDynamicImageOrVideoProps
> = ({
  backgroundUrls = [],
  isVideo = false,
  children,
  slideInterval = 5000, // 5 seconds default
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isVideo && backgroundUrls.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % backgroundUrls.length);
      }, slideInterval);

      return () => clearInterval(interval);
    }
  }, [backgroundUrls, isVideo, slideInterval]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {isVideo ? (
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={backgroundUrls?.[0]}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        backgroundUrls.map((url, index) => (
          <Image
            key={index}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
            }`}
            src={url}
            alt={`Background ${index}`}
            fill
            priority={index === 0}
          />
        ))
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

export default BackgroundWithDynamicImageOrVideo;
