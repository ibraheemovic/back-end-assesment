const express = require("express");
const cors = require("cors");
const ctrl = require(`./controller.js`);
const app = express();
const path = require(`path`);

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.use(express.static(path.join(__dirname, `../client`)));

app.get(`/`, (req, res) => {
  res.sendFile(path.join(__dirname, `../client/index.html`));
});

const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: "12a4b99e26f14aa5bb778bfa6273715d",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!"), app.use(rollbar.errorHandler());

app.get(`/formError`, (req, res) => {
  rollbar.warning(`Improper input`);
  res.sendStatus(400);
});
app.post(`/deleteError`, (req, res) => {
  let { error } = req.params;
  rollbar.critical(error);
  res.sendStatus(400);
});
app.get("/api/compliment", ctrl.getCompliment);
app.get(`/api/fortune`, ctrl.getAllFortune);
app.get(`/api/fortune/random`, ctrl.getFortune);
app.post(`/api/fortune`, ctrl.addFortune);
app.put(`/api/fortune`, ctrl.addFortune);
app.delete(`/api/fortune/:user`, ctrl.deleteUser);

let port = process.env.PORT || 4000;

app.listen(port, () =>
  console.log(`Have you boys seen my Goyard port on ${port}`)
);
