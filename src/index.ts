// src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import { connect } from '@ngrok/ngrok';
import dotenv from 'dotenv';
import webhookRoutes from './routes/webhook.routes';

// Load environment variables from .env file
dotenv.config();

// Validate critical environment variables on startup
const {
  SERVER_PORT,
  VERIFY_TOKEN,
  ACCESS_TOKEN,
  PHONE_NUMBER_ID,
  NGROK_AUTHTOKEN,
  NGROK_DOMAIN
} = process.env;

if (!VERIFY_TOKEN || !ACCESS_TOKEN || !PHONE_NUMBER_ID) {
  throw new Error("Missing required WhatsApp environment variables");
}

const app = express();
const PORT = SERVER_PORT || 3000;

// Middleware
app.use(bodyParser.json());

// API Routes
app.use(webhookRoutes);

// Start server and ngrok tunnel
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  if (NGROK_AUTHTOKEN && NGROK_DOMAIN) {
    try {
      const listener = await connect({
        addr: Number(PORT),
        authtoken: NGROK_AUTHTOKEN,
        proto: 'http',
        domain: NGROK_DOMAIN,
      });
      console.log(`NGROK tunnel established at: ${listener.url()}`);
      console.log(`Set WhatsApp webhook to: ${listener.url()}/webhook`);
    } catch (err) {
      console.error('Error starting ngrok:', err);
    }
  } else {
    console.warn('⚠️  NGROK_AUTHTOKEN missing - ngrok tunnel not started');
  }
});