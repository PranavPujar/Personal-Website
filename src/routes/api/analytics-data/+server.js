import { json } from '@sveltejs/kit';
import { checkPassword, getAnalyticsData } from '$lib/server/analytics-queries.js';

export const prerender = false;

export async function GET({ request }) {
  if (!checkPassword(request)) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getAnalyticsData();
    return json(data);
  } catch (err) {
    console.error('[/api/analytics-data] error:', err);
    return json({ error: 'Server error' }, { status: 500 });
  }
}
