// src/data/text-messages.data.ts

interface TextMessage {
    body: string;
  }
  
  // Define your standard text message templates here
  const messages: Record<string, TextMessage> = {
    welcome: {
      body: "Hello! Welcome to our service. How can I help you today? 😊"
    },
    goodbye: {
      body: "Thank you for visiting. Have a great day! 👋"
    },
    errorMessage: {
      body: "Sorry, something went wrong. Please try again later."
    }
    // Add more predefined text messages as needed
  };
  
  /**
   * Gets a predefined text message by its ID.
   * @param messageId The ID of the message (e.g., 'welcome').
   * @returns A TextMessage object or null if not found.
   */
  export function getTextMessage(messageId: string): TextMessage | null {
    return messages[messageId] || null;
  }
  