import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { Express } from "express";

const app: Express = express();
const port: number = 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// app.post("/upload", (req: Request, res: Response) => {
//   const imgData = req.body.image;
//   if (!imgData) {
//     return res.status(400).json({ message: "No image data provided." });
//   }

//   const base64Data = imgData.replace(/^data:image\/png;base64,/, "");
//   const filePath = path.join(__dirname, "./uploads", `image_${Date.now()}.png`);

//   fs.writeFile(filePath, base64Data, "base64", (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Failed to save image" });
//     }
//     res.status(200).json({
//       message: "Image uploaded successfully",
//       path: `/uploads/${path.basename(filePath)}`,
//     });
//   });
// });

// app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
