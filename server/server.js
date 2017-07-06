import express from 'express';
import path from 'path';

const app = express();
var publicPath = path.join(__dirname, '../template/public');

app.use(express.static(publicPath));

app.listen(3000, () => console.log(`Express server running on port 3000.`));