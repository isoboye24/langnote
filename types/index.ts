import { StaticImageData } from 'next/image';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type WordCaseType = {
  id: string;
  caseName: string;
};

export type BackgroundWithStaticImageOrVideoProps = {
  backgroundUrl?: string;
  isVideo?: boolean;
  children: React.ReactNode;
};

export type BackgroundWithDynamicImageOrVideoProps = {
  backgroundUrls?: StaticImageData[] | string[]; // Accept an array of image URLs
  isVideo?: boolean;
  children: React.ReactNode;
  slideInterval?: number; // interval in ms
};

export interface TabSectionProps<T extends string = string> {
  tab: T[];
  types: T;
}
