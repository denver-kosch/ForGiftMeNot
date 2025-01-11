import { User } from '../models.js';
import { ApiError } from '../functions.js';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import { hash, compare } from 'bcrypt';


export const register = async (req) => {
    try {
        let { username, email, password } = req.body;
        if (!username || !password || !email) throw new ApiError(400, 'Username, email, and password required');
        password = await hash(password, 10);
        const user = await User.create({ username, email, password });
        const token = jwt.sign({ id: user.id }, SECRET);
        return { status: 201, content: {token} };
    } catch (error) {
        console.error(error);
        throw new ApiError(400, error.message);
    }
};

export const login = async (req) => {
    const { email, password } = req.body;
    if (!email || !password) throw new ApiError(400, 'Email and password required');
    const user = await User.findOne({ where: { email } });
    if (user && await compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, SECRET);
        return {status:200, content: {token}, token};
    } else throw new ApiError(401, 'Invalid email or password');
};

export const auth = async (req) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        if (!token) throw new ApiError(401, 'No token provided');
        jwt.verify(token, SECRET); // Throws an error if the token is invalid
        return {status:200};
    } catch {
        throw new ApiError(401, 'Invalid token');
    }
};

export const makeToken = async (email, username) => {
    try {
        return jwt.sign({ email, username }, SECRET);
    }
    catch (error){
        throw new ApiError(400, error.message);
    }
};

export const extractToken = req => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const content = jwt.verify(token, SECRET);
        return (content && content.id);
    } catch {
        return false;
    }
};