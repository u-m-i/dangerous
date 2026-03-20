'use strict';

const test = require('tap').test;
const ecstatic = require('../lib/core');
const http = require('http');

test('malformed uri', (t) => {
  const server = http.createServer(ecstatic(__dirname));

  t.plan(2);

  server.listen(0, () => {
    fetch(`http://localhost:${server.address().port}/%`).then(
      (response) => {
        t.ok(response);
        t.equal(response.status, 400);
        server.close(() => { t.end(); });
      }
    );
  });
});

