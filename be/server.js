const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // 허용할 출처
    methods: ["GET", "POST"], // 허용할 메소드
    credentials: true, // 인증 정보 허용
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 * 1024 }, // 100GB
});

app.get("/status", (req, res) => {
  res.json({ message: "Server is running smoothly" });
});

app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded successfully", file: req.file });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.setTimeout(10 * 60 * 1000); // 10분
