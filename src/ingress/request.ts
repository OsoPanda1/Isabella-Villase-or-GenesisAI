/** INGRESS V5 — planos 01: request, límites, normalización, traza, admisión. */

export interface RawIncoming {
  method: string;
  path: string;
  headers: Record<string, string>;
  query: Record<string, string>;
  body: unknown;
  remoteIp?: string;
  protocol: string;
}

export interface NormalizedRequest {
  requestId: string;
  traceId: string;
  methodId: string;
  tenantId?: string;
  principalId?: string;
  body: unknown;
  receivedAt: string;
  rawMethod: string;
  rawPath: string;
  headers: Record<string, string>;
}

export const MAX_HEADERS = 32;
export const MAX_QUERY_KEYS = 64;
export const MAX_HEADER_BYTES = 2 * 1024 * 1024;

export function sanitizeText(input: string, maxBytes = MAX_HEADER_BYTES): string {
  let out = input.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  out = out.trim();
  const bytes = Buffer.byteLength(out, "utf8");
  return bytes > maxBytes ? out.slice(0, maxBytes) : out;
}

export function validateIngressShape(input: RawIncoming): void {
  if (!input || !input.method || !input.path) {
    throw new Error("INGRESS: método y path son obligatorios");
  }
  const headerCount = Object.keys(input.headers ?? {}).length;
  if (headerCount > MAX_HEADERS) {
    throw new Error(`INGRESS: exceso de cabeceras (${headerCount} > ${MAX_HEADERS})`);
  }
  const queryKeys = Object.keys(input.query ?? {}).length;
  if (queryKeys > MAX_QUERY_KEYS) {
    throw new Error(`INGRESS: exceso de parámetros de consulta (${queryKeys} > ${MAX_QUERY_KEYS})`);
  }
  const headerBytes = Object.values(input.headers ?? {})
    .map((v) => Buffer.byteLength(v, "utf8"))
    .reduce((a, b) => a + b, 0);
  if (headerBytes > MAX_HEADER_BYTES) {
    throw new Error("INGRESS: volumen de cabeceras excede el límite");
  }
}

export function sanitizeHeaders(headers: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    out[key] = sanitizeText(value, 4096);
  }
  return out;
}

export function normalizeIngress(input: RawIncoming, deps: { methodId: string; tenantId?: string; principalId?: string }): NormalizedRequest {
  validateIngressShape(input);
  return {
    requestId: crypto.randomUUID(),
    traceId: crypto.randomUUID(),
    methodId: deps.methodId,
    tenantId: deps.tenantId,
    principalId: deps.principalId,
    body: input.body,
    receivedAt: new Date().toISOString(),
    rawMethod: input.method,
    rawPath: input.path,
    headers: sanitizeHeaders(input.headers ?? {}),
  };
}