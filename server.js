const express = require('express');

let app = express();

app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});