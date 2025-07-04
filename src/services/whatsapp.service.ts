// src/services/whatsapp.service.ts

import axios from 'axios';
import dotenv from 'dotenv';
import { getListPayload } from '../data/interactive-lists.data';
import { getImageBundle } from '../data/image-bundles.data';
dotenv.config();

const ACCESS_TOKEN = process.env['ACCESS_TOKEN'];
const PHONE_NUMBER_ID = process.env['PHONE_NUMBER_ID'];
const API_VERSION = 'v22.0';

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

  const payload = getListPayload(listId, to);

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
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

