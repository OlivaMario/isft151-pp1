const formatoPesos = (valor) => "$" + valor.toLocaleString("es-AR");
const formatoMonto = (texto) => "$ " + Number(texto).toLocaleString("es-AR");
const formatoTelefono = (texto) => [texto.slice(0, 2), texto.slice(2, 6), texto.slice(6, 10)].filter(Boolean).join(" ");
const formatoCodigo = (texto) => texto.replace(/(\d{4})(?=\d)/g, "$1 ");

class cajeroAutomatico {
    constructor() {
        this.pin = "1234";
        this.saldo = 150000;
        this.intentosMaximos = 3;
        this.intentosFallidos = 0;
        this.tarjetaInsertada = false;
        this.tarjetaRetenida = false;
        this.sesionActiva = false;
        this.montoMaximoExtraccion = 30000;
        this.montoMaximoTransferencia = 100000;
        this.montoMaximoDeposito = 100000;
        this.montosExtraccion = [1000, 2000, 5000, 10000, 20000];
        this.montosRecarga = [200, 500, 1000, 2000];
        this.destinatarios = ["Ana Pérez", "Luis Gómez", "Carla Ruiz"];
        this.servicios = ["Electricidad", "Agua", "Gas", "Internet"];
        this.operadoras = ["Personal", "Movistar", "Claro"];
        this.movimientos = [];
        this.ultimoMovimiento = null;
    }

    respuesta(ok, mensaje) {
        return { ok, mensaje };
    }

    insertarTarjeta() {
        if (this.tarjetaRetenida) return this.respuesta(false, "La tarjeta está retenida.");
        this.tarjetaInsertada = true;
        return this.respuesta(true, "Tarjeta insertada.");
    }

    retirarTarjeta() {
        this.tarjetaInsertada = false;
        this.sesionActiva = false;
    }

    finalizarSesion() {
        this.sesionActiva = false;
    }

    verificarPin(pin) {
        return pin === this.pin;
    }

    validarPin(pin) {
        if (!this.tarjetaInsertada) return this.respuesta(false, "Inserte la tarjeta.");
        if (this.verificarPin(pin)) {
            this.sesionActiva = true;
            this.intentosFallidos = 0;
            return this.respuesta(true, "PIN correcto.");
        }
        this.intentosFallidos++;
        if (this.intentosFallidos >= this.intentosMaximos) {
            this.tarjetaRetenida = true;
            this.tarjetaInsertada = false;
            return this.respuesta(false, "Tarjeta retenida por superar los intentos.");
        }
        return this.respuesta(false, "PIN incorrecto. Intentos restantes: " + (this.intentosMaximos - this.intentosFallidos));
    }

    cambiarPin(actual, nuevo, repetido) {
        if (!this.verificarPin(actual)) return this.respuesta(false, "El PIN actual no es correcto.");
        if (!/^\d{4}$/.test(nuevo)) return this.respuesta(false, "El PIN nuevo debe tener 4 números.");
        if (nuevo === actual) return this.respuesta(false, "El PIN nuevo debe ser distinto del actual.");
        if (nuevo !== repetido) return this.respuesta(false, "Los PIN nuevos no coinciden.");
        this.pin = nuevo;
        this.registrarMovimiento("Cambio de PIN", "PIN actualizado", 0);
        return this.respuesta(true, "El PIN se cambió correctamente.");
    }

    consultarSaldo() {
        return this.saldo;
    }

    validarMonto(monto, multiplo, maximo, debita) {
        if (!Number.isInteger(monto) || monto <= 0) return this.respuesta(false, "Ingrese un monto válido.");
        if (monto % multiplo !== 0) return this.respuesta(false, "El monto debe ser múltiplo de " + multiplo + ".");
        if (monto > maximo) return this.respuesta(false, "El monto máximo es " + formatoPesos(maximo) + ".");
        if (debita && monto > this.saldo) return this.respuesta(false, "Saldo insuficiente.");
        return this.respuesta(true, "");
    }

