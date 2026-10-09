# GenesisAI environment configuration

This document lists configuration required by optional integrations. It contains names only; never commit real values.

## HSF API

`HSF_API_TOKEN` is required to enable `POST /api/v1/hsf/invoke`. If it is absent, the endpoint returns HTTP 503. If the bearer token is invalid, it returns HTTP 401.

Generate a unique high-entropy value using a trusted password/secret manager. Store it only in the deployment secret manager or GitHub Actions secrets. Do not use a shared development token in production. Define rotation, revocation, and incident response before enabling access.

The current API credential is a service-level boundary, not a complete per-user identity system. Production deployments should integrate the selected identity provider, short-lived credentials, scoped authorization, rate limiting, and audit events.

## Optional Atlas persistence

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` — server-side only; never expose in browser/client bundles.
- `ATLAS_STORE_TIMEOUT_MS` — defaults to 10000 in the documented configuration.

Use least privilege, separate development/staging/production projects, and test row-level security and schema migrations.

## Optional Atlas GitHub inventory

- `GITHUB_OWNER`
- `ATLAS_READ_TOKEN` — optional read token for inventory across private repositories where authorized.
- `INCLUDE_FORKS` — defaults to false.
- `MAX_REPOS` — defaults to 500.

Use the minimum repository permissions required. The workflow's `GITHUB_TOKEN` is for the current repository write; do not reuse a broad personal token for publishing.

## Optional PennyLane bridge

- `PENNYLANE_BRIDGE_ENDPOINT`
- `PENNYLANE_BRIDGE_TIMEOUT_MS` — default 5000 ms in the TypeScript bridge.

If no endpoint is configured, quantum execution must report unavailable. A configured URL does not prove that a PennyLane backend or QPU is healthy; use the health endpoint and backend integration tests.

## Model and approval keys

Existing variables include `GEMINI_API_KEY`, `MODEL_API_KEY`, `INFERENCE_API_KEY`, `ISABELLA_APPROVAL_PRIVATE_KEY_PEM`, and `BOOKPI_INTEGRITY_SECRET`. Their exact use depends on the corresponding module. Keep them out of source control, logs, telemetry attributes, API responses, and error messages.

## Release checklist

- [ ] All required variables exist in the secret manager.
- [ ] Missing secrets disable the integration safely.
- [ ] Credentials are scoped and rotated.
- [ ] No secret appears in Git history, logs, traces, or frontend bundles.
- [ ] Authentication and negative authorization tests pass.
- [ ] CI is green for the release SHA.
