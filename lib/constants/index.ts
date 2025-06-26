export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'LN';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A language learning website built with Next js, Typescript and React';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const languageDefaultValues = {
  languageName: '',
};

export const popularCategoryDefaultValues = {
  popularCategory: '',
  lightImageIcon: '',
  darkImageIcon: '',
  languageId: '',
};

export const partsOfSpeechDefaultValues = {
  name: '',
  languageId: '',
};

export const casesDefaultValues = {
  caseName: '',
  languageId: '',
};

export const genderDefaultValues = {
  genderName: '',
  languageId: '',
};

export const popularListWordDefaultValues = {
  word: '',
  known: false,
  favorite: false,
  wordCaseId: '',
  partOfSpeechId: '',
  synonym: '',
  antonym: '',
  meaning: '',
  popularCategoryId: '',
  languageId: '',
  genderId: '',
};

export const signUpDefaultValues = {
  userName: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: '',
  firstLanguage: '',
};

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const roles = ['user', 'admin'] as const;

export const bookDefaultValues = {
  title: '',
  userId: '',
  language: '',
  color1: '',
  color2: '',
};

export const wordGroupDefaultValues = {
  groupName: '',
  bookId: '',
  color: '',
};

export const userWordDefaultValues = {
  word: '',
  known: false,
  favorite: false,
  wordCaseId: '',
  partOfSpeechId: '',
  synonym: '',
  antonym: '',
  meaning: '',
  wordGroupId: '',
  genderId: '',
  language: '',
  bookId: '',
};
