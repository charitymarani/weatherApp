const dotenv = require('dotenv');
const http = require('http');
const app = require ('./src/index');

dotenv.config();
const server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log(`Find me on http://localhost:${process.env.PORT}`);
});