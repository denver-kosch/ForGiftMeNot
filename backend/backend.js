import express from 'express';
import { createServer } from 'http';
import { connectDB } from './models.js';
import cors from 'cors';
import { asyncHandler } from './functions.js';
import { register, login, auth } from './api/authentication.js';
import { SERVER_HOST } from './config.js';



const app = express();
app.use(express.json(), cors());
const server = createServer(app);
let dbConn;

(async () => {
    try {
      const [, port, sequelize] = await connectDB();
      dbConn = sequelize;
      server.listen(port, SERVER_HOST, () => {
        console.log(`Server running on http://${SERVER_HOST}:${port}`);

      });
    } catch (error) {
      console.log('Error connecting to database: ' + error.message);
    };
})();

app.post('/register', asyncHandler(register));

app.post('/login', asyncHandler(login));

app.post('/auth', asyncHandler(auth));