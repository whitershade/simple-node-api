/*  eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';
import { ObjectID } from 'mongodb';

import db from './db';
// express application
const app = express();

// parse req.body json
app.use(bodyParser.json());
// parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello API!');
});

app.get('/artists', (req, res) => {
  db.get().collection('artists').find().toArray((err, docs) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
});

app.post('/artists', (req, res) => {
  const artist = {
    name: req.body.name,
  };

  db.get().collection('artists').insert(artist, (err) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  });
});

app.put('/artists/:id', (req, res) => {
  db.get().collection('artists').updateOne(
    { _id: ObjectID(req.params.id) },
    { name: req.body.name },
    (err) => {
      if (err) {
        global.console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    });
});

app.delete('/artists/:id', (req, res) => {
  db.get().collection('artists').deleteOne(
    { _id: ObjectID(req.params.id) },
    (err) => {
      if (err) {
        global.console.log(err);
        return res.sendStatus(500);
      }
      res.sendStatus(200);
    },
  );
});

app.get('/artists/:id', (req, res) => {
  db.get().collection('artists').findOne({ _id: ObjectID(req.params.id) }, (err, doc) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });
});


db.connect('mongodb://localhost:27017/simple-node-api', (err) => {
  if (err) {
    return global.console.log(err);
  }
  app.listen(3012, () => {
    global.console.log('API started!');
  });
});
