const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(
      null,
      "C:\\Users\\lvp\\OneDrive\\Máy tính\\doanReact\\server\\images"
    );
  },

  filename: function (request, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

const uploadImage = (req, res) => {
  res.send("upload thành công");
};

module.exports = {
  uploadImage,
  upload,
};
