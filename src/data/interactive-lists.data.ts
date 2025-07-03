// src/data/interactive-lists.data.ts

// Define the structure of an interactive list payload for type safety
interface InteractiveListPayload {
    messaging_product: 'whatsapp';
    to: string;
    type: 'interactive';
    interactive: object;
  }
  
  // Define all your lists here
  const lists = {
    mainMenu: {
      type: 'list',
      header: { type: 'text', text: 'Main Menu' },
      body: { text: 'Please select an option to get started.' },
      action: {
        button: 'View Options',
        sections: [{
          title: 'Main Options',
          rows: [
            { id: 'view-products', title: 'View Products' },
            { id: 'talk-to-agent', title: 'Talk to an Agent' },
          ],
        }],
      },
    },
    productCategories: {
      type: 'list',
      header: { type: 'text', text: 'Product Categories' },
      body: { text: 'Which category would you like to explore?' },
      action: {
        button: 'Categories',
        sections: [{
          title: 'Available Categories',
          rows: [
            { id: 'category-electronics', title: 'Electronics' },
            { id: 'category-clothing', title: 'Clothing' },
            { id: 'back-to-main', title: 'Go Back' },
          ],
        }],
      },
    },
    // Add more lists here as needed...
  };
  
  /**
   * Gets the full payload for a given list ID.
   * @param listId The ID of the list (e.g., 'mainMenu').
   * @param to The recipient's phone number.
   * @returns The complete WhatsApp API payload.
   */
  export function getListPayload(listId: keyof typeof lists, to: string): InteractiveListPayload | null {
    const listInteractiveData = lists[listId];
    if (!listInteractiveData) {
      return null;
    }
    return {
      messaging_product: 'whatsapp',
      to: to,
      type: 'interactive',
      interactive: listInteractiveData,
    };
  }