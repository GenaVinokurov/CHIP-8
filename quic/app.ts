const quic = require("node-quic");

const port: number = 1234;
const address: string = "localhost";

quic
  .listen(port, address)
  .then(() => {
    console.log("QUIC server started on", address, "port", port);
  })
  .onError((error: Error) => {
    console.error("Error in QUIC server:", error);
  })
  .onData((data: any, stream: any) => {
    console.log("Received data:", data);

    const origin = stream.remoteAddress;
    const allowedOrigin = "http://localhost:3000";
    stream.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    if (origin === allowedOrigin) {
      stream.write("CORS Preflight Response", (error: Error) => {
        if (error) {
          console.error("Error sending response:", error);
        } else {
          console.log("CORS Preflight Response sent.");
        }
      });
    }
    stream.writeHead(200, {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET,POST",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    const responseMessage = `Server received: ${data}`;
    stream.write(responseMessage, (error: Error) => {
      if (error) {
        console.error("Error sending response:", error);
      } else {
        console.log("Response sent:", responseMessage);
      }
    });
  });
