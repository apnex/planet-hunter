#!/usr/bin/env node
'use strict';

const app = require('./app');
const port = 4042;

// start server
app.listen(port, () => {
	console.log('[ BODY ] server listening on port ' + port);
});
