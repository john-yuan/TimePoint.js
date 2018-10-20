const express = require('express');
const app = express();
const WEBROOT = process.cwd();
const PRIMARY_PORT = +process.argv[2] || 4003;
const startServerOnAvailablePort = require('./lib/startServerOnAvailablePort');
const getAllIPv4Address = require('./lib/getAllIPv4Address');

app.use(express.static(WEBROOT));

startServerOnAvailablePort(PRIMARY_PORT, port => {
    return app.listen(port, () => {
        console.log(`WEBROOT: ${WEBROOT}\n`);
        console.log(`The server is running at:`)
        getAllIPv4Address().map(ip => {
            console.info(`    * http://${ip}:${port}/web/index.html`);
        });
    });
}, err => {
    throw err;
});
