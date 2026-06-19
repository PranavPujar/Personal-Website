<script>
  import { onMount } from 'svelte';

  const PW_KEY = 'analytics_pw';

  let password = $state('');
  let authed = $state(false);
  let authError = $state('');
  let loading = $state(false);
  let data = $state(null);

  // Section UI state
  let clicksRange = $state(7); // 7 | 30 | 90 | 0 (all time)
  let clicksSort = $state({ key: 'date', dir: 'desc' });
  let thresholdMin = $state(2);

  // SQL query
  let sqlQuery = $state('');
  let sqlRows = $state(null);
  let sqlError = $state('');
  let sqlLoading = $state(false);

  function authHeaders() {
    return { 'x-analytics-password': password };
  }

  async function loadData() {
    loading = true;
    authError = '';
    try {
      const res = await fetch('/api/analytics-data', { headers: authHeaders() });
      if (res.status === 401) {
        authError = 'Incorrect password';
        authed = false;
        sessionStorage.removeItem(PW_KEY);
        return;
      }
      if (!res.ok) {
        authError = 'Failed to load analytics data';
        return;
      }
      data = await res.json();
      authed = true;
      sessionStorage.setItem(PW_KEY, password);
    } catch {
      authError = 'Network error';
    } finally {
      loading = false;
    }
  }

  function submitGate(e) {
    e?.preventDefault();
    if (!password) return;
    loadData();
  }

  onMount(() => {
    const saved = sessionStorage.getItem(PW_KEY);
    if (saved) {
      password = saved;
      loadData();
    }
  });

  // ── Section 1: clicks per link per day (filter + sort) ──
  const filteredClicks = $derived.by(() => {
    if (!data?.clicks_per_day) return [];
    let rows = data.clicks_per_day.map((r) => ({
      date: r.date,
      label: r.label,
      count: Number(r.count)
    }));
    if (clicksRange > 0) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - clicksRange);
      const cutoffStr = cutoff.toISOString().slice(0, 10);
      rows = rows.filter((r) => String(r.date) >= cutoffStr);
    }
    const { key, dir } = clicksSort;
    rows.sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      if (key === 'count') { av = Number(av); bv = Number(bv); }
      if (av < bv) return dir === 'asc' ? -1 : 1;
      if (av > bv) return dir === 'asc' ? 1 : -1;
      return 0;
    });
    return rows;
  });

  function sortBy(key) {
    if (clicksSort.key === key) {
      clicksSort = { key, dir: clicksSort.dir === 'asc' ? 'desc' : 'asc' };
    } else {
      clicksSort = { key, dir: key === 'count' ? 'desc' : 'asc' };
    }
  }

  function sortIndicator(key) {
    if (clicksSort.key !== key) return '';
    return clicksSort.dir === 'asc' ? ' ▲' : ' ▼';
  }

  // ── Sections 2 & 3: bar-chart helpers ──
  const cityMax = $derived(Math.max(1, ...(data?.visitors_by_city ?? []).map((r) => Number(r.visitors))));
  const stateMax = $derived(Math.max(1, ...(data?.visitors_by_state ?? []).map((r) => Number(r.visitors))));

  function barWidth(value, max) {
    const v = Number(value);
    const mx = Number(max);
    return mx > 0 ? Math.max(3, Math.round((v / mx) * 100)) : 0;
  }

  // ── Section 6: sessions over X minutes per day ──
  const thresholdTable = $derived.by(() => {
    if (!data?.sessions_by_day) return [];
    const byDay = new Map();
    for (const r of data.sessions_by_day) {
      const d = String(r.date);
      const dur = Number(r.duration_sec);
      if (!byDay.has(d)) byDay.set(d, { total: 0, above: 0 });
      const entry = byDay.get(d);
      entry.total += 1;
      if (dur >= thresholdMin * 60) entry.above += 1;
    }
    return [...byDay.entries()]
      .map(([date, { total, above }]) => ({
        date,
        above,
        total,
        pct: total ? Math.round((above / total) * 100) : 0
      }))
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  });

  function fmtDuration(sec) {
    if (sec == null || sec === '') return '—';
    const n = Number(sec);
    if (Number.isNaN(n)) return '—';
    const m = Math.floor(n / 60);
    const s = n % 60;
    return m ? `${m}m ${s}s` : `${s}s`;
  }

  // ── Section 7: SQL query ──
  const sqlColumns = $derived(sqlRows && sqlRows.length ? Object.keys(sqlRows[0]) : []);

  function formatCell(v) {
    if (v == null) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    return String(v);
  }

  async function runQuery(e) {
    e?.preventDefault();
    if (!sqlQuery.trim()) return;
    sqlLoading = true;
    sqlRows = null;
    sqlError = '';
    try {
      const res = await fetch('/api/sql-query', {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sqlQuery })
      });
      const j = await res.json().catch(() => ({}));
      if (res.status === 401) { sqlError = 'Unauthorized'; return; }
      if (!res.ok) { sqlError = j.error || 'Query failed'; return; }
      sqlRows = j.rows ?? [];
    } catch {
      sqlError = 'Network error';
    } finally {
      sqlLoading = false;
    }
  }
