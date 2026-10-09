# Security Policy — Isabella GenesisAI

## Reporting a vulnerability

Do not publish exploitable details, credentials, personal data, or proof-of-concept payloads in public issues.

Until a dedicated private security contact is configured, contact the repository owner through GitHub's private vulnerability reporting feature if enabled. If it is not enabled, request a private channel from the repository maintainers without including exploit details in the initial public message.

## Secrets

- Never commit API keys, bearer tokens, private keys, service-role keys, personal data, or production datasets.
- Rotate any credential that may have been exposed; deleting a secret from the latest commit does not remove it from Git history.
- Keep `HSF_API_TOKEN`, `GEMINI_API_KEY`, `MODEL_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and repository access tokens in the deployment secret manager or GitHub Actions secrets.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.
- Use least privilege, separate environments, and credential rotation.

## Security boundaries

- An identifier in a request is not authentication.
- A capability descriptor is not authority.
- A successful HTTP response is not evidence of factual correctness.
- A hash is not proof that a source is authentic or truthful.
- A framework list is not a compliance assessment.
- A local test is not proof of production deployment.
- A simulated or fixture response must never claim cryptographic verification, external synchronization, or compliance.

## Release gates

Before production release, require:
1. green CI for the exact commit;
2. authenticated identity and authorization tests, including negative cases;
3. dependency and secret scanning;
4. threat model and abuse-case tests;
5. configured rate limits, timeouts, request-size limits, and audit retention;
6. documented data classification and retention;
7. backup and restore drill;
8. rollback test and incident runbook;
9. provider-specific integration tests;
10. legal/privacy review appropriate to deployment jurisdictions and use cases.

## Scope

This policy is engineering guidance and is not a guarantee that the project has undergone an external security audit or penetration test.
