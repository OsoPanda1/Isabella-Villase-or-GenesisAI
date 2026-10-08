/** CROWN — clasificación de intención y sensibilidad (canon v40 / crown v2). */

export type IntentCategory =
  | "conversational"
  | "planning"
  | "coding"
  | "knowledge"
  | "creative"
  | "governance"
  | "external_action"
  | "personal_data"
  | "security"
  | "generic";

export type SensitivityLevel = "public" | "internal" | "personal" | "restricted";

export type RiskLevel = "minimal" | "low" | "medium" | "high" | "critical";

export interface IntentAssessment {
  category: IntentCategory;
  confidence: number;
  signals: string[];
  ambiguous: boolean;
  sensitivity: SensitivityLevel;
  isDestructive: boolean;
  requestsApproval: boolean;
  hasSecretRequest: boolean;
  touchesPersonalData: boolean;
  isExternalAction: boolean;
}

export const CATEGORY_PATTERNS: Record<IntentCategory, readonly string[]> = {
  conversational: ["hola", "hello", "buenos", "cómo estás", "gracias", "adios", "hey", "qué tal"],
  planning: ["plan", "roadmap", "bosquejo", "secuencia", "estrategia", "decompose", "organizar", "pasos"],
  coding: ["código", "code", "bug", "typescript", "función", "script", "refactor", "test", "pip install", "import "],
  knowledge: ["explica", "qué es", "define", "investiga", "fuente", "resumen", "artículo", "publicación"],
  creative: ["diseña", "crea", "escribe", "dibuja", "carátula", "historia", "melodía", "inspira"],
  governance: ["aprobar", "autorizar", "política", "approval", "permiso", "acceso", "soberanía", "regla"],
  external_action: ["enviar", "publicar", "transferir", "comprar", "vender", "mandar email", "subir", "deploy"],
  personal_data: ["mi nombre", "mi correo", "teléfono", "curp", "datos personales", "dirección", "historial médico"],
  security: ["secreto", "contraseña", "clave", "credencial", "vulnerabilidad", "penetrar", "explotar", "token"],
  generic: [],
};

export const DESTRUCTIVE_SIGNALS = [
  "borrar", "borra", "eliminar", "elimina", "eliminar permanente", "destruir",
  "infiltrar", "robar", "amenazar", "explotar vulnerabilidad", "purgar bases",
  "wipe", "ransomware", "ddos",
];

export const SECRET_SIGNALS = [
  "contraseña", "password", "api key", "secreto", "credenciales", "private key",
  "access token", "secret key",
];

export const APPROVAL_SIGNALS = [
  "apruebas", "autorizas", "necesito autorización", "requiero aprobación",
  "please approve", "can you approve",
];

export function assessIntent(input: string): IntentAssessment {
  const haystack = input.toLowerCase();
  const signals: string[] = [];
  const scores = new Map<IntentCategory, number>();
  let best: { category: IntentCategory; score: number } | undefined;

  for (const [category, patterns] of Object.entries(CATEGORY_PATTERNS)) {
    if (category === "generic") {
      continue;
    }
    let score = 0;
    for (const pattern of patterns) {
      if (haystack.includes(pattern)) {
        score += 1;
        signals.push(`${category}:${pattern}`);
      }
    }
    if (score > 0) {
      scores.set(category as IntentCategory, score);
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { category: category as IntentCategory, score };
    }
  }

  const category = best?.category ?? "generic";
  const maxScore = best?.score ?? 0;
  const ambiguous = maxScore > 0 && [...scores.values()].filter((s) => s === maxScore).length > 1;
  const total = Object.values(CATEGORY_PATTERNS).reduce((acc, p) => acc + p.length, 0);
  const confidence = Math.min(0.99, 0.35 + maxScore / Math.max(1, total * 0.05));

  const isExternal = CATEGORY_PATTERNS.external_action.some((p) => haystack.includes(p));
  const destructive = DESTRUCTIVE_SIGNALS.some((s) => haystack.includes(s));
  const hasSecret = SECRET_SIGNALS.some((s) => haystack.includes(s));
  const approval = APPROVAL_SIGNALS.some((s) => haystack.includes(s));
  const personal = CATEGORY_PATTERNS.personal_data.some((p) => haystack.includes(p));

  let sensitivity: SensitivityLevel = "public";
  if (personal) {
    sensitivity = "personal";
  }
  if (hasSecret || destructive) {
    sensitivity = "restricted";
  }

  return {
    category,
    confidence,
    signals,
    ambiguous,
    sensitivity,
    isDestructive: destructive,
    hasSecretRequest: hasSecret,
    requestsApproval: approval,
    touchesPersonalData: personal,
    isExternalAction: isExternal,
  };
}

export function riskFromDestructive(intent: IntentAssessment): RiskLevel {
  if (intent.isDestructive) {
    return "critical";
  }
  if (intent.hasSecretRequest || intent.touchesPersonalData) {
    return "high";
  }
  return "low";
}