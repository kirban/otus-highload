require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 8000;
const server = express();

server.listen(PORT, () => {
  console.info(`Server is listening on port ${PORT}`);
});
