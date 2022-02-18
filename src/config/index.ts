import dotenv from 'dotenv';
dotenv.config();

export const getEnv = (property: string, defaultValue= '') =>
  process.env[property] || defaultValue;
