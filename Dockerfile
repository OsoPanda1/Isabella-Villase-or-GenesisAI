# syntax=docker/dockerfile:1

# ============================================================================
# Isabella GenesisAI — Imagen de produccion (Cluster E: packaging & Kubernetes)
#
# state: draft | auto_generated
# Nota de transparencia (AGENTS.md): archivo generado por motor; PENDIENTE de
# revision humana antes de declarar estado "verified" o "wired".
#
# Decisiones documentadas:
#   - node:22-alpine        -> LTS elegida (engines "node": ">=22"). Si a fecha de
#                              revision humana existe una LTS mas reciente vigente,
#                              reetiquetar la base y re-emitir el digest (ISA-349/355).
#   - distroless runtime    -> sin shell, sin npm, sin wget/curl: superficie de
#                              ataque minima. Usuario no-root numerico USER 10001.
#   - Sin HEALTHCHECK       -> distroless no aporta wget/curl; la autoridad de
#                              salud la ejerce Kubernetes (liveness/readiness en
#                              k8s/deployment.yaml contra endpoints /health y
#                              /api/v1/health verificados en src/server.ts).
#   - Entrypoint real       -> el script canonico de produccion del repo es
#                              `tsx src/server.ts` (package.json -> "start").
#                              `node dist/server.js` NO esta verificado: tsc emite
#                              ESM sin extensiones relativas (moduleResolution:
#                              "Bundler") y Node ESM exige extensiones. Ver
#                              docs/deployment/README.md (REQUIERE_VERIFICACION).
# ============================================================================

# ----------------------------------------------------------------------------
# Stage 1 — build
# ----------------------------------------------------------------------------
FROM node:22-alpine AS build

ENV PNPM_HOME=/pnpm
ENV PATH="$PNPM_HOME:$PATH"
WORKDIR /app

# Corepack: activa pnpm. El repo no declara "packageManager" en package.json
# (archivo no tocado por Cluster E); corepack usa su pnpm por defecto.
# REQUIERE_VERIFICACION: confirmar `pnpm --version` == 9.x (lockfileVersion 9).
#   Fallback si corepack no coincide con el lockfile: añadir al package.json
#   una linea `"packageManager": "pnpm@9.x.x"` (decisión humana, cambia package.json).
RUN corepack enable

# Instalacion congelada: falla si el lockfile está desincronizado con package.json.
# El mount de cache requiere BuildKit; si se usa el builder clasico, quitar la
# primera linea del segmente RUN.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

COPY tsconfig.json tsconfig.build.json ./
COPY src ./src

# Artefacto declarado del build (tambien valida tipos/emision).
RUN pnpm run build

# ----------------------------------------------------------------------------
# Stage 2 — runtime (distroless)
# ----------------------------------------------------------------------------
# El digest exacto de esta imagen es BLOCKED_ENVIRONMENT (ISA-349): un humano
# debe resolverlo contra el registry de destino (crane digest / docker build
# --reference) y fijarlo con @sha256:... Aquí se usa tag `latest` como marcador
# de trabajo; NO promover a produccion sin el pin.
FROM gcr.io/distroless/nodejs22-debian12:latest AS runtime

ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app

# Usuario no-root numerico (10001). La autoridad final de identidad/seguridad la
# fija el securityContext del pod (runAsUser/runAsGroup/runAsNonRoot: 10001).
USER 10001:10001

# node_modules incluye devDependencies: `tsx` (entrypoint) es hoy devDependency.
# Optimizar (mover tsx a dependencies o validar node dist/server.js) es
# REQUIERE_VERIFICACION; no se bloquea por tamaño en este draft.
COPY --from=build --chown=10001:10001 /app/node_modules ./node_modules
COPY --from=build --chown=10001:10001 /app/dist ./dist
COPY --from=build --chown=10001:10001 /app/src ./src
COPY --from=build --chown=10001:10001 /app/package.json ./package.json
COPY --from=build --chown=10001:10001 /app/tsconfig.json ./tsconfig.json

EXPOSE 3000

# La imagen distroless/nodejs fija ENTRYPOINT ["/nodejs/bin/node"]; el CMD son
# argumentos de node. Equivale al script "start" del repo (tsx src/server.ts).
CMD ["--import", "tsx", "src/server.ts"]