    validarExtraccion(monto) {
        return this.validarMonto(monto, 1000, this.montoMaximoExtraccion, true);
    }

    validarTransferencia(monto) {
        return this.validarMonto(monto, 1, this.montoMaximoTransferencia, true);
    }

    validarDeposito(monto) {
        return this.validarMonto(monto, 100, this.montoMaximoDeposito, false);
    }

    validarRecarga(monto) {
        return this.validarMonto(monto, 1, Infinity, true);
    }

    extraer(monto) {
        const validacion = this.validarExtraccion(monto);
        if (!validacion.ok) return validacion;
        this.saldo -= monto;
        this.registrarMovimiento("Extracción", "Retiro en cajero", monto);
        return this.respuesta(true, "Retiró " + formatoPesos(monto) + " de su cuenta.");
    }

    transferir(destinatario, monto) {
        const validacion = this.validarTransferencia(monto);
        if (!validacion.ok) return validacion;
        this.saldo -= monto;
        this.registrarMovimiento("Transferencia", "A " + destinatario, monto);
        return this.respuesta(true, "Transfirió " + formatoPesos(monto) + " a " + destinatario + ".");
    }

    depositar(monto) {
        const validacion = this.validarDeposito(monto);
        if (!validacion.ok) return validacion;
        this.saldo += monto;
        this.registrarMovimiento("Depósito", "Depósito en cajero", monto);
        return this.respuesta(true, "Depositó " + formatoPesos(monto) + " en su cuenta.");
    }

    recargarCelular(operadora, numero, monto) {
        if (!/^\d{10}$/.test(numero)) return this.respuesta(false, "El número debe tener 10 dígitos.");
        const validacion = this.validarRecarga(monto);
        if (!validacion.ok) return validacion;
        this.saldo -= monto;
        this.registrarMovimiento("Recarga de celular", operadora + " " + formatoTelefono(numero), monto);
        return this.respuesta(true, "Recargó " + formatoPesos(monto) + " al celular " + formatoTelefono(numero) + ".");
    }

    calcularImporteServicio(codigo) {
        return 2500 + Math.round(Number(codigo.slice(-4)) * 3 / 10) * 10;
    }

    pagarServicio(servicio, codigo) {
        if (!/^\d{8}$/.test(codigo)) return this.respuesta(false, "El código de pago debe tener 8 dígitos.");
        const importe = this.calcularImporteServicio(codigo);
        if (importe > this.saldo) return this.respuesta(false, "Saldo insuficiente.");
        this.saldo -= importe;
        this.registrarMovimiento("Pago de servicio", servicio + " código " + formatoCodigo(codigo), importe);
        return this.respuesta(true, "Pagó " + servicio + " por " + formatoPesos(importe) + ".");
    }

    registrarMovimiento(tipo, detalle, monto) {
        this.ultimoMovimiento = { tipo, detalle, monto, saldo: this.saldo, fecha: new Date().toLocaleString("es-AR") };
        this.movimientos.push(this.ultimoMovimiento);
    }

    reiniciar() {
        Object.assign(this, new cajeroAutomatico());
    }
}

const cajero = new cajeroAutomatico();
const ui = {
    fase: "espera",
    entrada: "",
    entradaActual: null,
    confirmacion: null,
    montoDeposito: 0,
    resultadoPendiente: null,
    ultimoResultado: null,
    vozActiva: false,
    ultimaIndicacion: ""
};

const op = (lado, fila, etiqueta, accion) => ({ lado, fila, etiqueta, accion });
const obtener = (id) => document.getElementById(id);

