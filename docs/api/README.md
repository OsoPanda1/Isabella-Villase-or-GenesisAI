# Inventario de rutas de API — Isabella Genesis V6

> Archivo **generado automáticamente** por `scripts/route-inventory.mjs`.
> `state: auto_generated` — no editar a mano; requiere revisión humana para ser
> evidencia (*CAPABILITY ≠ AUTHORITY ≠ EVIDENCE*, AGENTS.md).

- **Generado:** 2026-10-10T00:20:02.909Z
- **Fuente:** `src/server.ts` (parseo estático, sin ejecutar el servidor)
- **Rutas totales:** 42 · **Sensibles:** 29 · **Con contrato verificado:** 1
- **Contratos de tipo considerados:** `InferenceCapability`, `ModelDescriptor`, `GenerationRequest`, `GenerationResult`, `InferenceAdapter`, `EmbeddingAdapter`, `InferenceRouter`

## Tabla de rutas

| Método | Ruta | Handler | Sensible | Auth | Rate-limit | Validación | Verificado |
|---|---|---|---|---|---|---|---|
| `GET` | `/styles/crystal-clear.css` | `inline@server.ts:43` | no | sí | sí | no | no |
| `GET` | `/health` | `inline@server.ts:391` | no | no | no | no | no |
| `GET` | `/api/v1/health` | `inline@server.ts:401` | no | no | no | no | no |
| `GET` | `/api/v1/status` | `inline@server.ts:412` | no | no | no | no | no |
| `GET` | `/api/v1/memory` | `inline@server.ts:452` | no | sí | no | sí | no |
| `POST` | `/api/v1/memory/ingest` | `inline@server.ts:466` | sí | no | sí | sí | no |
| `GET` | `/api/v1/memory/proposals` | `inline@server.ts:492` | no | sí | no | no | no |
| `POST` | `/api/v1/memory/proposals/:proposalId/resolve` | `inline@server.ts:497` | sí | sí | no | sí | no |
| `GET` | `/api/v1/bookpi/events` | `inline@server.ts:518` | no | no | sí | no | no |
| `GET` | `/api/v1/bookpi/events/admin` | `inline@server.ts:539` | sí | sí | no | no | no |
| `POST` | `/api/v1/tools/execute` | `inline@server.ts:545` | sí | no | sí | sí | no |
| `POST` | `/api/v1/cognition/route` | `inline@server.ts:596` | sí | no | sí | sí | sí |
| `POST` | `/api/v1/cognitive/request` | `inline@server.ts:674` | sí | no | sí | sí | no |
| `POST` | `/api/v1/isabella/mediate` | `inline@server.ts:757` | sí | sí | sí | sí | no |
| `POST` | `/api/v1/isabella/entropy` | `inline@server.ts:824` | sí | no | sí | sí | no |
| `GET` | `/api/v1/isabella/status` | `inline@server.ts:841` | no | no | no | no | no |
| `GET` | `/api/v1/hsf/status` | `inline@server.ts:851` | no | no | no | no | no |
| `POST` | `/api/v1/hsf/invoke` | `inline@server.ts:864` | sí | sí | sí | sí | no |
| `GET` | `/api/v1/quantum/pennylane/status` | `inline@server.ts:926` | no | no | no | no | no |
| `POST` | `/api/v1/quantum/pennylane/execute` | `inline@server.ts:938` | sí | sí | sí | sí | no |
| `POST` | `/api/v1/triple-blockade/scan` | `inline@server.ts:991` | sí | no | sí | no | no |
| `POST` | `/api/v1/notebook/generate` | `inline@server.ts:1025` | sí | no | sí | sí | no |
| `POST` | `/api/v1/audio-overview/generate` | `inline@server.ts:1095` | sí | no | sí | sí | no |
| `GET` | `/api/v1/territory/rdm` | `inline@server.ts:1143` | no | no | no | no | no |
| `POST` | `/api/v1/sanitization/scan` | `inline@server.ts:1164` | sí | no | sí | sí | no |
| `POST` | `/api/v1/knowledge/admit` | `inline@server.ts:1187` | sí | sí | sí | sí | no |
| `POST` | `/api/v1/governance/git` | `inline@server.ts:1282` | sí | no | sí | sí | no |
| `POST` | `/api/v1/governance/quality-gates` | `inline@server.ts:1293` | sí | no | sí | sí | no |
| `POST` | `/api/v1/governance/deployment` | `inline@server.ts:1312` | sí | no | sí | sí | no |
| `POST` | `/api/v1/governance/verify-agent-app` | `inline@server.ts:1332` | sí | no | sí | sí | no |
| `POST` | `/api/v1/governance/lifecycle-plan` | `inline@server.ts:1352` | sí | no | sí | sí | no |
| `POST` | `/api/v1/diff/observe` | `inline@server.ts:1363` | sí | no | sí | sí | no |
| `POST` | `/api/v1/sanitization/harden` | `inline@server.ts:1387` | sí | no | no | sí | no |
| `POST` | `/api/v1/security/triangulate` | `inline@server.ts:1402` | sí | no | no | sí | no |
| `POST` | `/api/v1/ops/readiness` | `inline@server.ts:1417` | sí | no | no | sí | no |
| `GET` | `/api/v1/ops/snapshot` | `inline@server.ts:1428` | no | no | no | no | no |
| `POST` | `/api/v1/isa/pipeline` | `inline@server.ts:1438` | sí | no | no | sí | no |
| `POST` | `/api/v1/isa/act` | `inline@server.ts:1448` | sí | no | no | sí | no |
| `GET` | `/` | `inline@server.ts:1478` | no | no | no | no | no |
| `POST` | `/api/v1/litle/attest` | `inline@server.ts:3597` | sí | sí | sí | sí | no |
| `POST` | `/api/v1/litle/verify` | `inline@server.ts:3647` | sí | no | sí | sí | no |
| `POST` | `/api/v1/connectors/ingest` | `inline@server.ts:3736` | sí | no | no | sí | no |

