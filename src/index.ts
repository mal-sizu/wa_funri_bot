// index.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { connect } from '@ngrok/ngrok';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env["SERVER_PORT"] || 3000; // Correctly use SERVER_PORT
const VERIFY_TOKEN = process.env["VERIFY_TOKEN"]; // Get token from .env

app.use(bodyParser.json());

// ✔️ ADD THIS NEW ENDPOINT FOR VERIFICATION
// Handles the GET request from Meta for webhook verification
app.get('/webhook', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});

// This is your existing endpoint for receiving messages
app.post('/webhook', async (req: Request, res: Response) => {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Start the Express server
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const listener = await connect({
      addr: Number(PORT),
      authtoken: process.env["NGROK_AUTHTOKEN"] || '',
      proto: 'http',
    });
    console.log(`ngrok tunnel established at: ${listener.url()}`);
    console.log(`Set this as your WhatsApp webhook URL: ${listener.url()}/webhook`);
  } catch (err) {
    console.error('Error starting ngrok:', err);
  }
});