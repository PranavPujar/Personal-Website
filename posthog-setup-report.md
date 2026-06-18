<wizard-report>
# PostHog post-wizard report

The wizard has completed a full client-side PostHog integration for pranavpujar.com. PostHog is initialized via `src/hooks.client.js` (SvelteKit's client hook), which runs once on app start in the browser. Because this is a static SPA deployed with `adapter-static`, there are no server routes to instrument — all tracking is client-side. Error capture is set up globally via `handleError`. Five engagement events are tracked across four components, covering the key visitor interactions on the portfolio site.

| Event Name | Description | File |
|---|---|---|
| `interview_video_played` | User clicked to play the Outstanding Masters Student interview video | `src/routes/featured/+page.svelte` |
| `social_link_clicked` | User clicked a social profile link in the footer (platform property: linkedin, github, google_scholar, instagram) | `src/lib/Footer.svelte` |
| `resume_viewed` | User clicked the resume link in the Journey page timeline | `src/lib/Timeline.svelte` |
| `external_link_clicked` | User clicked an inline bio/content HoverLink (href and variant properties) | `src/lib/HoverLink.svelte` |
| `theme_toggled` | User toggled the site theme between dark and light mode (theme property: dark/light) | `src/lib/stores/theme.js` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on visitor engagement, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/470353/dashboard/1727987)
- [Interview Video Plays](https://us.posthog.com/project/470353/insights/P82U6XHj)
- [Social Link Clicks by Platform](https://us.posthog.com/project/470353/insights/F1kHvpWg)
- [Resume Views](https://us.posthog.com/project/470353/insights/BZIdmJQy)
- [External Link Clicks by Destination](https://us.posthog.com/project/470353/insights/LQpRve5E)
- [All Engagement Events Over Time](https://us.posthog.com/project/470353/insights/5Kc5vw27)

## Verify before merging

- [ ] Run a full production build (`npm run build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
</wizard-report>
