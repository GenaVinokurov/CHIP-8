const quic = require("node-quic");

const port: number = 1234;
const address: string = "127.0.0.1"; // default

quic
  .listen(port, address)
  .then(() => {
    console.log("QUIC server started on", address, "port", port);
  })
  .onError((error: Error) => {
    console.error("Error in QUIC server:", error);
  })
  .onData((data: any, stream: any, buffer: Buffer) => {
    console.log("Received data:", data);
  });
