import {getEnv} from '.';

export const ServerConfig = {
  SERVER_PORT: getEnv('SERVER_PORT'),
  SERVER_PATH: getEnv('SERVER_PATH'),
  CACHE_TTL: Number(getEnv('CACHE_TTL')),
};
