const bodyParser = require("body-parser");
const { json } = require("body-parser");
const express = require("express");
const Routes = require("./Routes");
const app = express();
app.use("/api", Routes);

// not used -----------
app.use(json());
app.use(bodyParser.urlencoded({ extended: false }));
// not used -----------

const server = app.listen(4500, () => {
  const port = server.address().port;
  console.log("listening at port %s", port);
});
