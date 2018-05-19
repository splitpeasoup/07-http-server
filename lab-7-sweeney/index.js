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

const server = http.createServer((req, res) =>{
  req.url = url.parse(req.url);
  req.url.query = querystring.parse(req.url.query);
  console.log('url', req.url.query);
  if(req.method === 'GET'){
    if(req.url.pathname === '/'){
      res.writeHead(200, {'Content-Type':'text/html'});
      res.write(
        <html>
      <head>
        <title> COWSAY </title>
        </head>
      <body>
        <header>
          <nav>
            <ul>
              <li><a href = "/cowsay">COWSAY</a></li>
              </ul>
            </nav>
          <header>
          <main>
            interactive server
          </main>
        </body>
      </html>
      );
      res.end();
      }
      if(req.url.pathname === '/cowsay'){
        console.log('getting to /cowsay');
        let input;
        if (req.url.query.text){
          input = req.url.query.text;
          console.log('input', input);
        }
        else{
          console.log('null input');
          input = 'Tell me something to say';
        }
        res.writeHead(200,{
          'Content-Type':'text/html'
        });
        res.write(
          <html>
        <head>
          <title> COWSAY</title>
        </head>
        <body>
          <h1> COWSAY </h1>
          <pre>
            ${cowsay.say({text:input})}
          </pre>
        </body>
      </html>
       );
       res.end();

      }
    }
    if(req.method === 'POST'){
      console.log('getting to post');
      if(req.url.pathname === 'api/cowsay'){
        console.log('getting to pathname');
        bodyParser(req, (err,body) => {
          body = JSON.parse(body);
          if(body.text){
            cowsay.say({text:input});
            rew.writeHead(200, {'Content-Type':'application/json'});
            res.write(JSON.stringify({content: cowsay.say({text: input})}));
            res.end();
          }
          else{
            let message = JSON.stringify({
              error : 'invalid request: text query required',
            });
            res.writeHead(400, {'Content-Type':'application/json'});
            res.write(message);
            res.end();
          }
        });
      }
    }
  });

  server.listen(PORT, () =>{
    console.log('listening on port'+PORT);
  });