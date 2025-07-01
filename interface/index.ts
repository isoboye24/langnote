import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface TabSectionProps<T extends string = string> {
  tab: T[];
  types: T;
}

export interface SocialMediaProps {
  icon: IconProp;
  size: number;
  url: string;
  bgColor?: string;
  hoverColor?: string;
}
