# Reauditoría de los 500 puntos — Isabella Genesis V6

- **Fecha:** 2026-10-09 · **Repo HEAD:** `06123ca` · **Fuente:** `ISABELLA-GENESIS-500-CHECKLIST` (500 ítems)
- **Dominios:** 21 · **P0:** 134 · **P1:** 303 · **P2:** 63

## 1. Método y límites

- **Auditoría estática** por barrido de tokens por ítem contra el corpus del repo
  (`src/`, `test/`, `infra/`, `docs/`, `scripts/`, `.github/`), con mapeo de
  rutas antiguas del checklist (`src/lib/*`) a los módulos V6 reales.
- **Veredictos:** FUERTE (código + test en la zona mapeada) · MEDIO (código, sin
  test asociado) · DEBIL (solapamiento ≥2 tokens, sin ubicación clara) ·
  INDIRECTO (solo fuera de zona objetivo) · SIN_EVIDENCIA (ninguna).
- Lectura según la **regla del propio checklist**: `CONFIRMADO` = evidencia;
  `FALTA_IMPLEMENTACION` ≠ defecto demostrado; una auditoría estática **no es
  una certificación**. Aplicando el invariante operativo (AGENTS.md): esto es
  EVIDENCIA computacional, requiere arbitraje humano para autoridad.
- Los ítems clave MoE/Webhooks/Cripto PQC/CI fueron **verificados por lectura
  directa** y anotados en la columna *Nota*.

## 2. Resumen ejecutivo

| Veredicto | Total | %
|---|---|---|
| FUERTE (código + tests) | 68 | 14% |
| MEDIO (código, sin test) | 289 | 58% |
| DEBIL | 55 | 11% |
| INDIRECTO | 86 | 17% |
| SIN_EVIDENCIA | 2 | 0% |

- **Brechas a cubrir (DEBIL+INDIRECTO+SIN):** 143 ítems, de los cuales **25 son P0**.
- **Estado del checklist original:** CONFIRMADO 61 · FALTA_IMPLEMENTACION 369 · REQUIERE_VERIFICACION 63 · BLOCKED_ENVIRONMENT 7.

## 3. Mapa de rutas antiguas → módulos V6

| Checklist (viejo) | V6 actual |
|---|---|
| `src/lib/native-ml/*`, `src/lib/cognitive/*`, `src/lib/ncua/*` | `src/cognition`, `src/inference`, `src/intelligence`, `src/genesis` |
| `src/lib/tina/*` | `src/isabella`, `src/crown`, `src/skills`, `src/genesis` |
| `src/lib/intelligence/*` | `src/intelligence`, `src/inference` |
| `src/lib/security.ts`, `src/lib/crypto/*` | `src/security` (`aegis.ts`, `triangulated-crypto.ts`, `api-token.ts`, `secrets.ts`, `rate-limit.ts`) |
| `src/lib/monetization/*` | `src/commerce` (`plans`, `revenue`, `locks`, `anti-fraud`, `webhook`, `guards`, `types`) |
| `src/lib/isabella-learning.ts` | `src/memory` (`ikes`, `retrieval`, `vector`, `provenance`, `knowledge-entry`) |
| `src/lib/api-contracts.ts`, `src/lib/isabella-chat-gateway.ts` | `src/inference` (`router`, `types`, `model-registry`, `adapters`) |
| `src/server-routes/api/connect.ts` | `src/commerce/webhook.ts` (primitiva; sin ruta) |
| `src/components/isabella/*` | **No existe frontend.** `src/companion`, `src/isabella` son libs backend |
| `k8s/*`, `Dockerfile` | **Ausentes** — solo `src/deployment` (`canary`, `readiness`, `rollback`, `production-ops`) |
| `.github/workflows/*` | `ci.yml`, `atlas-ingest.yml` |
| `scripts/production-evidence.mjs` | `scripts/atlas-ingest.ts` |

## 4. Resultado por dominio

