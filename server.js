const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname, {index: 'index.html', extensions: ['html']}));
app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
})