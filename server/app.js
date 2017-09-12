import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.js';

// Set up the express app and middleware
const app = express();

const compiler = webpack(webpackConfig);

console.log('>>>>>> ENV: ', process.env.NODE_ENV || 'development');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler, {
    log:console.log
  }));
}

// set morgan to log info about our requests for development use.
app.use(logger('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// initialize cookie-parser to allow us access
// the cookies stored in the browser.
app.use(cookieParser());

// Enable Cross-Origin Resource Sharing
const corsOptions = {
  allowHeaders: ['Content-Type', 'x-auth'],
  exposedHeaders: ['x-auth'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(cors(corsOptions));

const publicPath = path.join(__dirname, '../client/public/');
const indexPath = path.resolve(__dirname, publicPath, 'index.html');

app.use('/', express.static(publicPath));

// Require our routes
require('./routes')(app);

app.get('/api/*', (req, res) => res.status(404).send({
  error: 'Route not found',
}));
app.post('/api/*', (req, res) => res.status(404).send({
  error: 'Route does not exist',
}));

app.get('*', (req, res) => {
  res.sendFile(indexPath);
});

export default app;
