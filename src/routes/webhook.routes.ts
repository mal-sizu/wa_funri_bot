// src/routes/webhook.routes.ts

import { Router } from 'express';
import { verifyWebhook, handleWebhook } from '../controllers/webhook.controller';

const router = Router();

// Route for webhook verification
router.get('/webhook', verifyWebhook);

// Route for handling incoming messages
router.post('/webhook', handleWebhook);

export default router;