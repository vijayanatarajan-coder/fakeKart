const express = require("express");
const {
  verifyGoogleAccessToken,
  checkAdminRole,
} = require("../middlewares/authMiddleware");
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "..", "uploads/product"));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

//admin routes
router
  .route("/admin/products")
  .get(verifyGoogleAccessToken, checkAdminRole, getAdminProducts);

router
  .route("/admin/product/new")
  .post(
    verifyGoogleAccessToken,
    checkAdminRole,
    upload.array("images"),
    newProduct
  );

router
  .route("/admin/product/:id")
  .delete(verifyGoogleAccessToken, checkAdminRole, deleteProduct);

router
  .route("/admin/product/:id")
  .put(
    verifyGoogleAccessToken,
    checkAdminRole,
    upload.array("images"),
    updateProduct
  );

module.exports = router;
