import express from 'express';
import { createAgent, getAgents } from '../Controllers/agent.controller.js';
import { Auth } from '../Middleware/Auth.js';
const router = express.Router();


router.post('/new',Auth,createAgent);
router.get("/getAgents",Auth,getAgents);



export default router;