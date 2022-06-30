var http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
const helmet = require('helmet');

const produtosServiceProxy = httpProxy('http://localhost:3002');
const pessoasServiceProxy = httpProxy('http://localhost:3003');

app.all('/produtos(/*)?', produtosServiceProxy);
app.all('/pessoas(/*)?',  pessoasServiceProxy);


app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var server = http.createServer(app);
server.listen(process.env.PORT || 3000);