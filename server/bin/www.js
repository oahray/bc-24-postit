import http from 'http';
import dotenv from 'dotenv';
import socketIO from 'socket.io';

import app from '../app';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

require('../models');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
let currentApp = app;
export const io = socketIO(server);
app.set('io', io);

server.listen(port);

if (module.hot) {
  module.hot.accept('../app', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
