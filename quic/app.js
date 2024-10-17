const quic = require("node-quic");

const port = 1234;
const address = "127.0.0.1"; // default

quic
  .listen(port, address)
  .then(() => {
    console.log("im started");
  })
  .onError((error) => {})
  .onData((data, stream, buffer) => {
    console.log("I get", data);
  });
