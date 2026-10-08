# Isabella Villaseñor AI — Genesis TINA V6

> Trusted Intelligence, Native & Adaptive — gobernada, auditable y federable.

Genesis V6 evoluciona el repositorio desde un **foundation de gobernanza** hacia un
**runtime cognitivo soberano compuesto**: identidad, autoridad, seguridad,
memoria epistemológica, aceleración gobernada, herramientas, skills, evolución,
provenance, observabilidad y federación.

## Invariante constitucional

`CAPABILITY ≠ AUTHORITY ≠ EXECUTION ≠ EVIDENCE ≠ LEARNING ≠ PRODUCTION`

La aceleración sólo puede reducir cómputo. Nunca puede reducir autoridad, evidencia,
seguridad, consentimiento o gobernanza.

## Arquitectura V6

- **INGRESS** — normalización, límites, trazabilidad y presupuesto de cuerpo.
- **IDENTITY & AUTHORITY** — Principal, RBAC, ABAC real, tenant isolation y consentimiento.
- **CROWN** — intención, riesgo, capacidad y verificación.
- **AEGIS** — injection, poisoning, secretos, PII y evasión de política.
- **IKES** — memoria externa con provenance, temporalidad y estado epistemológico.
- **HYPERCORE** — VECTOR, SPECULATIVE y VERITAS mediante contratos ejecutables.
- **TOOLS / SKILLS** — registries versionados, scopes y execution receipts.
- **EVOLUTION FABRIC** — 7,000 controles, evidencia independiente y lifecycle governance.
- **BOOKPI** — ledger append-oriented con canonical event core e integrity seal.
- **OBSERVABILITY** — latency, TTFT, tokens/s, cache hit, speculative acceptance y SLO.
- **FEDERATION** — Territory Packs verificables.
- **GENESIS RUNTIME** — composición del pipeline sin bypass de autoridad.

## Tres aceleradores

1. **VECTOR** — PREFIX_CACHE + SEMANTIC_CACHE.
2. **SPECULATIVE** — DRAFT_MODEL + PARALLEL_BRANCHES.
3. **VERITAS** — VERIFIER_FANOUT + EARLY_EXIT gobernado por riesgo.

Los adaptadores de aceleración son contratos de integración. Este repositorio no
declara como implementados un GPU scheduler, un servidor de modelos, KV cache real,
continuous batching o entrenamiento federado sólo por tener sus interfaces.

## Memoria: IKES

La memoria distingue:

`E0_UNVERIFIED → E1_SOURCE_FOUND → E2_CORROBORATED → E3_ACADEMICALLY_SUPPORTED
→ E4_REPRODUCIBLE → E5_VALIDATED → E6_ESTABLISHED`

y separa estados negativos:

`DISPUTED / REJECTED / DEPRECATED`.

**Memoria no es verdad.** La recuperación debe respetar temporalidad, provenance y
estado epistemológico.

## Evolución

La matriz de 7,000 controles es un **catálogo de control**, no una afirmación de
7,000 capacidades terminadas. Los estados se mantienen conservadores y requieren
evidencia para avanzar.

## Seguridad

- Capability no registrada = **DENY**.
- ABAC false/error = **DENY**.
- Aprobación humana = **Ed25519 + target binding + expiry + nonce**.
- Secretos BookPI = externos; no existe secreto de producción embebido.
- Ledger = hash canónico + sello de integridad + frontera append-only.
- AEGIS crítico = **BLOCK**.
- Acceleration ≠ authority.

## Documentación

| Documento | Ruta |
| --- | --- |
| Genesis V6 Architecture | `docs/spec/GENESIS-V6-ARCHITECTURE.md` |
| Threat Model | `docs/security/GENESIS-V6-THREAT-MODEL.md` |
| Master Gen-5 V5 | `docs/evolution/MASTER-V5-000.md` |
| Blueprint V5 | `docs/evolution/BLUEPRINT-V5.md` |
| Matriz 7,000 controles | `docs/evolution/7000-CONTROL-MATRIX.md` |
| Canon v40 | `docs/spec/ISABELLA-CANON-v40-source.txt` |
| IKES Libraries | `docs/spec/IKES-LIBRARIES.md` |

## Stack

Node ≥ 22, TypeScript estricto, ESM, Vitest, pnpm y PostgreSQL para BookPI.

## Verificación

```sh
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

La CI oficial ejecuta los cuatro pasos.

## Production truth

El código distingue deliberadamente entre:

- capacidad implementada;
- contrato de integración;
- infraestructura externa requerida;
- evidencia empírica;
- alineación jurídica;
- certificación externa.

Ninguna certificación, conformidad jurídica universal o capacidad de AGI se
infiere simplemente por la existencia del código.

## Governance rule

Las inteligencias pueden proponer, calcular, evaluar y evolucionar bajo evidencia.
La autoridad humana conserva la decisión sobre acciones privilegiadas y cambios
constitucionales.
