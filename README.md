# Isabella Villaseñor AI — Genesis TINA V6

> **Trusted Intelligence, Native & Adaptive** — runtime cognitivo gobernado, auditable y federable.

**Repositorio canónico:** Isabella-Villase-or-GenesisAI
**Corte de revisión:** 9 de octubre de 2026
**Clasificación auditada:** runtime cognitivo gobernado modular en fase preproductiva.
**Rama de evolución en revisión:** `feature/canonical-libraries-governance`
**Estado de CI:** no declarar verde hasta verificar los checks del SHA final de esta rama.
**Runtime canónico:** Isabella Villaseñor GenesisAI. Los demás componentes y repositorios se integran como módulos, protocolos, skills, adaptadores, proveedores, persistencia o infraestructura.
**No es:** un modelo fundacional propio, AGI, certificación jurídica, certificación de seguridad ni una plataforma de producción completa.

**Regla de veracidad:** `CONTRACT ≠ IMPLEMENTED ≠ TESTED ≠ INTEGRATED ≠ VERIFIED ≠ DEPLOYED ≠ CERTIFIED`. Los fixtures, simulaciones y proveedores no configurados deben etiquetarse como tales; nunca deben producir `VERIFIED`, `COMPLIANT`, `ANCHORED` o `SYNCED` sin verificación real.

- Auditoría de evolución del ecosistema: [docs/ECOSYSTEM_EVOLUTION_AUDIT_2026-10-09.md](docs/ECOSYSTEM_EVOLUTION_AUDIT_2026-10-09.md)
- Auditoría Genesis V6: [docs/AUDIT_GENESIS_V6_2026-10-08.md](docs/AUDIT_GENESIS_V6_2026-10-08.md)
- Configuración segura: [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md)
- Política de seguridad: [SECURITY.md](SECURITY.md)

## DIRECTIVA ARQUITECTÓNICA CANÓNICA

**Isabella Villaseñor GenesisAI es el proyecto principal y el único runtime soberano del ecosistema.**

Los repositorios externos y proyectos relacionados no se consideran runtimes paralelos. Se integran bajo Genesis como:

- módulos;
- skills;
- protocolos;
- adaptadores;
- proveedores especializados;
- persistencia;
- evidencia;
- infraestructura.

La relación con Atlas, LITLE, BookPI y los componentes derivados queda subordinada a Genesis Runtime.

### Puente de Open Science Quantum

GenesisAI incorpora un puente gobernado hacia el ecosistema **PennyLaneAI**:

- PennyLane — computación cuántica, QML y química cuántica.
- PennyLane-Lightning — simulación de alto rendimiento.
- Catalyst — compilación JIT de workflows híbridos.
- PennyLane-Qiskit — interoperabilidad con Qiskit/IBM.

El puente no copia ni reemplaza esos proyectos. Isabella conserva identidad, autoridad, CROWN, AEGIS, evidencia, IKES, VERITAS, LITLE, BookPI y observabilidad; PennyLane proporciona capacidades cuánticas especializadas.

Documentación: `docs/ISABELLA_PENNYLANE_BRIDGE.md`.


## Hyper Skill Fabric (HSF)

GenesisAI incorpora un **Hyper Skill Fabric** como capa canónica de capacidades. No es un segundo runtime ni modifica el modelo fundacional: registra capacidades desacopladas y las invoca mediante un gateway gobernado.

Capacidades iniciales:

- Memory Fabric
- Execution Fabric
- Knowledge Fabric
- Collective Consensus
- Truth Verification
- Architecture Reasoning
- Digital Twin
- Strategic Intelligence
- Self Evaluation
- Massive Context Parallel

Endpoints gobernados:

```
GET  /api/v1/hsf/status
POST /api/v1/hsf/invoke
```

La implementación actual proporciona contratos y proveedores locales de referencia. PostgreSQL, Qdrant, Neo4j, Redis, Temporal, Kubernetes, MCP y otros proveedores se incorporarán detrás de estos contratos; no se presentan como conectados mientras no exista evidencia de integración real.

Documentación: `docs/ISABELLA_HYPER_SKILL_FABRIC.md`.

## Evolución de seguridad y gobernanza — 9 de octubre de 2026

La rama de evolución incorpora contratos nativos de sanitización, conocimiento canónico IKES, gates de despliegue, manifiestos de evidencia, gobernanza Git, ciclo de vida y observación de diffs. La auditoría detectó y corrigió riesgos en los límites entre simulación y verificación:

- El contenido que activa cuarentena por secretos no se devuelve; el detalle del hallazgo no revela el fragmento sensible.
- Los documentos sin licencia o procedencia declarada no se admiten como conocimiento.
- IKES valida el formato del hash SHA-256, fecha y URI, y rechaza reutilizar un identificador de fuente con otro hash.
- Las rutas administrativas de admisión requieren `GENESIS_ADMIN_API_TOKEN`; HSF requiere `HSF_API_TOKEN`. Las propuestas públicas quedan en una cola volátil de revisión y no mutan IKES. Los roles declarados por el cliente no se aceptan como autoridad. Los endpoints públicos aplican rate limits locales por proceso.
- La ingesta calcula el hash del contenido aportado, pero **no descarga ni autentica automáticamente el recurso remoto**. La procedencia se etiqueta `USER_SUPPLIED_CONTENT_HASHED_NOT_REMOTE_VERIFIED`.
- El pipeline IKES bloquea el release sin claim, evidencia, auditoría, commit Git válido e índice confirmado. Como no hay índice durable conectado en este runtime, una propuesta no se presenta como conocimiento liberado.
- BookPI dispone de una cadena SHA-256 en memoria verificada durante la vida del proceso, pero no de WORM durable; HSM/criptografía poscuántica, sincronización del gemelo digital, RLS y cumplimiento normativo permanecen `NOT_CONFIGURED`, `NOT_VERIFIED` o `NOT_ASSESSED` hasta que exista un adaptador real y evidencia reproducible.

**Licencias:** el `LICENSE` de este repositorio es MIT. Otros repositorios Isabella pueden declarar licencias híbridas con restricciones separadas para código, marca, documentación y activos propietarios. No se importan automáticamente archivos de otra licencia al árbol MIT; se exige revisar la licencia del archivo, dependencias y derechos sobre datos/marca.

La implementación no equivale a certificación ni a readiness de producción. La validación requerida es `npm run typecheck`, `npm test` y `npm run build` en el SHA exacto que se pretenda liberar.

## 1. ¿Qué es Isabella Genesis TINA?

Isabella Genesis TINA es una arquitectura de software para construir y operar sistemas de inteligencia artificial bajo una separación estricta entre:

```text
CAPABILITY ≠ AUTHORITY ≠ EXECUTION ≠ EVIDENCE ≠ LEARNING ≠ PRODUCTION
```

El repositorio implementa el **plano de control y runtime gobernado** que rodea la inferencia: identidad, autoridad, políticas, seguridad, memoria epistemológica, herramientas, skills, verificación, observabilidad, evolución y despliegue.

La visión documental del ecosistema Isabella/TAMV añade soberanía tecnológica, operación federada, memoria territorial, BookPI, YUN y TINA. Esas especificaciones sirven como arquitectura objetivo; este README describe exclusivamente el estado que puede atribuirse al código de este repositorio.

La especificación técnica de Isabella plantea una arquitectura modular, interoperable, resiliente y con capacidades cognitivas, sensoriales, de seguridad y gobernanza.

---

## 2. ¿Qué problema resuelve?

Isabella Genesis busca impedir que una capacidad de IA obtenga autoridad simplemente porque existe técnicamente.

El pipeline conceptual es:

```text
REQUEST
   ↓
INGRESS / NORMALIZATION
   ↓
IDENTITY
   ↓
CROWN — intent + risk + capability + verification
   ↓
AEGIS — security inspection
   ↓
IKES — epistemic memory / provenance
   ↓
ADAPTIVE PLAN
   ↓
TOOLS / SKILLS / INFERENCE
   ↓
VERITAS — verification
   ↓
BOOKPI — evidence / provenance
   ↓
TELEMETRY
   ↓
RESPONSE / AUDIT
```

Una aceleración puede hacer el cálculo más rápido, pero no puede saltarse autoridad, consentimiento, seguridad, evidencia o gobernanza.

---

# 3. Arquitectura funcional actual

