import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

// Set up the express app and middleware
const app = express();

// set morgan to log info about our requests for development use.
app.use(logger('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access
// the cookies stored in the browser.
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Require our routes
require('./routes')(app);

app.get('/api/*', (req, res) => res.status(404).send({
  error: 'Route not found',
}));
app.post('/api/*', (req, res) => res.status(404).send({
  error: 'Route not found',
}));

export default app;
