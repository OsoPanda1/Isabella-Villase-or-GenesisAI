# Isabella Villaseñor GenesisAI — Checklist de auditoría total de 500 controles

> **Importante:** son 500 controles accionables de auditoría, no 500 defectos confirmados. No marcar un control como aprobado sin evidencia. Un control sin inspección, prueba o resultado reproducible permanece pendiente.

- Repositorio: `OsoPanda1/Isabella-Villase-or-GenesisAI`
- Rama: `audit/checklist-500-oct-2026`
- Arquitectura: Isabella GenesisAI es el runtime canónico; el resto del ecosistema debe integrarse como módulos, adaptadores o servicios subordinados.
- Estados: `[ ]` pendiente · `[x]` aprobado con evidencia · `[!]` defecto reproducido · `[~]` mitigación parcial.

## Hallazgos de código identificados durante esta revisión

1. [~] La clasificación de duplicados utilizaba igualdad de fingerprints estructurales/semánticos para emitir `VERIFIED_DUPLICATE`. La igualdad de resúmenes con pérdida no demuestra identidad exacta. Se modificó la clasificación en una rama de trabajo anterior; ese ref ya no estaba disponible, por lo que debe reaplicarse y validarse en esta rama antes de considerarlo integrado.
2. [~] En IKES, congelar solo el objeto exterior no protegía todos los arrays y objetos anidados. Se preparó una corrección en una rama que no se pudo resolver al crear el documento; la corrección debe verificarse y reaplicarse en una rama activa.
3. [ ] El manifiesto de evidencia y los gates de estabilidad requieren revisión para asegurar que el identificador cubra todos los campos materiales y que una excepción no se apruebe mediante un booleano controlado por el llamador.
4. [ ] Los endpoints cognitivos requieren verificación de rate limiting y límites de entrada en cada ruta. No declarar la mitigación implementada hasta probar las respuestas 413/429 y confirmar CI.
5. [ ] La rama de checklist parte de `main`; este documento no incorpora por sí mismo los cambios de código de otras ramas.
6. [ ] No considerar el sistema listo para producción o merge hasta que typecheck, pruebas, escaneos de seguridad y CI se ejecuten sobre el SHA final y queden aprobados.

## Registro obligatorio por hallazgo

Registrar: ID, severidad, repositorio, archivo y líneas, evidencia reproducible, impacto, propietario, corrección, prueba de regresión, SHA y estado. No convertir riesgos potenciales en defectos confirmados sin evidencia.

## 1. Inventario de repositorios

- [ ] **AUD-001** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-002** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-003** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-004** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-005** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-006** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-007** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-008** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-009** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-010** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-011** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-012** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-013** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-014** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-015** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-016** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-017** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-018** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-019** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-020** inventario de repositorios, forks, ramas, visibilidad y mantenimiento: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 2. Runtime canónico

- [ ] **AUD-021** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-022** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-023** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-024** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-025** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-026** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-027** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-028** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-029** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-030** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-031** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-032** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-033** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-034** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-035** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-036** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-037** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-038** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-039** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-040** inicialización, ciclo de vida y unicidad del runtime Isabella GenesisAI: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 3. Autenticación y autorización

- [ ] **AUD-041** identidad, roles, permisos, scopes y denegación por defecto: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-042** identidad, roles, permisos, scopes y denegación por defecto: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-043** identidad, roles, permisos, scopes y denegación por defecto: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-044** identidad, roles, permisos, scopes y denegación por defecto: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-045** identidad, roles, permisos, scopes y denegación por defecto: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-046** identidad, roles, permisos, scopes y denegación por defecto: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-047** identidad, roles, permisos, scopes y denegación por defecto: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-048** identidad, roles, permisos, scopes y denegación por defecto: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-049** identidad, roles, permisos, scopes y denegación por defecto: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-050** identidad, roles, permisos, scopes y denegación por defecto: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-051** identidad, roles, permisos, scopes y denegación por defecto: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-052** identidad, roles, permisos, scopes y denegación por defecto: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-053** identidad, roles, permisos, scopes y denegación por defecto: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-054** identidad, roles, permisos, scopes y denegación por defecto: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-055** identidad, roles, permisos, scopes y denegación por defecto: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-056** identidad, roles, permisos, scopes y denegación por defecto: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-057** identidad, roles, permisos, scopes y denegación por defecto: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-058** identidad, roles, permisos, scopes y denegación por defecto: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-059** identidad, roles, permisos, scopes y denegación por defecto: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-060** identidad, roles, permisos, scopes y denegación por defecto: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 4. Validación de entrada

