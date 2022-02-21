import {getEnv} from '.';

export const ServerConfig = {
  SERVER_PORT: getEnv('SERVER_PORT'),
  SERVER_PATH: getEnv('SERVER_PATH'),
};
