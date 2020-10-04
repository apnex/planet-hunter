#!/usr/bin/env node
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var data = [
	{
		id: "web",
		status: "healthy"
	},
	{
		id: "app",
		status: "healthy"
	},
	{
		id: "db",
		status: "healthy"
	}
];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.post('/status', (req, res) => {
	console.log('[POST] /status');
	data.forEach((item) => {
		if(item.id == req.body.id) {
			item.status = req.body.status;
		}
	});
	console.log(JSON.stringify(data, null, "\t"));
	res.status(200).send(data);
});

app.get('/status', (req, res) => {
	let items = {
		items: data
	};
	res.status(200).send(items);
});

app.get('/favicon.ico', (req, res) => {
	res.status(200);
});

// Default every route except the above to serve the index.html
app.use('/', express.static('html'))
app.get('*', (req, res) => {
	let mypath = path.join(__dirname + '/html/index.html');
	console.log('Browser Requested Path: ' + mypath);
	res.sendFile(mypath);
});

module.exports = app;
