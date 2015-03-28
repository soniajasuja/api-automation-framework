/* jslint node: true */
'use strict';

var request = require('request');
var jsonPath = require('JSONPath');
var libxmljs = require('libxmljs');

var headers = {};
var httpResponse = {};
var requestBody = '';

function HttpClient(scheme, domain) {
	this.domain = scheme + '://' + domain;
}

function Util() {}

HttpClient.prototype.addHeader = function(name, value) {
	headers[name] = value;
};

HttpClient.prototype.getResponse = function() {
	return httpResponse;
};

HttpClient.prototype.setRequestBody = function(body) {
	requestBody = body;
};

HttpClient.prototype.get = function(resource, callback) {
	request.get({
		url: this.domain + resource,
		headers: headers
	},
	function(error, response) {
		if (error) {
			return callback(error);
		}

		httpResponse = response;
		callback(null, response);
	});
};

HttpClient.prototype.post = function(resource, callback) {
	request({
		url: this.domain + resource,
		headers: headers,
		body: requestBody,
		method: 'POST'
	},
	function(error, response) {
		if (error) {
			return callback(error);
		}

		httpResponse = response;
		callback(null, response);
	});
};

HttpClient.prototype.put = function(resource, callback) {
	request({
		url: this.domain + resource,
		headers: headers,
		body: requestBody,
		method: 'PUT'
	},
	function(error, response) {
		if (error) {
			return callback(error);
		}

		httpResponse = response;
		callback(null, response);
	});
};

HttpClient.prototype.delete = function(resource, callback) {
	request({
		url: this.domain + resource,
		headers: headers,
		body: requestBody,
		method: 'DELETE'
	},
	function(error, response) {
		if (error) {
			return callback(error);
		}

		httpResponse = response;
		callback(null, response);
	});
};

Util.prototype.getContentType = function(content) {
	try{
		JSON.parse(content);
		return 'json';
	} catch(e) {
		try{
			libxmljs.parseXml(content);
			return 'xml';
		} catch(e) {
			return null;
		}
	}
};

Util.prototype.evalPath = function(path, content) {
	var contentType = this.getContentType(content);

	switch (contentType) {
		case 'json':
			var contentJson = JSON.parse(content);
			return jsonPath.eval(contentJson, path);
		case 'xml':
			var xml = libxmljs.parseXml(content);
			return xml.get(path).text();
		default:
			return null;
	}
};

Util.prototype.assertStringContains = function(content, string) {
	if ((content) && (content.indexOf(string) > -1)) {
		return true;
	} 

	return false;
};

Util.prototype.featureVariables = {};

exports.Util = Util;
exports.HttpClient = HttpClient;
