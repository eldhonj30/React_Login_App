import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import generateToken from "../utils/generateToken.js";

// Auth user/set token
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.imagePath
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }

});

// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.trim();
  const password = req.body.password.trim();

  //if password is good
  if (!password || password.length < 6) {
    res.status(400);
    throw new Error("Password must contain 6 characters")
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  res.status(200).json({ message: "Register User" });
});

// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email,
  };
  res.status(200).json({ user });
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.body._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if(req.file){
     user.imagePath = req.file.filename || user.imagePath;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image:updatedUser.imagePath
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
