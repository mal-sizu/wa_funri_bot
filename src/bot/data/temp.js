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

async function sendImageMessage() {

    const cap = `
    Melamine 2 Door Wardrobes

    Measurements :
    - Heigth | උස : 72"
    - Width | පළල : 32"
    - Depth | ගැඹුර : 16"
    - Thickness | ඝනකම : 12mm

    Available Colors | වර්ණ ප්‍රභේද :
    - Teak Brown
    - American Ash
    - White
    - Black

    ----------------------------------------------------------------------------

    ▫දොර 2 මෙලමයින් අල්මාරිය | 2 door melamine wardrobe
        Item code : #w2hc
        23,500/=

    ▫දොර 2 මෙලමයින් කණ්ණාඩි අල්මාරිය | 2 door melamine wardrobe with mirror
        Item code : #w2hcm
        24,500/=

    ▫දොර 2 මෙලමයින් ලාච්චු අල්මාරිය | 2 door melamine wardrobe with drawers
        Item code : #w2d
        24,500/=

    ▫දොර 2 මෙලමයින් ලාච්චු කණ්ණාඩි අල්මාරිය | 2 door melamine wardrobe with drawers & mirror
        Item code : #w2dm
        25,500/=`

    const response = await axios ({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: RECIEVER,
            type: 'image',
            image:{
                link: 'https://github.com/mal-sizu/wa_funri_bot/blob/master/assets/w2/w2d/WhatsApp%20Image%202025-07-02%20at%2020.09.06_73e1d7b3.jpg?raw=true',
                caption: cap
            }
        })
    })
}

async function sendInteractiveMessage() {
    const response = await axios({
        url: `https://graph.facebook.com/v22.0/626451293893325/messages`,
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: "individual",
            to: RECIEVER,
            type: 'interactive',
            interactive: {
                type: 'list',
                header: {
                  type: 'text',
                  text: '🛋️ Welcome to Your Furniture Shop! 🛋️',
                },
                body: {
                  text: "Hello! We're delighted to help you find the perfect furniture for your space. Please select a category below to start Browse.",
                },
                footer: {
                  text: 'Your Home, Your Style',
                },
                action: {
                  button: 'Browse Categories',
                  sections: [
                    {
                      title: 'SHOP BY ROOM',
                      rows: [
                        {
                          id: 'shop_living_room',
                          title: 'Living Room',
                          description: 'Sofas, coffee tables, TV units, and more',
                        },
                        {
                          id: 'shop_bedroom',
                          title: 'Bedroom',
                          description: 'Beds, wardrobes, dressers, and nightstands',
                        },
                        {
                          id: 'shop_dining_room',
                          title: 'Dining Room',
                          description: 'Dining tables, chairs, and sideboards',
                        },
                        {
                          id: 'shop_office',
                          title: 'Office',
                          description: 'Desks, office chairs, and storage solutions',
                        },
                      ],
                    },
                    {
                      title: 'SHOP BY FURNITURE TYPE',
                      rows: [
                        {
                          id: 'type_seating',
                          title: 'Seating',
                          description: 'Explore our collection of sofas, armchairs, and recliners',
                        },
                        {
                          id: 'type_tables',
                          title: 'Tables',
                          description: 'Find the perfect dining, coffee, or side table',
                        },
                        {
                          id: 'type_storage',
                          title: 'Storage',
                          description: 'Shelves, cabinets, and wardrobes for every need',
                        },
                      ],
                    },
                    {
                      title: 'MORE OPTIONS',
                      rows: [
                        {
                          id: 'view_offers',
                          title: 'Special Offers',
                          description: 'View our latest deals and discounts',
                        },
                        {
                          id: 'contact_expert',
                          title: 'Talk to an Expert',
                          description: 'Get personalized advice from our design team',
                        },
                      ],
                    },
                  ],
                },
            },
        })
    })
    console.log(response.data);
}

SendHelloTemplate();
sendTextMessage();
sendImageMessage();
sendInteractiveMessage();

