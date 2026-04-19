# Motives

1. Do not update the code to ESM6 unless proveen necessary,
2. Update deprecated libraries and use newer and safer ones,
3. Try to be greedy keeping all the http-server feature.

Ideals

4. The HTTP protocol well-used
5. Based on the 4th point, every usage of the server is not tweak, hack, trick or workaround, but an example of proper usage of the protocol.
6. Therefore the fun space, is for every branch with the `fun/` suffix

## Tasks

1. Rewrite all the tests replacing `request` by `fetch`
2. Add the DELETE, PUT command
  2.1 What would the server will receive as a DELETE request?
  2.2 What is the request of the show-dir module?


## Readings


  /**
   * Readings findings:
   *  - under this default function, all happens
   *  - Rendering is done here, is it necessary?
   *  - opts.js have all the options and defaults
   *  - ES6 is not used
   *  - JSDocs is not used
   * 
   * Question remains:
   *  - Continue with the same style while using JSDocs to document?
   *  - Use ES6 with TypeScript?
   */

### Comment styles

``` JS
    // A step before render() is called to gives items additional
    // information so that render() can deliver the best user experience
    // possible.
```
Not adding information about the specifics of the function or giving facilities to the reader.
Instead a very ambiguous description.
Does the function adds informations? yes, but it only modifes compressed files
Why is this 'additional' information delivering a 'best user experience'?

The topics mention does not even redirect to a commit or discussion that handled the topic.

``` JS

    const writeRow = (file) => { // C: Does the file can be destructured?
      // C: Remember -> file = [name, stat, _stat?, renderOptions]

      // render a row given a [name, stat, renderOptions] tuple
      const isDir = file[1].isDirectory && file[1].isDirectory();
      let href = `./${encodeURIComponent(file[0])}`;

      ...
    }
```

The comment, render a row... is not placed correctly, but this is not a agravial, only remember to place it at least, on top or at the side of fragments that are mentioned on the comment.

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
