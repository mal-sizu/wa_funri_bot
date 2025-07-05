// src/controllers/webhook.controller.ts

import { Request, Response } from 'express';
import { sendImageBundle, sendInteractiveList, sendTemplateMessage } from '../services/whatsapp.service';

// The dotenv.config() in your main server file (index.ts) is sufficient.
// We can remove the redundant call here.

const VERIFY_TOKEN = process.env['VERIFY_TOKEN'];

// **FIX: Add a check to ensure the token was loaded.**
// This will cause the server to crash on startup if the token is missing,
// making the problem immediately obvious instead of failing silently.
if (!VERIFY_TOKEN) {
  throw new Error("FATAL_ERROR: VERIFY_TOKEN is not defined in environment variables.");
}

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
    // This part is crucial. If VERIFY_TOKEN is undefined, this will always fail.
    console.error('Webhook verification failed. Make sure VERIFY_TOKEN is set correctly.');
    res.sendStatus(403);
  }
}

/**
 * Handles incoming webhook events from WhatsApp.
 */
export async function handleWebhook(req: Request, res: Response) {
  // ... The rest of your handleWebhook function remains exactly the same ...
  console.log('Received webhook:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);

  const value = req.body.entry?.[0]?.changes?.[0]?.value;

  if (!value || !value.messages) {
    console.log('Webhook was not a message, ignoring.');
    return;
  }

  const message = value.messages[0];

  if (message) {
    const customerPhoneNumber = message.from;

    try {
      if (message.type === 'interactive' && message.interactive.type === 'list_reply') {
        const selectedOptionId = message.interactive.list_reply.id;
        console.log(`User selected: ${selectedOptionId}`);

        switch (selectedOptionId) {
          case 'dressing-tables':
            await sendImageBundle(customerPhoneNumber, 'dressing-tables-cat');
            break;
        
          case 'beds':
            await sendImageBundle(customerPhoneNumber, 'beds-cat');
            break;
        
          case 'room-packages':
            await sendImageBundle(customerPhoneNumber, 'room-packages-cat');
            break;
        
          case 'tables':
            await sendImageBundle(customerPhoneNumber, 'tables');
            break;
        
          case 'racks':
            await sendImageBundle(customerPhoneNumber, 'racks');
            break;
        
          case 'sofa':
            await sendImageBundle(customerPhoneNumber, 'sofa');
            break;
        
          case 'iron-cupboards':
            await sendImageBundle(customerPhoneNumber, 'iron-cupboards');
            break;
        
          case 'other-furniture':
            await sendImageBundle(customerPhoneNumber, 'other-furniture-cat');
            break;
          
          case 'back-to-main':
            // This would take the user back to the main menu
            await sendInteractiveList(customerPhoneNumber, 'mainMenu');
            break;
        
          default:
            console.log(`No action defined for selection: ${selectedOptionId}`);
            break;
        }

      } else if (message.type === 'text') {
        console.log(`Received text from ${customerPhoneNumber}. Triggering welcome flow.`);
        
        await sendTemplateMessage(customerPhoneNumber, 'mark_01');
        // await sendImageBundle(customerPhoneNumber, 'catalogue');
        // await sendImageBundle(customerPhoneNumber, 'cupboards');
        // await sendInteractiveList(customerPhoneNumber, 'mainMenu')
        await sendImageBundle(customerPhoneNumber, 'tables');
      } else {
        console.log(`Ignoring unhandled message type '${message.type}'`);
      }
    } catch (error) {
      console.error("Failed to process webhook event.", error);
    }
  }
}