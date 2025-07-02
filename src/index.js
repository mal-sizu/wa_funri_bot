const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios'); 

dotenv.config();

const { ACCESS_TOKEN } = process.env;
const RECIEVER = '94714619371'

async function SendHelloTemplate() {
    const response = await axios({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            messaging_product: 'whatsapp',
            to: RECIEVER,
            type: 'template',
            template: {
                name: 'mark_01',
                language: {
                    code: 'en'
                }
            }
        })
    })

    console.log(response.data); 
}
    

async function sendTextMessage() {
    const response = await axios({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data:JSON.stringify({
            messaging_product: 'whatsapp',
            to: RECIEVER,
            type: 'text',
            text: {
                body: 'Hello, how are you?'
            }
        })
    })
}

// SendHelloTemplate();
sendTextMessage();