| Dominio | Total | P0 | Fuerte | Medio | Débil | Indirecto | Sin-ev | **P0 débiles** |
|---|---|--:|---:|---:|---:|---:|---:|---:|
| MoE soberano | 25 | 12 | 1 | 18 | 5 | 1 | 0 | 3 |
| TINA / orchestration | 25 | 7 | 2 | 23 | 0 | 0 | 0 | 0 |
| Native ML | 25 | 1 | 1 | 11 | 6 | 6 | 1 | 0 |
| NCUA / cognitive pipeline | 25 | 9 | 0 | 21 | 1 | 3 | 0 | 1 |
| Intelligence plane / providers | 25 | 6 | 0 | 25 | 0 | 0 | 0 | 0 |
| Chat gateway / API contracts | 25 | 5 | 2 | 23 | 0 | 0 | 0 | 0 |
| Webhooks / connectors | 25 | 10 | 3 | 9 | 7 | 6 | 0 | 5 |
| Economy / payments / ledger | 25 | 12 | 3 | 20 | 2 | 0 | 0 | 1 |
| Learning / memory / RAG | 25 | 8 | 2 | 23 | 0 | 0 | 0 | 0 |
| CI/CD / supply chain / evidence | 25 | 2 | 2 | 1 | 6 | 16 | 0 | 2 |
| Containers / Kubernetes / deployment | 25 | 3 | 0 | 3 | 8 | 13 | 1 | 3 |
| Testing / verification / evidence | 25 | 13 | 15 | 2 | 0 | 8 | 0 | 2 |
| Observability / performance / SLO | 25 | 2 | 1 | 23 | 1 | 0 | 0 | 0 |
| Privacy / data governance | 25 | 3 | 9 | 14 | 1 | 1 | 0 | 0 |
| Frontend / UI claims / API truthfulness | 25 | 8 | 1 | 5 | 7 | 12 | 0 | 4 |
| Auth / tenant / authority | 24 | 11 | 3 | 19 | 2 | 0 | 0 | 1 |
| AEGIS / application security | 24 | 7 | 1 | 17 | 4 | 2 | 0 | 0 |
| Persistence / database / BookPI | 24 | 5 | 4 | 13 | 0 | 7 | 0 | 0 |
| Cryptography / key management | 24 | 5 | 3 | 14 | 3 | 4 | 0 | 2 |
| Architecture / documentation / repository governance | 24 | 3 | 13 | 4 | 2 | 5 | 0 | 1 |
| Cross-cutting release integrity | 5 | 2 | 2 | 1 | 0 | 2 | 0 | 0 |

## 5. Hallazgos estructurales (lectura directa)

1. **CI roto en el gate de build:** `.github/workflows/ci.yml` ejecuta `npm run build` → `tsc -p tsconfig.build.json`, y ese archivo **no existe** en el repo → el job `verify` falla (ISA-378, ISA-336).
2. **Sin MoE real:** no hay contrato experts/router/gating/top-k/weights/combine; `adaptive-router` es heurístico y `moe:` es solo prefijo de methodId (ISA-001..006).
3. **PQC solo etiquetas:** ML-KEM/ML-DSA/SLH-DSA declarados como "algorithm labels only" (server.ts:189) y explícitamente NO implementados (triangulated-crypto.ts) (ISA-256).
4. **Sin frontend/SDK UI:** no hay `components/`; los dominios "Frontend / UI claims" quedan sin evidencia (ISA-451..458 y afines).
5. **Sin contenedores/K8s:** no hay `Dockerfile` ni `k8s/`; `src/deployment` cubre solo lógica de despliegue (canary/rollback/readiness) (ISA-355..368).
6. **Webhooks:** primitiva sólida (firma HMAC-SHA256 con `timingSafeEqual`, idempotencia, dedupe) pero sin integración de ruta, sin tenant-mapping, sin redacción de secretos ni verificación por proveedor (ISA-200..217).
7. **Cripto:** sin allowlist de algoritmos JWT (ISA-159) ni registro de nonces único (ISA-259).
8. **Front de evidencia de producción:** solo `scripts/atlas-ingest.ts`; sin suite de seguridad dedicada ni production-gate (ISA-375, ISA-378).