| Plano | Función | Estado actual |
|---|---|---|
| Ingress | Normalización, límites y presupuesto | **IMPLEMENTADO / PARCIAL** |
| Identity & Authority | Principal, roles, ABAC, consentimiento | **IMPLEMENTADO** |
| CROWN | Intención, riesgo, capability y verificación | **IMPLEMENTADO** |
| AEGIS | Detección de amenazas y policy evasion | **IMPLEMENTADO** |
| IKES | Memoria epistemológica y provenance | **IMPLEMENTADO** |
| Inference | Registro y routing de modelos | **IMPLEMENTADO / PARCIAL** |
| Vector Memory | Similaridad vectorial local | **IMPLEMENTADO** |
| Retrieval | Consulta híbrida IKES + vector | **IMPLEMENTADO / PARCIAL** |
| Veritas | Selección/verificación determinista | **IMPLEMENTADO / PARCIAL** |
| Tools | Registry, scopes, AEGIS, approval, receipts | **IMPLEMENTADO** |
| Skills | Registry, evidencia, riesgo, approval | **IMPLEMENTADO** |
| Evolution | Controles, evidencia y lifecycle | **IMPLEMENTADO / PARCIAL** |
| BookPI | Provenance/ledger | **IMPLEMENTADO / PARCIAL** |
| Observability | Métricas runtime | **IMPLEMENTADO / PARCIAL** |
| Federation | Territory Packs | **IMPLEMENTADO / PARCIAL** |
| Evaluation | Benchmark y security suites | **IMPLEMENTADO / PARCIAL** |
| Deployment | Readiness + rollback registry | **IMPLEMENTADO / PARCIAL** |
| Native ML | Entrenamiento/inferencia nativa | **NO IMPLEMENTADO** |
| GPU runtime | Scheduler/KV cache/batching | **NO IMPLEMENTADO** |
| Distributed runtime | Workers/queues/cluster execution | **NO IMPLEMENTADO** |

---

# 4. ¿Qué funciones tiene Isabella?

Las funciones se agrupan por capacidad. Una función descrita aquí sólo se considera disponible cuando existe código ejecutable o un contrato explícito; no se cuentan ideas del blueprint como implementación.

## 4.1 Gobierno y autoridad

- Identificar al principal que origina una operación.
- Aplicar RBAC/ABAC.
- Evaluar contexto y políticas.
- Requerir aprobación humana para operaciones privilegiadas.
- Vincular una aprobación a:
  - método;
  - acción;
  - recurso;
  - principal;
  - contexto;
  - versión de política.
- Aplicar expiración y nonce.
- Denegar capacidades desconocidas.
- Mantener separación entre capacidad y autoridad.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

## 4.2 CROWN

CROWN funciona como plano de decisión previo a la ejecución.

Funciones:

- clasificación de intención;
- evaluación contextual;
- clasificación de riesgo;
- verificación de capability;
- detección de ambigüedad;
- evaluación de autorización;
- decisión de admisión;
- refusal cuando corresponde.

La confianza heurística se etiqueta como heurística; no se presenta como probabilidad calibrada.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

## 4.3 AEGIS

AEGIS inspecciona entradas antes de operaciones sensibles.

Detecta actualmente familias como:

- prompt injection;
- indirect injection;
- secret exfiltration;
- PII;
- tool poisoning;
- retrieval poisoning;
- policy evasion.

Decisiones:

```text
ALLOW
MODIFY
REVIEW
BLOCK
```

Las señales críticas producen bloqueo.

**Límite:** el detector actual es principalmente basado en reglas; no equivale a un sistema ML de detección adversarial completo.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 5. Memoria IKES

IKES separa memoria de verdad.

Niveles epistemológicos:

```text
E0_UNVERIFIED
E1_SOURCE_FOUND
E2_CORROBORATED
E3_ACADEMICALLY_SUPPORTED
E4_REPRODUCIBLE
E5_VALIDATED
E6_ESTABLISHED
```

Estados negativos:

```text
DISPUTED
REJECTED
DEPRECATED
```

La memoria conserva provenance, temporalidad y estado epistemológico.

Actualmente existen:

- motor IKES;
- memoria de claims;
- vector store en memoria;
- embeddings mediante adaptador;
- retrieval gobernado;
- persistencia en memoria como abstracción;
- digest SHA-256 del vector store.

Pendiente:

- PostgreSQL/pgvector como backend operativo;
- ingestión documental completa;
- chunking productivo;
- reranking;
- pipeline RAG completo;
- provenance persistente extremo a extremo.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 6. Inference Plane

El runtime ya tiene un contrato neutral para proveedores.

Componentes:

```text
ModelDescriptor
GenerationRequest
GenerationResult
InferenceAdapter
EmbeddingAdapter
GovernedInferenceRouter
ModelRegistry
OpenAI-Compatible Adapter
TTL Cache
```

El router:

- registra modelos;
- evita duplicados;
- exige capacidad `chat` para generación;
- valida prompt;
- valida token budget;
- valida context window;
- selecciona por clase de latencia;
- verifica consistencia del `modelId`;
- registra latencia.

### Lo que NO significa

El adaptador HTTP compatible con APIs tipo OpenAI **no significa que Isabella posea un modelo fundacional propio**.

Tampoco están implementados todavía:

- GPU scheduler;
- KV cache de transformer;
- continuous batching;
- speculative decoding real;
- serving distribuido;
- entrenamiento nativo;
- MoE físico con expertos ejecutables.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 7. Tools — ¿qué son?

Una **Tool** es una capacidad ejecutable que Isabella puede invocar para producir un efecto o consultar un sistema.

Ejemplos conceptuales:

```text
tool:search
tool:retrieve
tool:bookpi.register
tool:bookpi.verify
tool:territory.read
tool:model.generate
tool:telemetry.emit
```

El repositorio actualmente implementa el **ToolRegistry**, no un catálogo enorme de herramientas productivas preconectadas.

Cada Tool registrada posee:

- `id`;
- `version`;
- `methodId`;
- `owner`;
- `riskTier`;
- `scopes`;
- descripción;
- función `execute()`.

El registry controla:

1. existencia de la herramienta;
2. scope;
3. inspección AEGIS;
4. aprobación humana para HIGH/CRITICAL;
5. ejecución;
6. hash de entrada;
7. hash de salida;
8. receipt;
9. estado `ok/error/blocked`.

### Tool Receipt

Cada ejecución deja:

```text
receiptId
toolId
methodId
principalId
inputHash
outputHash
startedAt
completedAt
status
```

Esto convierte una llamada de herramienta en un acto trazable.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

**Importante:** actualmente el catálogo de tools no equivale a cientos de integraciones productivas. Las herramientas deben registrarse explícitamente.

---

# 8. Skills — ¿qué son?

Una **Skill** es una capacidad cognitiva/procedimental reutilizable. No debe confundirse con una Tool.

| Tool | Skill |
|---|---|
| Ejecuta una operación | Ejecuta un procedimiento cognitivo |
| Puede producir efectos externos | Normalmente transforma/analiza contexto |
| Tiene scope operativo | Tiene señales, evidencia y contexto |
| Puede requerir aprobación | Puede requerir evidencia y aprobación |
| Genera receipt | Genera invocation record |

Ejemplo conceptual:

```text
Skill:
  analyze_territory
  summarize_evidence
  compare_sources
  classify_risk
  verify_claim
  prepare_governance_proposal
```

El `SkillRegistry` actual controla:

- id;
- versión;
- Method ID;
- risk tier;
- requisito de evidencia;
- contexto;
- señales;
- AEGIS;
- aprobación para HIGH/CRITICAL;
- estado de invocación.

Una skill que exige evidencia y recibe cero señales queda bloqueada.

Una skill HIGH/CRITICAL sin aprobación humana válida queda bloqueada.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 9. Tools vs Skills vs Functions vs Models

Esta distinción es central:

```text
MODEL
  ↓ produce inferencia

FUNCTION
  ↓ capacidad conceptual del sistema

SKILL
  ↓ procedimiento cognitivo reutilizable

TOOL
  ↓ operación ejecutable

AUTHORITY
  ↓ determina si puede ejecutarse

EVIDENCE
  ↓ determina qué puede afirmarse

PRODUCTION
  ↓ determina si está realmente desplegado
```

No se debe contabilizar una capacidad seis veces por aparecer en seis documentos.

---

# 10. Veritas

Veritas es el plano de verificación.

Actualmente existe un verificador determinista que:

- rechaza conjuntos vacíos;
- rechaza outputs vacíos;
- compara candidatos;
- selecciona el candidato con mayor score;
- calcula digest SHA-256.

Esto constituye el núcleo determinista inicial.

No equivale todavía a:

- ensemble de verificadores especializados;
- fact checking externo;
- NLI;
- ejecución simbólica;
- proof-carrying generation;
- verifier fan-out distribuido.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 11. HYPERCORE y aceleración

La arquitectura define tres familias:

### VECTOR

```text
PREFIX_CACHE
SEMANTIC_CACHE
```

### SPECULATIVE

```text
DRAFT_MODEL
PARALLEL_BRANCHES
```

### VERITAS

```text
VERIFIER_FANOUT
EARLY_EXIT
```

El principio obligatorio es:

> La aceleración sólo puede reducir cómputo; nunca puede reducir autoridad.

Actualmente existen contratos y routing primitives. No debe afirmarse que el repositorio ya contiene un servidor GPU con speculative decoding o KV cache de producción.

---

# 12. BookPI