- [ ] **AUD-061** esquemas, límites, normalización y rechazo de payloads inválidos: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-062** esquemas, límites, normalización y rechazo de payloads inválidos: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-063** esquemas, límites, normalización y rechazo de payloads inválidos: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-064** esquemas, límites, normalización y rechazo de payloads inválidos: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-065** esquemas, límites, normalización y rechazo de payloads inválidos: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-066** esquemas, límites, normalización y rechazo de payloads inválidos: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-067** esquemas, límites, normalización y rechazo de payloads inválidos: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-068** esquemas, límites, normalización y rechazo de payloads inválidos: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-069** esquemas, límites, normalización y rechazo de payloads inválidos: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-070** esquemas, límites, normalización y rechazo de payloads inválidos: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-071** esquemas, límites, normalización y rechazo de payloads inválidos: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-072** esquemas, límites, normalización y rechazo de payloads inválidos: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-073** esquemas, límites, normalización y rechazo de payloads inválidos: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-074** esquemas, límites, normalización y rechazo de payloads inválidos: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-075** esquemas, límites, normalización y rechazo de payloads inválidos: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-076** esquemas, límites, normalización y rechazo de payloads inválidos: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-077** esquemas, límites, normalización y rechazo de payloads inválidos: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-078** esquemas, límites, normalización y rechazo de payloads inválidos: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-079** esquemas, límites, normalización y rechazo de payloads inválidos: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-080** esquemas, límites, normalización y rechazo de payloads inválidos: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 5. Secretos y privacidad

- [ ] **AUD-081** redacción de datos sensibles, almacenamiento, retención y borrado: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-082** redacción de datos sensibles, almacenamiento, retención y borrado: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-083** redacción de datos sensibles, almacenamiento, retención y borrado: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-084** redacción de datos sensibles, almacenamiento, retención y borrado: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-085** redacción de datos sensibles, almacenamiento, retención y borrado: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-086** redacción de datos sensibles, almacenamiento, retención y borrado: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-087** redacción de datos sensibles, almacenamiento, retención y borrado: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-088** redacción de datos sensibles, almacenamiento, retención y borrado: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-089** redacción de datos sensibles, almacenamiento, retención y borrado: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-090** redacción de datos sensibles, almacenamiento, retención y borrado: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-091** redacción de datos sensibles, almacenamiento, retención y borrado: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-092** redacción de datos sensibles, almacenamiento, retención y borrado: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-093** redacción de datos sensibles, almacenamiento, retención y borrado: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-094** redacción de datos sensibles, almacenamiento, retención y borrado: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-095** redacción de datos sensibles, almacenamiento, retención y borrado: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-096** redacción de datos sensibles, almacenamiento, retención y borrado: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-097** redacción de datos sensibles, almacenamiento, retención y borrado: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-098** redacción de datos sensibles, almacenamiento, retención y borrado: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-099** redacción de datos sensibles, almacenamiento, retención y borrado: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-100** redacción de datos sensibles, almacenamiento, retención y borrado: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 6. Prompt injection

- [ ] **AUD-101** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-102** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-103** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-104** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-105** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-106** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-107** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-108** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-109** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-110** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-111** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-112** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-113** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-114** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-115** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-116** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-117** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-118** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-119** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-120** fronteras de confianza entre instrucciones, documentos recuperados y herramientas: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 7. Sanitización documental

- [ ] **AUD-121** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-122** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-123** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-124** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-125** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-126** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-127** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-128** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-129** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-130** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-131** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-132** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-133** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-134** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-135** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-136** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-137** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-138** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-139** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-140** transformaciones, cuarentena, metadatos, archivos adjuntos y redacción: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 8. IKES y evidencia

