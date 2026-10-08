# Isabella Villaseñor AI — Genesis TINA V6

> **Trusted Intelligence, Native & Adaptive** — runtime cognitivo gobernado, auditable y federable.

**Repositorio:** Isabella-Villase-or-GenesisAI  
**Rama de evolución:** `genesis-v6-sovereign-evolution`  
**Clasificación actual:** infraestructura de runtime cognitivo gobernado / foundation pre-productivo avanzado.  
**No es:** un modelo fundacional, una certificación de IA, una AGI ni una plataforma de producción completa.

---

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

**Estado: 86% interno.**

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

**Estado: 86% interno.**

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

**Estado: 78% interno.**

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

**Estado: 54% interno.**

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

**Estado: 58% interno.**

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

**Estado: 72% interno.**

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

**Estado: 68% interno.**

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

**Estado: 52% interno.**

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

**Estado: 62% interno.**

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

**Estado: 45% interno.**

---

# 15. Evolution Fabric

El sistema contiene una matriz de **7,000 controles**.

Esto significa:

> 7,000 controles catalogados.

No significa:

> 7,000 capacidades terminadas.

El lifecycle se orienta por evidencia y evita convertir hashes o metadatos en “prueba” artificial.

Estados y transiciones deben mantenerse ligados a evidencia verificable.

**Estado: 62% interno.**

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

**Estado: 42% interno.**

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

**Estado: 48% interno.**

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

**Estado: 40% interno.**

---

# 19. Matriz de avance

Los porcentajes siguientes son una **métrica interna de madurez de implementación**, calculada por cobertura de capacidades verificables del repositorio. No son certificaciones externas.

| Categoría | Avance |
|---|---:|
| Governance / Authority | **86%** |
| CROWN | **86%** |
| Security / AEGIS | **78%** |
| Identity | **76%** |
| Tools | **72%** |
| Skills | **68%** |
| Evolution | **62%** |
| BookPI | **62%** |
| Inference | **58%** |
| Memory / RAG | **54%** |
| Veritas | **52%** |
| Evaluation | **48%** |
| Federation | **45%** |
| Observability | **42%** |
| Deployment | **40%** |
| Native ML | **0%** |
| GPU Serving | **0%** |
| Distributed Workers | **0%** |

### Avance global de implementación

**≈ 60%**

Este valor es un índice de ingeniería interno, no una medida universal.

### Readiness productivo

**≈ 43%**

La diferencia existe porque tener código implementado no implica disponer de:

- infraestructura;
- persistencia operativa;
- CI verde;
- observabilidad productiva;
- modelos servidos;
- backups/restores;
- pruebas de carga;
- rollback automático;
- auditoría externa.

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
│   └── persistence.ts
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
└── deployment/
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
- pnpm 10.22.0

Ejecutar:

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

El resultado de estos comandos debe tratarse como evidencia del commit concreto ejecutado; este README no convierte su existencia en una afirmación de que todos los runs históricos hayan sido exitosos.

---

# 30. Estado ejecutivo

### Clasificación

**Genesis V6 — Governed Cognitive Runtime Foundation**

### Avance de implementación

**≈ 60%**

### Readiness productivo

**≈ 43%**

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

Consultar los archivos de licencia y documentación canónica del repositorio antes de redistribuir componentes.

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
