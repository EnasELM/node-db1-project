const express = require("express");
const accountsRouter = require('./accounts/accounts-router')
const server = express();

server.use(express.json());
server.use('/api/accounts', accountsRouter);

server.use('*', (req, res) => {
    // catch all 404 errors middleware
    res.status(404).json({ message: ` not found!` });
  });
  

module.exports = server;
