import express from "express";
import { authAdmin,logoutAdmin,getAllUsers } from "../Controllers/adminController.js";


const router = express.Router();


router.post('/login',authAdmin)
router.post('/logout',logoutAdmin)
router.get('/adminHome',getAllUsers)


 

export default router;