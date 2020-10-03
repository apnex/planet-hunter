#!/usr/bin/env node
'use strict';

const got = require('got');
const app = require('./app');
const port = 4040;

// start server
app.listen(port, function() {
	console.log('Express server listening on port ' + port);
	//load(); // start loop
});

// Returns a Promise that resolves after "ms" Milliseconds
function sleep(ms) {
	return new Promise((response) => {
		setTimeout(response, ms)
	});
}

async function load() { // We need to wrap the loop into an async function for this to work
	let i = 0;
	while(1) {
		getStatus().then(async(body) => {
			if(body.status == 'healthy') {
				await setStatus({
					status: 'broken'
				});
			} else {
				await setStatus({
					status: 'healthy'
				});
			}
			console.log(JSON.stringify(body, null, "\t"));
		});
		await sleep(5000);
	}
}

async function setStatus(json) {
	const {body} = await got.post('http://localhost:4040/status', {
		json,
		responseType: 'json'
	});
	return body;
}

async function getStatus() {
	const {body} = await got.get('http://localhost:4040/status', {
		responseType: 'json'
	});
	return body;
}
