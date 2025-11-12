import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { GridFSBucket } from "mongodb";
import crypto from "crypto";
import path from "path";

const router = express.Router();
const conn = mongoose.createConnection(process.env.MONGO_URI);

let gfsBucket;
conn.once("open", () => {
  console.log("✅ Mongo connection open — setting up modern GridFS bucket...");
  gfsBucket = new GridFSBucket(conn.db, { bucketName: "documents" });
});

// --- Multer memory storage ---
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===== Upload Route =====
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!gfsBucket) return res.status(500).json({ error: "GridFS not ready" });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // create a unique filename
    const filename = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${path.extname(req.file.originalname)}`;
    const uploadStream = gfsBucket.openUploadStream(filename, {
      contentType: req.file.mimetype,
    });

    uploadStream.end(req.file.buffer);

    uploadStream.on("finish", (file) => {
      console.log("✅ File uploaded:", file);
      res.json({ success: true, file });
    });

    uploadStream.on("error", (err) => {
      console.error("Upload stream error:", err);
      res.status(500).json({ error: "Upload failed" });
    });
  } catch (err) {
    console.error("Upload route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===== Stream Route =====
router.get("/:filename", async (req, res) => {
  try {
    if (!gfsBucket) return res.status(500).send("GridFS not ready");

    const files = await conn.db
      .collection("documents.files")
      .find({ filename: req.params.filename })
      .toArray();

    if (!files || files.length === 0) {
      return res.status(404).send("File not found");
    }

    const file = files[0];
    res.set({
      "Content-Type": file.contentType || "application/octet-stream",
      "Content-Disposition": `inline; filename="${file.filename}"`,
    });

    const downloadStream = gfsBucket.openDownloadStreamByName(file.filename);
    downloadStream.pipe(res);
  } catch (err) {
    console.error("Stream error:", err);
    res.status(500).send("Server error");
  }
});

export default router;