## 6. Ítems P0 sin evidencia o débiles (25)

| ID | Sev | Verdicto | Nota |
|---|---|---|---|
| ISA-003 | P0 | DEBIL | Gating aprendible: no hay logits/softmax/top-k. Falta. |
| ISA-006 | P0 | DEBIL | Combine ponderado: ausente (solo consensus descriptor en genesis/runtime.ts:232). |
| ISA-025 | P0 | INDIRECTO |  |
| ISA-077 | P0 | DEBIL |  |
| ISA-159 | P0 | DEBIL | No se halló allowlist de algoritmos JWT en src/security. Gap real. |
| ISA-200 | P0 | DEBIL | PRIMITIVA presentе: commerce/webhook.ts verifyWebhookSignature (HMAC-SHA256, timingSafeEqual) + createIdempotencyRegistry. Falta integración con ruta connect y tenant. |
| ISA-210 | P0 | DEBIL | ACK semantics: no hay mensajes de ACK normalizados; processWebhookEvent solo registra/deduplica. |
| ISA-212 | P0 | DEBIL | Verificación estilo Slack: el primitivo HMAC sha256= cubre el patrón, pero no hay verificación firmada por proveedor ni replay window. |
| ISA-214 | P0 | DEBIL | Tenant mapping en webhooks: ausente (idempotencyKey solo provider:eventId). |
| ISA-217 | P0 | INDIRECTO | Redacción de secretos: no hay helper; guards.ts evita exponer secretos en errores (INTERNAL). |
| ISA-256 | P0 | DEBIL | ML-DSA real: NO. `server.ts:189` declara algoritmo firma 'labels only'; triangulated-crypto.ts explicita que NO implementa ML-KEM/ML-DSA/SLH-DSA. |
| ISA-259 | P0 | DEBIL | Nonce uniqueness: no se halló registro de nonces. |
| ISA-277 | P0 | DEBIL | Replay prevention: idempotencia webhook cubre evento dedupe; no hay nonce/tiempo para pagos. |
| ISA-325 | P0 | INDIRECTO | Secret scan en CI: ausente (solo archivos de entrada, no gate same-SHA). |
| ISA-336 | P0 | INDIRECTO | Production evidence real outputs: solo scripts/atlas-ingest.ts; sin proveedor de evidencia de producción. |
| ISA-355 | P0 | DEBIL | K8s digest pin: sin k8s/ ni Dockerfile en repo. |
| ISA-362 | P0 | INDIRECTO | K8s secret references: ausente (no manifiestos). |
| ISA-368 | P0 | INDIRECTO | Egress allowlist: ausente (no manifiestos). |
| ISA-375 | P0 | INDIRECTO | Suite de seguridad: no existe script; solo typecheck/test/build en package.json. |
| ISA-378 | P0 | INDIRECTO | Production gate: no existe (build roto: falta tsconfig.build.json). |
| ISA-451 | P0 | INDIRECTO | UI truth MoE: no hay frontend; src/companion y src/isabella son libs backend. |
| ISA-455 | P0 | INDIRECTO | Simulador API con auth: no hay frontend/simulador. |
| ISA-457 | P0 | DEBIL | Frontend tenant context: ausente (no frontend). |
| ISA-458 | P0 | DEBIL | Frontend actor context: ausente (no frontend). |
| ISA-482 | P0 | DEBIL |  |

## 7. Ítems P1/P2 sin evidencia o débiles (118)