BookPI es el plano de provenance y evidencia.

La especificación documental define:

- chunking;
- SHA-256 por chunk;
- Merkle tree;
- pruebas de inclusión;
- commitments;
- ledger append-only;
- encadenamiento criptográfico;
- trazabilidad;
- reparto de derechos.

La documentación técnica propone incluso un modelo con chunks de 64 KiB y Merkle proofs O(log N).

En este repositorio existe una implementación de BookPI orientada a eventos y canonical event core, con controles de integridad y persistencia PostgreSQL.

### Lo que todavía requiere infraestructura

- despliegue PostgreSQL real;
- permisos WORM efectivos;
- operación multi-nodo;
- backups;
- restore drills;
- anclaje externo;
- auditoría independiente.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 13. YUN

YUN es la arquitectura de datos y operación transversal.

Sus reglas estructurales incluyen:

- una verdad por dominio;
- evento antes que acoplamiento;
- secretos fuera del código;
- ausencia de acceso directo entre dominios;
- gateway central;
- observabilidad obligatoria;
- resiliencia degradable;
- gobernanza formal.

Estas reglas están definidas como constitución arquitectónica en la documentación proporcionada.

Para Isabella, YUN es principalmente una **arquitectura de coordinación y datos**, no un reemplazo del runtime cognitivo.

---

# 14. Federation / Territory Packs

La federación permite representar contexto territorial y jurisdiccional sin convertirlo en una autoridad global implícita.

El runtime incorpora Territory Packs verificables como contrato de federación.

Pendiente para producción:

- almacenamiento persistente;
- distribución;
- firma/rotación operacional;
- reconciliación;
- resolución de conflictos entre jurisdicciones;
- federación multi-región real.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 15. Evolution Fabric

El sistema contiene una matriz de **7,000 controles**.

Esto significa:

> 7,000 controles catalogados.

No significa:

> 7,000 capacidades terminadas.

El lifecycle se orienta por evidencia y evita convertir hashes o metadatos en “prueba” artificial.

Estados y transiciones deben mantenerse ligados a evidencia verificable.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 16. Observabilidad

El runtime posee primitivas para:

- request latency;
- TTFT;
- tokens/s;
- cache hits;
- speculative acceptance;
- security blocks;
- tool execution;
- request totals.

Actualmente existe telemetry in-process.

Pendiente:

- OpenTelemetry Collector;
- Prometheus;
- Grafana;
- Loki/Tempo;
- alerting productivo;
- SLO enforcement;
- trazas distribuidas;
- almacenamiento de series temporales.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 17. Evaluation Lab

Existen dos superficies principales:

### Benchmark

Permite definir:

- caso;
- prompt;
- expected output;
- tags;
- latencia;
- resultado.

### Security Suite

Permite probar:

- input;
- decisión esperada;
- bloqueo esperado;
- regresiones de seguridad.

Pendiente:

- dataset versionado;
- scoring semántico;
- benchmarks externos;
- red-team continuo;
- mutation testing;
- fuzzing;
- load testing;
- evaluación de modelos;
- evaluación epistemológica a gran escala.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 18. Deployment Plane

Existe:

- readiness report;
- checks de typecheck;
- tests;
- build;
- secrets;
- database;
- model;
- observability;
- rollback registry.

Un deployment se considera bloqueado si falta cualquiera de los checks obligatorios.

Esto es un **control de readiness**, no una plataforma Kubernetes completa.

Pendiente:

- canary real;
- blue/green real;
- health gates conectados;
- rollback automático;
- workers;
- queues;
- multi-region;
- disaster recovery probado.

**Estado: estimación histórica no auditada; revisar la matriz de evidencias.**

---

# 19. Matriz de avance

Los porcentajes son un índice de ingeniería interno con rúbrica versionada y evidencia reproducible por fase (typecheck + suite de tests en verde al momento de la medición). No son métricas auditadas ni certificaciones externas; véase la sección de auditoría al final.

### Avance real funcional hacia producción (rúbrica v1, 2026-10-09)

El avance se calcula como suma ponderada sobre 16 fases: `∑ peso_i × avance_i`, con pesos que suman 100.

| # | Fase | Peso | Avance | Evidencia |
|---|---|---|---:|---|
| 1 | Fundaciones (core, invariantes, method-id, canon v40) | 5 | 100% | tests + typecheck |
| 2 | INGRESS (normalización, límites, traza, admisión fail-closed) | 5 | 100% | tests |
| 3 | IDENTITY & AUTHORITY (principal, RBAC, PDP, consentimiento, tenant, aprobación ligada) | 9 | 100% | tests |
| 4 | CROWN (intención, riesgo, capability gate, verificación) | 8 | 100% | tests |
| 5 | ORION SANDBOX + Pipeline conductor (6 etapas selladas en BookPI) | 7 | 100% | tests |
| 6 | EVOLUTION (catálogo 73 dominios × 10 ejes × 10 primitivas, manifests, hypercore) | 6 | 100% | tests |
| 7 | BookPI (ledger append-only, merkle, emisor, almacenes, royalties) | 8 | 100% | tests |
| 8 | Memory / IKES (consentimiento, conocimiento, proposiciones) | 5 | 100% | tests |
| 9 | Security / AEGIS / Sanitización / Crypto triangulada | 8 | 100% | tests |
| 10 | Governance / Veritas / Evaluation | 6 | 80% | tests; datasets externos y CI end-to-end pendientes |
| 11 | Inference / Tools / Skills / Federation / Observability / Deployment | 8 | 90% | tests; modelos y collectors externos pendientes |
| 12 | COMMERCE (planes, candados, antifraude, ingresos y estadísticas, webhooks idempotentes, guards API, RLS) | 9 | 100% | tests |
| 13 | API runtime (server.ts, isa-api) | 5 | 80% | rutas implementadas; e2e HTTP integral pendiente |
| 14 | Infra / ops (migraciones SQL, CI, .env, docs, READINESS) | 5 | 60% | migraciones y docs presentes; persistencia y CI verde pendientes |
| 15 | Native ML / GPU / workers distribuidos | 4 | 5% | PROPOSED |
| 16 | Certificación / auditoría externa | 2 | 0% | pendiente |

**Avance global de implementación: ≈89%** (rúbrica v1, 2026-10-09; `pnpm typecheck` + `pnpm test`, 366 tests en verde).

Línea de evidencia funcional (cambios este ciclo): fase ORION SANDBOX + pipeline conductor y capa COMMERCE (prototipo final empresarial: planes FREE/PREMIUM/VIP/ENTERPRISE, candados operativos, antifraude, ingresos netos confirmados, estadísticas con confianza, webhooks HMAC idempotentes y RLS por workspace).

### Readiness productivo

**≈18%** (rúbrica v1, 2026-10-09).

La diferencia existe porque tener código implementado no implica disponer de:

| Factor productivo | Estado | |
|---|---|---|
| Persistencia operativa (PostgreSQL + migraciones) | Migraciones listas, despliegue pendiente | 40% |
| CI verde sobre V6 | Workflow presente, validación pendiente | 10% |
| Observabilidad productiva (OTEL collector) | Parcial | 40% |
| Backups / restores | Pendiente | 0% |
| Pruebas de carga | Pendiente | 0% |
| Rollback automático | Canary/rollback codificado | 50% |
| Modelos servidos | Dependencia externa; runtime local | 30% |
| Auditoría externa | Pendiente | 0% |

---

# 20. Categorización de madurez

Se utiliza la siguiente taxonomía:

| Estado | Significado |
|---|---|
| **PROPOSED** | Idea o arquitectura propuesta |
| **CONTRACT** | Interfaz/type/API definida |
| **IMPLEMENTED** | Código ejecutable presente |
| **TESTED** | Existe prueba automatizada |
| **EVIDENCED** | Evidencia reproducible de comportamiento |
| **INTEGRATED** | Conectado a infraestructura real |
| **PRODUCTION** | Operación productiva demostrada |
| **CERTIFIED** | Certificación externa válida |

Regla:

```text
PROPOSED < CONTRACT < IMPLEMENTED < TESTED < EVIDENCED
          < INTEGRATED < PRODUCTION < CERTIFIED
```

Una interfaz nunca se cuenta automáticamente como producción.

---

# 21. Estado real por componente

