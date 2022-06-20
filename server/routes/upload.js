const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizeRoles,
} = require("../middleware/auth");
const { uploadImage, upload } = require("../controllers/upload");

router
  .route("/image")
  .post(
    [authenticationMiddleware, authorizeRoles("admin")],
    upload.single("image-file"),
    uploadImage
  );

module.exports = router;
