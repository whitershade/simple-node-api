/*  eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';

import db from './db';

import artistsController from './controllers/artists';


// express application
const app = express();

// parse req.body json
app.use(bodyParser.json());
// parse form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/artists', artistsController.all);

app.get('/artists/:id', artistsController.findById);

app.post('/artists', artistsController.create);

app.put('/artists/:id', artistsController.update);

app.delete('/artists/:id', artistsController.delete);

db.connect('mongodb://localhost:27017/simple-node-api', (err) => {
  if (err) {
    return global.console.log(err);
  }
  app.listen(3012, () => {
    global.console.log('API started!');
  });
});
