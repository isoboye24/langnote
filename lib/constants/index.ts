export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'LangNote';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A language learning website built with Next js, Typescript and React';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
export const PAGE_SIZE = Number(process.env.PAGE_SIZE) || 10;

export const signInDefaultValues = {
  email: '',
  password: '',
};

export const signUpDefaultValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  image: '',
};
