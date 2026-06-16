// Shared UI helpers for the Islamic Resources directory.
// Ports the icon set + category metadata from the Noor design into the Astro
// site, and adapts the design's code-snippet generator to the real registry
// shape (single `format`, `url`, `docs`, `repo`).
import type { Resource, ResourceCategory } from '@islamic-resources/adapters';

/* ── Category metadata (label + blurb + ordering) ── */
export interface CategoryMeta {
  key: ResourceCategory;
  label: string;
  blurb: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { key: 'quran', label: 'Quran', blurb: 'Verified Quranic text, translations, word-level data, and recitation — the foundation layer for any mushaf experience.' },
  { key: 'hadith', label: 'Hadith', blurb: 'Major hadith collections with chains of narration, grading, and book & chapter references.' },
  { key: 'prayer-times', label: 'Prayer Times', blurb: 'Calculation libraries and APIs for salah times, qibla direction, and every major calculation method.' },
  { key: 'tafsir', label: 'Tafsir', blurb: 'Classical and modern Quranic exegesis, keyed to verse ranges across many languages.' },
  { key: 'duas', label: 'Duas', blurb: 'Supplications and adhkar with Arabic, transliteration, translation, and sourcing.' },
  { key: 'calendar', label: 'Calendar', blurb: 'Hijri–Gregorian conversion and Islamic calendar utilities across platforms.' },
  { key: 'names', label: 'Names of Allah', blurb: 'Asma ul-Husna — the ninety-nine names with transliteration and meaning.' },
  { key: 'general', label: 'General', blurb: 'CDNs, toolkits, and cross-cutting datasets that power Islamic apps.' },
];

const CAT_BY_KEY = new Map(CATEGORIES.map((c) => [c.key, c]));
export const catMeta = (key: string): CategoryMeta =>
  CAT_BY_KEY.get(key as ResourceCategory) ?? { key: key as ResourceCategory, label: key, blurb: '' };
export const catLabel = (key: string): string => catMeta(key).label;

/* ── Language code → display name ── */
const LANG_NAMES: Record<string, string> = {
  ar: 'Arabic', en: 'English', ur: 'Urdu', tr: 'Turkish', id: 'Indonesian',
  fr: 'French', de: 'German', bn: 'Bengali', ru: 'Russian', ku: 'Kurdish',
  zh: 'Chinese', es: 'Spanish', fa: 'Persian', sv: 'Swedish',
};
export const langName = (code: string): string => LANG_NAMES[code] ?? code;
export const langList = (codes: string[]): string =>
  codes.length ? codes.map(langName).join(', ') : '—';

/* ── Dates ── */
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function fmtShort(d: string): string {
  const p = d.split('-');
  return `${MONTHS[+p[1] - 1]} '${p[0].slice(2)}`;
}
export function fmtLong(d: string): string {
  const p = d.split('-');
  return `${+p[2]} ${MONTHS[+p[1] - 1]} ${p[0]}`;
}

