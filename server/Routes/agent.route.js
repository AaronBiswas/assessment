import express from 'express';
import { createAgent, getAgents } from '../Controllers/agent.controller.js';

const router = express.Router();


router.post('/new', createAgent);
router.get("/getAgents",getAgents);



export default router;