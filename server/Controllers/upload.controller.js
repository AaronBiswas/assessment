import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import Agent from "../Models/agent.model.js";

const uploadDir = path.resolve("uploads");

export const Upload = async (req, res) => {
  const admin = req.user;
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const filePath = path.join(uploadDir, req.file.filename);
    const fileExtension = path.extname(req.file.originalname).toLowerCase();

    // Check if file exists and is readable
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        success: false,
        message: "Uploaded file not found",
      });
    }

    // Check file size (optional - prevent very large files)
    const stats = fs.statSync(filePath);
    if (stats.size === 0) {
      return res.status(400).json({
        success: false,
        message: "Uploaded file is empty",
      });
    }

    let data = [];

    // Handle different file types with enhanced error handling
    if (fileExtension === ".csv") {
      data = parseCSVFile(filePath);
    } else if (fileExtension === ".xlsx" || fileExtension === ".xls") {
      data = parseExcelFile(filePath);
    } else {
      return res.status(400).json({
        success: false,
        message: "Unsupported file format. Please upload CSV or XLSX files.",
      });
    }

    // Validate data structure
    if (!Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: "Invalid data format in file",
      });
    }

    // Filter out empty rows
    const validData = data.filter(
      (row) =>
        row &&
        typeof row === "object" &&
        Object.values(row).some((value) => value && String(value).trim() !== "")
    );

    if (validData.length === 0) {
      return res.status(400).json({
        success: false,
        message:
          "No valid data found in the file. Please check the file format and content.",
      });
    }

    const agents = await Agent.find({ admin: admin._id });

    if (agents.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No agents found for this admin",
      });
    }

    const totalItems = validData.length;
    const baseCount = Math.floor(totalItems / agents.length);
    const remainder = totalItems % agents.length;

    let index = 0;
    const updates = [];

    // for (let i = 0; i < agents.length; i++) {
    //   const count = baseCount + (i < remainder ? 1 : 0);
    //   const assignedData = validData.slice(index, index + count);

    //   // Store as objects with metadata
    //   const tasks = assignedData.map((item) =>
    //     JSON.stringify({
    //       data: item,
    //       status: "pending",
    //       assignedAt: new Date(),
    //       fileType: fileExtension,
    //     })
    //   );

    //   if (tasks.length > 0) {
    //     updates.push(
    //       Agent.findByIdAndUpdate(
    //         agents[i]._id,
    //         { $push: { tasks: { $each: tasks } } },
    //         { new: true }
    //       )
    //     );
    //   }

    //   index += count;
    // }

    for (let i = 0; i < agents.length; i++) {
      const count = baseCount + (i < remainder ? 1 : 0);
      const assignedData = validData.slice(index, index + count);

      // Store as objects with metadata
      const tasks = assignedData.map((item) =>
        JSON.stringify({
          data: item,
          status: "pending",
          assignedAt: new Date(),
          fileType: fileExtension,
        })
      );

      // Use $set to override tasks instead of $push
      updates.push(
        Agent.findByIdAndUpdate(
          agents[i]._id,
          { $set: { tasks: tasks } },
          { new: true }
        )
      );

      index += count;
    }

    // Execute all updates concurrently
    await Promise.all(updates);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.status(200).json({
      success: true,
      filename: req.file.filename,
      fileType: fileExtension,
      distributedCount: totalItems,
      agentsUpdated: agents.length,
      dataPreview: validData.slice(0, 3), // Show first 3 rows as preview
      headers: validData.length > 0 ? Object.keys(validData[0]) : [],
    });
  } catch (error) {
    console.error("Upload error:", error);

    // Clean up file if it exists
    if (req.file && req.file.filename) {
      const filePath = path.join(uploadDir, req.file.filename);
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (cleanupError) {
        console.error("File cleanup error:", cleanupError);
      }
    }

    // Provide more specific error messages
    // let errorMessage = "File processing failed";

    // if (error.message.includes("Invalid file format") ||
    //     error.message.includes("corrupted") ||
    //     error.message.includes("encoding")) {
    //   errorMessage = "File appears to be corrupted or in an unsupported format. Please ensure you're uploading a valid CSV or Excel file.";
    // } else if (error.message.includes("header") || error.message.includes("row")) {
    //   errorMessage = "File format error. Please ensure your file has proper headers and data rows.";
    // }

    // res.status(500).json({
    //   success: false,
    //   error: errorMessage,
    //   details: process.env.NODE_ENV === 'development' ? error.message : undefined
    // });
  }
};