| Componente | Código | Tests | Infraestructura | Clasificación |
|---|---|---|---|---|
| CROWN | Sí | Sí | Parcial | IMPLEMENTED / TESTED |
| AEGIS | Sí | Sí | Parcial | IMPLEMENTED / TESTED |
| Identity/PDP | Sí | Sí | Parcial | IMPLEMENTED / TESTED |
| Human Approval | Sí | Sí | Externa | IMPLEMENTED / TESTED |
| Pipeline conductor (6 etapas) | Sí | Sí | Local | IMPLEMENTED / TESTED |
| ORION Sandbox | Sí | Sí | Local | IMPLEMENTED / TESTED |
| Commerce (planes/locks/antifraude/ingresos/webhooks/guards) | Sí | Sí | PostgreSQL + RLS requeridas | IMPLEMENTED / TESTED |
| IKES | Sí | Sí | Local | IMPLEMENTED / TESTED |
| Vector Memory | Sí | Sí | Local | IMPLEMENTED / TESTED |
| Retrieval | Sí | Parcial | Local | IMPLEMENTED |
| Inference Router | Sí | Sí | Externa | IMPLEMENTED / TESTED |
| OpenAI-compatible adapter | Sí | Parcial | Externa | IMPLEMENTED |
| Tools Registry | Sí | Sí | Depende de tools | IMPLEMENTED / TESTED |
| Skills Registry | Sí | Sí | Depende de skills | IMPLEMENTED / TESTED |
| Veritas | Sí | Sí | Local | IMPLEMENTED / TESTED |
| Evolution | Sí | Sí | Parcial | IMPLEMENTED / TESTED |
| BookPI | Sí | Sí | PostgreSQL requerida | IMPLEMENTED / PARTIAL |
| Telemetry | Sí | Parcial | Collector requerido | IMPLEMENTED / PARTIAL |
| Territory Packs | Sí | Parcial | Federación requerida | IMPLEMENTED / PARTIAL |
| Evaluation | Sí | Sí | Dataset externo requerido | IMPLEMENTED / TESTED |
| Readiness | Sí | Sí | CI/CD requerido | IMPLEMENTED / TESTED |
| GPU runtime | No | No | Requerida | PROPOSED |
| Native ML | No | No | Requerida | PROPOSED |
| Distributed workers | No | No | Requerida | PROPOSED |

---

# 22. Árbol funcional

```text
Isabella Genesis TINA
│
├── Authority
│   ├── Identity
│   ├── Principal
│   ├── RBAC
│   ├── ABAC
│   ├── Consent
│   └── Human Approval
│
├── Security
│   ├── CROWN
│   ├── AEGIS
│   └── Security Policies
│
├── Cognition
│   ├── Inference Router
│   ├── Model Registry
│   ├── Adaptive Router
│   └── Veritas
│
├── Memory
│   ├── IKES
│   ├── Vector Store
│   ├── Retrieval
│   └── Persistence abstraction
│
├── Action
│   ├── Tools
│   └── Skills
│
├── Evidence
│   ├── BookPI
│   ├── Hashes
│   └── Receipts
│
├── Evolution
│   ├── Controls
│   ├── Evidence
│   ├── Proposals
│   └── Lifecycle
│
├── Federation
│   └── Territory Packs
│
├── Observability
│   ├── Metrics
│   ├── Latency
│   ├── Tokens/s
│   └── Security events
│
└── Deployment
    ├── Readiness
    └── Rollback
```

---

# 23. API / código público principal

## Runtime

```ts
const runtime = new IsabellaGenesisRuntime();

const decision = runtime.evaluate(input);

const result = await runtime.generate({
  prompt: "consulta",
  maxTokens: 256,
});
```

## Tool

```ts
runtime.tools.register({
  id: "example.tool",
  version: "1.0.0",
  methodId: "T.TOURISM.E06_UX.example.v1.0.0.LOW.TERRITORIAL",
  owner: "example-owner",
  riskTier: "LOW",
  scopes: ["read"],
  description: "Example tool",
  execute: async (input) => ({ input }),
});
```

## Skill

```ts
runtime.skills.register({
  id: "example.skill",
  version: "1.0.0",
  methodId: "I.IDENTITY.E01.example.v1.0.0.MEDIUM.INSTITUTIONAL",
  riskTier: "MEDIUM",
  requiresEvidence: true,
  handler: async (ctx) => ({
    requestId: ctx.requestId,
    signals: ctx.signals,
  }),
});
```

---

# 24. Estructura del repositorio

```text
src/
├── authority/
├── crown/
├── identity/
├── ingress/
├── security/
│   └── aegis.ts
├── memory/
│   ├── ikes.ts
│   ├── vector.ts
│   ├── retrieval.ts
│   ├── persistence.ts
│   └── knowledge-entry.ts     # IKES_SPEC: entrada canónica KNO + pipeline
├── sanitization/              # SANITIZATION_POLICY: pipeline + hardening 2.0
├── bookpi/
│   ├── merkle.ts              # chunking 64 KiB + Merkle + ZK commitment
│   └── royalties.ts           # liquidación BigInt de 7 federaciones
├── atlas/
│   ├── documents.ts           # document_uid canónico + estados
│   └── events.ts              # 15 eventos canónicos tipados
├── governance/                # políticas operativas (ver §31)
│   ├── evidence-manifest.ts
│   ├── git-governance.ts
│   ├── lsp-validation.ts
│   ├── sync-manager.ts
│   ├── deployment-gates.ts
│   ├── verifier.ts
│   ├── quality-gates.ts
│   ├── file-schema.ts
│   └── lifecycle.ts
├── plugins/                   # Isabella Diff Observatory (read-only)
├── inference/
│   ├── types.ts
│   ├── router.ts
│   ├── model-registry.ts
│   ├── cache.ts
│   └── openai-compatible.ts
├── tools/
│   └── registry.ts
├── skills/
│   └── registry.ts
├── veritas/
├── evolution/
├── federation/
├── intelligence/
├── observability/
├── evaluation/
├── deployment/
├── genesis/
│   └── runtime.ts
└── index.ts

infra/
└── db/
    └── migrations/

docs/
├── spec/
├── security/
└── evolution/

test/
├── inference/
├── memory/
├── skills/
├── veritas/
├── deployment/
├── sanitization/
├── governance/
├── plugins/
└── territory/
```

---

# 25. Qué está implementado y qué falta para el siguiente salto

## P0 — cerrar runtime productivo

1. PostgreSQL/pgvector persistente.
2. RAG completo con provenance.
3. OpenTelemetry real.
4. Prometheus/Grafana/SLO.
5. CI verde y reproducible.
6. Security scanning.
7. Load tests.
8. Fuzz/property testing.
9. BookPI production hardening.
10. Secrets manager real.
11. Model serving real.
12. Rollback automatizado.

## P1 — cognitive acceleration

1. Prefix cache real.
2. Semantic cache persistente.
3. Speculative decoding real.
4. Parallel branch execution.
5. Verifier fan-out.
6. Early exit condicionado por riesgo.
7. Continuous batching.
8. GPU scheduling.

## P2 — sovereign cognition

1. Native ML.
2. Fine-tuning.
3. Online learning gobernado.
4. Federated learning.
5. Model evaluation service.
6. Distributed worker plane.
7. Multi-region federation.
8. Disaster recovery probado.

---

# 26. Seguridad constitucional

Las reglas fundamentales son:

1. **Unknown capability → DENY.**
2. **ABAC false/error → DENY.**
3. **Human approval is cryptographically bound.**
4. **Critical AEGIS findings → BLOCK.**
5. **Secrets do not belong in source code.**
6. **Acceleration never bypasses authority.**
7. **Memory is not truth.**
8. **A catalog entry is not an implementation.**
9. **An implementation is not production evidence.**
10. **Production is not certification.**

---

# 27. Relación con TAMV / YUN / BookPI

Isabella forma parte del ecosistema arquitectónico TAMV.

La documentación del ecosistema describe TAMV como infraestructura digital federada, auditable y orientada a soberanía, mientras YUN define reglas de datos, operación, eventos y gobernanza.

En esta implementación:

```text
TAMV
 │
 ├── YUN
 │    ├── data
 │    ├── events
 │    ├── federation
 │    └── operations
 │
 ├── Isabella TINA
 │    ├── cognition
 │    ├── authority
 │    ├── security
 │    ├── memory
 │    └── evolution
 │
 └── BookPI
      ├── provenance
      ├── evidence
      └── audit
```

La relación conceptual no implica que todos esos servicios externos estén desplegados dentro de este repositorio.

---

# 28. Evidencia y honestidad técnica

La documentación canónica establece explícitamente que las afirmaciones técnicas deben ser proporcionales a la evidencia disponible y que el proyecto no debe presentarse como certificación de seguridad, opinión jurídica vinculante o prueba automática de capacidades avanzadas.

Este README adopta esa misma regla.

Por tanto, Isabella Genesis TINA **no declara**:

- AGI;
- conciencia;
- infalibilidad;
- superioridad frente a otros modelos;
- certificación;
- producción global;
- soberanía física completa;
- entrenamiento nativo;
- infraestructura GPU propia;

sin evidencia específica que lo demuestre.

---

# 29. Verificación local

Requisitos:

- Node.js >= 22
- npm

Este repositorio no incluye actualmente un lockfile npm. Para reproducibilidad, debe generarse y versionarse un `package-lock.json` antes de exigir `npm ci` en CI.

Ejecutar:

```bash
npm install
npm run typecheck
npm test
npm run build
```

