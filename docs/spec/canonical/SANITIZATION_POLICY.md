# Sanitization Policy

**Contexto:** sanitización segura de documentos antes de deduplicación y admisión.

**Estado:** alpha.

**Dependencias:** ARGUS, ORION, IKES identity layer, licencia y política de privacidad.

## Flujo

```text
raw → malware/file safety → format → encoding → metadata/content
→ PII/secrets → license → language → classification → fingerprints
```

La sanitización no debe alterar el significado. El original se conserva inmutable cuando la licencia lo permite; la versión normalizada se usa para análisis.

## Controles

- Normalización Unicode NFKC.
- Detección de caracteres de control.
- Detección y cuarentena de secretos.
- PII minimizada y enmascarada según política.
- Validación de tamaño, formato y encoding.
- Comprobación de licencia y provenance.
- Fingerprint físico, estructural y semántico.

Los archivos sospechosos no se indexan ni ejecutan. Se registran como `QUARANTINED`.
