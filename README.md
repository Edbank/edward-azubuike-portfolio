# Edward Azubuike — Product Design Portfolio

A portable, dependency-free static portfolio. Six standalone case-study pages, responsive layouts, accessible native image dialogs, a mobile navigation menu, local project imagery and a local CV.

## Build and verify

Requires Node.js 20 or newer. No runtime packages or install step are required.

```sh
npm run build
npm run check
```

Output: `dist/`. Serve that directory using any static web server.

## Deploy on Vercel

- Framework preset: Other
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable `SITE_URL`: the final HTTPS origin, without a trailing slash. This enables canonical URLs, sitemap and the absolute social-card URL.

`vercel.json` already defines the build and output directory. To deploy with the authenticated Vercel CLI, run `vercel login`, link/create the intended portfolio project, inspect the linked project, then run `vercel --prod`. Confirm the team and project before deploying.

Alternatively upload this source to a Git repository and import it into Vercel. Never commit CLI credentials or `.vercel` account state.

After choosing a domain, add it in the project's Domains settings and use the DNS values Vercel returns. Update `SITE_URL` to that domain and redeploy. Domain availability and prices can change; inspect registration and renewal terms before purchasing.

## Editing

- `projects.mjs`: project metadata, contributions, design intent, screen sequences and next evaluation plans.
- `build.mjs`: homepage, shared navigation/footer, case-study templates, metadata and 404 page.
- `public/styles.css`: responsive visual design and reduced-motion/print rules.
- `public/app.js`: navigation and image dialog interactions.
- `public/assets/`: original local image assets, copied from the previous portfolio.
- `public/edward-azubuike-cv.pdf`: the existing CV, preserved as supplied. Its content has not been rewritten.

Rebuild after changes. The source has no external font, image or application-runtime dependency.

## Content integrity

- Professional Intercity work remains a public interface overview with team ownership and NDA boundaries.
- KoboSpend is pre-launch; NOD is a concept; PeerPal is identified as an internship design project.
- Design intent and proposed future evaluations are not presented as completed research or measured impact.
- Original design screenshots retain their example values. Selections across captures may differ.
- No invented user quotes, testimonials, research participants, conversions, retention or revenue metrics were added.

For stronger evidence in future revisions, add genuine alternatives, critique notes, iteration examples and validation findings. A layout cannot replace those records. Only publish internal work when permission permits it.

## Verification

The local check validates route, fragment and asset references, heading presence, image alternatives and removal of old-host dependencies. Browser QA covers the homepage at desktop, 390px mobile and 768px tablet frame widths, mobile menu behaviour, case-study navigation and the image dialog. This is not a full WCAG conformance certification.

The `.openai/hosting.json` file only supports this workspace's preview; it has no Site identity and is not needed by Vercel. No chatgpt.site deployment was created or modified for this build.
