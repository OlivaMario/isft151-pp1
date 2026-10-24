# Casos de prueba

| Código | Requerimiento | Pasos | Resultado esperado |
|--------|---------------|-------|--------------------|
| CP01 | RF01 | Tocar la ranura de la tarjeta | Aparece la pantalla de ingreso de PIN |
| CP02 | RF02 | Ingresar 1234 y confirmar | Se muestra el menú principal |
| CP03 | RF02 | Ingresar un PIN incorrecto | Mensaje de error con intentos restantes |
| CP04 | RF02 | Fallar el PIN tres veces | Pantalla de tarjeta retenida |
| CP05 | RF03 | Tocar una opción directamente en la pantalla | Se ejecuta igual que con el botón lateral |
| CP06 | RF05 | Elegir consultar saldo | Se muestra el saldo disponible |
| CP07 | RF06 | Elegir retirar dinero y un monto fijo | Pantalla de confirmación con el monto |
| CP08 | RF06 | Ingresar otro monto que no sea múltiplo de 1000 | Mensaje de monto no válido |
| CP09 | RF06 | Elegir un monto mayor al saldo | Pantalla de operación rechazada |
| CP10 | RF06 | Confirmar la extracción y retirar los billetes | El saldo disminuye y se muestra el resultado |
| CP11 | RF07 | Transferir a un destinatario y confirmar | El saldo disminuye y se muestra el resultado |
| CP12 | RF08 | Depositar un monto y tocar la ranura de depósito | El saldo aumenta |
| CP13 | RF09 | Recargar con un número de menos de 10 dígitos | No permite confirmar |
| CP14 | RF09 | Recargar con número y monto válidos | El saldo disminuye y se muestra el resultado |
| CP15 | RF10 | Pagar un servicio con código de 8 dígitos | Se muestra el importe y, al confirmar, el saldo disminuye |
| CP16 | RF11 | Cambiar el PIN con el PIN actual correcto | El nuevo PIN queda guardado |
| CP17 | RF11 | Cambiar el PIN con el PIN actual incorrecto | Mensaje de error |
| CP18 | RF12 | Elegir Imprimir comprobante | Sale un papel con tipo, monto, saldo y fecha |
| CP19 | RF13 | Tocar la tarjeta devuelta | El cajero vuelve a la pantalla de bienvenida |
| CP20 | RF14 | Activar la voz | El asistente lee la indicación actual |
| CP21 | RF15 | Cambiar a Red Link | Cambian los colores y el rótulo, y se reinicia la práctica |
| CP22 | RNF07 | Abrir la página | Se ve el logo del ISFT 151 y los cuatro integrantes |