El resultado de estos comandos debe tratarse como evidencia del commit concreto ejecutado; este README no convierte su existencia en una afirmación de que todos los runs históricos hayan sido exitosos.

---

# 30. Estado ejecutivo

### Clasificación

**Genesis V6 — Governed Cognitive Runtime Foundation**

### Avance de implementación

**No cuantificado con evidencia suficiente**

### Readiness productivo

**No cuantificado con evidencia suficiente**

### Estado

**PRE-PRODUCTION ADVANCED / CONTROLLED STAGING TARGET**

### Bloqueadores principales

- infraestructura persistente;
- CI verificable;
- model serving;
- observabilidad productiva;
- RAG persistente;
- pruebas adversariales/load;
- deployment automatizado;
- recuperación operacional.

### Conclusión

Isabella Genesis TINA ya no debe describirse como una simple colección de especificaciones.

El repositorio contiene un **runtime gobernado real**, con autoridad, seguridad, memoria epistemológica, inferencia mediante adaptadores, herramientas, skills, verificación, evolución, telemetría y controles de despliegue.

Al mismo tiempo, todavía existe una frontera clara entre este runtime y una infraestructura cognitiva soberana completamente productiva.

La siguiente fase no consiste en agregar nombres de módulos. Consiste en convertir los contratos existentes en **infraestructura persistente, medible, distribuida, testeada y operable**.

---

## Licencia / autoría

El archivo LICENSE de este repositorio contiene MIT. Revisar también las licencias de dependencias y componentes externos antes de redistribuir.

**Proyecto:** Isabella Villaseñor AI — Genesis TINA  
**Ecosistema:** TAMV Online Network  
**Arquitectura:** Edwin Oswaldo Castillo Trejo / Anubis Villaseñor  
**Origen declarado:** Real del Monte, Hidalgo, México


## V6.4 — Hardening cognitivo y de evidencia

Se incorporaron cinco planos adicionales:

- **Consent Registry:** consentimiento explícito, revocable, con alcance y expiración.
- **Provenance:** fuentes con hash SHA-256, nivel de confianza y claims vinculados a fuentes conocidas.
- **Cognitive Orchestrator:** síntesis de expertos con resultados vinculados al plan; tareas críticas nunca terminan automáticamente en READY.
- **Fail-Closed Inference:** adaptador explícito para ausencia de proveedor; no fabrica resultados.
- **Canary Evaluation:** promoción condicionada a muestras suficientes, error, latencia y señales de seguridad.

La regla sigue siendo:

`CAPABILITY -> CONSENT/AUTHORITY -> SECURITY -> EVIDENCE -> EXECUTION -> VERITAS -> AUDIT`

Estas piezas son infraestructura de gobierno y runtime. No constituyen por sí mismas entrenamiento de un modelo fundacional, aprendizaje autónomo, serving GPU ni despliegue distribuido.


---

# V6.5 — Librerías canónicas implementadas (IKES, sanitización, gobernanza)

Se implementaron de forma nativa, tipada y operativa las especificaciones canónicas
que describen las librerías de Isabella. Cada módulo es determinista, sin efectos
externos por defecto y con pruebas propias. La especificación en `docs/spec/canonical/`
es la fuente de verdad; el código la materializa sin convertir una capacidad técnica
en una afirmación de producción.

## Módulos y contratos

| Especificación | Módulo | Contrato implementado |
| --- | --- | --- |
| `SANITIZATION_POLICY.md` | `src/sanitization/` | Pipeline de 9 etapas, cuarentena de secretos, PII enmascarada, fingerprints físico/estructural/semántico y clasificación de duplicados sin borrado por similitud. |
| `IKES_SPEC.md` | `src/memory/knowledge-entry.ts` | Entrada canónica `KNO-XXXXXXXX`, estados epistemológicos y temporales, pipeline de 12 etapas y regla de preservación. |
| `EVIDENCE_MANIFEST_SCHEMA.md` | `src/governance/evidence-manifest.ts` | Manifest `EVM-XXXXXXXX`, completitud y gate para declarar `stable`. |
| `GIT_POLICY.md` | `src/governance/git-governance.ts` | Decide (no ejecuta) operaciones destructivas/externas; rechaza borrar rama actual, worktrees sucios y ramas no fusionadas. |
| `LSP_VALIDATION.md` | `src/governance/lsp-validation.ts` | `open_file`, `save_file`, `wait_for_diagnostics`, `diagnostics_for`; frescura `version >= v`; solo `FRESH_NO_DIAGNOSTICS` es `TECHNICALLY_CLEAN`. |
| `SYNC_SPEC.md` | `src/governance/sync-manager.ts` | `Lock`, `RLock`, `Semaphore`, `BoundedSemaphore`, `Condition`, `Event`, `Barrier`; mutación serializada por `entity_id`; lifecycle `INITIAL→STARTED→STOPPING→SHUTDOWN`; tokens con scope/expiración/revocación; reconciliación previa a release. |
| `DEPLOYMENT_POLICY.md` | `src/governance/deployment-gates.ts` | Gates `build→rollback`, separación spec/app/IKES y bloqueo de valores DNS de ejemplo. |
| `VERIFIER_SPEC.md` | `src/governance/verifier.ts` | Estados `PASS/PASS_WITH_WARNINGS/FAIL/INCONCLUSIVE/NOT_APPLICABLE` con alcance acotado. |
| `QUALITY_GATES.md` | `src/governance/quality-gates.ts` | Los 15 gates canónicos; fail-closed antes de promoción. |
| `CONTRIBUTING.md` | `src/governance/file-schema.ts` | Encabezado obligatorio, transparencia radical y detección de contenido prohibido. |
| `TAMV_INTEGRATION.md` | `src/territory/tamv-integration.ts` | Mapa de madurez por módulo y detección de sobreclamación. |
| `isabella-diff.*` | `src/plugins/diff-observatory.ts` | Diff Observatory de solo lectura: redacción de secretos, omisión de binarios, señales de riesgo y BookPI solo con metadatos/hashes. |

## Cableado nativo

Los módulos se exponen por el barril raíz (`src/index.ts`) y por el runtime
(`IsabellaGenesisRuntime`): `sanitize`, `admitKnowledge`, `mutateEntity`, `issueToken`,
`evaluateGit`, `assessDeployment`, `verifyAgentApp`, `evaluateQuality`, `planLifecycle`
y `reconcile`. También se registran como capacidades del Hyper Skill Fabric
(`hsf.sanitization.pipeline`, `hsf.knowledge.admission`, `hsf.git.governance`,
`hsf.quality.gates`, `hsf.deployment.gates`, `hsf.agent.verifier`, `hsf.lifecycle.plan`,
`hsf.lsp.validation`) y se exponen vía API:

```text
POST /api/v1/sanitization/scan
POST /api/v1/knowledge/admit
POST /api/v1/governance/git
POST /api/v1/governance/quality-gates
POST /api/v1/governance/deployment
POST /api/v1/governance/verify-agent-app
POST /api/v1/governance/lifecycle-plan
POST /api/v1/diff/observe
```

## Invariantes preservados

- **Ningún módulo ejecuta acciones destructivas**: deciden y proponen; la ejecución
  requiere policy gate y aprobación humana.
- **Fail-closed**: sin evidencia, sin gate o sin reconciliación no hay `release`.
- **Preservar antes que borrar**: solo el artefacto idéntico o el duplicado verificado
  permiten eliminación automática.
- **No sobreclamación**: un diagnóstico LSP limpio o un test verde son evidencia
  técnica acotada, no verdad científica ni certificación de producción.
- **Correcciones de línea base**: se corrigió la constante generadora bech32m de LITLE
  (`0x2a1462b3`) y errores de tipado preexistentes que el error de sintaxis ocultaba.

## Pruebas

`test/sanitization/`, `test/governance/`, `test/plugins/` y `test/territory/` cubren
los contratos anteriores. La validación (`npm run validate` = typecheck + test + build)
debe ejecutarse en CI; la implementación del código no constituye evidencia de una
ejecución CI exitosa.

---

# V6.6 — Hardening doble, criptografía triangulada y extensión de API nativa

Actualización masiva derivada de los blueprints (BookPI, Atlas Trascendence,
Isabella AI Library, TAP v1.0, ISA-API v40). Todo es determinista, tipado y con
pruebas; ningún módulo ejecuta acciones destructivas ni sustituye firma PQC real.

## Sanitización 2.0 (hardening)

- `src/sanitization/hardening.ts`: entropía de Shannon para secretos de alta
  aleatoriedad, detección de homóglifos y caracteres de ancho cero (evasión
  Unicode), PII profunda (IBAN y tarjetas validadas por Luhn) y cuarentena que
  registra solo hash + motivo (nunca el secreto).
- Ruta `POST /api/v1/sanitization/harden`.

## Criptografía triangulada (hardening doble)

