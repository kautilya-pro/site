# ADR-0001: System Architecture

- **Status**: Accepted
- **Date**: 2026-03-07
- **Author**: Kautilya Bhardwaj

## Context

This repository hosts the personal digital hub for [kautilya.pro](https://kautilya.pro) — a "build in public" artifact authored by a Systems Architect with 10+ years of experience. The architecture must prioritize:

1. **Zero operational overhead** — no databases, no backend services, no runtime state to manage.
2. **Edge-first delivery** — sub-50ms TTFB globally without a CDN warm-up penalty.
3. **Content integrity** — every piece of frontmatter must be schema-validated at build time; malformed content must fail CI, not production.
4. **Long-term maintainability** — minimal dependency surface, no framework lock-in beyond the rendering layer.

## Decision

### Runtime: Astro 6 on Cloudflare Pages (`workerd` Edge Runtime)

**Astro 6** is chosen as the static site generator. Key properties:

- **Near-zero client JS**: Astro ships no framework JavaScript. Blog content is pre-rendered HTML/CSS. Minimal client JS is used for the Table of Contents scroll-spy and third-party embeds (Giscus, GA).
- **Content Collections with Zod**: Frontmatter is validated against Zod schemas (`src/content.config.ts`) at build time. The schema enforces `title`, `description`, `date`, `series`, `permalinkSlug`, `heroImage`, and `draft` fields.
- **Vite-native**: Astro 8 builds on Vite 7, providing high-performance bundling.

**Cloudflare Pages** is the hosting target:

- **Hybrid SSR**: The site uses `output: "server"` with the Cloudflare adapter targeting the `workerd` runtime. Content pages use `export const prerender = true` for high-performance static delivery, while allowing for future server-side capabilities.
- Assets are deployed to Cloudflare's edge network (300+ PoPs).
- Cost: Free tier covers the expected traffic profile indefinitely.

### Comments: Giscus (GitHub Discussions as Headless Database)

**Giscus** is chosen over alternatives (Disqus, Commento, self-hosted databases) for comment functionality:

- **Stateless from the blog's perspective**: The blog has zero data persistence responsibility. All comment data lives in GitHub Discussions, which is backed by GitHub's infrastructure.
- **No operational overhead**: No database provisioning, no migrations, no backups, no connection pooling. The comment system is fully managed by GitHub.
- **Authentication delegation**: User authentication is handled by GitHub OAuth. No user table, no session management, no password storage.
- **Data portability**: Comments are stored as standard GitHub Discussions. They are searchable, exportable via GitHub API, and survive any frontend framework migration.
- **Alignment with "build in public"**: Discussions are public, forkable, and exist within the same repository context as the source code.

### Rejected Alternatives

| Alternative                        | Rejection Reason                                                                                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Next.js / Remix                    | Unnecessary server runtime for a content-only site. Adds operational complexity.                                   |
| Disqus                             | Invasive tracking, ad injection, vendor lock-in.                                                                   |
| Self-hosted DB (PostgreSQL/SQLite) | Violates zero-overhead constraint. Requires provisioning, backups, and connection management for a comments table. |
| WordPress                          | Monolithic, PHP runtime, attack surface, maintenance burden — antithetical to the architectural goals.             |

## Consequences

- **Build failures are the only failure mode**: If `npm run build` succeeds, the site works.
- **Environment Dependency**: The site relies on an environment schema (`astro:env`) for Giscus and Google Analytics configuration. Secrets are managed via Cloudflare Pages environment variables.
- **Comment dependency on GitHub**: If GitHub Discussions experiences an outage, comments are temporarily unavailable. Blog content remains unaffected. This is an acceptable trade-off given GitHub's SLA.
- **Migration path**: Astro's output is standard HTML. Moving to a different hosting provider requires only pointing the build output to a new static host. Moving comments requires a GitHub Discussions export.
