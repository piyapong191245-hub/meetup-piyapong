import express from 'express';
import cors from 'cors';
import { StreamClient } from '@stream-io/node-sdk';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

const client = new StreamClient(apiKey, apiSecret);

// API แจก Token ให้ฝั่ง Client
app.get('/api/token', (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  const token = client.generateUserToken({ user_id: userId });
  res.json({ token });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});