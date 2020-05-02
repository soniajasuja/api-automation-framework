/* eslint new-cap: "off", no-invalid-this: "off" */

'use strict';

const {Given} = require('cucumber');

Given(/^I use the mock target$/, function(callback) {
  this.raaf.domain = 'https://localhost';
  callback();
});
