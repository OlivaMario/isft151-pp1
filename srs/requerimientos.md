# Especificación de requerimientos

## Requerimientos funcionales

Ordenados según la secuencia lógica de construcción.

| Código | Título | Descripción | Responsable | Plazo | Prioridad | Estado |
|--------|--------|-------------|-------------|-------|-----------|--------|
| RF01 | Inserción de tarjeta | Ranura interactiva que inicia la sesión | Gambini | Definir | Muy alta | Terminado |
| RF02 | Validación de PIN | Ingreso de 4 dígitos, error y retención tras 3 intentos | Marcovecchio | Definir | Muy alta | Terminado |
| RF03 | Pantalla táctil | Opciones tocables en pantalla además de los botones laterales | Oliva | Definir | Muy alta | Terminado |
| RF04 | Menú principal | Ocho opciones: siete operaciones y salir | Squirru | Definir | Muy alta | Terminado |
| RF05 | Consulta de saldo | Muestra el saldo disponible de la cuenta | Gambini | Definir | Alta | Terminado |
| RF06 | Retirar dinero | Montos fijos u otro monto, con validación de saldo, múltiplos de 1000 y máximo | Marcovecchio | Definir | Alta | Terminado |
| RF07 | Transferir | Elección de destinatario, monto y confirmación | Oliva | Definir | Alta | Terminado |
| RF08 | Depositar dinero | Monto múltiplo de 100 e ingreso de billetes por la ranura de depósito | Squirru | Definir | Alta | Terminado |
| RF09 | Recargar celular | Elección de empresa, número de 10 dígitos, monto y confirmación | Gambini | Definir | Media | Terminado |
| RF10 | Pagar servicios | Elección de servicio, código de 8 dígitos e importe calculado | Marcovecchio | Definir | Media | Terminado |
| RF11 | Cambiar PIN | Verificación del PIN actual y repetición del nuevo | Oliva | Definir | Media | Terminado |
| RF12 | Comprobante | Impresión opcional con tipo, monto, saldo y fecha | Squirru | Definir | Media | Terminado |
| RF13 | Devolución de tarjeta | Cierre de sesión con retiro de tarjeta | Gambini | Definir | Alta | Terminado |
| RF14 | Asistente guiado | Indicación de cada paso en texto y voz, con repetición | Marcovecchio | Definir | Muy alta | Terminado |
| RF15 | Selección de red | Cambio entre Banelco y Link | Oliva | Definir | Media | Terminado |

## Requerimientos no funcionales

| Código | Descripción |
|--------|-------------|
| RNF01 | Funciona en navegadores modernos de escritorio y móviles |
| RNF02 | Se publica como sitio estático con GitHub Pages |
| RNF03 | Texto grande y contraste alto para personas mayores |
| RNF04 | Operable con mouse, pantalla táctil y teclado |
| RNF05 | No usa datos ni dinero reales |
| RNF06 | Código en un solo idioma, sin comentarios, con sangría de 4 espacios y convención lowerCamelCase |
| RNF07 | Muestra el logo del ISFT 151 y los nombres de los integrantes |