> Las columnas **Auth**, **Rate-limit** y **Validación** son heurísticas de análisis
> estático sobre el cuerpo del handler (presencia de `authorizeApiToken` /
> `verifyBearerToken` / `assertBalancedAuthority`, `enforceRateLimit` y guardas de
> entrada). No son una prueba en ejecución.

## Cómo regenerar

```bash
node scripts/route-inventory.mjs
```

El script reescribe por completo `docs/api/route-inventory.json` y este README.
No requiere dependencias ni red. Si `src/server.ts` no tiene rutas parseables,
reporta la verdad: lista vacía + aviso en consola.

## Semántica de `verified`

`verified: true` **no** significa "la ruta funciona". Significa que existe al menos
una referencia externa al contrato de la ruta:

1. una **prueba** que cita la ruta (`test:...`), o
2. la **documentación** canónica (`docs:docs/spec/BLUEPRINT-API-v4.2.0.md`), o
3. un **contrato de tipo** cuyo nombre comparte el dominio de la ruta
   (`types:src/inference/types.ts:...`).

Ser simplemente un handler de Express tipado por inferencia **no** cuenta como
verificado. Hoy la mayoría de rutas queda con `verified: false` (41 de 42);
eso es el estado real del repositorio, no un defecto del script.

## UI/API truthfulness (ISA-451..458)

Este inventario es la **base de veracidad** para cualquier superficie de UI o
catálogo de API:

- **ISA-451 (MoE UI truth):** si el catálogo etiqueta una ruta como "DeepSeek-V3"
  o "MoE", debe apuntar a una fila con `verified: true` y con un contrato
  respaldado; si no, la UI debe rotularla como heurística/simulación.
- **ISA-452/453 (CoT/Swarm UI truth):** las trazas de razonamiento y las
  estrategias de enjambre deben declarse simuladas salvo que mapeen a una ruta
  verificada de este inventario.
- **ISA-454 (RAG UI truth):** la presentación de RAG debe ligarse a la ruta de
  memoria/retrieval realmente inventariada, no a datos de ejemplo.
- **ISA-455..458 (simulador / tenant / actor):** toda acción privilegiada del
  simulador debe corresponder a una ruta sensible con `Auth: sí`; la UI nunca
  debe enviar `tenantId`/`actorId` como autoridad — el servidor debe derivarlos.
  Las rutas sensibles **sin** auth/rate-limit/validación son deuda explícita
  visible en la tabla.
- **ISA-475 (claim-to-code map):** este archivo es el mapa "claim → ruta
  ejecutable" que exige el checklist.

## Evidencia y `.gitignore`

Los artefactos en `evidence/*.json` (p. ej. `production-evidence.json`,
`security-suite.json`) **no** se versionan: la línea `evidence/*.json` se añade al
`.gitignore` del repositorio por el ensamblador. La evidencia misma se adjunta
como artefacto de CI ligado al SHA exacto (ISA-325 / ISA-336 / ISA-337).
