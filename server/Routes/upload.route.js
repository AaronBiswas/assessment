import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { Upload } from "../Controllers/upload.controller.js";

const router = express.Router();

const uploadDir = path.resolve("uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = [
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  cb(null, allowed.includes(file.mimetype));
};

const upload = multer({ storage, fileFilter });

router.post("/upload", upload.single("file"), Upload);

export default router;
