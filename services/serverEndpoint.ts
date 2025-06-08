const host = process.env.EXPO_PUBLIC_API_URL || 'localhost';
const port = process.env.EXPO_PUBLIC_SERVERPORT || 3000;
const ENDPOINT = `http://${host}:${port}/`;

export default ENDPOINT;
export { port, host };
