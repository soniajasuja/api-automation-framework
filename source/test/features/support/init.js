/* eslint new-cap: "off", no-invalid-this: "off" */

'use strict';

const raaf = require('../../../raaf/raaf.js');
const {Before, setDefaultTimeout} = require('cucumber');

Before(function() {
  this.raaf = new raaf.Raaf('http', 'httpbin.org');
  this.raaf.addRequestHeader('Cache-Control', 'no-cache');
  this.raaf.clientTLSConfig = {
    valid: {
      key: './test/mock_target/certs/client-key.pem',
      cert: './test/mock_target/certs/client-crt.pem',
      ca: './test/mock_target/certs/ca-crt.pem',
    },
  };
});

setDefaultTimeout(60 * 1000);
