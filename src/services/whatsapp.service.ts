// src/services/whatsapp.service.ts

import axios from 'axios';
import dotenv from 'dotenv';
import { getListPayload } from '../data/interactive-lists.data';
import { getImageBundle } from '../data/image-bundles.data';
import { getReplyButtonsPayload } from '../data/interactive-reply-buttons.data';
import { getFlowPayload } from '../data/interactive-flows.data';
import { getTextMessage } from '../data/text-messages.data';

dotenv.config();

const ACCESS_TOKEN = process.env['ACCESS_TOKEN'];
const PHONE_NUMBER_ID = process.env['PHONE_NUMBER_ID'];
const API_VERSION = 'v23.0';

/**
 * Sends a WhatsApp template message.
 * @param to - The recipient's phone number.
 * @param templateName - The name of the template to send.
 */
export async function sendTemplateMessage(to: string, templateName: string): Promise<void> {
  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    throw new Error("Missing WhatsApp credentials in environment variables");
  }

  console.log(`Sending '${templateName}' template to: ${to}`);

  try {
    await axios({
      url: `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: {
            code: 'en'
          }
        }
      }
    });

    console.log('Template message sent successfully!');
  } catch (error: any) {
    console.error('Error sending template message:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Message:', error.message);
    }
    // Re-throw the error to be handled by the controller
    throw error;
  }
}

/**
 * Sends a pre-defined interactive list by its ID.
 * @param to The recipient's phone number.
 * @param listId The ID of the list to send (e.g., 'mainMenu').
 */
export async function sendInteractiveList(to: string, listId: 'mainMenu' | 'productCategories'): Promise<void> {
  console.log(`Sending interactive list '${listId}' to: ${to}`);

  // Fix: Update type to match getListPayload's expected argument
  // If getListPayload expects 'mainMenu' | 'wardrobeMenu', we need to map 'productCategories' to 'wardrobeMenu'
  const mappedListId = listId === 'productCategories' ? 'wardrobeMenu' : listId;
  const payload = getListPayload(mappedListId as 'mainMenu' | 'wardrobeMenu', to);

  if (!payload) {
    console.error(`List with ID '${listId}' not found.`);
    return;
  }

  try {
    await axios({
      url: `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      data: payload,
    });
    console.log(`Interactive list '${listId}' sent successfully!`);
  } catch (error: any) {
    console.error(`Error sending interactive list '${listId}':`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    throw error;
  }
}

/**
 * Sends a single image message.
 * @param to The recipient's phone number.
 * @param url The public URL of the image.
 * @param caption The text to send with the image.
 */
async function sendImage(to: string, url: string, caption: string): Promise<void> {
  try {
    await axios({
      url: `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      method: 'POST',
      headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        type: 'image',
        image: {
          link: url,
          caption: caption,
        },
      },
    });
  } catch (error: any) {
    console.error(`Error sending image to ${to}:`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
  }
}

/**
 * Sends a pre-defined bundle of images by looping through them.
 * @param to The recipient's phone number.
 * @param bundleId The ID of the image bundle to send.
 */
export async function sendImageBundle(to: string, bundleId: string): Promise<void> {
  console.log(`Sending image bundle '${bundleId}' to: ${to}`);
  const bundle = getImageBundle(bundleId);

  if (!bundle) {
    console.error(`Image bundle '${bundleId}' not found.`);
    return;
  }

  // Loop through the array and send each image one by one
  for (const image of bundle) {
    await sendImage(to, image.url, image.caption);
    // Optional: Add a small delay to ensure images arrive in order
    await new Promise(resolve => setTimeout(resolve, 50)); // Delay 50ms feel free to chnage when domain bought !
  }
}

/**
 * Sends a simple text message.
 * @param to The recipient's phone number.
 * @param text The text to send.
 */
export async function sendTextMessage(to: string, text: string): Promise<void> {
  console.log(`Sending text message to: ${to}`);
  try {
    await axios({
      url: `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: {
          body: text
        }
      }
    });
    console.log('Text message sent successfully!');
  } catch (error: any) {
    console.error('Error sending text message:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    throw error;
  }
}

/**
 * Sends a predefined text message by its ID.
 * @param to The recipient's phone number.
 * @param messageId The ID of the message from text-messages.data.ts.
 */
export async function sendPredefinedTextMessage(to: string, messageId: string): Promise<void> {
  console.log(`Sending predefined text message '${messageId}' to: ${to}`);
  const messagePayload = getTextMessage(messageId);

  if (!messagePayload) {
    throw new Error(`Text message with ID '${messageId}' not found.`);
  }

  // Use the original function to send the message body
  await sendTextMessage(to, messagePayload.body);
}

/**
 * Sends a predefined set of interactive reply buttons.
 * @param to The recipient's phone number.
 * @param setId The ID of the button set (e.g., 'confirmation').
 */
export async function sendInteractiveReplyButtons(to: string, setId: string): Promise<void> {
  console.log(`Sending interactive reply button set '${setId}' to: ${to}`);
  
  // Get the predefined button payload
  const payloadData = getReplyButtonsPayload(setId);

  if (!payloadData) {
    throw new Error(`Button set with ID '${setId}' not found.`);
  }

  const { bodyText, buttons } = payloadData;

  const formattedButtons = buttons.map(btn => ({
    type: 'reply',
    reply: {
      id: btn.id,
      title: btn.title
    }
  }));

  try {
    await axios({
      url: `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'button',
          body: {
            text: bodyText
          },
          action: {
            buttons: formattedButtons
          }
        }
      }
    });
    console.log(`Interactive reply buttons for set '${setId}' sent successfully!`);
  } catch (error: any) {
    console.error(`Error sending interactive reply buttons for set '${setId}':`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    throw error;
  }
}

/**
 * Sends a predefined interactive Flow message.
 * @param to The recipient's phone number.
 * @param flowConfigId The ID of the flow configuration (e.g., 'userRegistration').
 */
export async function sendInteractiveFlow(to: string, flowConfigId: string): Promise<void> {
  console.log(`Sending interactive Flow '${flowConfigId}' to: ${to}`);

  // Get the predefined flow payload
  const flowConfig = getFlowPayload(flowConfigId);

  if (!flowConfig) {
    throw new Error(`Flow configuration with ID '${flowConfigId}' not found.`);
  }

  const { headerText, bodyText, footerText, flowId, flowCta, screenId, initialData } = flowConfig;

  try {
    await axios({
      url: `https://graph.facebook.com/${API_VERSION}/${PHONE_NUMBER_ID}/messages`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        type: 'interactive',
        interactive: {
          type: 'flow',
          header: { type: 'text', text: headerText },
          body: { text: bodyText },
          footer: { text: footerText },
          action: {
            name: 'flow',
            parameters: {
              flow_message_version: '3',
              flow_token: `flow_token_${Date.now()}`, // Unique token per message
              flow_id: flowId,
              flow_cta: flowCta,
              flow_action: 'navigate',
              flow_action_payload: {
                screen: screenId,
                data: initialData || {} // Pass initial data if it exists
              }
            }
          }
        }
      }
    });
    console.log(`Interactive Flow '${flowConfigId}' sent successfully!`);
  } catch (error: any) {
    console.error(`Error sending interactive Flow '${flowConfigId}':`, error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    throw error;
  }
}