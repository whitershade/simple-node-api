/*  eslint-disable consistent-return */

import Artists from '../models/artists';


exports.all = (req, res) => {
  Artists.all((err, docs) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};

exports.findById = (req, res) => {
  Artists.findById(req.params.id, (err, doc) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.send(doc);
  });
};

exports.create = (req, res) => {
  const artist = {
    name: req.body.name,
  };
  Artists.create(artist, (err) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.send(artist);
  });
};

exports.update = (req, res) => {
  Artists.update(req.params.id, { name: req.body.name }, (err) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};

exports.delete = (req, res) => {
  Artists.delete(req.params.id, (err) => {
    if (err) {
      global.console.log(err);
      return res.sendStatus(500);
    }
    res.sendStatus(200);
  });
};
