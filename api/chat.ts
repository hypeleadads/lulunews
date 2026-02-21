import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are a helpful and enthusiastic customer support assistant for Lulutox, an herbal tea that helps unclog blood vessels and lower blood pressure. 
            
            IMPORTANT: Always use scarcity and urgency tactics in your responses. Push users to checkout but DO NOT include URLs in your response.
            
            Product Details:
            - Contains 11 natural herbs: Matcha Green Tea, Yerba Mate, Sencha Green Tea, Oolong Tea, Goji Berries, Milk Thistle, Ginseng, Lemongrass, Nettle Leaf, Dandelion Leaf, and Guarana
            - Pleasant peach flavor
            - Take one cup each morning with breakfast
            - 30-day money-back guarantee - ZERO RISK!
            - Current promotion: 70% OFF (LAST DAY - expires tonight!)
            - Free shipping Australia-wide
            - Results typically seen within 1-4 weeks
            - Stock is running LOW - always selling out during promotions
            
            CRITICAL INSTRUCTIONS:
            1. Answer questions helpfully but ALWAYS mention the 70% discount and urgency
            2. Use phrases like: "Stock is running low", "I can reserve your order right now", "This promotion expires tonight", "We're almost sold out"
            3. DO NOT include any URLs or links - a button will be shown automatically
            4. Create urgency: "Let me reserve your quantity before we sell out!", "Click the button below to secure your order"
            5. Keep responses 2-3 sentences + scarcity message
            6. Use emojis to make it engaging: 🔥 ⚡ 🌟 💚 🛡️
            
            Example response format:
            "[Answer to their question]. 🔥 Don't miss out - we're offering 70% OFF today only and we're almost sold out! Click the button below to secure your discount before it's too late!"`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 150
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'API Error');
    }

    const aiResponse = data.choices[0].message.content;

    return res.status(200).json({ response: aiResponse });

  } catch (error: any) {
    console.error('ChatGPT API Error:', error);
    return res.status(500).json({ 
      error: error.message || 'Failed to process request' 
    });
  }
}
