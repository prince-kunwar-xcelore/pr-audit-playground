# pr-audit-playground

Sandbox for testing [pr-audit](https://github.com/prince-kunwar-xcelore/pr-audit) reviews end to end:
GitHub Actions → [agent-gateway](https://github.com/prince-kunwar-xcelore/agent-gateway) (OIDC allowlist) →
your local Claude / Codex subscription → review posted on the PR.

## What's here

- `.github/workflows/pr-review.yml`: the review workflow, based on agent-gateway's
  `examples/pr-review-bun.yml`. `REVIEW_AGENT` picks `claude` or `codex`.
- **PR #13** (`insecure-code` branch): adds an Express app with deliberately planted vulnerabilities
  (SQL injection, XSS, command injection, hard-coded credentials, IDOR). A working review should flag them
  and request changes. Push a commit to that branch to trigger a new review.

## Setup

- Repo secret `AGENT_GATEWAY_URL`: the public URL of your agent-gateway.
- agent-gateway must allow this repo, e.g. `agent-gateway allow add 'prince-kunwar-xcelore/*'`.

## Things to try

- Switch `REVIEW_AGENT` between `claude` and `codex` and compare reviews.
- Exhaust an agent's usage limit: the run should pass with a neutral **AI review** check and a
  "review skipped" comment instead of failing.
- Remove the repo from the gateway allowlist: `decrypt-token` should fail with `Repository not allowlisted`.

Don't merge PR #13.
