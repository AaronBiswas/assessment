import express from 'express';
import { createAdmin, login } from '../Controllers/admin.controller.js';

const router=express.Router();



router.post("/login",login)
router.post("/create",createAdmin)





export default router;