// Enhanced CSV parser with better encoding detection and error handling
function parseCSVFile(filePath) {
  try {
    // Try different encodings
    let fileContent;

    try {
      // First try UTF-8
      fileContent = fs.readFileSync(filePath, "utf-8");
    } catch (err) {
      try {
        // Try latin1 encoding
        fileContent = fs.readFileSync(filePath, "latin1");
      } catch (err2) {
        // Try binary and convert
        const buffer = fs.readFileSync(filePath);
        fileContent = buffer.toString("utf-8");
      }
    }

    // Check if content looks like binary/corrupted data
    if (fileContent.includes("\x00") || fileContent.match(/[\x80-\xFF]{10,}/)) {
      throw new Error("File appears to be corrupted or not a valid CSV file");
    }

    // Remove BOM if present
    fileContent = fileContent.replace(/^\uFEFF/, "");

    const lines = fileContent.trim().split(/\r?\n/);

    if (lines.length < 2) {
      throw new Error(
        "CSV file must have at least a header row and one data row"
      );
    }

    const headers = parseCSVLine(lines[0]);

    // Validate headers
    if (headers.length === 0 || headers.every((h) => !h || h.trim() === "")) {
      throw new Error("CSV file has invalid or empty headers");
    }

    const data = [];

    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "") continue; // Skip empty lines

      try {
        const values = parseCSVLine(lines[i]);
        const obj = {};

        headers.forEach((header, idx) => {
          const cleanHeader = header.trim();
          obj[cleanHeader] = values[idx] ? values[idx].trim() : "";
        });

        data.push(obj);
      } catch (lineError) {
        console.warn(
          `Warning: Skipped line ${i + 1} due to parsing error:`,
          lineError.message
        );
      }
    }

    return data;
  } catch (error) {
    throw new Error(`CSV parsing failed: ${error.message}`);
  }
}

// Enhanced Excel parser with better error handling
function parseExcelFile(filePath) {
  try {
    const workbook = XLSX.readFile(filePath, {
      type: "file",
      codepage: 65001, // UTF-8
    });

    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      throw new Error("Excel file contains no worksheets");
    }

    const sheetName = workbook.SheetNames[0]; // Use first sheet
    const worksheet = workbook.Sheets[sheetName];

    if (!worksheet) {
      throw new Error("Cannot read worksheet data");
    }

    // Convert to JSON with header row as keys
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1, // Get raw data first
      defval: "", // Default value for empty cells
      blankrows: false, // Skip blank rows
    });

    if (jsonData.length < 2) {
      throw new Error(
        "Excel file must have at least a header row and one data row"
      );
    }

    const headers = jsonData[0]
      .map((header) => (header ? String(header).trim() : ""))
      .filter((h) => h !== "");

    if (headers.length === 0) {
      throw new Error("Excel file has invalid or empty headers");
    }

    const data = [];

    for (let i = 1; i < jsonData.length; i++) {
      const row = jsonData[i];
      if (!row || row.every((cell) => !cell || String(cell).trim() === "")) {
        continue; // Skip empty rows
      }

      const obj = {};
      headers.forEach((header, idx) => {
        obj[header] = row[idx] ? String(row[idx]).trim() : "";
      });

      data.push(obj);
    }

    return data;
  } catch (error) {
    throw new Error(`Excel parsing failed: ${error.message}`);
  }
}

// Enhanced CSV line parser with better quote handling
function parseCSVLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  let i = 0;

  while (i < line.length) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped quote
        current += '"';
        i += 2; // Skip both quotes
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
        i++;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current);
      current = "";
      i++;
    } else {
      current += char;
      i++;
    }
  }

  // Add the last field
  result.push(current);

  return result;
}