- [ ] **AUD-141** claims, fuentes, evidencia, estados epistemológicos y procedencia: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-142** claims, fuentes, evidencia, estados epistemológicos y procedencia: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-143** claims, fuentes, evidencia, estados epistemológicos y procedencia: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-144** claims, fuentes, evidencia, estados epistemológicos y procedencia: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-145** claims, fuentes, evidencia, estados epistemológicos y procedencia: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-146** claims, fuentes, evidencia, estados epistemológicos y procedencia: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-147** claims, fuentes, evidencia, estados epistemológicos y procedencia: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-148** claims, fuentes, evidencia, estados epistemológicos y procedencia: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-149** claims, fuentes, evidencia, estados epistemológicos y procedencia: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-150** claims, fuentes, evidencia, estados epistemológicos y procedencia: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-151** claims, fuentes, evidencia, estados epistemológicos y procedencia: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-152** claims, fuentes, evidencia, estados epistemológicos y procedencia: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-153** claims, fuentes, evidencia, estados epistemológicos y procedencia: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-154** claims, fuentes, evidencia, estados epistemológicos y procedencia: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-155** claims, fuentes, evidencia, estados epistemológicos y procedencia: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-156** claims, fuentes, evidencia, estados epistemológicos y procedencia: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-157** claims, fuentes, evidencia, estados epistemológicos y procedencia: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-158** claims, fuentes, evidencia, estados epistemológicos y procedencia: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-159** claims, fuentes, evidencia, estados epistemológicos y procedencia: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-160** claims, fuentes, evidencia, estados epistemológicos y procedencia: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 9. Criptografía e integridad

- [ ] **AUD-161** hashes, firmas, claves, certificados, Merkle y estados de verificación: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-162** hashes, firmas, claves, certificados, Merkle y estados de verificación: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-163** hashes, firmas, claves, certificados, Merkle y estados de verificación: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-164** hashes, firmas, claves, certificados, Merkle y estados de verificación: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-165** hashes, firmas, claves, certificados, Merkle y estados de verificación: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-166** hashes, firmas, claves, certificados, Merkle y estados de verificación: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-167** hashes, firmas, claves, certificados, Merkle y estados de verificación: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-168** hashes, firmas, claves, certificados, Merkle y estados de verificación: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-169** hashes, firmas, claves, certificados, Merkle y estados de verificación: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-170** hashes, firmas, claves, certificados, Merkle y estados de verificación: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-171** hashes, firmas, claves, certificados, Merkle y estados de verificación: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-172** hashes, firmas, claves, certificados, Merkle y estados de verificación: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-173** hashes, firmas, claves, certificados, Merkle y estados de verificación: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-174** hashes, firmas, claves, certificados, Merkle y estados de verificación: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-175** hashes, firmas, claves, certificados, Merkle y estados de verificación: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-176** hashes, firmas, claves, certificados, Merkle y estados de verificación: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-177** hashes, firmas, claves, certificados, Merkle y estados de verificación: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-178** hashes, firmas, claves, certificados, Merkle y estados de verificación: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-179** hashes, firmas, claves, certificados, Merkle y estados de verificación: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-180** hashes, firmas, claves, certificados, Merkle y estados de verificación: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 10. Persistencia y BookPI

- [ ] **AUD-181** transacciones, ledger, consistencia, retención y recuperación: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-182** transacciones, ledger, consistencia, retención y recuperación: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-183** transacciones, ledger, consistencia, retención y recuperación: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-184** transacciones, ledger, consistencia, retención y recuperación: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-185** transacciones, ledger, consistencia, retención y recuperación: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-186** transacciones, ledger, consistencia, retención y recuperación: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-187** transacciones, ledger, consistencia, retención y recuperación: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-188** transacciones, ledger, consistencia, retención y recuperación: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-189** transacciones, ledger, consistencia, retención y recuperación: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-190** transacciones, ledger, consistencia, retención y recuperación: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-191** transacciones, ledger, consistencia, retención y recuperación: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-192** transacciones, ledger, consistencia, retención y recuperación: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-193** transacciones, ledger, consistencia, retención y recuperación: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-194** transacciones, ledger, consistencia, retención y recuperación: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-195** transacciones, ledger, consistencia, retención y recuperación: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-196** transacciones, ledger, consistencia, retención y recuperación: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-197** transacciones, ledger, consistencia, retención y recuperación: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-198** transacciones, ledger, consistencia, retención y recuperación: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-199** transacciones, ledger, consistencia, retención y recuperación: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-200** transacciones, ledger, consistencia, retención y recuperación: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 11. Concurrencia e idempotencia

