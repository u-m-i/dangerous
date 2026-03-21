# Motives

1. Do not update the code to ESM6 unless proveen necessary,
2. Update deprecated libraries and use newer and safer ones,
3. Try to be greedy keeping all the http-server feature.

## Tasks

1. Rewrite all the tests replacing `request` by `fetch`
2. Add the DELETE, PUT command

## Renewal

(Rewrite for README)

## Deprecated libraries

Libraries for production

+-- basic-auth@2.0.1
+-- chalk@4.1.2
+-- corser@2.0.1
+-- he@1.2.0
+-- html-encoding-sniffer@3.0.0
+-- http-proxy@1.18.1
+-- mime@1.6.0
+-- minimatch@10.1.1
+-- minimist@1.2.6
+-- opener@1.5.2
+-- portfinder@1.0.28
+-- secure-compare@3.0.1
+-- union@0.5.0
`-- url-join@4.0.1
brace-expansion → high (ReDoS)
minimatch → high (ReDoS)

Libraries used for testing or developement (not production)

request → critical (SSRF + deprecated)
  tough-cookie → moderate (prototype pollution)
express → high (ReDoS)

path-to-regexp → high (ReDoS)
lodash → moderate (prototype pollution)
qs → moderate (querystring DoS)
form-data → critical (unsafe randomness)
tap

### Resources

*tap*

[Basics](https://node-tap.org/basics/#%22zero-patience-just-get-going%22-guide)
