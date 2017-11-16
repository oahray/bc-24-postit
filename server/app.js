import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';
import favicon from 'serve-favicon';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config';

// Set up the express app and middleware
const app = express();

const compiler = webpack(webpackConfig);

const env = process.env.NODE_ENV || 'development';
console.log('>>>>>> ENV: ', env);

if (env !== 'production') {
  dotenv.config();
}

if (env === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    historyApiFallback: true,
    hot: true,
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
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
  // some legacy browsers (IE11, various SmartTVs) choke on 204
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// set favicon
app.use(favicon(path.join(__dirname, '../client/public/images/favicon.ico')));

const publicPath = path.join(__dirname, '../client/public/');
const indexPath = path.resolve(__dirname, publicPath, 'index.html');
const docPath = path.join(__dirname, '../docs');

app.use('/api/v1/docs', express.static(docPath));

app.use('/', express.static(publicPath));

// Require our routes
require('./routes')(app);

app.get('/api/v1/docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs', 'index.html'));
});

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
