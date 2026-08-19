# MODH07 LIMITED website

Static marketing website for **MODH07 LIMITED**, a UK private limited company focused on the wholesale and retail sale of fresh fruits and vegetables.

Site URL: [https://modh07ltd.co.uk/](https://modh07ltd.co.uk/)

The project is an Astro static site with Tailwind CSS. There is no backend, database, or server-side form handling.

## Installation

Requires Node.js 22.12 or later.

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:4321`).

## Production build

```bash
npm run build
npm run preview
```

- `npm run build` writes a static site to `dist/`
- `npm run preview` serves that output locally

## Cloudflare deployment

This site is a static Astro build. Images are optimized **at build time** so they become files under `/_astro/`, not runtime `/_image` URLs.

That matters on Cloudflare Workers / Pages. The Workers Astro adapter defaults to an on-the-fly `/_image` endpoint, which 404s unless an Images binding is set up. This project sets `imageService: 'compile'` so photographs are already WebP files in the build.

### Cloudflare Pages

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist/client` |
| Node.js version | `22` |

The repository includes `.nvmrc` so Pages can pick Node 22. You can also set `NODE_VERSION=22` in the environment variables.

### Cloudflare Workers

If the project is deployed as a Worker (a `*.workers.dev` URL), use the same build command. After pulling this image fix, **redeploy** so HTML points at `/_astro/*.webp` instead of `/_image?...`.

`public/_headers` adds basic security headers. `public/_redirects` sends `/sitemap.xml` to Astro’s `sitemap-index.xml`.

## Custom domain setup for modh07ltd.co.uk

1. In Cloudflare Pages, open the project → **Custom domains**.
2. Add `modh07ltd.co.uk` and `www.modh07ltd.co.uk` if you want the www host as well.
3. If the domain is already on Cloudflare DNS, Pages can attach it directly.
4. If DNS is elsewhere, add the records Cloudflare shows (usually a CNAME for `www` and an ALIAS/ANAME or proxied record for the apex).
5. Wait for SSL to become active, then set the canonical host you want (apex or www) and redirect the other.

The site is configured with canonical URLs on `https://modh07ltd.co.uk/`.

## Where to replace images

Optimised photographs live in:

```text
src/assets/images/
```

| File | Used for |
| --- | --- |
| `hero.jpg` | Homepage hero |
| `about.jpg` | About section |
| `apples.jpg`, `bananas.jpg`, `oranges.jpg`, `grapes.jpg`, `seasonal-fruit.jpg` | Fruit category cards |
| `potatoes.jpg`, `onions.jpg`, `tomatoes.jpg`, `carrots.jpg`, `leafy.jpg` | Vegetable category cards |
| `wholesale.jpg` | Wholesale section background |
| `retail.jpg` | Retail section |

Keep similar aspect ratios where possible. Astro generates responsive variants at build time.

Social preview image:

```text
public/og-image.jpg
```

Favicon:

```text
public/favicon.svg
```

## Where to update company information

Edit a single source of truth:

```text
src/data/site.ts
```

That file drives the company name, number, address, SIC codes, navigation, meta description, and JSON-LD. After changing it, check `src/components/` and the privacy/terms pages if any surrounding copy needs a wording pass.

Site URL and sitemap base:

```text
astro.config.mjs  →  site: 'https://modh07ltd.co.uk'
```

## How to connect the contact form later

The contact form is UI only. It does not send email and must not be pointed at a fake API.

To connect it:

1. Choose a form provider (Formspree, Getform, Basin) or a small Cloudflare Worker that emails submissions.
2. Open `src/components/Contact.astro`.
3. Replace the `submit` handler in the `<script>` block with a `fetch()` to your endpoint.
4. Keep the existing field names (`name`, `email`, `phone`, `enquiryType`, `message`) unless the provider requires different names.
5. Update `src/pages/privacy.astro` with what data is collected, why, how long it is kept, and how people can request deletion.
6. Do not add an Astro server endpoint if you want to stay on static Cloudflare Pages hosting, unless you switch to Cloudflare Workers/Pages Functions.

The form currently tells visitors that submissions are not sent, and points them to virenmodh061@gmail.com or 07830 810479 instead.

## Project structure

```text
src/
  assets/images/     photographs used by Astro’s image pipeline
  components/        page sections
  data/site.ts       company and SEO constants
  layouts/Layout.astro
  pages/             index, privacy, terms, 404
  styles/global.css  Tailwind theme and base styles
public/              favicon, robots.txt, OG image, Cloudflare headers
```

## Notes

- Product cards are category examples, not a confirmed catalogue.
- Contact details (owner, email, phone) are stored in `src/data/site.ts`.
- Privacy and terms pages are intentionally short and include TODOs for legal review.
