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

## Resource ID conventions

- Kebab-case, lowercase: `quran-com`, `adhan-js`, `aladhan-api`
- Use the primary domain or package name as the base
- Avoid version numbers in the ID
