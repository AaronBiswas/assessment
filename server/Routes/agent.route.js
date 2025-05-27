import express from 'express';
import { createAgent, loginAgent } from '../Controllers/agent.controller.js';

const router = express.Router();


router.post('/new', createAgent)
router.post('/login', loginAgent);



export default router;