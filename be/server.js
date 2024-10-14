const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173", // 허용할 출처
    methods: ["GET", "POST"], // 허용할 메소드
    credentials: true, // 인증 정보 허용
  })
);

app.use(express.json());

const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

app.get("/status", (req, res) => {
  res.json({ message: "Server is running smoothly" });
});

app.post("/merge", (req, res) => {
  const { filename, totalChunks } = req.body;

  const uploadDir = path.join(__dirname, "uploads", filename);
  const outputPath = path.join(uploadDir, filename);

  // 디렉토리 존재 여부 확인
  if (!fs.existsSync(uploadDir)) {
    return res.status(404).json({ message: "Upload directory not found" });
  }

  const writeStream = fs.createWriteStream(outputPath);

  for (let i = 0; i < totalChunks; i++) {
    const chunkPath = path.join(uploadDir, `${filename}.part${i}`);
    const data = fs.readFileSync(chunkPath);
    writeStream.write(data);
    fs.unlinkSync(chunkPath);
  }

  writeStream.end(() => {
    console.log(`File ${filename} merged Success`);
    res.json({ message: "File merged Success" });
  });
});

app.post("/upload", upload.single("file"), (req, res) => {
  //   {
  //     "fieldname": "file",
  //     "originalname": "IMG_1816 2.MOV.part1043",
  //     "encoding": "7bit",
  //     "mimetype": "application/octet-stream",
  //     "destination": "uploads/",
  //     "filename": "1728909574857.part1043",
  //     "path": "uploads/1728909574857.part1043",
  //     "size": 5242880
  // }
  const { originalname } = req.file;
  const parts = originalname.split(".part");
  const filename = parts[0]; // 파일 이름
  const chunkIndex = parts[1]; // 인덱스

  const uploadDir = path.join(__dirname, "uploads", filename);
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(uploadDir, `${filename}.part${chunkIndex}`),
    req.file.buffer
  );

  res.json({ message: "Chunk uploaded successfully" });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

server.setTimeout(10 * 60 * 1000); // 10분