- `src/security/triangulated-crypto.ts`: tres rutas independientes
  (SHA3-512 + SHA-256 + BLAKE2b-512) cuyo sello combinado debe coincidir; AEAD
  AES-256-GCM con KDF scrypt, comparación en tiempo constante y sobre sellado.
- Honestidad técnica: **no** implementa ML-KEM/ML-DSA/SLH-DSA; la firma
  post-cuántica requiere HSM/proveedor externo y no se simula.
- Rutas `POST /api/v1/security/triangulate`.

## BookPI (Merkle + regalías)

- `src/bookpi/merkle.ts`: chunking 64 KiB, árbol de Merkle, pruebas de inclusión
  O(log N), compromiso ZK `SHA256(root || author || salt)`.
- `src/bookpi/royalties.ts`: liquidación exacta en BigInt hacia las 7 federaciones,
  sin pérdida por redondeo (remanente a la última federación).

## Atlas Trascendence (documentos + eventos)

- `src/atlas/documents.ts`: `document_uid` canónico
  `ATLAS-DOC-{fed}-{ns}-{ULID}-{hash}`, canonicalización y estados
  `draft → validated → published → archived`.
- `src/atlas/events.ts`: los 15 eventos canónicos con payloads tipados y clave de
  idempotencia.

## ISA-API v40 y TAP v1.0

- `src/ingress/isa-api.ts`: pipeline de 12 etapas (fail-closed) y acto operativo
  canónico TAP v1.0 con controles obligatorios y disparadores de alto impacto.
- Rutas `POST /api/v1/isa/pipeline` y `POST /api/v1/isa/act`.

## Operaciones de producción

- `src/deployment/production-ops.ts`: readiness fail-closed, rate limiting
  (token bucket), circuit breaker, timeouts, correlación y ventanas de
  mantenimiento.
- Rutas `POST /api/v1/ops/readiness` y `GET /api/v1/ops/snapshot`.

## Catálogos nativos

- `CANONICAL_TOOLS`, `PROTOCOL_TOOLS`, `PROTOCOL_CATALOG` y `CANONICAL_SKILLS`
  se registran en el runtime (tools, protocolos y skills canónicos).
- `src/cognition/sophia.ts`: evaluador epistémico E0_AXIOM…E4_UNFOUNDED y puerta
  del Índice de Resonancia Epistémica (ERI ≥ 95). El ERI es una métrica de
  promoción separada; no eleva por sí sola una inferencia a verdad.
- `src/isabella/library.ts`: catálogo de 9 módulos, 8 grupos de API, salvaguardas
  éticas y marcos de cumplimiento.

## Correcciones aplicadas sobre las actualizaciones previas

- `Semaphore`/`Lock`: se eliminó una carrera de liberación de permiso y una fuga
  de waiters en timeout; los timers no bloquean el event loop.
- IKES: la etapa `claims` ya no es una verdad vacua; una entrada sin claims no se
  libera (fail-closed).
- Deployment gates: `canary` es opcional; `build`/`tests` y los escaneos son
  obligatorios; los bloqueadores se deduplican.
- ULID: corregido a 26 caracteres Crockford (10 de tiempo + 16 aleatorios).
- SOPHIA: el nivel E1 ya no exige ERI ≥ 95 (se separó nivel de puerta de promoción).
- Registro de tools/skills: se evita la colisión entre el runtime y el server.

## Pruebas

`test/bookpi/`, `test/atlas/`, `test/security/`, `test/deployment/`,
`test/ingress/`, `test/cognition/` y `test/isabella/` cubren los contratos nuevos.
Validación: `npm run validate` (typecheck + 253 tests + build) en verde.

---

# PID Reconciliation — Canonical Identity Layer

GenesisAI incorpora un reconciliador operativo para identificadores persistentes (PIDs) como parte de su plano de identidad y procedencia. Su función es **normalizar, validar, detectar duplicados y producir una huella determinista** de los identificadores configurados; no inventa identidad ni considera que dos identificadores pertenecen a la misma persona sólo por existir.

## Arquitectura

```text
Environment / Secret Manager
          │
          ▼
     src/config.ts
          │
          ▼
   src/pidReconciler.ts
          │
     ┌────┼─────────────┐
     │    │             │
   ORCID DOI           ISNI
     │    │             │
     └────┼─────────────┘
          ▼
   Canonical records
          │
          ├── checksum / format validation
          ├── duplicate detection
          └── deterministic SHA-256 fingerprint
          │
          ▼
 ReconciliationReport
          │
          ▼
 src/cli/reconcilePids.ts
```

## Identificadores soportados

- **ORCID**: normalización y validación de checksum.
- **DOI**: normalización desde URI/`doi:` y validación estructural.
- **ISNI**: normalización y validación de checksum.
- **DataCite DOI**: tratado como DOI con procedencia de configuración independiente.

La reconciliación es deliberadamente conservadora: **formato válido no equivale a identidad confirmada**. La pertenencia de un PID a una entidad concreta requiere evidencia externa o institucional.

## Ejecución

```bash
npm run reconcile:pids
```

La salida es JSON estructurado y utiliza códigos de proceso estables:

```text
0 = SUCCESS
1 = VALIDATION_FAILED
2 = RUNTIME_ERROR
```

Ejemplo de configuración:

```bash
GENESIS_PID_STRICT=true
GENESIS_PID_ORCID=0000-0002-1825-0097
GENESIS_PID_ZENODO_DOI=10.5281/zenodo.20606361
GENESIS_PID_ISNI=0000000090000000
GENESIS_PID_DATACITE_DOI=10.xxxx/example
GENESIS_PID_NAMESPACE=tamv/genesis
GENESIS_PID_PERSON_NAME="..."
GENESIS_PID_GEOGRAPHIC_ORIGIN="..."
```

Las variables de entorno son opcionales para el modo no estricto, pero en operación gobernada se recomienda configurar explícitamente los PIDs canónicos. **No se deben introducir secretos en estos campos.**

## Integración con GenesisAI

El reconciliador no crea un subsistema de identidad paralelo. Se integra con:

```text
Identity
   │
   ├── Principal
   ├── Authority
   ├── Canonical Registry
   │      └── did_isni_triangulate
   │
   └── PID Reconciliation
          ├── normalization
          ├── checksum validation
          ├── uniqueness
          └── fingerprint
```

La herramienta existente `did_isni_triangulate` continúa siendo una capability del Tool Registry. El nuevo reconciliador aporta la validación determinista y reutilizable que esa capability puede consumir posteriormente.

## Garantías y límites

El reconciliador garantiza:

- entradas normalizadas;
- validación checksum donde el estándar lo permite;
- detección de duplicados canónicos;
- fingerprint determinista;
- modo estricto fail-closed;
- códigos de salida adecuados para automatización;
- logs estructurados;
- errores normalizados.

No garantiza:

- que un PID pertenezca realmente a una persona;
- resolución federada contra ORCID/ISNI/DataCite;
- prueba de propiedad;
- firma institucional;
- verificación criptográfica de un registro remoto.

Esas operaciones requieren conectores o fuentes autoritativas externas y deben incorporarse como evidencia, no como inferencia.

## Pruebas

Se añadió `test/pidReconciler.test.ts` para cubrir:

1. ORCID válido + DOI válido.
2. Normalización de DOI.
3. rechazo de ORCID inválido.
4. modo estricto sin identificadores.
5. generación del reporte y fingerprint.


---

# Atlas Persistence Port — Atlas / HE-HEP / TAMV-online

El subsistema Atlas se integra como **infraestructura de persistencia y signaling**, no como un segundo runtime cognitivo. El principio de integración es:

```text
GENESIS RUNTIME
      │
      │ AtlasPersistencePort
      ▼
   AtlasStore
      │
      ▼
Supabase Data API
```

Esta separación evita que el kernel conozca tablas, columnas, REST o credenciales de Supabase. Genesis conserva autoridad sobre la ejecución; AtlasStore sólo materializa estado persistente y eventos en el backend configurado.

## Contrato canónico

`src/atlas/persistence.ts` define `AtlasPersistencePort` con estas capacidades:

| Capacidad | Propósito | Backend |
|---|---|---|
| `createUser` | Persistir identidad Atlas | `atlas_users` |
| `listUsers` | Recuperar usuarios Atlas | `atlas_users` |
| `recordProtocolExecution` | Registrar ejecución de protocolo | `atlas_protocols` |
| `recordEconomyEntry` | Registrar crédito/débito | `atlas_ledger` |
| `publishXrEvent` | Persistir eventos XR | `atlas_xr_events` |
| `createSignal` | Persistir signaling WebRTC | `atlas_webrtc_signals` |
| `onXrEvent` | Bus local de eventos XR | proceso actual |
| `onSignal` | Bus local de signaling | proceso actual |

Los métodos de dominio devuelven objetos normalizados y no exponen directamente las filas de Supabase al runtime.

## Antifragilidad de transporte

