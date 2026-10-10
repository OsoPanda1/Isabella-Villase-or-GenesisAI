# Isabella Genesis Ω — IGE-Ω v2.0.0

Rust MVP integrado como sub-workspace del monorepo Isabella V6 · TINA. El límite separado permite evolución gradual sin sustituir el runtime TypeScript. **Clasificación: blueprint + MVP implementable + PostgreSQL persistente + preproducción.**

## Crates
- `shared`: contratos, errores, eventos y estados epistémicos.
- `neurokernel`: bus de eventos, cola acotada y máquina de estados.
- `cognition`: hipótesis, planificación y simulación acotada.
- `memory`: persistencia PostgreSQL aislada por tenant/usuario.
- `worldmodel`: grafo en memoria; tablas SQL preparadas.
- `abx`: arbitraje CROWN conservador.
- `bookpix`: ledger SHA-256 encadenado.
- `services/gateway`: API Axum y migraciones SQLx.

## Arranque local
Configura `.env` desde `.env.example`, usa un token aleatorio de al menos 32 caracteres y ejecuta `docker compose -f ige-omega/deployment/docker-compose.yml up --build`.

Rutas: `GET /health`, `GET /ready`, `POST /api/v1/infer`, `POST/GET /api/v1/memory`, `GET /api/v1/ops/audit/verify`. Todas salvo health/readiness requieren `Authorization: Bearer $IGE_API_TOKEN`.

## Verificación
Desde `ige-omega/`: `cargo fmt --check && cargo clippy --workspace --all-targets -- -D warnings && cargo test --workspace && cargo build --release -p gateway`.

## Límites explícitos
No hay ejecución externa, pgvector/búsqueda vectorial, inferencia neuronal local, consenso Raft/CRDT, NATS, rollback real, firma digital ni WORM. La probabilidad de éxito no está calibrada y por eso se devuelve null. SHA-256 encadenado ofrece evidencia de manipulación sólo si la cabeza confiable se conserva fuera de la misma base. El token compartido no es autorización multiusuario. No declarar probado hasta que CI compile y ejecute pruebas en el mismo SHA.

Documentación: [especificación](docs/IGE-OMEGA-v2.0.0.md), [auditoría](docs/CRYPTOGRAPHIC-AUDIT.md), [simulación y arbitraje](docs/SIMULATION-ARBITRATION.md), [Kubernetes](deployment/k8s/).
