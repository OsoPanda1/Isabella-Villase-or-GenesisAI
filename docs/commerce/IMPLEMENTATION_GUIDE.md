# Guía de implementación

## Fase 0 — Preparación

1. Crear proyecto Supabase.
2. Activar Auth.
3. Configurar variables secretas en Secret Manager.
4. Ejecutar migraciones SQL.
5. Activar RLS.
6. Crear proveedor de pagos en modo sandbox.
7. Configurar webhook firmado.
8. Crear workspace de prueba.

## Fase 1 — Primer ingreso

1. Registrar usuario.
2. Crear workspace.
3. Activar Premium en sandbox.
4. Crear meta.
5. Crear oferta con precio y entrega.
6. Crear landing.
7. Generar contenido.
8. Revisar disclosure y CTA.
9. Aprobar publicación.
10. Crear checkout.
11. Completar pago de prueba.
12. Verificar webhook.
13. Confirmar venta idempotente.
14. Mostrar ingreso neto.

## Fase 2 — Publicación

1. Conectar una cuenta profesional compatible.
2. Solicitar permisos mínimos.
3. Validar token.
4. Previsualizar contenido.
5. Aprobar contenido.
6. Publicar o guiar el paso manual.
7. Registrar resultado.

## Fase 3 — Leads

1. Activar formulario.
2. Mostrar aviso de privacidad.
3. Registrar consentimiento.
4. Crear lead.
5. Deduplicar.
6. Calificar.
7. Registrar contacto.
8. Registrar resultado comercial.

## Fase 4 — Producción

1. Activar rate limiting.
2. Probar backups.
3. Probar rollback.
4. Ejecutar pruebas de RLS.
5. Ejecutar pruebas de webhook duplicado.
6. Revisar logs sin secretos.
7. Invitar piloto controlado.

## Criterio de salida

Un usuario puede pasar de oferta a pago confirmado, sin duplicación, con consentimiento, atribución y auditoría.