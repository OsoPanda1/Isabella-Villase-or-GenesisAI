# Evidence Manifest Schema

**Contexto:** formato mínimo para hacer reproducible cada validación o release.

**Estado:** stable.

**Dependencias:** BookPI, Git, CI, IKES, LSP.

```yaml
manifest_id: EVM-000001
repository: isabella-knowledge
commit: full-sha
created_at: 2026-10-05T00:00:00Z
claim_ids: []
source_ids: []
validation:
  status: passed
  tests: []
  lsp: []
security:
  secret_scan: passed
  dependency_scan: passed
policy_decision: DEC-000001
bookpi_audit_ids: []
rollback_plan: revert_commit
limitations: []
```

Un manifest incompleto no puede respaldar un estado `stable` sin una excepción documentada y aprobada.
