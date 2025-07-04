import "dotenv/config";              // ← This will read .env into process.env
import bodyParser from "body-parser";
import webhookRoutes from "./routes/webhook.routes";
import { connect } from "@ngrok/ngrok";
import express from "express";

// now your env‑vars will be available
const { ACCESS_TOKEN, PHONE_NUMBER_ID, VERIFY_TOKEN, NGROK_AUTHTOKEN, NGROK_DOMAIN, SERVER_PORT } = process.env;

if (!VERIFY_TOKEN || !ACCESS_TOKEN || !PHONE_NUMBER_ID || !NGROK_AUTHTOKEN) {
  throw new Error('Missing required environment variables');
}

// Set up Express app
const app = express();
const PORT = Number(SERVER_PORT);

app.use(express.json());
app.use(bodyParser.json());
app.use(webhookRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  if ( NGROK_DOMAIN && NGROK_AUTHTOKEN ) {
    try {
      const listener = await connect({
        addr: Number(PORT),
        authtoken: NGROK_AUTHTOKEN,
        proto: 'http',
        domain: NGROK_DOMAIN,
      }) 
      console.log(`ngrok tunnel established at: ${listener.url()}`);
      console.log(`Set this as your WhatsApp webhook URL: ${listener.url()}/webhook`);
    } catch (err) {
      console.error('Error starting ngrok:', err);
    }
  } else {
    console.warn('⚠️  NGROK_AUTHTOKEN missing - ngrok tunnel not started');
  }
})