/* ── SVG icons (returned as markup strings; render with set:html) ── */
const svg = (size: number, sw: number, body: string, extra = ''): string =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${extra ? ' ' + extra : ''}>${body}</svg>`;

const CAT_GLYPHS: Record<string, string> = {
  quran: '<path d="M3 5.5C5 4.6 8 4.6 11 5.5V19C8 18.1 5 18.1 3 19V5.5Z"/><path d="M21 5.5C19 4.6 16 4.6 13 5.5V19C16 18.1 19 18.1 21 19V5.5Z"/><line x1="11" y1="5.7" x2="11" y2="18.8"/><line x1="13" y1="5.7" x2="13" y2="18.8"/>',
  hadith: '<path d="M4 5.5h16v9.5H10l-4 3.5V15H4z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12" x2="13" y2="12"/>',
  'prayer-times': '<line x1="3" y1="19" x2="21" y2="19"/><path d="M7 19a5 5 0 0 1 10 0"/><line x1="12" y1="4" x2="12" y2="7"/><line x1="5" y1="12" x2="6.4" y2="13.2"/><line x1="19" y1="12" x2="17.6" y2="13.2"/>',
  tafsir: '<path d="M12 4 21 9 12 14 3 9 12 4Z"/><path d="M3 13 12 18 21 13"/>',
  duas: '<path d="M12 20s-6.5-4.2-6.5-9.3A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 6.5 2.7C18.5 15.8 12 20 12 20Z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="3" x2="8" y2="7"/><line x1="16" y1="3" x2="16" y2="7"/>',
  names: '<rect x="6" y="6" width="12" height="12" rx="1"/><rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)"/>',
  general: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
};

export const catIcon = (key: string, size = 18): string =>
  svg(size, 1.6, CAT_GLYPHS[key] ?? CAT_GLYPHS.general);

export function flagIcon(kind: 'free' | 'auth' | 'maint' | 'scholar', size = 12): string {
  const body =
    kind === 'free' ? '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-1.8"/>'
    : kind === 'auth' ? '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'
    : kind === 'maint' ? '<path d="M3 12h4l2 5 3.5-11 2.5 7h6"/>'
    : '<path d="M12 3l7 3v5c0 4.5-3 7.2-7 8-4-.8-7-3.5-7-8V6z"/><path d="M9 12l2 2 4-4"/>';
  return svg(size, 1.9, body);
}

export const ICONS = {
  brand: '<svg width="22" height="22" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor"/><rect x="6" y="6" width="12" height="12" rx="1.5" fill="currentColor" opacity="0.78" transform="rotate(45 12 12)"/></svg>',
  search: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>',
  check: '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l4 4 10-11"/></svg>',
  copy: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  sun: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="19" y2="19"/><line x1="5" y1="19" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="19" y2="5"/></svg>',
  moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A8 8 0 1 1 11.2 3 6.5 6.5 0 0 0 21 12.8z"/></svg>',
  bigStar: '<svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1"><rect x="6" y="6" width="12" height="12" rx="1"/><rect x="6" y="6" width="12" height="12" rx="1" transform="rotate(45 12 12)"/></svg>',
};

/* ── Quick-start code snippets, adapted to the registry's single `format` ── */
export interface CodeTab { label: string; code: string; }

const slug = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'package';
const camel = (s: string): string => {
  const w = slug(s).split('-');
  return w.map((x, i) => (i ? x[0].toUpperCase() + x.slice(1) : x)).join('') || 'pkg';
};

export function makeTabs(r: Resource): CodeTab[] {
  // Prefer the curated `endpoint` / `package` fields; fall back to url + a slug
  // derived from the name when a resource hasn't specified them.
  const url = r.endpoint || r.url;
  const pkg = r.package || slug(r.name);
  const tabs: CodeTab[] = [];
  switch (r.format) {
    case 'rest-api':
    case 'graphql':
      tabs.push({ label: 'JavaScript', code: `const res = await fetch(\n  "${url}"\n);\nconst data = await res.json();\nconsole.log(data);` });
      tabs.push({ label: 'Python', code: `import requests\n\nres = requests.get(\n    "${url}"\n)\ndata = res.json()\nprint(data)` });
      tabs.push({ label: 'cURL', code: `curl -sL "${url}"` });
      break;
    case 'npm':
      tabs.push({ label: 'npm', code: `npm install ${pkg}` });
      tabs.push({ label: 'import', code: `import ${camel(pkg)} from "${pkg}";\n// see docs for full usage` });
      break;
    case 'pip':
      tabs.push({ label: 'pip', code: `pip install ${pkg}` });
      break;
    case 'cargo':
      tabs.push({ label: 'Cargo', code: `cargo add ${pkg}` });
      break;
    case 'pub':
      tabs.push({ label: 'pub', code: `flutter pub add ${pkg}` });
      break;
    case 'swift':
      tabs.push({ label: 'Swift', code: `// Package.swift\n.package(\n  url: "${r.repo || url}",\n  from: "1.0.0"\n)` });
      break;
    case 'maven': {
      // Accept a "groupId:artifactId" package; otherwise reuse the slug for both.
      const [groupId, artifactId = groupId] = pkg.split(':');
      tabs.push({ label: 'Maven', code: `<dependency>\n  <groupId>${groupId}</groupId>\n  <artifactId>${artifactId}</artifactId>\n  <version>1.0.0</version>\n</dependency>` });
      break;
    }
    case 'json':
    case 'csv':
    case 'xml':
    case 'sqlite':
      tabs.push({ label: 'Fetch', code: `const res = await fetch(\n  "${url}"\n);\nconst data = await res.json();` });
      break;
  }
  if (!tabs.length) tabs.push({ label: 'Resource', code: `# Visit ${url}` });
  return tabs;
}
