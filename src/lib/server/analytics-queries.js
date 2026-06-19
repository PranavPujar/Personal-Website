// Shared analytics queries + auth check, reused by /api/analytics-data and
// /api/sql-query. Server-only ($lib/server).
import { env } from '$env/dynamic/private';
import { getSql } from './db.js';

/** Constant-ish password check against the x-analytics-password header. */
export function checkPassword(request) {
  const provided = request.headers.get('x-analytics-password');
  return Boolean(env.ANALYTICS_PASSWORD) && provided === env.ANALYTICS_PASSWORD;
}

/** Runs every dashboard query and returns the combined, aggregated payload. */
export async function getAnalyticsData() {
  const sql = getSql();

  const [
    clicks_per_day,
    visitors_by_city,
    visitors_by_state,
    avg_time_by_state,
    resumeRows,
    youtubeRows,
    sessions_by_day
  ] = await Promise.all([
    sql`SELECT DATE(occurred_at)::text as date, label, COUNT(*) as count
        FROM events WHERE event_type = 'click'
        GROUP BY date, label ORDER BY date DESC, count DESC`,

    sql`SELECT city, COUNT(DISTINCT id) as visitors
        FROM sessions WHERE city IS NOT NULL
        GROUP BY city ORDER BY visitors DESC`,

    sql`SELECT region, COUNT(DISTINCT id) as visitors
        FROM sessions WHERE region IS NOT NULL
        GROUP BY region ORDER BY visitors DESC`,

    sql`SELECT region, ROUND(AVG(duration_sec)) as avg_seconds, COUNT(*) as session_count
        FROM sessions WHERE duration_sec IS NOT NULL AND region IS NOT NULL
        GROUP BY region ORDER BY avg_seconds DESC`,

    sql`SELECT ROUND(AVG(s.duration_sec)) as avg_seconds, COUNT(DISTINCT s.id) as session_count
        FROM sessions s
        JOIN events e ON e.session_id = s.id
        WHERE e.label = 'Resume Download' AND s.duration_sec IS NOT NULL`,

    sql`SELECT ROUND(AVG(s.duration_sec)) as avg_seconds, COUNT(DISTINCT s.id) as session_count
        FROM sessions s
        JOIN events e ON e.session_id = s.id
        WHERE e.label = 'YouTube Interview' AND s.duration_sec IS NOT NULL`,

    sql`SELECT DATE(started_at)::text as date, duration_sec
        FROM sessions WHERE duration_sec IS NOT NULL
        ORDER BY date DESC`
  ]);

  return {
    clicks_per_day,
    visitors_by_city,
    visitors_by_state,
    avg_time_by_state,
    avg_time_resume_clickers: resumeRows[0] ?? {},
    avg_time_youtube_clickers: youtubeRows[0] ?? {},
    sessions_by_day
  };
}
