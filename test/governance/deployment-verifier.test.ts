import { describe, expect, it } from "vitest";
import { assessDeployment, verifyAgentSdkApp, validateFileHeader, scanTransparency } from "../../src/governance";

const passing = {
  build: "passed", tests: "passed", secret_scan: "passed", dependency_scan: "passed",
  security_scan: "passed", auth_rls: "passed", smoke: "passed", health_readiness: "passed",
  canary: "passed", rollback_plan: "passed",
} as const;

describe("deployment gates", () => {
  it("is deployable only when all gates pass", () => {
    const ok = assessDeployment({ layer: "tamv-app", provider: "vercel" }, passing);
    expect(ok.deployable).toBe(true);
  });

  it("blocks on missing critical gates and example DNS values", () => {
    const missing = assessDeployment({ layer: "tamv-app", provider: "vercel" }, { ...passing, secret_scan: "skipped" });
    expect(missing.deployable).toBe(false);
    expect(missing.blockers).toContain("secret_scan");

    const dns = assessDeployment({ layer: "tamv-app", provider: "vercel" }, passing, { dnsRecords: ["192.0.2.1"] });
    expect(dns.deployable).toBe(false);
    expect(dns.blockers).toContain("dns_example_value_in_production");
  });
});

describe("agent sdk verifier", () => {
  it("returns NOT_APPLICABLE for non-SDK apps", () => {
    expect(verifyAgentSdkApp({ isAgentSdkApp: false }).overall).toBe("NOT_APPLICABLE");
  });

  it("does not return PASS when checks have not been executed", () => {
    const report = verifyAgentSdkApp({ isAgentSdkApp: true });
    expect(report.overall).toBe("INCONCLUSIVE");
    expect(report.findings.some((finding) => finding.state === "INCONCLUSIVE")).toBe(true);
  });

  it("fails on secrets and warns on missing pins", () => {
    const fail = verifyAgentSdkApp({ isAgentSdkApp: true, secretPatternsFound: 2, syntaxErrors: [], importErrors: [] });
    expect(fail.overall).toBe("FAIL");
    const warn = verifyAgentSdkApp({ isAgentSdkApp: true, secretPatternsFound: 0 });
    expect(warn.overall).toBe("INCONCLUSIVE");
  });
});

describe("file header schema", () => {
  it("validates the mandatory canonical header", () => {
    expect(validateFileHeader({}).valid).toBe(false);
    const ok = validateFileHeader({
      context: "x", status: "stable", dependencies: ["a"], ownership: "team", version: "1.0.0", limitations: ["none"],
    });
    expect(ok.valid).toBe(true);
  });

  it("declares auto-generated state without human approval", () => {
    expect(scanTransparency("state: auto_generated").effectiveState).toBe("auto_generated");
    expect(scanTransparency("human_approved", "stable").effectiveState).toBe("stable");
  });
});
