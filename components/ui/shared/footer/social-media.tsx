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
      <FontAwesomeIcon
        color={bgColor}
        icon={icon}
        style={{ fontSize: `${size * 0.5}px` }}
      />
    </a>
  );
};

export default SocialMedia;
