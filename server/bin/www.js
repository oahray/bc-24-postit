import http from 'http';
import dotenv from 'dotenv';
import app from '../app';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

require('../models');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Express server listening on port ${port}`));
