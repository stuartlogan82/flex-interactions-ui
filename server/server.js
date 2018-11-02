require('dotenv').load();
const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const aws_gateway_api_key = process.env.aws_api_key;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("server is up!");
});