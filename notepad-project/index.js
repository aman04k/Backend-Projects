const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Ensure 'files' directory exists
const filesDir = path.join(__dirname, "files");
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir, { recursive: true });
}

// Home route - List all files
app.get("/", (req, res) => {
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Error loading files");
    }
    res.render("index", { files });
  });
});

// Create file
app.post("/create", (req, res) => {
  const { title, detail } = req.body;

  if (!title || !detail) {
    return res.status(400).send("Title and detail are required");
  }

  // Sanitize filename: Remove invalid characters
  const fileName = title.replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "_") + ".txt";
  const filePath = path.join(filesDir, fileName);

  fs.writeFile(filePath, detail, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return res.status(500).send("Error creating file");
    }
    res.redirect("/");
  });
});

// View file content
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(filesDir, req.params.filename);

  fs.readFile(filePath, "utf-8", (err, filedata) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(404).send("File not found");
    }
    res.render("show", { filename: req.params.filename, filedata });
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
