const Upload = require("../controllers/uploads.controllers");
const { authenticate } = require("../config/jwt.config");

const multer = require("multer");
const imageUpload = multer({ dest: "./uploads/" });

module.exports = (app) => {
  app.post(
    "/api/uploads/file",
    imageUpload.array("images", 10),
    Upload.fileUpload
  );
  app.post("/api/uploads/link", Upload.linkUpload);
};
