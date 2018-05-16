'use strict';

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const cowsay = require('cowsay');

const PORT = process.env.PORT || 3000;

function bodyParser(req, cb){
  if(req.method === 'POST'){
    let body = '';
    req.on('data', (buf)=> {
      body += buf.toString();
    });
    req.on('end',() => cb(null, body));
    req.on('error', (err) => cb(err));
  }
  else{
    cb(null,'{}');
  }
}