'use strict';

const test = require('tap').test;
const ecstatic = require('../lib/core');
const http = require('http');
const path = require('path');
const portfinder = require('portfinder');

const root = `${__dirname}/public`;
const baseDir = 'base';

test('304 Not Modified / Strong Etag', (t) => {
  const file = 'a.txt';

  const server = http.createServer(
    ecstatic({
      root,
      gzip: true,
      baseDir,
      autoIndex: true,
      showDir: true,
      weakEtags: false,
      weakCompare: false,
    })
  );

  server.listen(0, () => {
    const port = server.address().port;
    const uri = `http://localhost:${port}${path.join('/', baseDir, file)}`;

    // How to avoid following the redirect?
    fetch(uri).then( (response) => {
      if (!response.ok) {
        t.error(`Response code ${response.status}: Therefore test ends on error`);
      }

      t.equal(response.status, 200, 'first request should be a 200');

      fetch(
        uri,
        {
          headers: { 'if-modified-since': response.headers.get('last-modified') },
        }
      ).then((res2) => {

        t.equal(res2.status, 304, 'second request should be a 304');

        /* Should return an etag */
        t.ok(res2.headers.get("etag"));

        t.equal(res2.headers.get("etag").indexOf('"'), 0, 'should return a strong etag');

        server.close();
        setTimeout(() => { t.end(); }, 0);
      }).catch( (error) => {
        t.fail(`Error on request: ${error}`)
      });
    });
  });
});

// test('304_not_modified_weak', (t) => {
//   const file = 'b.txt';

//   const server = http.createServer(
//     ecstatic({
//       root,
//       gzip: true,
//       baseDir,
//       autoIndex: true,
//       showDir: true,
//       weakEtags: true,
//       weakCompare: false,
//     })
//   );

//   server.listen(0, () => {
//     const port = server.address().port;
//     const uri = `http://localhost:${port}${path.join('/', baseDir, file)}`;
//     const now = (new Date()).toString();

//     request.get({
//       uri,
//       followRedirect: false,
//     }, (err, res) => {
//       if (err) {
//         t.fail(err);
//       }

//       t.equal(res.statusCode, 200, 'first request should be a 200');

//       request.get({
//         uri,
//         followRedirect: false,
//         headers: { 'if-modified-since': now },
//       }, (err2, res2) => {
//         if (err2) t.fail(err2);

//         t.equal(res2.statusCode, 304, 'second request should be a 304');
//         t.equal(res2.headers.etag.indexOf('W/'), 0, 'should return a weak etag');
//         server.close();
//         setTimeout(() => { t.end(); }, 0);
//       });
//     });
//   });
// });

// test('304_not_modified_strong_compare', (t) => {
//   const file = 'b.txt';

//   const server = http.createServer(
//     ecstatic({
//       root,
//       gzip: true,
//       baseDir,
//       autoIndex: true,
//       showDir: true,
//       weakEtags: false,
//       weakCompare: false,
//     })
//   );

//   server.listen(0, () => {
//     const port = server.address().port;
//     const uri = `http://localhost:${port}${path.join('/', baseDir, file)}`;
//     const now = (new Date()).toString();
//     let etag = null;

//     request.get({
//       uri,
//       followRedirect: false,
//     }, (err, res) => {
//       if (err) {
//         t.fail(err);
//       }

//       t.equal(res.statusCode, 200, 'first request should be a 200');

//       etag = res.headers.etag;

//       request.get({
//         uri,
//         followRedirect: false,
//         headers: { 'if-modified-since': now, 'if-none-match': etag },
//       }, (err2, res2) => {
//         if (err2) {
//           t.fail(err2);
//         }

//         t.equal(res2.statusCode, 304, 'second request with a strong etag should be 304');

//         request.get({
//           uri,
//           followRedirect: false,
//           headers: { 'if-modified-since': now, 'if-none-match': `W/${etag}` },
//         }, (err3, res3) => {
//           if (err3) {
//             t.fail(err3);
//           }

//           // Note that if both if-modified-since and if-none-match are
//           // provided, the server MUST NOT return a response status of 304
//           // unless doing so is consistent with all of the conditional
//           // header fields in the request
//           // https://www.ietf.org/rfc/rfc2616.txt
//           t.equal(res3.statusCode, 200, 'third request with a weak etag should be 200');
//           server.close();
//           setTimeout(() => { t.end(); }, 0);
//         });
//       });
//     });
//   });
// });


// test('304_not_modified_weak_compare', (t) => {
//   const file = 'c.js';

//   const server = http.createServer(
//     ecstatic({
//       root,
//       gzip: true,
//       baseDir,
//       autoIndex: true,
//       showDir: true,
//       weakEtags: false,
//     })
//   );

//   server.listen(0, () => {
//     const port = server.address().port;
//     const uri = `http://localhost:${port}${path.join('/', baseDir, file)}`;
//     const now = (new Date()).toString();
//     let etag = null;

//     request.get({
//       uri,
//       followRedirect: false,
//     }, (err, res) => {
//       if (err) {
//         t.fail(err);
//       }

//       t.equal(res.statusCode, 200, 'first request should be a 200');

//       etag = res.headers.etag;

//       request.get({
//         uri,
//         followRedirect: false,
//         headers: { 'if-modified-since': now, 'if-none-match': etag },
//       }, (err2, res2) => {
//         if (err2) {
//           t.fail(err2);
//         }

//         t.equal(res2.statusCode, 304, 'second request with a strong etag should be 304');

//         request.get({
//           uri,
//           followRedirect: false,
//           headers: { 'if-modified-since': now, 'if-none-match': `W/${etag}` },
//         }, (err3, res3) => {
//           if (err3) {
//             t.fail(err3);
//           }

//           t.equal(res3.statusCode, 304, 'third request with a weak etag should be 304');
//           server.close();
//           setTimeout(() => { t.end(); }, 0);
//         });
//       });
//     });
//   });
// });

/**
 * FEATURE: Redirection
 * VERBS: [GET]
 * METHODS: 
 * DESCRIPTION:
 * Checks wether the W/ETag (Weak Entity Tag) is correctly updated
 * 
 * SOURCES:
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ETag
 * 
 */