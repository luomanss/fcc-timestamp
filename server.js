const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// add static files
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/:timestamp', (req, res) => {
  const ret = { unix: null, natural: null };

  let datemillis = Date.parse(req.params.timestamp);

  // couldn't parse, assume seconds
  if(Number.isNaN(datemillis) && /[0-9]+/.test(req.params.timestamp)) {
    datemillis = Number(req.params.timestamp) * 1000;
  }

  // check again for number
  if(!Number.isNaN(datemillis)) {
    date = new Date(datemillis);

    ret.unix = Math.floor(date.getTime() / 1000);
    ret.natural = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' , day: 'numeric'});
  }

  res.json(ret);
});

app.all('*', (req, res) => {
  res.status(404).send('Not found!');
});

app.listen(port, () => {
  console.log(`Server started at port ${ port }`)
});