- [ ] **AUD-201** reintentos, eventos duplicados, carreras, locks y cancelación: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-202** reintentos, eventos duplicados, carreras, locks y cancelación: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-203** reintentos, eventos duplicados, carreras, locks y cancelación: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-204** reintentos, eventos duplicados, carreras, locks y cancelación: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-205** reintentos, eventos duplicados, carreras, locks y cancelación: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-206** reintentos, eventos duplicados, carreras, locks y cancelación: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-207** reintentos, eventos duplicados, carreras, locks y cancelación: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-208** reintentos, eventos duplicados, carreras, locks y cancelación: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-209** reintentos, eventos duplicados, carreras, locks y cancelación: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-210** reintentos, eventos duplicados, carreras, locks y cancelación: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-211** reintentos, eventos duplicados, carreras, locks y cancelación: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-212** reintentos, eventos duplicados, carreras, locks y cancelación: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-213** reintentos, eventos duplicados, carreras, locks y cancelación: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-214** reintentos, eventos duplicados, carreras, locks y cancelación: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-215** reintentos, eventos duplicados, carreras, locks y cancelación: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-216** reintentos, eventos duplicados, carreras, locks y cancelación: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-217** reintentos, eventos duplicados, carreras, locks y cancelación: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-218** reintentos, eventos duplicados, carreras, locks y cancelación: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-219** reintentos, eventos duplicados, carreras, locks y cancelación: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-220** reintentos, eventos duplicados, carreras, locks y cancelación: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 12. Modelos y machine learning

- [ ] **AUD-221** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-222** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-223** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-224** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-225** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-226** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-227** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-228** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-229** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-230** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-231** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-232** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-233** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-234** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-235** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-236** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-237** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-238** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-239** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-240** proveedores, inferencia, evaluación, sesgos, límites y afirmaciones sobre ML: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 13. Skills y herramientas

- [ ] **AUD-241** registro, permisos, esquemas, ejecución y efectos secundarios: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-242** registro, permisos, esquemas, ejecución y efectos secundarios: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-243** registro, permisos, esquemas, ejecución y efectos secundarios: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-244** registro, permisos, esquemas, ejecución y efectos secundarios: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-245** registro, permisos, esquemas, ejecución y efectos secundarios: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-246** registro, permisos, esquemas, ejecución y efectos secundarios: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-247** registro, permisos, esquemas, ejecución y efectos secundarios: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-248** registro, permisos, esquemas, ejecución y efectos secundarios: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-249** registro, permisos, esquemas, ejecución y efectos secundarios: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-250** registro, permisos, esquemas, ejecución y efectos secundarios: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-251** registro, permisos, esquemas, ejecución y efectos secundarios: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-252** registro, permisos, esquemas, ejecución y efectos secundarios: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-253** registro, permisos, esquemas, ejecución y efectos secundarios: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-254** registro, permisos, esquemas, ejecución y efectos secundarios: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-255** registro, permisos, esquemas, ejecución y efectos secundarios: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-256** registro, permisos, esquemas, ejecución y efectos secundarios: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-257** registro, permisos, esquemas, ejecución y efectos secundarios: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-258** registro, permisos, esquemas, ejecución y efectos secundarios: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-259** registro, permisos, esquemas, ejecución y efectos secundarios: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-260** registro, permisos, esquemas, ejecución y efectos secundarios: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 14. CROWN, AEGIS y gobernanza

