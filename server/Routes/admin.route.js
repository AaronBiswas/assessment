import express from 'express';
import { createAdmin, login, logout, verify } from '../Controllers/admin.controller.js';

const router=express.Router();

router.post("/auth",verify)
router.post("/login",login)
router.post("/create",createAdmin)
router.post("/logout",logout)



export default router;