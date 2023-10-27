'use strict';

const http = require('http');

// <<<<<------------------ app --------------------->>>>> 
const app = require('./index');


// <<<<<------------------ Server --------------------->>>>> 
const server = http.Server(app);
server.listen(process.env.PORT);

server.on('listening', function () {
    global.log.info(`Server listening on http://localhost:${this.address().port}`);
});
