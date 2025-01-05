import express from 'express';
import { createServer } from 'http';
import { connectDB } from './models.js';
import cors from 'cors';
import { asyncHandler } from './functions.js';
import { register, login, auth } from './api/authentication.js';
import { SERVER_HOST, SERVER_PORT } from './config.js';



const app = express();
app.use(express.json(), cors());
const server = createServer(app);

(async () => {
    try {
      await connectDB();
      server.listen(SERVER_PORT, SERVER_HOST, () => {console.log(`Server running on http://${SERVER_HOST}:${SERVER_PORT}`);});
    } catch (error) {
      console.log(error.message);
    }
})();

app.post('/register', asyncHandler(register));

app.post('/login', asyncHandler(login));

app.post('/auth', asyncHandler(auth));