# Auditoría de evolución del ecosistema Isabella — 9 de octubre de 2026

## Alcance

Se revisaron el repositorio canónico `Isabella-Villase-or-GenesisAI` y repositorios relacionados disponibles en la cuenta OsoPanda1, incluyendo `isabella-ai-tina`, `isabella-s-genesis-ai`, `isabella-ai-genesis-91037f85`, `isabella-s-crown`, `DOCUMENTACION-TAMV-DM-X4-e-ISABELLA-AI`, y resultados de búsqueda de `litle-trust-fabric`, `rdm-digital-hub` y `tamv-digital-nexus`.

El inventario identifica patrones y contratos documentados; no significa que todos los repositorios, despliegues, proveedores o datos externos estén conectados ni que cada afirmación de sus README haya sido validada en producción.

## Decisión arquitectónica

**Isabella Villaseñor GenesisAI permanece como el único runtime canónico.** Los repositorios relacionados se clasifican como fuentes de patrones, documentación, datos, módulos o adaptadores. No se introduce un runtime cognitivo paralelo.

## Activos reutilizables identificados

- **Seguridad y autoridad:** autorización server-side, separación de capacidad y permiso, fail-closed, revisión humana, protección de secretos y reducción de datos sensibles en logs.
- **IKES y procedencia:** estados epistemológicos explícitos, procedencia, temporalidad, hashes reproducibles y separación entre afirmación, fuente, corroboración y verificación.
- **Gobernanza de ingeniería:** manifests de evidencia, gates de calidad, validación de despliegue, reconciliación antes de release, observación de diffs en modo lectura y ciclo de vida que propone cambios sin ejecutarlos destructivamente.
- **Integridad científica:** cadenas de evidencia y certificados HMAC existentes; HMAC no es firma pública ni equivale a ML-DSA/Dilithium.
- **Infraestructura territorial:** contexto RDM/TAMV, Atlas como adaptador de persistencia y PennyLane como puente especializado opcional.

## Hallazgos críticos corregidos en esta rama

1. La sanitización podía devolver texto que contenía secretos después de marcar el documento como cuarentena. Ahora los hallazgos no exponen el fragmento secreto y el contenido de documentos en cuarentena se sustituye por un marcador.
2. Un documento sin licencia declarada o sin procedencia no se admite en el pipeline de conocimiento.
3. IKES rechazaba hashes con formato inválido, fechas no válidas, URI no permitidas y reutilización conflictiva del mismo ID de fuente. La ingesta calcula SHA-256 sobre el contenido aportado, no usa cadenas ficticias basadas en fecha.
4. Las rutas de mutación de memoria y admisión requieren token de servicio server-side. Los roles/principales del cliente no controlan el principal usado para HSF.
5. HSF ahora deniega por defecto sin metadatos internos de autenticación y admisión de gobernanza; la ruta API solo añade esos metadatos después de validar token y pasar el gate Genesis.
6. El pipeline IKES no libera una entrada sin claim, evidencia, auditoría, commit Git válido e índice confirmado. El runtime actual no tiene índice durable conectado, por lo que la admisión permanece bloqueada en lugar de fingir que el documento ya fue indexado.
7. Se retiraron respuestas ficticias de integridad BookPI, ML-DSA/HSM, RLS, firma, sincronización del gemelo digital, arbitraje epistemológico, evaluación de cumplimiento, pruebas formales, telemetría y readiness canary. Sin adaptador o evaluación real, la respuesta es `NOT_CONFIGURED`, `NOT_VERIFIED`, `NOT_ASSESSED` o `SIMULATED`.

## Interoperabilidad y licencias

El repositorio canónico declara MIT en `LICENSE`. El repositorio `isabella-ai-tina` declara un marco híbrido con condiciones diferenciadas para código, documentación, marca y componentes propietarios. Por esa razón, esta evolución reutiliza patrones de arquitectura y especificaciones, pero no copia automáticamente código o activos de aquel repositorio dentro de la distribución MIT. Antes de portar archivos, hay que verificar licencia del archivo, dependencias, derechos sobre marca/datos y procedencia.

Una arquitectura híbrida futura debe separar al menos:
- código fuente con licencia explícita;
- documentación y esquemas;
- marca, personalidad y assets;
- secretos, datos personales y datos territoriales restringidos;
- componentes propietarios/privados y adaptadores publicados.

La licencia de software no otorga por sí sola autorización para procesar datos personales ni certifica cumplimiento jurídico.

## Límites de esta auditoría

- No se ha acreditado despliegue productivo ni cumplimiento normativo.
- Los URLs de fuentes suministrados a las rutas de ingesta son metadatos: el servidor no descarga ni verifica el contenido remoto. La respuesta lo etiqueta como `USER_SUPPLIED_CONTENT_HASHED_NOT_REMOTE_VERIFIED`.
- El hash prueba integridad de los bytes que se hashean, no autenticidad del autor, verdad de la afirmación ni propiedad de la identidad.
- No se afirma que exista un QPU, HSM, motor OPA, RLS productivo, índice durable o ledger WORM operativo sin adaptador y evidencia.
- No se afirma CI verde hasta revisar los checks del SHA exacto después de estos cambios.

## Validación requerida

Ejecutar en la rama y registrar el resultado del commit final:

```bash
npm run typecheck
npm test
npm run build
```

La aceptación requiere además revisar la autenticación negativa de HSF y las rutas de escritura, verificar que los secretos no aparecen en salidas de sanitización, y confirmar que los estados no configurados no se muestran como verificaciones exitosas.
