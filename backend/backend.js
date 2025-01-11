import express from 'express';
import { createServer } from 'http';
import { connectDB } from './models.js';
import cors from 'cors';
import { asyncHandler } from './functions.js';
import { register, login, auth } from './api/authentication.js';
import { SERVER_HOST, SERVER_PORT } from './config.js';
import { createList, addToList, createGift } from './api/create.js';
import { getLists, getList, getUser } from './api/read.js';
import { updateList, updateGift, updateUser } from './api/update.js';
import { deleteList, deleteGift, deleteUser } from './api/delete.js';



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

// Authentication routes
app.post('/register', asyncHandler(register));

app.post('/login', asyncHandler(login));

app.post('/auth', asyncHandler(auth));

//Create routes
app.post('/createList', asyncHandler(createList));

app.post('/addToList', asyncHandler(addToList));

app.post('/createGift', asyncHandler(createGift));

// Read routes
app.post('/getLists', asyncHandler(getLists));

app.post('/getList', asyncHandler(getList));

app.post('/getUser', asyncHandler(getUser));

// Update routes
app.post('/updateList', asyncHandler(updateList));

app.post('/updateGift', asyncHandler(updateGift));

app.post('/updateUser', asyncHandler(updateUser));

// Delete routes
app.post('/deleteList', asyncHandler(deleteList));

app.post('/deleteGift', asyncHandler(deleteGift));

app.post('/deleteUser', asyncHandler(deleteUser));
