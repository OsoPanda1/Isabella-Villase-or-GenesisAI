# Security model

All non-health API routes require a bearer token of at least 32 characters. Configure secrets outside source control. The static token is a deployment MVP control, not end-user identity or tenant authorization. Tenant/user IDs in request bodies are not trusted identity claims. No endpoint executes actions. Add TLS, OIDC, rate limiting, token rotation, secret management, backups, image scanning and independent audit anchoring before production.
