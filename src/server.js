import express from 'express';
import bodyParser from 'body-parser';


const app = express();
// parse req.body json
app.use(bodyParser.json());
// parse form data
app.use(bodyParser.urlencoded({ extended: true }));


let artists = [
  {
    id: 1,
    name: 'Metallica',
  },
  {
    id: 2,
    name: 'Iron Maiden',
  },
  {
    id: 3,
    name: 'Deep Purple',
  },
];

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.get('/artists', (req, res) => {
  res.send(artists);
});

app.post('/artists', (req, res) => {
  const artist = {
    id: Date.now(),
    name: req.body.name,
  };
  artists.push(artist);
  res.send(artist);
});

app.put('/artists/:id', (req, res) => {
  const artist = artists.find(item => item.id === Number(req.params.id));
  artist.name = req.body.name;
  res.sendStatus(200);
});

app.delete('/artists/:id', (req, res) => {
  artists = artists.filter(item => item.id !== Number(req.params.id));
  res.sendStatus(200);
});

app.get('/artists/:id', (req, res) => {
  res.send(artists.find(item => item.id === Number(req.params.id)));
});

app.listen(3012, () => {
  global.console.log('API started!');
});
