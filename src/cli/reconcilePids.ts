import { config } from "../config.js";
import { reconcilePids, type ReconciliationReport } from "../pidReconciler.js";

const EXIT = Object.freeze({
  SUCCESS: 0,
  VALIDATION_FAILED: 1,
  RUNTIME_ERROR: 2,
} as const);

type ExitCode = (typeof EXIT)[keyof typeof EXIT];
type LogLevel = "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  payload?: unknown;
}

function emit(level: LogLevel, message: string, payload?: unknown): void {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(payload !== undefined ? { payload } : {}),
  };
  const output = JSON.stringify(entry);
  if (level === "error") console.error(output);
  else console.log(output);
}

function normalizeError(error: unknown): { name: string; message: string; stack?: string } {
  if (error instanceof Error) return { name: error.name || "Error", message: error.message || "Unknown error", stack: error.stack };
  return { name: "UnknownError", message: String(error) };
}

function setExitCode(code: ExitCode): void {
  process.exitCode = code;
}

async function runReconciliation(): Promise<ReconciliationReport> {
  emit("info", "PID reconciliation started");
  const report = await reconcilePids(config);
  emit(report.passed ? "info" : "warn", "PID reconciliation completed", report);
  setExitCode(report.passed ? EXIT.SUCCESS : EXIT.VALIDATION_FAILED);
  return report;
}

async function main(): Promise<void> {
  try {
    await runReconciliation();
  } catch (error) {
    emit("error", "PID reconciliation job failed", normalizeError(error));
    setExitCode(EXIT.RUNTIME_ERROR);
  }
}

void main();