| ID | Sev | Verdicto | Nota |
|---|---|---|---|
| ISA-009 | P1 | DEBIL |  |
| ISA-012 | P1 | DEBIL |  |
| ISA-023 | P1 | DEBIL |  |
| ISA-052 | P1 | DEBIL |  |
| ISA-056 | P1 | INDIRECTO |  |
| ISA-059 | P1 | INDIRECTO |  |
| ISA-060 | P1 | DEBIL |  |
| ISA-062 | P1 | INDIRECTO |  |
| ISA-068 | P1 | DEBIL |  |
| ISA-070 | P1 | INDIRECTO |  |
| ISA-073 | P1 | SIN_EVIDENCIA |  |
| ISA-087 | P1 | INDIRECTO |  |
| ISA-097 | P1 | INDIRECTO |  |
| ISA-156 | P1 | DEBIL |  |
| ISA-183 | P1 | INDIRECTO |  |
| ISA-185 | P1 | DEBIL |  |
| ISA-187 | P1 | DEBIL |  |
| ISA-195 | P1 | DEBIL |  |
| ISA-197 | P1 | INDIRECTO |  |
| ISA-198 | P1 | DEBIL |  |
| ISA-201 | P1 | DEBIL |  |
| ISA-202 | P1 | INDIRECTO |  |
| ISA-204 | P1 | INDIRECTO |  |
| ISA-207 | P1 | DEBIL |  |
| ISA-208 | P1 | INDIRECTO |  |
| ISA-215 | P1 | DEBIL |  |
| ISA-232 | P1 | INDIRECTO |  |
| ISA-233 | P1 | INDIRECTO |  |
| ISA-240 | P1 | INDIRECTO |  |
| ISA-241 | P1 | INDIRECTO |  |
| ISA-242 | P1 | INDIRECTO |  |
| ISA-244 | P1 | INDIRECTO |  |
| ISA-251 | P1 | INDIRECTO |  |
| ISA-252 | P1 | INDIRECTO |  |
| ISA-253 | P1 | DEBIL |  |
| ISA-261 | P1 | INDIRECTO |  |
| ISA-270 | P1 | INDIRECTO |  |
| ISA-289 | P1 | DEBIL |  |
| ISA-323 | P1 | DEBIL |  |
| ISA-324 | P1 | INDIRECTO |  |
| ISA-326 | P1 | DEBIL |  |
| ISA-327 | P1 | INDIRECTO |  |
| ISA-328 | P1 | DEBIL |  |
| ISA-329 | P1 | DEBIL |  |
| ISA-330 | P1 | INDIRECTO |  |
| ISA-331 | P1 | INDIRECTO |  |
| ISA-332 | P1 | INDIRECTO |  |
| ISA-333 | P1 | INDIRECTO |  |
| ISA-334 | P1 | INDIRECTO |  |
| ISA-335 | P1 | DEBIL |  |
| ISA-337 | P1 | INDIRECTO |  |
| ISA-338 | P1 | INDIRECTO |  |
| ISA-339 | P1 | INDIRECTO |  |
| ISA-340 | P1 | INDIRECTO |  |
| ISA-341 | P1 | INDIRECTO |  |
| ISA-342 | P1 | INDIRECTO |  |
| ISA-343 | P1 | DEBIL |  |
| ISA-347 | P1 | DEBIL |  |
| ISA-348 | P1 | INDIRECTO |  |
| ISA-349 | P1 | INDIRECTO |  |
| ISA-350 | P1 | INDIRECTO |  |
| ISA-353 | P1 | INDIRECTO |  |
| ISA-354 | P1 | INDIRECTO |  |
| ISA-360 | P1 | DEBIL |  |
| ISA-361 | P1 | DEBIL |  |
| ISA-363 | P1 | DEBIL |  |
| ISA-366 | P1 | DEBIL |  |
| ISA-367 | P1 | INDIRECTO |  |
| ISA-369 | P1 | INDIRECTO |  |
| ISA-371 | P1 | INDIRECTO |  |
| ISA-373 | P1 | INDIRECTO |  |
| ISA-374 | P1 | INDIRECTO |  |
| ISA-376 | P1 | INDIRECTO |  |
| ISA-377 | P1 | INDIRECTO |  |
| ISA-395 | P1 | INDIRECTO |  |
| ISA-396 | P1 | INDIRECTO |  |
| ISA-411 | P1 | DEBIL |  |
| ISA-436 | P1 | INDIRECTO |  |
| ISA-449 | P1 | DEBIL |  |
| ISA-450 | P1 | DEBIL |  |
| ISA-452 | P1 | INDIRECTO |  |
| ISA-453 | P1 | INDIRECTO |  |
| ISA-454 | P1 | INDIRECTO |  |
| ISA-465 | P1 | INDIRECTO |  |
| ISA-466 | P1 | INDIRECTO |  |
| ISA-468 | P1 | DEBIL |  |
| ISA-470 | P1 | INDIRECTO |  |
| ISA-471 | P1 | INDIRECTO |  |
| ISA-476 | P1 | INDIRECTO |  |
| ISA-479 | P1 | INDIRECTO |  |
| ISA-480 | P1 | INDIRECTO |  |
| ISA-481 | P1 | INDIRECTO |  |
| ISA-497 | P1 | INDIRECTO |  |
| ISA-500 | P1 | INDIRECTO |  |
| ISA-057 | P2 | INDIRECTO |  |
| ISA-058 | P2 | DEBIL |  |
| ISA-063 | P2 | INDIRECTO |  |
| ISA-071 | P2 | DEBIL |  |
| ISA-072 | P2 | DEBIL |  |
| ISA-096 | P2 | INDIRECTO |  |
| ISA-209 | P2 | INDIRECTO |  |
| ISA-222 | P2 | INDIRECTO |  |
| ISA-243 | P2 | INDIRECTO |  |
| ISA-344 | P2 | INDIRECTO |  |
| ISA-351 | P2 | DEBIL |  |
| ISA-352 | P2 | DEBIL |  |
| ISA-357 | P2 | INDIRECTO |  |
| ISA-358 | P2 | SIN_EVIDENCIA |  |
| ISA-359 | P2 | INDIRECTO |  |
| ISA-364 | P2 | INDIRECTO |  |
| ISA-433 | P2 | DEBIL |  |
| ISA-459 | P2 | DEBIL |  |
| ISA-460 | P2 | INDIRECTO |  |
| ISA-462 | P2 | DEBIL |  |
| ISA-467 | P2 | INDIRECTO |  |
| ISA-469 | P2 | INDIRECTO |  |
| ISA-477 | P2 | INDIRECTO |  |
| ISA-478 | P2 | DEBIL |  |