- [ ] **AUD-261** políticas, decisiones, excepciones, aprobación humana y gates: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-262** políticas, decisiones, excepciones, aprobación humana y gates: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-263** políticas, decisiones, excepciones, aprobación humana y gates: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-264** políticas, decisiones, excepciones, aprobación humana y gates: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-265** políticas, decisiones, excepciones, aprobación humana y gates: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-266** políticas, decisiones, excepciones, aprobación humana y gates: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-267** políticas, decisiones, excepciones, aprobación humana y gates: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-268** políticas, decisiones, excepciones, aprobación humana y gates: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-269** políticas, decisiones, excepciones, aprobación humana y gates: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-270** políticas, decisiones, excepciones, aprobación humana y gates: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-271** políticas, decisiones, excepciones, aprobación humana y gates: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-272** políticas, decisiones, excepciones, aprobación humana y gates: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-273** políticas, decisiones, excepciones, aprobación humana y gates: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-274** políticas, decisiones, excepciones, aprobación humana y gates: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-275** políticas, decisiones, excepciones, aprobación humana y gates: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-276** políticas, decisiones, excepciones, aprobación humana y gates: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-277** políticas, decisiones, excepciones, aprobación humana y gates: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-278** políticas, decisiones, excepciones, aprobación humana y gates: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-279** políticas, decisiones, excepciones, aprobación humana y gates: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-280** políticas, decisiones, excepciones, aprobación humana y gates: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 15. Pruebas y CI

- [ ] **AUD-281** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-282** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-283** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-284** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-285** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-286** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-287** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-288** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-289** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-290** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-291** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-292** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-293** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-294** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-295** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-296** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-297** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-298** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-299** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-300** typecheck, tests, lint, cobertura, jobs, artefactos y estado del SHA: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 16. Dependencias y supply chain

- [ ] **AUD-301** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-302** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-303** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-304** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-305** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-306** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-307** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-308** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-309** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-310** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-311** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-312** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-313** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-314** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-315** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-316** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-317** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-318** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-319** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-320** lockfiles, CVEs, licencias, SBOM, acciones CI y procedencia: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 17. Despliegue y configuración

- [ ] **AUD-321** variables de entorno, contenedores, readiness, rollback y secretos: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-322** variables de entorno, contenedores, readiness, rollback y secretos: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-323** variables de entorno, contenedores, readiness, rollback y secretos: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-324** variables de entorno, contenedores, readiness, rollback y secretos: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-325** variables de entorno, contenedores, readiness, rollback y secretos: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-326** variables de entorno, contenedores, readiness, rollback y secretos: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-327** variables de entorno, contenedores, readiness, rollback y secretos: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-328** variables de entorno, contenedores, readiness, rollback y secretos: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-329** variables de entorno, contenedores, readiness, rollback y secretos: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-330** variables de entorno, contenedores, readiness, rollback y secretos: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-331** variables de entorno, contenedores, readiness, rollback y secretos: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-332** variables de entorno, contenedores, readiness, rollback y secretos: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-333** variables de entorno, contenedores, readiness, rollback y secretos: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-334** variables de entorno, contenedores, readiness, rollback y secretos: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-335** variables de entorno, contenedores, readiness, rollback y secretos: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-336** variables de entorno, contenedores, readiness, rollback y secretos: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-337** variables de entorno, contenedores, readiness, rollback y secretos: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-338** variables de entorno, contenedores, readiness, rollback y secretos: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-339** variables de entorno, contenedores, readiness, rollback y secretos: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-340** variables de entorno, contenedores, readiness, rollback y secretos: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 18. Observabilidad e incidentes

- [ ] **AUD-341** logs, métricas, trazas, alertas, correlación y respuesta: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-342** logs, métricas, trazas, alertas, correlación y respuesta: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-343** logs, métricas, trazas, alertas, correlación y respuesta: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-344** logs, métricas, trazas, alertas, correlación y respuesta: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-345** logs, métricas, trazas, alertas, correlación y respuesta: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-346** logs, métricas, trazas, alertas, correlación y respuesta: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-347** logs, métricas, trazas, alertas, correlación y respuesta: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-348** logs, métricas, trazas, alertas, correlación y respuesta: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-349** logs, métricas, trazas, alertas, correlación y respuesta: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-350** logs, métricas, trazas, alertas, correlación y respuesta: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-351** logs, métricas, trazas, alertas, correlación y respuesta: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-352** logs, métricas, trazas, alertas, correlación y respuesta: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-353** logs, métricas, trazas, alertas, correlación y respuesta: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-354** logs, métricas, trazas, alertas, correlación y respuesta: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-355** logs, métricas, trazas, alertas, correlación y respuesta: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-356** logs, métricas, trazas, alertas, correlación y respuesta: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-357** logs, métricas, trazas, alertas, correlación y respuesta: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-358** logs, métricas, trazas, alertas, correlación y respuesta: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-359** logs, métricas, trazas, alertas, correlación y respuesta: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-360** logs, métricas, trazas, alertas, correlación y respuesta: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 19. Licencias y regulación

