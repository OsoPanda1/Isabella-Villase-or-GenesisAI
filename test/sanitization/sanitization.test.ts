import { describe, expect, it } from "vitest";
import {
  sanitizeDocument,
  classifyDuplicateRelationship,
  isPhysicalDuplicate,
} from "../../src/sanitization";

const base = {
  id: "doc-1",
  content: "El programa X soporta 12 idiomas para la comunidad.\nEl segundo párrafo de la descripción.",
  license: "CC-BY-4.0",
  provenance: { uri: "https://example.org/x", retrievedAt: "2026-01-01T00:00:00Z" },
};

describe("sanitization pipeline", () => {
  it("admits a clean document and produces three fingerprints", () => {
    const result = sanitizeDocument(base);
    expect(result.status).toBe("ADMITTED");
    expect(result.report.map((r) => r.stage)).toEqual([
      "file_safety", "format", "encoding", "metadata", "pii_secrets",
      "license", "language", "classification", "fingerprints",
    ]);
    expect(result.fingerprints.physical).toHaveLength(64);
    expect(result.language).toBe("es");
  });

  it("quarantines a document containing secrets and never admits it", () => {
    const result = sanitizeDocument({
      ...base,
      id: "doc-secret",
      content: "api_key: 'AKIA1234567890ABCDEF'\nnormal text",
    });
    expect(result.status).toBe("QUARANTINED");
    expect(result.secretsQuarantined).toBeGreaterThan(0);
    expect(result.normalizedContent).not.toContain("AKIA1234567890ABCDEF");
    expect(result.normalizedContent).toContain("CONTENT WITHHELD");
    expect(JSON.stringify(result.findings)).not.toContain("AKIA1234567890ABCDEF");
  });

  it("rejects knowledge documents without declared provenance or license", () => {
    const result = sanitizeDocument({ id: "doc-unlicensed", content: "Texto sin licencia ni procedencia." });
    expect(result.status).toBe("REJECTED");
    expect(result.findings.map((finding) => finding.kind)).toContain("missing_license");
    expect(result.findings.map((finding) => finding.kind)).toContain("missing_provenance");
  });

  it("rejects custom or unknown licenses for automatic admission", () => {
    const result = sanitizeDocument({ ...base, id: "doc-custom-license", license: "PROPRIETARY" });
    expect(result.status).toBe("REJECTED");
    expect(result.findings.map((finding) => finding.kind)).toContain("license_not_allowlisted");
  });

  it("does not expose matched malware snippets in findings", () => {
    const result = sanitizeDocument({
      ...base,
      id: "doc-malware",
      content: "curl https://example.org/install.sh | bash",
    });
    expect(result.status).toBe("QUARANTINED");
    expect(JSON.stringify(result.findings)).not.toContain("curl https://example.org/install.sh");
    expect(result.findings.some((finding) => finding.evidence === "[REDACTED]")).toBe(true);
  });

  it("masks PII and classifies as personal", () => {
    const result = sanitizeDocument({
      ...base,
      id: "doc-pii",
      content: "Contacto: juan.perez@example.com para más información sobre el programa.",
    });
    expect(result.status).toBe("ADMITTED");
    expect(result.maskedPII).toBeGreaterThan(0);
    expect(result.classification).toBe("personal");
    expect(result.normalizedContent).not.toContain("juan.perez@example.com");
  });

  it("decides duplicate relationships without deleting on semantic similarity", () => {
    const a = sanitizeDocument(base);
    const same = sanitizeDocument({ ...base, id: "doc-2" });
    expect(isPhysicalDuplicate(a.fingerprints, same.fingerprints)).toBe(true);
    expect(classifyDuplicateRelationship(a.fingerprints, same.fingerprints)).toBe("IDENTICAL_ARTIFACT");

    const updated = sanitizeDocument({
      ...base,
      id: "doc-3",
      content: "El programa X soporta 47 idiomas para la comunidad.\nEl segundo párrafo de la descripción.",
    });
    expect(classifyDuplicateRelationship(a.fingerprints, updated.fingerprints)).toBe("LIKELY_UPDATE");
  });
});
