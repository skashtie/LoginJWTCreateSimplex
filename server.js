/** */

var fs = require('fs');
var http = require('http');
var https = require('https');
/** */
require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
// const server = app.listen(port, function () {
//     console.log('Server listening on port ' + port);
// });

/** */
const options = {
    pfx: fs.readFileSync('sagiCer.pfx'),
    passphrase: 'o0JULgRqSMW52lhvKgie/W6BPmqGj28cpbrkGLBukeg='
};

var httpServer = http.createServer(app);

var httpsServer = https.createServer(options, app);




/** */
httpServer.listen(4005, '0.0.0.0', function() {

    console.log('http server fixed Listening to port:  4005');

});

httpsServer.listen(4000, '0.0.0.0', function() {

    console.log('https server fixed Listening to port:  4000');

});