- [ ] **AUD-361** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-362** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-363** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-364** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-365** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-366** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-367** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-368** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-369** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-370** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-371** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-372** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-373** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-374** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-375** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-376** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-377** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-378** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-379** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-380** MIT, componentes terceros, privacidad, jurisdicciones y afirmaciones de cumplimiento: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 20. Sesgos y evaluación de respuestas

- [ ] **AUD-381** factualidad, calibración, representatividad, abstención y citas: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-382** factualidad, calibración, representatividad, abstención y citas: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-383** factualidad, calibración, representatividad, abstención y citas: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-384** factualidad, calibración, representatividad, abstención y citas: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-385** factualidad, calibración, representatividad, abstención y citas: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-386** factualidad, calibración, representatividad, abstención y citas: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-387** factualidad, calibración, representatividad, abstención y citas: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-388** factualidad, calibración, representatividad, abstención y citas: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-389** factualidad, calibración, representatividad, abstención y citas: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-390** factualidad, calibración, representatividad, abstención y citas: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-391** factualidad, calibración, representatividad, abstención y citas: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-392** factualidad, calibración, representatividad, abstención y citas: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-393** factualidad, calibración, representatividad, abstención y citas: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-394** factualidad, calibración, representatividad, abstención y citas: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-395** factualidad, calibración, representatividad, abstención y citas: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-396** factualidad, calibración, representatividad, abstención y citas: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-397** factualidad, calibración, representatividad, abstención y citas: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-398** factualidad, calibración, representatividad, abstención y citas: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-399** factualidad, calibración, representatividad, abstención y citas: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-400** factualidad, calibración, representatividad, abstención y citas: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 21. README y documentación

- [ ] **AUD-401** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-402** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-403** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-404** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-405** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-406** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-407** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-408** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-409** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-410** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-411** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-412** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-413** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-414** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-415** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-416** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-417** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-418** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-419** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-420** afirmaciones públicas, comandos, versiones, diagramas y limitaciones: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 22. Integración de repositorios

- [ ] **AUD-421** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-422** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-423** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-424** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-425** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-426** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-427** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-428** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-429** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-430** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-431** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-432** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-433** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-434** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-435** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-436** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-437** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-438** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-439** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-440** adaptadores, contratos, versiones, aislamiento y ausencia de runtime paralelo: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 23. UX y accesibilidad

- [ ] **AUD-441** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-442** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-443** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-444** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-445** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-446** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-447** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-448** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-449** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-450** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-451** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-452** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-453** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-454** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-455** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-456** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-457** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-458** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-459** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-460** estados, mensajes, accesibilidad, privacidad en interfaz y confirmaciones: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 24. Rendimiento y resiliencia

- [ ] **AUD-461** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-462** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-463** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-464** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-465** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-466** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-467** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-468** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-469** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-470** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-471** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-472** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-473** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-474** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-475** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-476** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-477** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-478** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-479** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-480** latencia, memoria, backpressure, cuotas, circuit breakers y carga: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## 25. CI/CD y releases

