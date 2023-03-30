const express = require('express');

const app = express();
app.listen(8080, () => {
  console.log(1);
});

app.get('/nice', (req, res) => {
  res.send('nice');
});
