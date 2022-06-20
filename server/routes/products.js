const express = require("express");
const router = express.Router();
const {
  authenticationMiddleware,
  authorizeRoles,
} = require("../middleware/auth");

const { getAllProduct } = require("../controllers/products");

const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/crudProduct");

router
  .route("/")
  .get(getAllProduct)
  .post([authenticationMiddleware, authorizeRoles("admin")], createProduct);
router
  .route("/:id")
  .get(getProduct)
  .delete([authenticationMiddleware, authorizeRoles("admin")], deleteProduct)
  .patch([authenticationMiddleware, authorizeRoles("admin")], updateProduct);

module.exports = router;
