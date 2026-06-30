# Islamic Resources

A curated registry of open-source Islamic data sets, APIs, and libraries — machine-readable JSON with a human-browsable static website.

## Repo layout

| Path | Purpose |
|------|---------|
| `registry/resources/` | One JSON file per resource — the source of truth |
| `registry/index.json` | Auto-generated flat index (do not edit manually) |
| `schemas/` | JSON Schema for validating resource files |
| `adapters/` | TypeScript types package (`@islamic-resources/adapters`) |
| `website/` | Astro static site built from the registry at build time |
| `scripts/` | `validate.ts` and `build-index.ts` |

## Getting started

```bash
corepack enable && pnpm install
pnpm validate        # validate all resources against the schema
pnpm build:index     # regenerate registry/index.json
pnpm dev             # run the website locally (http://localhost:4321)
pnpm build           # production build
```

## Adding a resource

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Categories

`quran` · `hadith` · `prayer-times` · `tafsir` · `duas` · `calendar` · `names` · `fonts` · `general`

## License

Registry data: [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/)
Website and adapter code: MIT
