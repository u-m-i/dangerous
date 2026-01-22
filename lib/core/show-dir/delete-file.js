'use strict';

const fs = require('fs');

module.exports = function deleteFile(path){

  const exists = fs.accessSync(path);

  if(!exists){
    throw new Error(`File at path: ${path} does not exist`);
  }

  fs.unlinkSync(path);
}

/**
 *  Deletings a file (https://www.w3schools.com/nodejs/nodejs_filesystem.asp)
 * 
 */
