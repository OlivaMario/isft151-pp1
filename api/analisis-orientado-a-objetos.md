# Análisis orientado a objetos

## Casos de uso

- Iniciar sesión con tarjeta y PIN.
- Consultar saldo.
- Retirar dinero.
- Transferir.
- Depositar dinero.
- Recargar celular.
- Pagar servicios.
- Cambiar PIN.
- Imprimir comprobante.
- Finalizar sesión.
- Recibir guía del asistente.

## Actores

- Persona usuaria.
- Asistente de guía (sistema).

## Diagrama de clases

```mermaid
classDiagram
    class cajeroAutomatico {
        pin
        saldo
        intentosMaximos
        intentosFallidos
        tarjetaInsertada
        tarjetaRetenida
        sesionActiva
        montoMaximoExtraccion
        montoMaximoTransferencia
        montoMaximoDeposito
        montosExtraccion
        montosRecarga
        destinatarios
        servicios
        operadoras
        movimientos
        ultimoMovimiento
        insertarTarjeta()
        validarPin(pin)
        cambiarPin(actual, nuevo, repetido)
        consultarSaldo()
        extraer(monto)
        transferir(destinatario, monto)
        depositar(monto)
        recargarCelular(operadora, numero, monto)
        pagarServicio(servicio, codigo)
        registrarMovimiento(tipo, detalle, monto)
        finalizarSesion()
        retirarTarjeta()
        reiniciar()
    }
    class interfazDeUsuario {
        fase
        entrada
        pedirEntrada(configuracion)
        dibujarPantalla(titulo, mensaje, opciones)
        indicar(texto)
    }
    class movimiento {
        tipo
        detalle
        monto
        saldo
        fecha
    }
    interfazDeUsuario --> cajeroAutomatico
    cajeroAutomatico "1" --> "*" movimiento
```

## Estados del cajero

espera, pin, menu, saldo, monto, otroMonto, confirmarMonto, rechazo, retiroBilletes, preguntaComprobante, retiroTarjeta, bloqueo.
