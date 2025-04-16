const User = require("../models/userModel");
const Admin = require("../models/adminModel");

exports.createOrUpdateUser = async (req, res) => {
  try {
    const {
      id,
      email,
      name,
      picture,
      verified_email,
      family_name,
      given_name,
    } = req.body;

    let role = "User";
    let admin = await Admin.findOne({ email: email });
    if (admin) {
      role = "Admin";
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        googleId: id,
        email,
        name,
        picture,
        verifiedEmail: verified_email,
        familyName: family_name,
        givenName: given_name,
        role,
      });
      await user.save();
      console.log("User profile saved in MongoDB.");
    } else {
      console.log("User already exists in MongoDB.");
    }

    res
      .status(201)
      .json({ message: "User profile stored successfully.", user });
  } catch (error) {
    res.status(500).json({ error: "Failed to store user profile." });
  }
};

//get single user - /api/v1/user/:email
exports.getSingleUser = async (req, res, next) => {
  const email = req.params.email;
  let user = await User.findOne({ email: email });
  res.status(200).json({
    success: true,
    user,
  });
};
