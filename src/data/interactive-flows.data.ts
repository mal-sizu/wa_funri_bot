// src/data/interactive-flows.data.ts

interface InteractiveFlowPayload {
    headerText: string;
    bodyText: string;
    footerText: string;
    flowId: string;
    flowCta: string;
    screenId: string;
    // You can add a field for initial data for the flow
    initialData?: Record<string, any>;
  }
  
  // Define your interactive flow templates here
  const flows: Record<string, InteractiveFlowPayload> = {
    userRegistration: {
      headerText: "Welcome!",
      bodyText: "Please tap below to complete your registration.",
      footerText: "Your information is secure.",
      flowId: "YOUR_REGISTRATION_FLOW_ID", // Replace with your actual Flow ID
      flowCta: "🚀 Register Now",
      screenId: "SCREEN_WELCOME" // The starting screen of your flow
    },
    feedbackForm: {
      headerText: "We Value Your Feedback",
      bodyText: "Let us know how we're doing by filling out our quick feedback form.",
      footerText: "It only takes a minute!",
      flowId: "YOUR_FEEDBACK_FLOW_ID", // Replace with your actual Flow ID
      flowCta: "✍️ Give Feedback",
      screenId: "SCREEN_FEEDBACK_START"
    }
    // Add more flow configurations as needed
  };
  
  /**
   * Gets a predefined interactive flow configuration by its ID.
   * @param flowId The ID of the flow configuration (e.g., 'userRegistration').
   * @returns An InteractiveFlowPayload object or null if not found.
   */
  export function getFlowPayload(flowId: string): InteractiveFlowPayload | null {
    return flows[flowId] || null;
  }
  