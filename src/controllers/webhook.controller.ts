// src/controllers/webhook.controller.ts

import { Request, Response } from 'express';
import { sendTemplateMessage } from '../services/whatsapp.service';
import dotenv from 'dotenv';
dotenv.config();

const VERIFY_TOKEN = process.env['VERIFY_TOKEN'];

/**
 * Handles webhook verification.
 */
export function verifyWebhook(req: Request, res: Response) {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
}

/**
 * Handles incoming webhook events from WhatsApp.
 */
export async function handleWebhook(req: Request, res: Response) {
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message) {
    const customerPhoneNumber = message.from;

    try {
      // Call the service to send the template message
      await sendTemplateMessage(customerPhoneNumber, 'mark_01');
    } catch (error) {
      // The error is already logged in the service, but you could add more handling here
      console.error("Failed to process webhook event.");
    }
  }

  res.sendStatus(200);
}