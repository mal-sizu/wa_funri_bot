// src/services/whatsapp.service.ts

import axios from 'axios';
import dotenv from 'dotenv';
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
 * Sends an interactive list message.
 * @param to - The recipient's phone number.
 */
export async function sendInteractiveList(to: string): Promise<void> {
    console.log(`Sending interactive list to: ${to}`);
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
            type: 'list',
            header: {
              type: 'text',
              text: 'Please Choose',
            },
            body: {
              text: 'Select one of the options below to get started.',
            },
            footer: {
              text: 'Powered by Your Service',
            },
            action: {
              button: 'View Options',
              sections: [
                {
                  title: 'Main Menu',
                  rows: [
                    {
                      id: 'view-products',
                      title: 'View Products',
                      description: 'See our latest product catalog.',
                    },
                    {
                      id: 'talk-to-agent',
                      title: 'Talk to an Agent',
                      description: 'Get help from a customer support representative.',
                    },
                     {
                      id: 'check-order-status',
                      title: 'Check Order Status',
                      description: 'Check the status of your recent order.',
                    },
                  ],
                },
              ],
            },
          },
        }
      });
      console.log('Interactive list sent successfully!');
    } catch (error: any) {
      console.error('Error sending interactive list:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
      throw error;
    }
}