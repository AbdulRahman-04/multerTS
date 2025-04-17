import express, { Request, Response } from "express";
import multer from "multer";

const app = express();
const PORT = 5017;

// ✅ Multer Config - Files will be stored in "uploads/" folder
const upload = multer({ dest: "uploads/" });

// ✅ Single file upload route
app.post("/upload", upload.single("file"), (req: Request, res: Response): void => {
  console.log("📂 File received:", req.file); // ✅ Debugging log

  if (!req.file) {
    res.status(400).json({ msg: "❌ No file uploaded! Please select a file." });
    return;
  }

  console.log("File uploaded✅");
  
  res.status(200).json({
    msg: "✅ File uploaded successfully!",
    fileInfo: {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
    },
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
