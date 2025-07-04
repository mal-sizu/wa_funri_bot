// src/controllers/webhook.controller.ts

import { Request, Response } from 'express';
import { sendImageBundle, sendInteractiveList, sendTemplateMessage } from '../services/whatsapp.service';
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
  res.sendStatus(200); // Respond immediately

  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

  if (message) {
    const customerPhoneNumber = message.from;

    try {
      if (message.type === 'interactive' && message.interactive.type === 'list_reply') {
        const selectedOptionId = message.interactive.list_reply.id;
        console.log(`User selected: ${selectedOptionId}`);

        switch (selectedOptionId) {
          case 'view-products':
            await sendInteractiveList(customerPhoneNumber, 'productCategories');
            break;
          
          // --- NEW: Handle category selections ---
          case 'category-electronics':
            await sendImageBundle(customerPhoneNumber, 'electronics');
            break;
          case 'category-clothing':
            await sendImageBundle(customerPhoneNumber, 'clothing');
            break;

          case 'talk-to-agent':
            console.log('TODO: Implement talk to agent flow');
            break;
          case 'back-to-main':
            await sendInteractiveList(customerPhoneNumber, 'mainMenu');
            break;
          default:
            console.log(`No action for selection: ${selectedOptionId}`);
            break;
        }

      } else if (message.type === 'text') {
        const userText = message.text.body.toLowerCase();
        if (userText.includes('hi') || userText.includes('hello') || userText.includes('menu')) {
          await sendTemplateMessage(customerPhoneNumber, 'mark_01');
          await sendInteractiveList(customerPhoneNumber, 'mainMenu');
        }
      }
      // ... (other logic)
    } catch (error) {
      console.error("Failed to process webhook event.", error);
    }
  }
}