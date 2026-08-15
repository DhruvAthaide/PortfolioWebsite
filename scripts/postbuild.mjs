import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { loadTsModule } from './load-ts-module.mjs';

// Keep in sync with src/components/utils/SEO.tsx
const SITE_URL = 'https://dhruvathaide.com';
const DEFAULT_IMAGE = '/images/home-DhruvAthaide.png';

const DIST_DIR = path.resolve(process.cwd(), 'dist');

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setTag(html, regex, replacement, description) {
  if (!regex.test(html)) {
    throw new Error(`postbuild: could not find ${description} in the built index.html template`);
  }
  return html.replace(regex, replacement);
}

// The source index.html sometimes wraps a meta tag's `content="..."` onto its
// own line (e.g. `<meta property="og:description"\n    content="..." />`), so
// property/name and content aren't always adjacent on the same line — match
// across that gap instead of assuming a fixed single space between them.
function metaPropertyRegex(property) {
  return new RegExp(`(<meta property="${property}"[^>]*?content=")[^"]*(")`);
}

function metaNameRegex(name) {
  return new RegExp(`(<meta name="${name}"[^>]*?content=")[^"]*(")`);
}

// Rewrites the built index.html shell with this route's real title/description/OG
// tags, so crawlers that don't execute JS (link-preview bots, some search bots)
// see correct per-page metadata instead of the homepage's for every route.
function renderRouteHtml(template, route) {
  const absoluteImage = route.image.startsWith('http') ? route.image : `${SITE_URL}${route.image}`;
  const title = escapeHtml(`${route.title} | Dhruv Athaide`);
  const description = escapeHtml(route.description);
  const url = escapeHtml(route.url);
  const image = escapeHtml(absoluteImage);

  let html = template;
  html = setTag(html, /<title>.*?<\/title>/s, `<title>${title}</title>`, '<title>');
  html = setTag(html, metaNameRegex('description'), `$1${description}$2`, 'meta description');
  html = setTag(html, metaPropertyRegex('og:url'), `$1${url}$2`, 'og:url');
  html = setTag(html, metaPropertyRegex('og:title'), `$1${title}$2`, 'og:title');
  html = setTag(html, metaPropertyRegex('og:description'), `$1${description}$2`, 'og:description');
  html = setTag(html, metaPropertyRegex('og:image'), `$1${image}$2`, 'og:image');
  html = setTag(html, metaPropertyRegex('twitter:url'), `$1${url}$2`, 'twitter:url');
  html = setTag(html, metaPropertyRegex('twitter:title'), `$1${title}$2`, 'twitter:title');
  html = setTag(html, metaPropertyRegex('twitter:description'), `$1${description}$2`, 'twitter:description');
  html = setTag(html, metaPropertyRegex('twitter:image'), `$1${image}$2`, 'twitter:image');

  const canonicalTag = `<link rel="canonical" href="${url}" />`;
  html = /<link rel="canonical"[^>]*>/.test(html)
    ? html.replace(/<link rel="canonical"[^>]*>/, canonicalTag)
    : html.replace('</head>', `  ${canonicalTag}\n</head>`);

  return html;
}

async function writeRouteFile(routePath, html) {
  if (routePath === '') {
    await writeFile(path.join(DIST_DIR, 'index.html'), html, 'utf8');
    return;
  }
  const dir = path.join(DIST_DIR, routePath);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html, 'utf8');
}

async function writeSitemap(routes) {
  const urls = routes.map((route) => `  <url>\n    <loc>${escapeXml(route.url)}</loc>\n  </url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  await writeFile(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf8');
}

async function main() {
  const { projects } = await loadTsModule('src/data/projects.ts');
  const seo = await loadTsModule('src/data/seoMeta.ts');
  const template = await readFile(path.join(DIST_DIR, 'index.html'), 'utf8');

  const routes = [
    { path: '', title: seo.homeSEO.title, description: seo.homeSEO.description, image: DEFAULT_IMAGE },
    { path: 'about', title: seo.aboutSEO.title, description: seo.aboutSEO.description, image: DEFAULT_IMAGE },
    { path: 'projects', title: seo.projectsSEO.title, description: seo.projectsSEO.description, image: DEFAULT_IMAGE },
    { path: 'contact', title: seo.contactSEO.title, description: seo.contactSEO.description, image: DEFAULT_IMAGE },
    ...projects.map((project) => ({
      path: `projects/${project.id}`,
      title: `${project.title} | Project Case Study`,
      description: project.description,
      image: project.image,
    })),
  ].map((route) => ({
    ...route,
    url: route.path ? `${SITE_URL}/${route.path}` : SITE_URL,
  }));

  for (const route of routes) {
    const html = renderRouteHtml(template, route);
    await writeRouteFile(route.path, html);
  }

  await writeSitemap(routes);
  console.log(`postbuild: generated ${routes.length} static route shells + sitemap.xml`);
}

main().catch((error) => {
  console.error('postbuild failed:', error);
  process.exit(1);
});
