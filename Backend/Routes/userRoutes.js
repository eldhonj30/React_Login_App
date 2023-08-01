import express from 'express';
import multer from "multer";
import path from "path";

const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../Controllers/userController.js";
import { protect } from '../Middleware/authMiddleware.js';

const storage = multer.diskStorage({
  destination:(req,file,cb) => {
    cb(null, 'Backend/Public/Images')
  },
  filename:(req,file,cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
})

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,upload.single('file'),updateUserProfile)


export default router;