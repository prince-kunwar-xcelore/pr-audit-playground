# pr-audit-playground

Sandbox for testing [pr-audit](https://github.com/prince-kunwar-xcelore/pr-audit) reviews end to end:
GitHub Actions → [agent-gateway](https://github.com/prince-kunwar-xcelore/agent-gateway) (OIDC allowlist) →
your local Claude / Codex subscription → review posted on the PR.

## What's here

- `.github/workflows/pr-review.yml`: the review workflow, based on agent-gateway's
  `examples/pr-review-bun.yml`. `REVIEW_AGENT` picks `claude` or `codex`. It checks out agent-gateway and
  pr-audit at pinned commits (the `# pin: … main` lines); to use newer tool code, run agent-gateway's
  `scripts/pin-review-tools.sh .github/workflows/pr-review.yml` here and commit the result. The
  `insecure-code` branch carries its own copy of the workflow, so bump it there too.
- **PR #13** (`insecure-code` branch): adds an Express app with deliberately planted vulnerabilities
  (SQL injection, XSS, command injection, hard-coded credentials, IDOR). A working review should flag them
  and request changes.

Reviews are incremental: a push to `insecure-code` reviews only the commits since the last review, and the
earlier unresolved critical / warning threads keep the verdict at REQUEST_CHANGES.

## Setup

- Repo secret `AGENT_GATEWAY_URL`: the public URL of your agent-gateway.
- agent-gateway must allow this repo, e.g. `agent-gateway allow add 'prince-kunwar-xcelore/*'`.

## Things to try

- Switch `REVIEW_AGENT` between `claude` and `codex` and compare reviews.
- Push a fix for one finding to `insecure-code`: the next review should cover only that commit and still
  request changes while other findings are open.
- Exhaust an agent's usage limit: the run should pass with a neutral **AI review** check and a
  "review skipped" comment instead of failing.
- Remove the repo from the gateway allowlist: `decrypt-token` should fail with `Repository not allowlisted`.

Don't merge PR #13.
