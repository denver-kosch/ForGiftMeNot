import dotenv from "dotenv";
import { getLocalIP } from './start.js';

dotenv.config();

export const DB_HOST = process.env.DB_HOST || 'localhost';
export const SERVER_HOST = getLocalIP();
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASS = process.env.DB_PASS;
export const SECRET = process.env.SECRET;