- [ ] **AUD-481** protección de ramas, aprobaciones, artefactos, versionado y promoción: Validar contrato, esquema y compatibilidad; añadir pruebas para campos inválidos. (dimensión: contrato).
- [ ] **AUD-482** protección de ramas, aprobaciones, artefactos, versionado y promoción: Exigir evidencia reproducible del comportamiento; documentación sola no cuenta como prueba. (dimensión: evidencia).
- [ ] **AUD-483** protección de ramas, aprobaciones, artefactos, versionado y promoción: Probar configuración ausente, proveedor caído y error interno; evitar declarar éxito. (dimensión: fallo seguro).
- [ ] **AUD-484** protección de ramas, aprobaciones, artefactos, versionado y promoción: Comprobar que la autorización provenga del servidor y que el cliente no pueda elevar privilegios. (dimensión: autorización).
- [ ] **AUD-485** protección de ramas, aprobaciones, artefactos, versionado y promoción: Definir límites de tamaño, tiempo, concurrencia y consumo; probar el límite y el exceso. (dimensión: límites).
- [ ] **AUD-486** protección de ramas, aprobaciones, artefactos, versionado y promoción: Comprobar que tokens, claves y datos personales no aparezcan en logs o respuestas. (dimensión: secretos).
- [ ] **AUD-487** protección de ramas, aprobaciones, artefactos, versionado y promoción: Verificar que referencias y objetos anidados no alteren estado que se considera inmutable. (dimensión: mutabilidad).
- [ ] **AUD-488** protección de ramas, aprobaciones, artefactos, versionado y promoción: Probar reintentos, duplicados y concurrencia sin duplicar efectos secundarios. (dimensión: reintentos).
- [ ] **AUD-489** protección de ramas, aprobaciones, artefactos, versionado y promoción: Registrar estado, correlación y motivo sin filtrar datos sensibles ni confundir simulación con ejecución. (dimensión: observabilidad).
- [ ] **AUD-490** protección de ramas, aprobaciones, artefactos, versionado y promoción: Probar el contrato con el runtime canónico y con el adaptador real, no solo mocks permisivos. (dimensión: integración).
- [ ] **AUD-491** protección de ramas, aprobaciones, artefactos, versionado y promoción: Agregar prueba para entrada maliciosa, permiso denegado o evidencia incompleta. (dimensión: prueba negativa).
- [ ] **AUD-492** protección de ramas, aprobaciones, artefactos, versionado y promoción: Vincular cada defecto confirmado con una prueba que falle antes y pase después de corregirlo. (dimensión: regresión).
- [ ] **AUD-493** protección de ramas, aprobaciones, artefactos, versionado y promoción: Identificar dependencias directas/transitivas, versiones, licencias y vulnerabilidades pertinentes. (dimensión: dependencias).
- [ ] **AUD-494** protección de ramas, aprobaciones, artefactos, versionado y promoción: Validar variables requeridas y defaults; configuración crítica ausente debe fallar cerrada. (dimensión: configuración).
- [ ] **AUD-495** protección de ramas, aprobaciones, artefactos, versionado y promoción: Alinear la documentación con el código ejecutado y marcar limitaciones no implementadas. (dimensión: documentación).
- [ ] **AUD-496** protección de ramas, aprobaciones, artefactos, versionado y promoción: Registrar versión, commit, algoritmo o modelo que originó el resultado y permitir reproducirlo. (dimensión: versionado).
- [ ] **AUD-497** protección de ramas, aprobaciones, artefactos, versionado y promoción: Probar separación entre usuarios, tenants, sesiones y datos restringidos. (dimensión: aislamiento).
- [ ] **AUD-498** protección de ramas, aprobaciones, artefactos, versionado y promoción: Verificar que acciones críticas generen un evento de auditoría correlacionable e íntegro. (dimensión: auditoría).
- [ ] **AUD-499** protección de ramas, aprobaciones, artefactos, versionado y promoción: Probar recuperación tras reinicio, fallo parcial, desconexión o rollback. (dimensión: recuperación).
- [ ] **AUD-500** protección de ramas, aprobaciones, artefactos, versionado y promoción: Impedir promoción a producción si el control crítico está fallido, omitido o no evaluado. (dimensión: gate de release).

## Criterio de cierre

No cerrar una categoría por haber leído su README. Exigir prueba automatizada, resultado CI, configuración revisada, ejecución reproducible o revisión experta registrada. Mantener diferenciados `NOT_CONFIGURED`, `NOT_VERIFIED`, `FAILED` y `VERIFIED`. No afirmar cumplimiento legal, seguridad cuántica, producción ni porcentajes de avance sin evidencia específica.