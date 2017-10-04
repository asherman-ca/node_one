// import config, { nodeEnv, logStars } from "./config";
//
// console.log(config, nodeEnv);
// logStars('function');

// import https from 'https';

// https.get('https://www.lynda.com', res => {
//   console.log('Response status code: ', res.statusCode);
//
//   res.on('data', chunk => {
//     console.log(chunk.toString());
//   });
// });
// response object a writable stream, which means we can use it to stream data to the user and that's very powerful

// server.on('request', (req, res) => {
//   res.write('Hello HTTP!\n');
//   setTimeout(() => {
//     res.write('I can stream!\n');
//     res.end();
//   }, 3000);
// });

// this is the server without express

// import http from 'http';
//
// const server = http.createServer((req, res) => {
//   res.write('Hello HTTP!\n');
//   setTimeout(() => {
//     res.write('I can stream!\n');
//     res.end();
//   }, 3000);
// });
//
// server.listen(8080);


// basic route without using express notation:

// server.get('/about.html', (req, res) => {
//   fs.readFile('./about.html', (err, data) => {
//     res.send(data.toString());
//   });
// });
// this can be written as:

import config from './config';
import apiRouter from './api';
import express from 'express';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

const server = express();

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));

// this will look at the views directory for an index file
server.set('view engine', 'ejs');

import serverRender from './serverRender';

server.get('/', (req, res) => {
  serverRender()
    .then(( { initialMarkup, initialData } ) => {
      res.render('index', {
        initialData,
        initialMarkup
      });
    })
    .catch(console.error);
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port ', config.port);
});
