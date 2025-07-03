import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const { ACCESS_TOKEN } = process.env;


const async function mainMenu () {
    const response = await axios({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            
        })
    })
    return response.data;
}

const async function deliveryFee () {
    const response = await axios({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({})
    })
    return response.data;
}

const async function placeOrder () {
    const response = await axios({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({})
    })
    return response.data;
}

export default async function sendMainContent() {
  
}
