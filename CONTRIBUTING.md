# Contributing a resource

1. Copy `registry/resources/_template.json` to `registry/resources/<your-id>.json`.
2. Fill in all required fields (see `schemas/resource.schema.json` for the full schema).
3. Run `pnpm validate` to check your file against the schema.
4. Run `pnpm build:index` to regenerate `registry/index.json`.
5. Open a PR. Tag it `needs-scholar-review` if the resource makes Islamic authenticity claims.

## Review criteria

- **Maintained**: last commit within 2 years, or actively and verifiably used in production.
- **Free tier**: resources requiring paid access must have a meaningful free tier.
- **Authenticity**: resources making claims about Islamic content (hadith, tafsir, fatwa) must
  cite their primary source. The `scholar_reviewed` flag is only set after a qualified scholar
  has reviewed the content — do not self-set it in your PR.
- **License**: must be open-source or have a clearly documented free/open-data tier.

## Optional snippet fields

The website generates a "Quick start" code block for each resource. Two optional fields make
those snippets exact instead of best-guess:

- **`package`** — the exact install/import name for package formats. Use the registry name
  verbatim: `adhan`, `@quranjs/api`, `islam` (pip), `salah` (cargo). For Maven, use
  `groupId:artifactId`, e.g. `com.batoulapps.adhan:adhan`.
- **`endpoint`** — an example request URL for `rest-api`/`graphql`/data formats. Used in the
  fetch/cURL snippets instead of the landing `url`,
  e.g. `https://api.aladhan.com/v1/timings?latitude=51.5&longitude=-0.12&method=2`.

Both are optional — when omitted, snippets fall back to a slug derived from the name and the
landing `url`.

## Resource ID conventions

- Kebab-case, lowercase: `quran-com`, `adhan-js`, `aladhan-api`
- Use the primary domain or package name as the base
- Avoid version numbers in the ID
