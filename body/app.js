#!/usr/bin/env node
'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
var data = {};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/data', (req, res) => {
	console.log('[POST] /data');
	console.log(JSON.stringify(req.body, null, "\t"));
	let key = req.body.key;

	if(typeof(data[key]) == 'undefined') {
		data[key] = req.body.value;
	} else {
		console.log('KEY: ' + key + ' exists!!');
	}
	res.status(201).send({});
});

app.get('/data', (req, res) => {
	console.log('[GET] /data');
	let items = Object.keys(data).map((key) => {
		return { key };
	});
	let keys = {
		items
	};
	res.status(200).send(keys);
});

app.get('/data/:key', (req, res) => {
	let key = req.params.key;
	console.log('[GET] /data/' + key);
	if(typeof(data[key]) != 'undefined') {
		res.status(200).send(data[key]);
	} else {
		res.status(404).send({});
	}
});

app.put('/data/:key', (req, res) => {
	let key = req.params.key;
	console.log('[PUT] /data/' + key);
	if(typeof(data[key]) != 'undefined') {
		Object.assign(data[key], req.body);
		res.status(200).send({});
	} else {
		res.status(404).send({});
	}
});

app.delete('/data/:key', (req, res) => {
	let key = req.params.key;
	console.log('[DELETE] /data/' + key);
	if(typeof(data[key]) != 'undefined') {
		delete(data[key]);
		res.status(200).send({});
	} else {
		res.status(404).send({});
	}
});

module.exports = app;
