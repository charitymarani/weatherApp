const dotenv = require('dotenv');
const http = require('http');
const functions = require ('./src/index');

dotenv.config();
const server = http.createServer(functions.app);

server.listen(process.env.PORT, () => {
    console.log(`Find me on http://localhost:${process.env.PORT}`);
});