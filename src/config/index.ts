export const getEnv = (property: string, defaultValue= '') =>
  process.env[property] || defaultValue;
