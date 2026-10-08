# Isabella Villaseñor AI — Genesis TINA

> La AI latinoamericana creada por **Anubis Villaseñor**. Nodo Cero: Real del
> Monte, Hidalgo, México.

**TINA** = *Trusted Intelligence, Native & Adaptive*.
**Orquestador Cognitivo y OS de Memoria Civilizacional** para el proyecto
**Isabella Villaseñor** y su heptafederación (ORION, SOPHIA, ARGUS, HERMES,
ATLAS, ANUBIS + TAMV/RDM Digital).

Registros de identidad:
- ORCID: `0009-0008-5050-1539`
- DOI: `10.5281/zenodo.20606361`
- OSF: `10.17605/OSF.IO/T3WMY`

## Invariante

```
CAPABILITY ≠ AUTHORITY ≠ EXECUTION ≠ EVIDENCE ≠ LEARNING ≠ PRODUCTION
```

## Estado y especificación

| Doc | Ruta |
| --- | --- |
| Master Gen-5 V5 | `docs/evolution/MASTER-V5-000.md` |
| Blueprint V5 | `docs/evolution/BLUEPRINT-V5.md` |
| Árbol estructural | `docs/evolution/STRUCTURAL-TREE-FINAL.md` |
| Matriz 7,000 controles | `docs/evolution/7000-CONTROL-MATRIX.md` |
| Manual de operación AI-to-AI | `docs/evolution/AI-TO-AI-OPERATING-MANUAL.md` |
| Canon v40.0.0 (TINA) | `docs/spec/ISABELLA-CANON-v40-source.txt` |
| API | `docs/spec/BLUEPRINT-API-v4.2.0.md` |
| Librerías | `docs/spec/IKES-LIBRARIES.md` |

## Stack

| Área | Decisión |
| --- | --- |
| Runtime | Node ≥ 22 + TypeScript estricto (ESM) |
| Tests | Vitest |
| Ledger | BookPI append-only (SHA3-512 / WORM) — `src/bookpi` |
| Evolución | Fabric Gen-5 V5 — `src/evolution` |
| Paquete | `pnpm` |

## Comandos

```sh
pnpm install
pnpm typecheck
pnpm test
```

## Reglas

Ver `AGENTS.md`. Resumen: las inteligencias sugieren, calculan y evalúan; la
conciencia humana decide, aprueba, arbitra y ejecuta.