`AtlasStore` usa `fetch` nativo y `AbortController`:

- timeout configurable;
- timeout predeterminado de 10 segundos;
- cancelación efectiva de la solicitud;
- validación de configuración;
- propagación explícita de errores HTTP;
- limpieza garantizada del temporizador;
- listeners aislados: una excepción de un consumidor no rompe a los demás.

La clave `SUPABASE_SERVICE_ROLE_KEY` sólo puede existir en backend. Nunca debe enviarse al navegador ni incorporarse a código cliente.

## Inyección en Genesis

`IsabellaGenesisRuntime` acepta ahora un segundo parámetro opcional:

```ts
new IsabellaGenesisRuntime(telemetry, persistence);
```

La persistencia puede inicializarse explícitamente mediante `initPersistence()` y proyectarse mediante:

```ts
runtime.persistUser(...)
runtime.persistProtocolExecution(...)
runtime.persistEconomyEntry(...)
runtime.publishAtlasXrEvent(...)
runtime.createAtlasSignal(...)
```

Esto es intencionalmente explícito. **No se añadió persistencia automática a cada evaluación cognitiva**, porque una evaluación de Genesis no debe convertirse accidentalmente en una escritura externa. La ejecución persistente debe ocurrir en el punto de dominio que realmente corresponda.

Por la misma razón, este repositorio no afirma que exista todavía un `AtlasKernel`, `postLedger()` o `executeProtocol()` operativo en el código actual. El port queda preparado para que esos métodos, cuando existan, proyecten sus resultados sin acoplar el kernel a Supabase.

## HE-HEP

Los contratos Atlas admiten `he_hep_context` en las operaciones donde el contexto semántico forma parte del dominio:

```text
HE-Identity  → HEP-1
HE-Transform → HEP-2
HE-Economy   → HEP-1
```

Estos valores son **metadatos de dominio**, no una prueba criptográfica ni una certificación externa. Su persistencia no implica por sí sola validación de identidad, autoridad, economía o territorio.

## Economía

`recordEconomyEntry()` valida:

- usuario;
- monto finito;
- monto estrictamente mayor que cero;
- razón;
- tipo `credit | debit`.

La operación no calcula saldos ni implementa una contabilidad de doble partida. Por tanto, `atlas_ledger` debe entenderse como registro de movimientos; un ledger financiero completo requiere invariantes transaccionales adicionales en la base de datos.

## XR y WebRTC

XR y signaling están deliberadamente fuera del núcleo cognitivo:

```text
Atlas / online
├── XR event persistence
└── WebRTC signaling persistence

Genesis
└── governance / cognition / execution
```

`onXrEvent()` y `onSignal()` son buses **locales al proceso**. No son Supabase Realtime, no son un broker distribuido y no garantizan entrega entre múltiples instancias. Para operación federada/multi-nodo se requiere una capa de mensajería o Realtime explícita.

## Seguridad

La arquitectura conserva la invariante:

```text
CAPABILITY ≠ AUTHORITY ≠ EXECUTION ≠ EVIDENCE ≠ LEARNING ≠ PRODUCTION
```

AtlasStore no concede autoridad. Que una escritura en Supabase sea técnicamente posible no significa que una operación haya sido autorizada por CROWN, AEGIS, consentimiento, política o un principal válido.

La service-role key proporciona privilegios de backend y, por ello, debe quedar detrás de los límites de despliegue. RLS, políticas SQL, constraints, auditoría y controles de infraestructura siguen siendo responsabilidad del entorno Supabase.

## Variables de entorno

Configuración mínima:

```bash
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<backend-only-secret>
```

Opcional:

```bash
ATLAS_STORE_TIMEOUT_MS=10000
```

La implementación actual expone `AtlasStoreConfig`; la construcción desde variables de entorno queda como una decisión de composición del despliegue y no se mezcla con el dominio.

## Pruebas

Se añadió `test/atlasPersistence.test.ts` para cubrir:

- configuración incompleta;
- creación y mapeo de usuario;
- llamada a Supabase Data API;
- aislamiento de errores de listeners XR;
- rechazo de montos económicos inválidos antes de hacer I/O.

La suite es de contrato/mocks; **no demuestra conectividad con un proyecto Supabase real**. Para certificar el despliegue real todavía se necesita una prueba de integración con una instancia controlada, esquema SQL, políticas y credenciales de entorno.

## Estado de integración

**Implementado en la rama de evolución:**

- `src/atlas/types.ts`
- `src/atlas/persistence.ts`
- `src/atlas/index.ts`
- inyección opcional en `src/genesis/runtime.ts`
- pruebas unitarias de persistencia
- documentación de límites y configuración

**Pendiente para una integración operativa completa:**

1. esquema SQL real para las tablas Atlas;
2. RLS/constraints y políticas de Supabase;
3. health-check de infraestructura;
4. Realtime/broker para signaling multi-instancia;
5. integración con métodos de dominio Atlas reales cuando estén presentes;
6. pruebas contra Supabase real;
7. observabilidad de latencia, errores y timeouts de persistencia.

El resultado actual debe clasificarse como **puerto de infraestructura + adaptador Supabase integrado al runtime**, no como un Atlas online completamente desplegado.


---

# IsabellaEngine v2 — Mediación cognitiva TAMV-ready

La evolución de Isabella se incorpora al runtime canónico GenesisAI como un motor de mediación cognitiva, no como un segundo runtime.

```text
CLIENT
  │
  ▼
CROWN / AEGIS
  │
  ▼
Genesis Runtime
  │
  ├── IsabellaEngine v2
  │     ├── LatentSpaceManifold
  │     ├── HeptafederatedValidator
  │     ├── EntropyMitigator
  │     └── Isabella Ledger
  │
  ├── IKES / Memory
  ├── VERITAS
  ├── Tools / Skills
  └── AtlasPersistencePort
```

## Capacidades implementadas

src/isabella/engine.ts incorpora espacio latente conceptual, proyección OOD, siete federaciones, validación heptafederada, análisis de entropía de Shannon, mitigación entrópica, contra-auditoría cognitiva, simulación epistemológica, ledger operativo, API chat() compatible con integración progresiva y snapshot operacional del engine.

La versión integrada es determinista. Se eliminó la aleatoriedad del diseño original: los vectores conceptuales y scores federados se derivan mediante SHA-256. Esto permite reproducibilidad, testing, comparación entre nodos y auditoría.

## Interconexión con Genesis

El runtime expone:

```ts
runtime.isabella
runtime.mediateIsabella(...)
runtime.evaluateIsabellaEntropy(...)
runtime.isabellaLatencySnapshot()
```

La API pública dispone de:

```text
POST /api/v1/isabella/mediate
POST /api/v1/isabella/entropy
GET  /api/v1/isabella/status
```

La ruta /api/v1/isabella/mediate no ejecuta Isabella directamente desde HTTP. Primero construye el principal, verifica autoridad balanceada y pasa por runtime.evaluate(), donde CROWN y AEGIS tienen oportunidad de admitir o bloquear la operación. Sólo después se ejecuta la mediación.

Esto preserva:

```text
CAPABILITY ≠ AUTHORITY ≠ EXECUTION ≠ EVIDENCE ≠ LEARNING ≠ PRODUCTION
```

## Latencia y observabilidad

La mediación local no requiere una llamada a un modelo externo. Las operaciones de espacio latente, hashing, entropía y evaluación federada son CPU-locales y están diseñadas para minimizar I/O.

Cada mediación emite request_latency_ms con stage=isabella-mediation y profile=<profile>.

GET /api/v1/isabella/status expone versión, hash documental, entradas del ledger, conceptos, dimensiones del manifold y p50/p95/p99 de latencia junto con tasa de error.

“Latencia casi cero” no se declara como propiedad garantizada. El sistema mide la latencia real y permite establecer SLO después de observar cargas reales. CROWN, AEGIS, red, persistencia o inferencia externa pueden dominar el tiempo total.

## Evolución respecto al código conceptual suministrado

Se preservan LatentSpaceManifold, HeptafederatedValidator, EntropyMitigator, ContraAuditoriaResult, EpistemicSimulationResult, LedgerEntry, perfiles de Isabella, OOD, heptafederación, entropía, contra-auditoría y simulación epistemológica.

Se introducen controles de producción: validación de dimensiones y umbrales, rechazo de masa probabilística inválida, identificadores deterministas, vectores reproducibles, scores reproducibles, instrumentación de latencia, integración con autoridad Genesis y pruebas automatizadas.

## Límite epistemológico

Los scores heptafederados implementados actualmente son heurísticos/deterministas derivados del contenido, no verificaciones externas de una federación real. OOD no es todavía un embedding de un modelo fundacional; el manifold no es un vector database; la consonancia no constituye una prueba científica; el ledger local no sustituye BookPI; y el hash documental no demuestra por sí mismo autenticidad de una fuente.

