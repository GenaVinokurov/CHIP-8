import express, { Request, Response, Express } from "express";
import path from "path";
import cors from "cors";
import http from "http";

const app: Express = express();
const port: number = 3000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.post("/send-to-quic", (req: Request, res: Response) => {
//   const { data } = req.body;

//   const options = {
//     hostname: "localhost",
//     port: 1234,
//     path: "/",
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//     },
//   };

//   const proxy = http.request(options, (quicRes) => {
//     let responseData = "";

//     quicRes.on("data", (chunk) => {
//       responseData += chunk;
//     });

//     quicRes.on("end", () => {
//       res.json({ message: "Response from QUIC server", data: responseData });
//     });
//   });

//   proxy.write(JSON.stringify({ data }));
//   proxy.end();

//   proxy.on("error", (error) => {
//     console.error("Error in proxying to QUIC server:", error);
//     res.status(500).send("Error proxying to QUIC server");
//   });
// });
