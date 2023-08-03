import asyncHandler from "express-async-handler";
import Admin from "../Model/adminModel.js";
import generateToken from "../utils/generateToken.js";
import { fetchAllUsers } from "../Helpers/adminHelpers.js";

// admin auth
const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    generateToken(res,admin._id);


    res.status(201).json({
      _id: admin._id,
      name: "Admin",
      email: admin.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Logout admin
const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Admin Logged Out" });
});

const getAllUsers = asyncHandler(async (req,res) => {
  fetchAllUsers()
    .then((users) => {
      res.status(200).json({users}); 
    })
    .catch((error) => {
      console.log(error);
    });
})

export { authAdmin, logoutAdmin, getAllUsers };
