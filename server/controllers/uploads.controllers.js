const download = require("image-downloader");
const fs = require("fs");

module.exports = {
  fileUpload: async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles);
  },
  linkUpload: async (req, res) => {
    let { link } = req.body;
    const newName = "image-" + Date.now() + ".jpg";
    await download.image({
      url: link,
      dest: "../../uploads/" + newName,
    });
    res.json(newName);
  },
};
