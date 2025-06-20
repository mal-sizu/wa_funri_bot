const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const axios = require('axios'); 

dotenv.config();

const { ACCESS_TOKEN } = process.env;

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
            to: '94714619371',
            type: 'template',
            template: {
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
            }
        })
    })

    console.log(response.data);
}
    

SendHelloTemplate();