La evolución correcta es conectar estas primitivas con evidencia real, IKES, Veritas y BookPI sin convertir una heurística en una afirmación de verdad.

## Integración con Atlas

El engine no duplica persistencia. Las operaciones pueden proyectarse posteriormente a AtlasPersistencePort o BookPI cuando exista un punto de dominio explícito.

```text
IsabellaEngine → decisión/mediación cognitiva
Genesis        → autoridad y orquestación
BookPI         → provenance/audit
LITLE          → evidencia/certificación
AtlasStore     → persistencia/online/XR/signaling
Telemetry      → latencia/SLO/operación
```

## Pruebas

 test/isabellaEngine.test.ts cubre determinismo de la evaluación heptafederada, entropía, rechazo de vectores probabilísticos inválidos, ledger y estabilidad de evaluaciones repetidas.

La validación final de typecheck, suite completa y build debe hacerse mediante CI; la implementación del código no constituye evidencia de una ejecución CI exitosa.


---

# Auditoría actualizada: categoría, competencia, producción, licencia y regulación

La auditoría detallada y la comparación con la revisión anterior de hoy están en [docs/AUDIT_GENESIS_V6_2026-10-08.md](docs/AUDIT_GENESIS_V6_2026-10-08.md). Los controles de divulgación de vulnerabilidades y puertas de salida están en [SECURITY.md](SECURITY.md).

## Categoría emergente y competencia

Isabella GenesisAI se posiciona en la categoría emergente **governed cognitive runtime / agent orchestration and evidence control plane**: una capa de runtime que pretende gobernar identidad, autorización, seguridad, herramientas, skills, inferencia, memoria epistemológica, procedencia y observabilidad alrededor de modelos externos.

No es un modelo fundacional y no compite directamente como LLM con GPT, Claude, Gemini o Llama. Las familias comparables son:

- [LangGraph/LangChain](https://github.com/langchain-ai/langgraph): orquestación y aplicaciones de agentes.
- [Microsoft Semantic Kernel](https://github.com/microsoft/semantic-kernel): SDK de integración/orquestación.
- [Microsoft AutoGen](https://github.com/microsoft/autogen): coordinación multiagente.
- [OpenAI Agents SDK](https://github.com/openai/openai-agents-python): agentes, tools y trazas.
- [CrewAI](https://github.com/crewAIInc/crewAI): equipos de agentes.
- [Haystack](https://github.com/deepset-ai/haystack): pipelines RAG y búsqueda.
- [NVIDIA NeMo Guardrails](https://github.com/NVIDIA/NeMo-Guardrails): guardrails.
- [Temporal](https://github.com/temporalio/temporal): workflows durables, no un runtime cognitivo por sí solo.

Esta lista es taxonómica, no un ranking. No se afirma superioridad global sin benchmarks reproducibles que midan coste, latencia, calidad, seguridad adversarial, disponibilidad, adopción y complejidad operativa con cargas comparables.

## Porcentajes de avance: qué se puede afirmar

Los porcentajes anteriores de implementación global y readiness productivo no están respaldados por una rúbrica versionada con denominador, pesos y evidencias por requisito. Por ello no se deben publicar como porcentajes “reales” auditados. La revisión estática no demuestra que un despliegue funciona, que los backups se restauran, que los SLO se cumplen ni que el CI del commit actual está verde.

Para producir una cifra verificable, registrar por requisito: ID, peso, estado, evidencia enlazada al SHA, criterio de aceptación, fecha y responsable.

- **Implementación:** porcentaje de requisitos ponderados que tienen código ejecutable y pruebas asociadas.
- **Preparación productiva:** porcentaje de puertas operativas demostradas, incluyendo CI, seguridad, persistencia, backups/restores, observabilidad, carga, rollback, privacidad y respuesta a incidentes.
- **Despliegue:** porcentaje de puertas verificadas en un entorno desplegado y reproducible.

Hasta tener esa evidencia, el estado es **preproducción** y el porcentaje se marca **no cuantificado con evidencia suficiente**, no 100% ni un número arbitrario.

## Licencia híbrida por zonas

El archivo [LICENSE](LICENSE) contiene MIT. En general, MIT permite usar, modificar, distribuir y sublicenciar el código cubierto bajo sus condiciones. La etiqueta `private: true` de `package.json` no revoca una licencia MIT publicada. No debe afirmarse propiedad exclusiva sobre código que ya se distribuyó bajo MIT o bajo licencias de terceros.

Zonificación recomendada:

| Zona | Activos | Controles |
|---|---|---|
| Z0 Pública | SDKs, documentación y módulos expresamente publicados | Licencia por componente, avisos, SBOM y escaneo de secretos |
| Z1 Interna | Roadmap, evaluaciones, experimentos y módulos no publicados | Repositorios privados, MFA/SSO, acceso mínimo y ramas protegidas |
| Z2 IP restringida | Know-how, políticas internas, algoritmos no publicados y reglas de seguridad | Acceso por necesidad, registro de acceso y revisión antes de liberar |
| Z3 Datos críticos | Datos personales, claves, datasets confidenciales y datos de clientes | No guardar en Git; secret manager, cifrado, minimización, retención/borrado y DLP |
| Z4 Proveedores externos | Modelos, SDKs, datasets y backends externos | Cumplir licencias/terms de cada proveedor; no relicenciar código ajeno |

Una licencia híbrida real requiere inventario de autoría, contribuciones, dependencias y versiones ya publicadas, más revisión jurídica. Los datos no quedan protegidos por la licencia del código: requieren controles técnicos, organizativos y contractuales propios.

## Alineación normativa y regulatoria

Esta lista es un **mapa de evaluación**, no una certificación ni un dictamen de cumplimiento. La aplicabilidad depende del uso, sector, datos, jurisdicción y rol de cada operador.

| Organismo/jurisdicción | Marcos a evaluar |
|---|---|
| Unión Europea | [AI Act](https://artificial-intelligence-act.ec.europa.eu/), RGPD, NIS2 y normativa sectorial |
| Estados Unidos | [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework), [NIST GenAI Profile](https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence), leyes estatales/federales y sectoriales |
| México | LFPDPPP, LGPDPPSO cuando aplique, propiedad intelectual, consumidor, laboral y normativa sectorial; seguir iniciativas de IA sin confundirlas con leyes promulgadas |
| Latinoamérica | LGPD de Brasil y legislación por país; mantener una matriz jurisdiccional, no una única “ley LATAM” |
| UNESCO | [Recomendación sobre la Ética de la IA](https://www.unesco.org/en/artificial-intelligence/recommendation-ethics) |
| ONU | [Global Digital Compact y gobernanza de IA](https://www.un.org/en/global-issues/artificial-intelligence) |
| WEF | Informes e iniciativas de gobernanza multi-actor; no equivalen a legislación |
| ISO/IEC | ISO/IEC 42001 y 23894; no afirmar certificación sin auditoría formal |
| OECD | Principios y recomendaciones de IA, según la fuerza del instrumento concreto |
| Consejo de Europa | Convenio Marco sobre IA y derechos humanos, sujeto a ratificación, entrada en vigor y alcance territorial |

El AI Act europeo tiene aplicación escalonada y su calendario puede ser modificado. Consultar la fuente oficial y el texto consolidado al preparar cada release. En Estados Unidos no se debe asumir una única ley federal integral de IA. En México, las iniciativas legislativas deben marcarse como propuestas hasta que se promulguen y entren en vigor.

Cada release debe registrar finalidad, jurisdicciones, roles legales, inventario de datos, evaluación de riesgos/impacto cuando aplique, controles, evidencia, responsable y revisión jurídica. Ningún handler debe devolver `COMPLIANT` sólo por enumerar marcos; sin evaluación concreta el estado correcto es `NOT_ASSESSED`.

## Puertas mínimas antes de producción

- [ ] CI verde para el SHA exacto.
- [ ] Lockfile versionado y dependencias reproducibles.
- [ ] Autenticación, autorización por capacidad y pruebas negativas.
- [ ] Rate limiting, límites de payload, timeouts y gestión de errores.
- [ ] Secretos fuera del repositorio y rotación documentada.
- [ ] Persistencia con migraciones, políticas y restore drill.
- [ ] Métricas, alertas, SLO y retención de logs.
- [ ] Pruebas de carga, abuso, prompt injection y recuperación.
- [ ] Rollback e incident runbook probados.
- [ ] Revisión de privacidad, licencias y jurisdicción.
- [ ] Verificación real de claims criptográficos/procedencia.
- [ ] Evidencia de despliegue en un entorno controlado.

## Estado normativo de las afirmaciones

GenesisAI no declara AGI, conciencia, infalibilidad, superioridad global, certificación, cumplimiento global, criptografía poscuántica activa, infraestructura GPU propia ni despliegue global sin evidencia específica. Los fixtures no pueden anunciar `VERIFIED`, `ANCHORED`, `SYNCED` o `COMPLIANT` si no se ejecutó un proveedor real.
