#!/usr/bin/env node
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var data = {
	status: "healthy"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post('/status', (req, res) => {
	data.status = req.body.status;
	console.log('[POST] /status');
	res.status(200).send(data);
});

app.get('/status', (req, res) => {
	res.status(200).send(data);
});

app.get('/favicon.ico', (req, res) => {
	res.status(200);
});

// Default every route except the above to serve the index.html
app.use('/', express.static('html'))
app.get('*', (req, res) => {
	let mypath = path.join(__dirname + '/html/index.html');
	console.log('MOOOO path: ' + mypath);
	res.sendFile(mypath);
});

module.exports = app;
