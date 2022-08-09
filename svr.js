import express from 'express';
import * as deviceHelpers from './api/deviceHelpers.js';

const app = express();

app.use(express.static('client', { extensions: ['html'] }));

// wrap async function for express.js error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

// Show all devices
async function getAllLiveDevices(req, res) {
  res.json(await deviceHelpers.listAll(req));
}

// Change device state
async function setDeviceByStatus(req, res) {
  const status = req.params.status;
  const id = req.params.id;

  if (false) { //TODO add check logic here to see if ID exists
    res.status(404).send('No match for that ID.');
    return;
  }

  res.status(200).send('Changed device: "{id}" to status: "{status}"');
}

// Setup listener for switch
app.put('/live/relay/:id/:status', asyncWrap(setDeviceByStatus));
app.get('/live', asyncWrap(getAllLiveDevices));

app.listen(8080);
