# Security policy — Isabella GenesisAI

## Reporting a vulnerability

Do not publish exploitable details, secrets, access tokens, private personal data, or production endpoints in a public issue. Report suspected vulnerabilities privately through the repository owner’s configured GitHub security reporting channel. If that channel is not enabled, contact the maintainer privately and include a minimal reproducible report.

## Current security boundaries

- HSF invocation requires `HSF_API_TOKEN`.
- Knowledge admission and administrative review require `GENESIS_ADMIN_API_TOKEN`.
- Public memory submissions are bounded proposals in a process-local review queue; they do not mutate canonical IKES memory.
- Public cognitive endpoints use a fixed viewer principal. Client-supplied roles and principal IDs are not authority.
- Public endpoints have process-local rate limits. These reduce abuse but are not a distributed WAF or a substitute for edge-level rate limiting.
- IKES release requires source/evidence, audit, valid commit and indexing evidence. A proposal is not a released knowledge artifact.
- BookPI currently provides a volatile in-memory SHA-256 hash chain. It is not durable WORM storage, a Merkle tree, or a signed external audit log.
- The post-quantum and HSM providers are not configured. The system must not claim FIPS/ML-DSA/ML-KEM verification until an actual provider and test evidence exist.

## Secret handling

Never commit secrets or place them in browser code, source fixtures, logs, telemetry, generated documentation, or API error messages. Keep `HSF_API_TOKEN`, `GENESIS_ADMIN_API_TOKEN`, model keys, Supabase service keys, approval private keys and BookPI secrets in a secret manager. Rotate any credential suspected of exposure.

## Release gates

Before production deployment, require:
1. Typecheck, tests and production build pass on the exact release SHA.
2. Negative authentication and authorization tests pass.
3. Secret-bearing input is withheld from API outputs and logs.
4. Persistent audit storage, retention, backup and tamper-evidence are tested.
5. RLS/tenant isolation is verified against the deployed database, not inferred from configuration.
6. External model routes have quotas and edge-level rate limiting.
7. Legal, privacy, licensing and jurisdictional review is completed for the actual deployment.
