// src/data/interactive-reply-buttons.data.ts

interface ReplyButton {
    id: string;
    title: string;
  }
  
  interface InteractiveReplyButtonsPayload {
    bodyText: string;
    buttons: ReplyButton[];
  }
  
  // Define your interactive reply button templates here
  const buttonSets: Record<string, InteractiveReplyButtonsPayload> = {
    confirmation: {
      bodyText: "Are you sure you want to proceed?",
      buttons: [
        { id: 'confirm_yes', title: '✅ Yes' },
        { id: 'confirm_no', title: '❌ No' }
      ]
    },
    mainActions: {
      bodyText: "What would you like to do next?",
      buttons: [
        { id: 'action_browse_products', title: '🛍️ Browse Products' },
        { id: 'action_talk_to_agent', title: '🧑‍💼 Talk to an Agent' },
        { id: 'action_view_offers', title: '🎉 View Offers' }
      ]
    }
    // Add more button sets as needed
  };
  
  /**
   * Gets a predefined set of interactive reply buttons by its ID.
   * @param setId The ID of the button set (e.g., 'confirmation').
   * @returns An InteractiveReplyButtonsPayload object or null if not found.
   */
  export function getReplyButtonsPayload(setId: string): InteractiveReplyButtonsPayload | null {
    return buttonSets[setId] || null;
  }
  