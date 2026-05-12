import { SERVER_HOST, SERVER_PORT } from "./config.js";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
};

const sendJsonResponse = (res, status, content = {}) => {
    content.success = (status >= 200 && status < 300) ? true : false;
    res.status(status).json(content);
};

const handleError = (error, res) => {
  if (error instanceof ApiError) sendJsonResponse(res, error.status, { error: error.message });
  else sendJsonResponse(res, 500, { error: 'Internal Server Error' });
};

export const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next, res))
  .then(({status, content = {}}) => sendJsonResponse(res, status, content))
  .catch(error => handleError(error, res));


export const makeBackendUrl = (path) => `http://${SERVER_HOST}:${SERVER_PORT}${path.startsWith('/') ? '' : '/'}${path}`;