</script>

<svelte:head>
  <title>Analytics</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if !authed}
  <!-- Password gate -->
  <div class="gate">
    <form class="gate-card" onsubmit={submitGate}>
      <h1>Analytics</h1>
      <p class="gate-sub">Enter password to continue</p>
      <input
        type="password"
        bind:value={password}
        placeholder="Password"
        autocomplete="current-password"
        aria-label="Password"
      />
      <button type="submit" disabled={loading}>{loading ? 'Checking…' : 'Unlock'}</button>
      {#if authError}<p class="gate-error">{authError}</p>{/if}
    </form>
  </div>
{:else if data}
  <div class="dash">
    <header class="dash-head">
      <h1>Analytics</h1>
      <p class="dash-sub">First-party metrics · no IPs stored</p>
    </header>

    <!-- 1. Clicks per link per day -->
    <section class="panel">
      <div class="panel-head">
        <h2>Clicks per link per day</h2>
        <div class="range">
          {#each [[7, '7d'], [30, '30d'], [90, '90d'], [0, 'All']] as [val, lbl]}
            <button class:active={clicksRange === val} onclick={() => (clicksRange = val)}>{lbl}</button>
          {/each}
        </div>
      </div>
      {#if filteredClicks.length}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th onclick={() => sortBy('date')}>Date{sortIndicator('date')}</th>
                <th onclick={() => sortBy('label')}>Link{sortIndicator('label')}</th>
                <th class="num" onclick={() => sortBy('count')}>Clicks{sortIndicator('count')}</th>
              </tr>
            </thead>
            <tbody>
              {#each filteredClicks as row}
                <tr>
                  <td>{row.date}</td>
                  <td>{row.label}</td>
                  <td class="num">{row.count}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="empty">No clicks in this range yet.</p>
      {/if}
    </section>

    <div class="grid-2">
      <!-- 2. Visitors by city -->
      <section class="panel">
        <h2>Visitors by city</h2>
        {#if data.visitors_by_city.length}
          <ul class="bars">
            {#each data.visitors_by_city as row}
              <li>
                <span class="bar-label">{row.city}</span>
                <span class="bar-track"><span class="bar-fill" style="width:{barWidth(row.visitors, cityMax)}%"></span></span>
                <span class="bar-value">{row.visitors}</span>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="empty">No city data yet.</p>
        {/if}
      </section>

      <!-- 3. Visitors by state -->
      <section class="panel">
        <h2>Visitors by state</h2>
        {#if data.visitors_by_state.length}
          <ul class="bars">
            {#each data.visitors_by_state as row}
              <li>
                <span class="bar-label">{row.region}</span>
                <span class="bar-track"><span class="bar-fill" style="width:{barWidth(row.visitors, stateMax)}%"></span></span>
                <span class="bar-value">{row.visitors}</span>
              </li>
            {/each}
          </ul>
        {:else}
          <p class="empty">No state data yet.</p>
        {/if}
      </section>
    </div>

    <!-- 4. Avg time by state -->
    <section class="panel">
      <h2>Average time by state</h2>
      {#if data.avg_time_by_state.length}
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>State</th><th class="num">Avg time</th><th class="num">Sessions</th></tr>
            </thead>
            <tbody>
              {#each data.avg_time_by_state as row}
                <tr>
                  <td>{row.region}</td>
                  <td class="num">{fmtDuration(row.avg_seconds)}</td>
                  <td class="num">{row.session_count}</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="empty">No session-duration data yet.</p>
      {/if}
    </section>

    <!-- 5. Resume vs YouTube clickers -->
    <section class="panel">
      <h2>Resume vs. YouTube clickers</h2>
      <div class="stat-cards">
        <div class="stat-card">
          <span class="stat-title">Resume Download</span>
          <span class="stat-big">{fmtDuration(data.avg_time_resume_clickers.avg_seconds)}</span>
          <span class="stat-meta">avg session · {data.avg_time_resume_clickers.session_count ?? 0} sessions</span>
        </div>
        <div class="stat-card">
          <span class="stat-title">YouTube Interview</span>
          <span class="stat-big">{fmtDuration(data.avg_time_youtube_clickers.avg_seconds)}</span>
          <span class="stat-meta">avg session · {data.avg_time_youtube_clickers.session_count ?? 0} sessions</span>
        </div>
      </div>
    </section>

    <!-- 6. Sessions over X minutes per day -->
    <section class="panel">
      <div class="panel-head">
        <h2>Sessions over X minutes per day</h2>
        <label class="threshold">
          Minutes
          <input type="number" min="0" step="1" bind:value={thresholdMin} />
        </label>
      </div>
      {#if thresholdTable.length}
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th class="num">Sessions ≥ {thresholdMin}m</th><th class="num">% of day</th></tr>
            </thead>
            <tbody>
              {#each thresholdTable as row}
                <tr>
                  <td>{row.date}</td>
                  <td class="num">{row.above} / {row.total}</td>
                  <td class="num">{row.pct}%</td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      {:else}
        <p class="empty">No session data yet.</p>
      {/if}
    </section>

    <!-- 7. SQL query -->
    <section class="panel">
      <h2>SQL query</h2>
      <form class="sql-form" onsubmit={runQuery}>
        <textarea
          bind:value={sqlQuery}
          placeholder="SELECT * FROM sessions ORDER BY started_at DESC LIMIT 20;"
          aria-label="SQL query"
          rows="3"
          spellcheck="false"
        ></textarea>
        <button type="submit" disabled={sqlLoading}>{sqlLoading ? 'Running…' : 'Run'}</button>
      </form>
      {#if sqlLoading}
        <div class="sql-result loading"><span class="spinner" aria-label="Loading"></span></div>
      {:else if sqlError}
        <div class="sql-result error">{sqlError}</div>
      {:else if sqlRows}
        {#if sqlRows.length}
          <div class="sql-table">
            <table>
              <thead>
                <tr>{#each sqlColumns as col}<th>{col}</th>{/each}</tr>
              </thead>
              <tbody>
                {#each sqlRows as row}
                  <tr>{#each sqlColumns as col}<td>{formatCell(row[col])}</td>{/each}</tr>
                {/each}
              </tbody>
            </table>
          </div>
          <p class="sql-meta">{sqlRows.length} row{sqlRows.length === 1 ? '' : 's'}</p>
        {:else}
          <div class="sql-result">Query ran successfully — 0 rows returned.</div>
        {/if}
      {/if}
    </section>
  </div>
{/if}

<style>
  /* Inherits the site's theme variables (--bg/--text/--accent/--border/--card-bg),
     so it follows light/dark automatically. */
  .gate {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .gate-card {
    width: 100%;
    max-width: 340px;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 2rem;
    border: 1px solid var(--border);
    border-radius: 16px;
    background: var(--card-bg);
    backdrop-filter: blur(8px);
  }
  .gate-card h1 { margin: 0; font-size: 1.4rem; color: var(--text); }
  .gate-sub { margin: 0 0 0.5rem; opacity: 0.7; font-size: 0.85rem; color: var(--text); }
  .gate-error { color: #e0533d; font-size: 0.85rem; margin: 0.25rem 0 0; }

  .dash {
    max-width: 1040px;
    margin: 0 auto;
    padding: 2rem clamp(1rem, 4vw, 2.5rem) 5rem;
    color: var(--text);
  }
  .dash-head { margin-bottom: 1.5rem; }
  .dash-head h1 { margin: 0; font-size: 1.7rem; }
  .dash-sub { margin: 0.25rem 0 0; opacity: 0.6; font-size: 0.85rem; }

  .panel {
    border: 1px solid var(--border);
    border-radius: 14px;
    background: var(--card-bg);
    padding: 1.25rem 1.25rem 1.5rem;
    margin-bottom: 1.25rem;
  }
  .panel h2 { margin: 0 0 1rem; font-size: 1.05rem; font-weight: 600; }
  .panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .panel-head h2 { margin: 0 0 1rem; }

  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }

  .range { display: flex; gap: 0.25rem; }
  .range button,
  .sql-form button,
  .gate-card button {
    cursor: pointer;
    border: 1px solid var(--border);
    background: transparent;
    color: var(--text);
    border-radius: 8px;
    padding: 0.4rem 0.7rem;
    font-size: 0.8rem;
    transition: background 0.15s, border-color 0.15s;
  }
  .range button.active { background: var(--accent); border-color: var(--accent); color: #fff; }
  .gate-card button { padding: 0.6rem; font-weight: 600; }
  .gate-card button:hover,
  .sql-form button:hover:not(:disabled),
  .range button:hover { border-color: var(--accent); }

  input {
    font: inherit;
    color: var(--text);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.55rem 0.7rem;
    outline: none;
  }
  input:focus { border-color: var(--accent); }

  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
  th, td { text-align: left; padding: 0.5rem 0.6rem; border-bottom: 1px solid var(--border); }
  th { font-weight: 600; cursor: pointer; user-select: none; white-space: nowrap; }
  .num { text-align: right; font-variant-numeric: tabular-nums; }
  tbody tr:last-child td { border-bottom: none; }

  .bars { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.55rem; }
  .bars li { display: grid; grid-template-columns: minmax(80px, 30%) 1fr auto; align-items: center; gap: 0.6rem; font-size: 0.82rem; }
  .bar-label { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bar-track { height: 10px; border-radius: 6px; background: color-mix(in srgb, var(--text) 10%, transparent); overflow: hidden; }
  .bar-fill { display: block; height: 100%; background: var(--accent); border-radius: 6px; }
  .bar-value { font-variant-numeric: tabular-nums; opacity: 0.85; }

  .stat-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .stat-card {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 1.1rem;
    border: 1px solid var(--border);
    border-radius: 12px;
  }
  .stat-title { font-size: 0.8rem; opacity: 0.7; }
  .stat-big { font-size: 1.6rem; font-weight: 700; color: var(--accent); }
  .stat-meta { font-size: 0.75rem; opacity: 0.6; }

  .threshold { display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; margin-bottom: 1rem; }
  .threshold input { width: 70px; }

  .sql-form { display: flex; flex-direction: column; gap: 0.5rem; }
  .sql-form textarea {
    width: 100%;
    box-sizing: border-box;
    font-family: 'DM Mono', ui-monospace, monospace;
    font-size: 0.85rem;
    color: var(--text);
    background: transparent;
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 0.6rem 0.7rem;
    outline: none;
    resize: vertical;
  }
  .sql-form textarea:focus { border-color: var(--accent); }
  .sql-form button { align-self: flex-start; padding: 0.55rem 1.1rem; font-weight: 600; }
  .sql-table { margin-top: 1rem; overflow-x: auto; }
  .sql-table td { font-family: 'DM Mono', ui-monospace, monospace; font-size: 0.8rem; white-space: nowrap; }
  .sql-meta { margin: 0.6rem 0 0; font-size: 0.75rem; opacity: 0.55; }
  .sql-result {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: 12px;
    background: color-mix(in srgb, var(--text) 4%, transparent);
    white-space: pre-wrap;
    line-height: 1.55;
    font-size: 0.9rem;
  }
  .sql-result.error { color: #e0533d; }
  .sql-result.loading { display: flex; justify-content: center; }

  .spinner {
    width: 20px; height: 20px;
    border: 2px solid color-mix(in srgb, var(--text) 25%, transparent);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .empty { opacity: 0.55; font-size: 0.85rem; margin: 0; }

  button:disabled { opacity: 0.5; cursor: default; }

  @media (max-width: 700px) {
    .grid-2, .stat-cards { grid-template-columns: 1fr; }
  }
</style>
