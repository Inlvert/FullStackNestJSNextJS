import * as dotenv from 'dotenv';

dotenv.config();

interface EnvVars {
  CONNECT_TO_DB: string;
}

const { CONNECT_TO_DB } = process.env;

export const CONSTANTS = {
  CONNECT_TO_DB,
};
