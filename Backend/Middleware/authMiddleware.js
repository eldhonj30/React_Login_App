import  jwt  from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../Model/userModel.js";
import Admin from "../Model/adminModel.js"

 
const protect = asyncHandler(async (req,res,next) => {
  let token;

  token = req.cookies.jwt;

  if(token) {
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET);
     
      req.user = await User.findById(decoded.id).select('-password');
      
      next()
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token')
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token')
  }
})


const adminProtect = asyncHandler(async (req,res,next) => {
  let token;

  token = req.cookies.token; 
  if(token) {
    try {
      const decoded = jwt.verify(token,process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select('-password');
      next()
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token')
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token') 
  }
}) 
 


export { protect, adminProtect }
