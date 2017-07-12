const http = require('http');
const app = require('../app');
const models = require('../models');

// models.sequelize.sync();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log(`Express server listening on port ${port}`));
