import { json } from '@sveltejs/kit';
import Anthropic from '@anthropic-ai/sdk';
import { env } from '$env/dynamic/private';
import { checkPassword, getAnalyticsData } from '$lib/server/analytics-queries.js';

export const prerender = false;

export async function POST({ request }) {
  if (!checkPassword(request)) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const question = body?.question;
  if (!question || typeof question !== 'string') {
    return json({ error: 'Missing question' }, { status: 400 });
  }

  try {
    const data = await getAnalyticsData();
    const anthropic = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: `You are an analytics assistant for a personal portfolio website. You have access to the following aggregated analytics data (no personal data, no IPs). Answer the user's question concisely and helpfully. If the answer requires a number, be specific. Data: ${JSON.stringify(data)}`,
      messages: [{ role: 'user', content: question }]
    });

    const answer = message.content
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim();

    return json({ answer });
  } catch (err) {
    console.error('[/api/ai-query] error:', err);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
