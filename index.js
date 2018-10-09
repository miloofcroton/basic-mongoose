/* eslint no-console: off */

require('dotenv').config();
const app = require('./lib/app');
const http = require('http');

const server = http.createServer(app);

const PORT = 7890;

server.listen(PORT, () => {
    console.log('server running on', server.address().port);
});


