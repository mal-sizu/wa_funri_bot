export type WhatsAppImageMessage = {
    messaging_product: "whatsapp";
    to: string;
    type: "image";
    image: {
        link: string;
        caption?: string; 
    };
}