function hablar(texto) {
    if (!ui.vozActiva || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const locucion = new SpeechSynthesisUtterance(texto);
    locucion.lang = "es-AR";
    locucion.rate = 0.9;
    window.speechSynthesis.speak(locucion);
}

function indicar(texto) {
    ui.ultimaIndicacion = texto;
    obtener("paso").textContent = texto;
    hablar(texto);
}

function dibujarLaterales(opciones) {
    ["izq", "der"].forEach((lado) => {
        const contenedor = obtener(lado === "izq" ? "ladoIzquierdo" : "ladoDerecho");
        contenedor.innerHTML = "";
        for (let fila = 0; fila < 4; fila++) {
            const boton = document.createElement("button");
            boton.className = "botonLateral";
            const opcion = opciones.find((o) => o.lado === lado && o.fila === fila);
            boton.setAttribute("aria-label", opcion ? opcion.etiqueta : "Botón sin función");
            if (opcion) boton.addEventListener("click", opcion.accion);
            contenedor.appendChild(boton);
        }
    });
}

function dibujarPantalla(titulo, mensaje, opciones = [], clave = null, conLogo = false) {
    obtener("tituloPantalla").textContent = titulo;
    const zonaMensaje = obtener("mensajePantalla");
    zonaMensaje.innerHTML = "";
    if (conLogo) {
        const imagen = document.createElement("img");
        imagen.className = "logoPantalla";
        imagen.src = obtener("logo").getAttribute("src");
        imagen.alt = "Logo ISFT 151";
        zonaMensaje.appendChild(imagen);
    }
    const parrafo = document.createElement("p");
    parrafo.textContent = mensaje;
    zonaMensaje.appendChild(parrafo);
    obtener("clavePantalla").textContent = clave === null ? "" : clave;
    const zonaOpciones = obtener("opcionesPantalla");
    zonaOpciones.innerHTML = "";
    for (let fila = 0; fila < 4; fila++) {
        ["izq", "der"].forEach((lado) => {
            const opcion = opciones.find((o) => o.lado === lado && o.fila === fila);
            const celda = document.createElement("div");
            if (opcion) {
                const boton = document.createElement("button");
                boton.className = "tactil " + lado;
                boton.innerHTML = lado === "izq"
                    ? '<span class="flecha">◀</span><span></span>'
                    : '<span></span><span class="flecha">▶</span>';
                boton.children[lado === "izq" ? 1 : 0].textContent = opcion.etiqueta;
                boton.addEventListener("click", opcion.accion);
                celda.appendChild(boton);
            }
            zonaOpciones.appendChild(celda);
        });
    }
    dibujarLaterales(opciones);
}

function limpiarDispositivos() {
    obtener("dispensador").innerHTML = "";
    obtener("salidaComprobante").innerHTML = "";
}

function marcarTarjeta(activa, conTarjeta) {
    obtener("ranuraTarjeta").classList.toggle("activa", activa);
    obtener("ranuraTarjeta").classList.toggle("conTarjeta", conTarjeta);
}

function marcarDeposito(activa) {
    obtener("ranuraDeposito").classList.toggle("activa", activa);
}

function mostrarEspera() {
    ui.fase = "espera";
    ui.entrada = "";
    cajero.retirarTarjeta();
    limpiarDispositivos();
    marcarTarjeta(true, false);
    marcarDeposito(false);
    dibujarPantalla("Bienvenido", "Para comenzar, inserte su tarjeta en la ranura.", [], null, true);
    indicar("Paso 1. Tocá la ranura de la tarjeta, que está iluminada, para insertar tu tarjeta.");
}

function tocarRanuraTarjeta() {
    if (ui.fase === "espera") {
        if (cajero.insertarTarjeta().ok) pedirPinInicial();
    } else if (ui.fase === "retiroTarjeta") {
        mostrarEspera();
    }
}

function pedirEntrada(configuracion) {
    ui.fase = "entrada";
    ui.entrada = "";
    ui.entradaActual = configuracion;
    dibujarEntrada();
    indicar(configuracion.indicacion);
}

function dibujarEntrada(aviso) {
    const c = ui.entradaActual;
    let visible = c.vacio || "····";
    if (ui.entrada !== "") visible = c.enmascarar ? "*".repeat(ui.entrada.length) : (c.formato ? c.formato(ui.entrada) : ui.entrada);
    dibujarPantalla(c.titulo, aviso || c.mensaje, [op("der", 3, "Volver", c.alVolver)], visible);
}

function avisarEntrada(mensaje) {
    ui.entrada = "";
    dibujarEntrada(mensaje);
    indicar(mensaje);
}

function pedirConfirmacion(titulo, mensaje, alAceptar, alCancelar) {
    ui.fase = "confirmar";
    ui.confirmacion = { alAceptar, alCancelar };
    dibujarPantalla(titulo, mensaje, [op("izq", 3, "Cancelar", alCancelar), op("der", 3, "Confirmar", alAceptar)]);
    indicar("Revisá los datos que aparecen en pantalla: " + mensaje + " Si está todo bien, tocá Confirmar. Si no, tocá Cancelar.");
}

function pedirPinInicial() {
    marcarTarjeta(false, false);
    pedirEntrada({
        titulo: "Ingreso de PIN",
        mensaje: "Ingrese su PIN y presione Confirmar.",
        indicacion: "Paso 2. Escribí tu PIN de 4 números con el teclado y apretá la tecla verde Confirmar. En esta práctica el PIN es 1234.",
        maxDigitos: 4,
        minDigitos: 4,
        enmascarar: true,
        alConfirmar: validarPinIngresado,
        alVolver: devolverTarjeta
    });
}

function validarPinIngresado(pin) {
    const resultado = cajero.validarPin(pin);
    if (resultado.ok) return mostrarMenu();
    if (cajero.tarjetaRetenida) {
        ui.fase = "bloqueo";
        dibujarPantalla("Tarjeta retenida", "Superó la cantidad de intentos. Comuníquese con su banco.", [op("der", 3, "Reiniciar práctica", reiniciarPractica)]);
        indicar("Te equivocaste tres veces y el cajero retuvo la tarjeta. En la vida real, llamá a tu banco. Tocá Reiniciar práctica para probar de nuevo.");
        return;
    }
    avisarEntrada(resultado.mensaje);
}

function mostrarMenu() {
    ui.fase = "menu";
    dibujarPantalla("Menú principal", "Toque la operación que desea realizar.", [
        op("izq", 0, "Retirar dinero", pedirExtraccion),
        op("izq", 1, "Transferir", elegirDestinatario),
        op("izq", 2, "Consultar saldo", mostrarSaldo),
        op("izq", 3, "Recargar celular", elegirOperadora),
        op("der", 0, "Depositar dinero", pedirDeposito),
        op("der", 1, "Pagar servicios", elegirServicio),
        op("der", 2, "Cambiar PIN", pedirPinActual),
        op("der", 3, "Salir", finalizarSesion)
    ]);
    indicar("Paso 3. Elegí qué querés hacer. Podés tocar la opción en la pantalla o apretar el botón gris que está al lado. Para terminar elegí Salir.");
}

function mostrarSaldo() {
    ui.fase = "saldo";
    dibujarPantalla("Consulta de saldo", "Saldo disponible: " + formatoPesos(cajero.consultarSaldo()), [
        op("izq", 3, "Menú principal", mostrarMenu),
        op("der", 3, "Salir", finalizarSesion)
    ]);
    indicar("Tu saldo es " + formatoPesos(cajero.consultarSaldo()) + ". Para seguir operando tocá Menú principal, o tocá Salir para terminar.");
}

function mostrarResultado(resultado, comprobanteImpreso = false) {
    ui.fase = "resultado";
    ui.ultimoResultado = resultado;
    const opciones = [op("izq", 3, "Menú principal", mostrarMenu), op("der", 3, "Salir", finalizarSesion)];
    if (resultado.ok && !comprobanteImpreso) opciones.push(op("der", 0, "Imprimir comprobante", imprimirComprobante));
    dibujarPantalla(resultado.ok ? "Operación exitosa" : "Operación rechazada", resultado.mensaje, opciones);
    indicar(resultado.mensaje + (resultado.ok ? " Podés imprimir el comprobante, volver al menú o salir." : " Volvé al menú para intentarlo de nuevo."));
}

function imprimirComprobante() {
    const movimiento = cajero.ultimoMovimiento;
    const salida = obtener("salidaComprobante");
    salida.innerHTML = "";
    const papel = document.createElement("button");
    papel.className = "elemento comprobante";
    const monto = movimiento.monto > 0 ? "<br>" + formatoPesos(movimiento.monto) : "";
    papel.innerHTML = movimiento.tipo.toUpperCase() + monto + "<br>Saldo: " + formatoPesos(movimiento.saldo) + "<br>" + movimiento.fecha;
    papel.setAttribute("aria-label", "Retirar comprobante");
    papel.addEventListener("click", () => papel.remove());
    salida.appendChild(papel);
    mostrarResultado(ui.ultimoResultado, true);
    indicar("El comprobante salió por la ranura de comprobante. Tocalo para retirarlo.");
}

function pedirExtraccion() {
    ui.fase = "monto";
    const opciones = cajero.montosExtraccion.map((valor, i) => op(i < 4 ? "izq" : "der", i < 4 ? i : 0, formatoPesos(valor), () => confirmarExtraccion(valor, false)));
    opciones.push(op("der", 1, "Otro monto", pedirOtroMontoExtraccion), op("der", 3, "Volver", mostrarMenu));
    dibujarPantalla("Retirar dinero", "Seleccione el monto a retirar.", opciones);
    indicar("Elegí cuánto dinero querés retirar. Tocá el monto en pantalla. Si querés otro importe, tocá Otro monto.");
}

function pedirOtroMontoExtraccion() {
    pedirEntrada({
        titulo: "Otro monto",
        mensaje: "Ingrese un monto múltiplo de 1000 y presione Confirmar.",
        indicacion: "Escribí el monto con el teclado. Tiene que ser múltiplo de 1000 y no mayor a " + formatoPesos(cajero.montoMaximoExtraccion) + ". Después apretá Confirmar.",
        maxDigitos: 5,
        formato: formatoMonto,
        vacio: "$ ····",
        alConfirmar: (valor) => confirmarExtraccion(Number(valor), true),
        alVolver: pedirExtraccion
    });
}

function confirmarExtraccion(monto, desdeEntrada) {
    const validacion = cajero.validarExtraccion(monto);
    if (!validacion.ok) return desdeEntrada ? avisarEntrada(validacion.mensaje) : mostrarResultado(validacion);
    pedirConfirmacion("Confirmar extracción", "¿Desea retirar " + formatoPesos(monto) + "?", () => ejecutarExtraccion(monto), pedirExtraccion);
}

function ejecutarExtraccion(monto) {
    const resultado = cajero.extraer(monto);
    if (!resultado.ok) return mostrarResultado(resultado);
    ui.fase = "retiroBilletes";
    ui.resultadoPendiente = resultado;
    dibujarPantalla("Retire su dinero", "Retire los billetes del dispensador.");
    const dispensador = obtener("dispensador");
    dispensador.innerHTML = "";
    for (let i = 0; i < Math.min(5, Math.max(1, monto / 1000)); i++) {
        const billete = document.createElement("button");
        billete.className = "elemento billete";
        billete.textContent = "$";
        billete.setAttribute("aria-label", "Retirar billetes");
        billete.addEventListener("click", retirarBilletes);
        dispensador.appendChild(billete);
    }
    indicar("El cajero entregó " + formatoPesos(monto) + ". Tocá los billetes del dispensador para retirarlos.");
}

function retirarBilletes() {
    if (ui.fase !== "retiroBilletes") return;
    obtener("dispensador").innerHTML = "";
    mostrarResultado(ui.resultadoPendiente);
}

function elegirDestinatario() {
    ui.fase = "destinatario";
    const opciones = cajero.destinatarios.map((nombre, i) => op("izq", i, nombre, () => pedirMontoTransferencia(nombre)));
    opciones.push(op("der", 3, "Volver", mostrarMenu));
    dibujarPantalla("Transferir", "Elija a quién desea transferir.", opciones);
    indicar("Elegí la persona a la que querés enviar dinero tocando su nombre en la pantalla.");
}

function pedirMontoTransferencia(destinatario) {
    pedirEntrada({
        titulo: "Transferir a " + destinatario,
        mensaje: "Ingrese el monto a transferir y presione Confirmar.",
        indicacion: "Escribí cuánto dinero querés transferir a " + destinatario + " y apretá Confirmar. El máximo es " + formatoPesos(cajero.montoMaximoTransferencia) + ".",
        maxDigitos: 6,
        formato: formatoMonto,
        vacio: "$ ····",
        alConfirmar: (valor) => {
            const monto = Number(valor);
            const validacion = cajero.validarTransferencia(monto);
            if (!validacion.ok) return avisarEntrada(validacion.mensaje);
            pedirConfirmacion("Confirmar transferencia", "¿Desea transferir " + formatoPesos(monto) + " a " + destinatario + "?", () => mostrarResultado(cajero.transferir(destinatario, monto)), elegirDestinatario);
        },
        alVolver: elegirDestinatario
    });
}

function elegirOperadora() {
    ui.fase = "operadora";
    const opciones = cajero.operadoras.map((nombre, i) => op("izq", i, nombre, () => pedirNumeroCelular(nombre)));
    opciones.push(op("der", 3, "Volver", mostrarMenu));
    dibujarPantalla("Recargar celular", "Seleccione su empresa de telefonía.", opciones);
    indicar("Elegí la empresa de telefonía de tu celular tocando su nombre en la pantalla.");
}

function pedirNumeroCelular(operadora) {
    pedirEntrada({
        titulo: "Recarga " + operadora,
        mensaje: "Ingrese el número de celular, 10 números con característica.",
        indicacion: "Escribí el número de tu celular con la característica, sin el 15 ni el 0. Son 10 números. Después apretá Confirmar.",
        maxDigitos: 10,
        minDigitos: 10,
        formato: formatoTelefono,
        alConfirmar: (numero) => elegirMontoRecarga(operadora, numero),
        alVolver: elegirOperadora
    });
}

function elegirMontoRecarga(operadora, numero) {
    ui.fase = "montoRecarga";
    const opciones = cajero.montosRecarga.map((monto, i) => op("izq", i, formatoPesos(monto), () => {
        const validacion = cajero.validarRecarga(monto);
        if (!validacion.ok) return mostrarResultado(validacion);
        pedirConfirmacion("Confirmar recarga", "¿Desea recargar " + formatoPesos(monto) + " al celular " + formatoTelefono(numero) + " de " + operadora + "?", () => mostrarResultado(cajero.recargarCelular(operadora, numero, monto)), () => elegirMontoRecarga(operadora, numero));
    }));
    opciones.push(op("der", 3, "Volver", () => pedirNumeroCelular(operadora)));
    dibujarPantalla("Recarga " + operadora, "Celular " + formatoTelefono(numero) + ". Seleccione el monto.", opciones);
    indicar("Elegí cuánto querés recargar tocando el monto en la pantalla.");
}

function elegirServicio() {
    ui.fase = "servicio";
    const opciones = cajero.servicios.map((nombre, i) => op("izq", i, nombre, () => pedirCodigoServicio(nombre)));
    opciones.push(op("der", 3, "Volver", mostrarMenu));
    dibujarPantalla("Pagar servicios", "Seleccione el servicio que desea pagar.", opciones);
    indicar("Elegí qué servicio querés pagar tocando su nombre en la pantalla.");
}

function pedirCodigoServicio(servicio) {
    pedirEntrada({
        titulo: "Pago de " + servicio,
        mensaje: "Ingrese el código de pago de 8 números.",
        indicacion: "Escribí el código de pago que figura en tu factura. Son 8 números. Después apretá Confirmar.",
        maxDigitos: 8,
        minDigitos: 8,
        formato: formatoCodigo,
        alConfirmar: (codigo) => {
            const importe = cajero.calcularImporteServicio(codigo);
            pedirConfirmacion("Confirmar pago", "¿Desea pagar " + servicio + ", código " + formatoCodigo(codigo) + ", por " + formatoPesos(importe) + "?", () => mostrarResultado(cajero.pagarServicio(servicio, codigo)), elegirServicio);
        },
        alVolver: elegirServicio
    });
}

function pedirPinActual() {
    pedirEntrada({
        titulo: "Cambiar PIN",
        mensaje: "Ingrese su PIN actual.",
        indicacion: "Para cambiar tu PIN, primero escribí el PIN actual y apretá Confirmar.",
        maxDigitos: 4,
        minDigitos: 4,
        enmascarar: true,
        alConfirmar: (actual) => cajero.verificarPin(actual) ? pedirPinNuevo(actual) : avisarEntrada("El PIN actual no es correcto."),
        alVolver: mostrarMenu
    });
}

function pedirPinNuevo(actual) {
    pedirEntrada({
        titulo: "Nuevo PIN",
        mensaje: "Ingrese el PIN nuevo de 4 números.",
        indicacion: "Escribí el PIN nuevo, de 4 números. Elegí uno que puedas recordar y que no sea fácil de adivinar.",
        maxDigitos: 4,
        minDigitos: 4,
        enmascarar: true,
        alConfirmar: (nuevo) => nuevo === actual ? avisarEntrada("El PIN nuevo debe ser distinto del actual.") : pedirPinRepetido(actual, nuevo),
        alVolver: pedirPinActual
    });
}

function pedirPinRepetido(actual, nuevo) {
    pedirEntrada({
        titulo: "Repetir PIN nuevo",
        mensaje: "Escriba nuevamente el PIN nuevo.",
        indicacion: "Escribí otra vez el PIN nuevo para confirmar que no te equivocaste.",
        maxDigitos: 4,
        minDigitos: 4,
        enmascarar: true,
        alConfirmar: (repetido) => mostrarResultado(cajero.cambiarPin(actual, nuevo, repetido)),
        alVolver: () => pedirPinNuevo(actual)
    });
}

function pedirDeposito() {
    pedirEntrada({
        titulo: "Depositar dinero",
        mensaje: "Ingrese el monto a depositar, múltiplo de 100.",
        indicacion: "Escribí cuánto dinero vas a depositar. Tiene que ser múltiplo de 100. Después apretá Confirmar.",
        maxDigitos: 6,
        formato: formatoMonto,
        vacio: "$ ····",
        alConfirmar: (valor) => {
            const monto = Number(valor);
            const validacion = cajero.validarDeposito(monto);
            if (!validacion.ok) return avisarEntrada(validacion.mensaje);
            pedirConfirmacion("Confirmar depósito", "¿Desea depositar " + formatoPesos(monto) + "?", () => esperarBilletes(monto), pedirDeposito);
        },
        alVolver: mostrarMenu
    });
}

function esperarBilletes(monto) {
    ui.fase = "ingresoBilletes";
    ui.montoDeposito = monto;
    marcarDeposito(true);
    dibujarPantalla("Depósito", "Introduzca los billetes en la ranura de depósito.", [op("izq", 3, "Cancelar", cancelarDeposito)]);
    indicar("Tocá la ranura de depósito, que está iluminada, para introducir los " + formatoPesos(monto) + ".");
}

function cancelarDeposito() {
    marcarDeposito(false);
    mostrarMenu();
}

function ingresarBilletes() {
    if (ui.fase !== "ingresoBilletes") return;
    marcarDeposito(false);
    mostrarResultado(cajero.depositar(ui.montoDeposito));
}

function finalizarSesion() {
    cajero.finalizarSesion();
    devolverTarjeta();
}

function devolverTarjeta() {
    ui.fase = "retiroTarjeta";
    marcarTarjeta(true, true);
    dibujarPantalla("Gracias por operar", "Retire su tarjeta.");
    indicar("Último paso. Tocá la tarjeta que sale por la ranura para retirarla. Nunca te olvides la tarjeta en el cajero.");
}

function teclaPresionada(tecla) {
    const fasesDeSesion = ["menu", "monto", "destinatario", "operadora", "montoRecarga", "servicio", "resultado", "saldo"];
    if (tecla === "corregir") {
        if (ui.fase === "entrada") {
            ui.entrada = "";
            dibujarEntrada();
        }
    } else if (tecla === "cancelar") {
        if (ui.fase === "entrada") ui.entradaActual.alVolver();
        else if (ui.fase === "confirmar") ui.confirmacion.alCancelar();
        else if (ui.fase === "ingresoBilletes") cancelarDeposito();
        else if (fasesDeSesion.includes(ui.fase)) finalizarSesion();
    } else if (tecla === "confirmar") {
        if (ui.fase === "entrada") {
            if (ui.entrada.length < (ui.entradaActual.minDigitos || 1)) avisarEntrada("Complete el dato antes de confirmar.");
            else ui.entradaActual.alConfirmar(ui.entrada);
        } else if (ui.fase === "confirmar") {
            ui.confirmacion.alAceptar();
        }
    } else if (ui.fase === "entrada" && ui.entrada.length < ui.entradaActual.maxDigitos) {
        ui.entrada += tecla;
        dibujarEntrada();
    }
}

function construirTeclado() {
    const teclado = obtener("teclado");
    const distribucion = [
        ["1", "2", "3", "cancelar"],
        ["4", "5", "6", "corregir"],
        ["7", "8", "9", "confirmar"],
        ["", "0", "", ""]
    ];
    const etiquetas = { cancelar: "Canc.", corregir: "Corr.", confirmar: "Conf." };
    const nombres = { cancelar: "Cancelar", corregir: "Corregir", confirmar: "Confirmar" };
    distribucion.flat().forEach((tecla) => {
        const boton = document.createElement("button");
        boton.className = "tecla" + (tecla === "" ? " vacia" : "") + (etiquetas[tecla] ? " " + tecla : "");
        boton.textContent = etiquetas[tecla] || tecla;
        if (nombres[tecla]) boton.setAttribute("aria-label", nombres[tecla]);
        if (tecla !== "") boton.addEventListener("click", () => teclaPresionada(tecla));
        teclado.appendChild(boton);
    });
}

function reiniciarPractica() {
    cajero.reiniciar();
    mostrarEspera();
}

obtener("ranuraTarjeta").addEventListener("click", tocarRanuraTarjeta);
obtener("ranuraDeposito").addEventListener("click", ingresarBilletes);
obtener("botonRepetir").addEventListener("click", () => hablar(ui.ultimaIndicacion));
obtener("botonVoz").addEventListener("click", (evento) => {
    ui.vozActiva = !ui.vozActiva;
    evento.currentTarget.textContent = "Voz: " + (ui.vozActiva ? "activada" : "desactivada");
    evento.currentTarget.setAttribute("aria-pressed", String(ui.vozActiva));
    if (ui.vozActiva) hablar(ui.ultimaIndicacion);
    else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
});
obtener("botonReiniciar").addEventListener("click", reiniciarPractica);
obtener("selectorRed").addEventListener("change", (evento) => {
    const red = evento.target.value;
    obtener("equipo").dataset.red = red;
    obtener("nombreRed").textContent = "RED " + red.toUpperCase();
    reiniciarPractica();
});
document.addEventListener("keydown", (evento) => {
    if (/^[0-9]$/.test(evento.key)) teclaPresionada(evento.key);
    else if (evento.key === "Enter" && evento.target.tagName !== "BUTTON") teclaPresionada("confirmar");
    else if (evento.key === "Backspace") teclaPresionada("corregir");
    else if (evento.key === "Escape") teclaPresionada("cancelar");
});

construirTeclado();
mostrarEspera();
