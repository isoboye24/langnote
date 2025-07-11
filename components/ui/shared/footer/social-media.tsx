import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SocialMediaProps } from '@/interface';

const SocialMedia: React.FC<SocialMediaProps> = ({
  icon,
  size,
  url,
  bgColor,
}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center rounded-full`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <div className="w-full flex justify-center items-center relative h-full border-1 border-gray-400 rounded-full hover:bg-orange-300 transition duration-500 ease-in-out">
        <FontAwesomeIcon
          color={bgColor}
          icon={icon}
          style={{ fontSize: `${size * 0.5}px` }}
          className="absolute"
        />
      </div>
    </a>
  );
};

export default SocialMedia;
