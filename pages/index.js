import { useEffect, useState } from 'react';
import { client } from '@gradio/client';

export default function Home() {
  const [predictionResult, setPredictionResult] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const app = await client('gnumanth/llama3-chat');
      const result = await app.predict('/chat', [
        'Hello!!', // string in 'parameter_1' Textbox component
        'Hello!!', // string in 'System Prompt' Textbox component
        512, // number (numeric value between 512 and 4096) in 'Max New Tokens' Slider component
        0, // number (numeric value between 0 and 1) in 'Temperature' Slider component
      ]);
      setPredictionResult(result.data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Next.js with Gradio Client</h1>
      <p>Prediction Result:</p>
      <pre>{JSON.stringify(predictionResult, null, 2)}</pre>
    </div>
  );
}