## 8. Recomendaciones priorizadas

1. **P0 PQC honesto:** sustituir "labels only" por firma real verificable (p. ej. implementación propia de Ed25519 + capa de incertidumbre documentada para ML-DSA, o integración HSM) — ISA-256, ISA-246.
2. **Reparar CI:** crear `tsconfig.build.json` (o fijar `build` a `tsc --noEmit`) para que el gate de producción deje de fallar; añadir job de tests con lockfile (`pnpm install --frozen-lockfile`) — ISA-378, ISA-336, ISA-375.
3. **MoE mínimo verificable:** contrato `MoEContract` con expert registry (hash/versión/licencia), router con logits + top-k determinista y combine ponderado con fallback; pruebas automatizadas — ISA-001..006.
4. **Webhooks en producción:** ruta `/api/v1/connectors/...` + verify por proveedor + ttl/replay + tenant-mapping + redacción de secretos en logs — ISA-200..217.
5. **Security hardening:** allowlist de algoritmos JWT, nonce/par en approval, sanitización de headers — ISA-159, ISA-259.
6. **Contenedores/K8s:** Dockerfile multi-stage + manifiestos con digest pin, secrets (no literales), egress allowlist — ISA-355..368.
7. **Frontend truthfulness:** generar un catálogo de API consumible (los claims del UI deben mapear a endpoints verificados) — ISA-451..458.
8. **Cada P0 cerrado debe registrar evidencia BookPI** (ledger append-only) y pasar arbitraje humano antes de `state: wired`.

*Matriz íntegra de los 500 puntos: `500-POINT-REAUDIT-V6.csv` (misma carpeta).*
