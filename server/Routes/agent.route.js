import express from 'express';
import { createAgent } from '../Controllers/agent.controller.js';

const router = express.Router();


router.post('/new', createAgent)


export default router;