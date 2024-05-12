const express = require('express');
const { client } = require("@gradio/client");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/predict', async (req, res) => {
  try {
    const { message } = req.query;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const result = await app.predict("/chat", [
      message,
      "Hello!!", // Assuming this is your system prompt
      512, // Max New Tokens
      0 // Temperature
    ]);

    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
