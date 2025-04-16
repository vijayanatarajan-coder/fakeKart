const express = require("express");
const {
  createOrUpdateUser,
  getSingleUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/users", createOrUpdateUser);
router.route("/user/:email").get(getSingleUser);

module.exports = router;
