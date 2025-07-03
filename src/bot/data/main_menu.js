/**
 * WhatsApp Interactive List Message for a Furniture Store's Main Menu.
 *
 * This constant holds the JSON structure for an interactive list message.
 * You can send this object as the body of a POST request to the
 * WhatsApp Cloud API's /messages endpoint to send the menu to a user.
 *
 * The `id` in each row is the unique value that will be sent back to your
 * webhook when a user makes a selection.
 */

const furnitureMenuMessage = {
    "interactive": {
        "type": "list",
        "header": {
            "type": "text",
            "text": "Welcome to The Furniture House! 🛋️"
        },
        "body": {
            "text": "We're delighted to help you find the perfect piece for your home. \n\nPlease select a category below to start browsing our collection."
        },
        "footer": {
            "text": "Quality Furniture, Unbeatable Prices."
        },
        "action": {
            "button": "Browse Categories",
            "sections": [
                {
                    "title": "FURNITURE CATEGORIES",
                    "rows": [
                        {
                            "id": "cat_sofa_sets",
                            "title": "Sofa Sets",
                            "description": "Comfortable & stylish sofas for your living room."
                        },
                        {
                            "id": "cat_beds",
                            "title": "Beds",
                            "description": "Dreamy beds for a perfect night's sleep."
                        },
                        {
                            "id": "cat_cupboards",
                            "title": "Cupboards",
                            "description": "Spacious and elegant storage solutions."
                        },
                        {
                            "id": "cat_tables",
                            "title": "Tables",
                            "description": "Dining, coffee, and study tables for every need."
                        },
                        {
                            "id": "cat_racks_shelves",
                            "title": "Racks & Shelves",
                            "description": "Organize your space with our versatile racks."
                        },
                        {
                            "id": "cat_others",
                            "title": "Others",
                            "description": "Explore chairs, decor, and more unique items."
                        }
                    ]
                }
            ]
        }
    }
};

// To use this, you would typically stringify it and send it in an API request.
// For example:
// const requestBody = JSON.stringify({
//     messaging_product: "whatsapp",
//     to: "RECIPIENT_PHONE_NUMBER",
//     type: "interactive",
//     ...furnitureMenuMessage
// });
//
// console.log(requestBody);

export { furnitureMenuMessage };