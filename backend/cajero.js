class CajeroAutomatico
{
	constructor( )
	{
		this.saldo = 100500;
		this.pin = 1234;
		this.numero_cuenta = 123456;
        this.limite_extraccion = 50000;
		this.sesion = false;
		this.saldo_dolares = 50000;
		this.limite_extraccion_dolares = 30000;
		this.saldo_corriente_pesos = 25000;
		this.limite_extraccion_corriente_pesos = 10000;
		this.saldo_corriente_dolares = 10000;
		this.limite_extraccion_corriente_dolares = 5000;
		this.clave_nueva = null;
	}
    validar_pin(numero_pin)
	{
		if ( numero_pin == this.pin )
		{
			this.sesion = true;
			this.guardar_estado();
		}
		else
		{
			alert('Numero de pin incorrecto');
		}
	}

    retirar_dinero(monto_a_retirar)
	{
			if (this.sesion === true && monto_a_retirar > 0 && monto_a_retirar <= this.saldo && monto_a_retirar <= this.limite_extraccion )
		{
			this.saldo = this.saldo - monto_a_retirar;
			this.limite_extraccion = this.limite_extraccion - monto_a_retirar;
			this.guardar_estado();
		}
		else if (monto_a_retirar > 0 && monto_a_retirar <= this.saldo && monto_a_retirar > this.limite_extraccion)
		{
			alert('Excede su limite diario, por favor ingrese un monto menor a ' + this.limite_extraccion);
		}
		else
		{
			alert('No posee saldo suficiente');
		}
	}
	retirar_dinero_dolares(monto_a_retirar_dolares)
	{
			if (this.sesion === true && monto_a_retirar_dolares > 0 && monto_a_retirar_dolares <= this.saldo_dolares && monto_a_retirar_dolares <= this.limite_extraccion_dolares )
		{
			this.saldo_dolares = this.saldo_dolares - monto_a_retirar_dolares;
			this.limite_extraccion_dolares = this.limite_extraccion_dolares - monto_a_retirar_dolares;
			this.guardar_estado();
		}
		else if (monto_a_retirar_dolares > 0 && monto_a_retirar_dolares <= this.saldo_dolares && monto_a_retirar_dolares > this.limite_extraccion_dolares)
		{
			alert('Excede su limite diario, por favor ingrese un monto menor a ' + this.limite_extraccion_dolares);
		}
		else
		{
			alert('No posee saldo suficiente');
		}
	}
	transferir_dinero(monto_a_transferir)
	{
         if (this.sesion === true && monto_a_transferir > 0 && monto_a_transferir <= this.saldo)
		{
			this.saldo = this.saldo - monto_a_transferir;
			this.guardar_estado();
		}
		else
		{
			alert('No posee saldo suficiente');
		}
	}
	depositar_pesos(monto_deposito)
	{
			if (this.sesion === true && monto_deposito > 0)
		{
			this.saldo = this.saldo + monto_deposito;
			this.limite_extraccion = this.limite_extraccion + monto_deposito;
			this.guardar_estado();
		}
		else
		{
			alert('Ingrese un monto valido');
		}
	}
	depositar_dolares(monto_deposito_dolares)
	{
			if (this.sesion === true && monto_deposito_dolares > 0)
		{
			this.saldo_dolares = this.saldo_dolares + monto_deposito_dolares;
			this.limite_extraccion_dolares = this.limite_extraccion_dolares + monto_deposito_dolares;
			this.guardar_estado();
		}
		else
		{
			alert('Ingrese un monto valido');
		}
	}
	consultar_saldo()
	{
        if (saldoActual) {
        saldoActual.textContent = "$" + this.saldo;
    }
	    if (saldoDisponible) {
        saldoDisponible.textContent = "$" + this.limite_extraccion;
    }
	}
	consultar_saldo_dolares()
	{
        if (saldoActualDolares) {
        saldoActualDolares.textContent = "$" + this.saldo_dolares;
    }
	    if (saldoDisponibleDolares) {
        saldoDisponibleDolares.textContent = "$" + this.limite_extraccion_dolares;
    }
	}
	consultar_saldo_corriente_pesos()
	{
        if (saldoActualCorrientePesos) {
        saldoActualCorrientePesos.textContent = "$" + this.saldo_corriente_pesos;
    }
	    if (saldoDisponibleCorrientePesos) {
        saldoDisponibleCorrientePesos.textContent = "$" + this.limite_extraccion_corriente_pesos;
    }
	}
	consultar_saldo_corriente_dolares()
	{
        if (saldoActualCorrienteDolares) {
        saldoActualCorrienteDolares.textContent = "$" + this.saldo_corriente_dolares;
    }
	    if (saldoDisponibleCorrienteDolares) {
        saldoDisponibleCorrienteDolares.textContent = "$" + this.limite_extraccion_corriente_dolares;
    }
	}
	guardar_estado() {
    localStorage.setItem("saldo", this.saldo);
    localStorage.setItem("limite", this.limite_extraccion);
    localStorage.setItem("sesion", this.sesion);
	localStorage.setItem("saldo_dolares", this.saldo_dolares);
    localStorage.setItem("limite_dolares", this.limite_extraccion_dolares);
	localStorage.setItem("pin", this.pin);
	localStorage.setItem("clave_nueva", this.clave_nueva);
}
	salir()
	{
			this.sesion = false;
			this.guardar_estado();
			alert('Gracias por utilizar el cajero');
	}
}


let miCajeroAutomatico = new CajeroAutomatico();

miCajeroAutomatico.pin = parseInt(localStorage.getItem("pin")) || 1234;
miCajeroAutomatico.saldo = parseInt(localStorage.getItem("saldo")) ?? 100500;
miCajeroAutomatico.limite_extraccion = parseInt(localStorage.getItem("limite")) ?? 50000;
miCajeroAutomatico.sesion = localStorage.getItem("sesion") === "true";
miCajeroAutomatico.saldo_dolares = parseInt(localStorage.getItem("saldo_dolares")) ?? 50000;
miCajeroAutomatico.limite_extraccion_dolares = parseInt(localStorage.getItem("limite_dolares")) ?? 30000;
miCajeroAutomatico.clave_nueva = parseInt(localStorage.getItem("clave_nueva")) || null;



function iniciar_controlador() {
	const buttonIngresarTarjeta = document.getElementById("buttonIngresarTarjeta");
	if (buttonIngresarTarjeta) {
	buttonIngresarTarjeta.onclick = () => 
	{
         window.location.href = "pin.html";
    }
};
	const buttonConfirmarPin = document.getElementById("buttonConfirmarPin");
if (buttonConfirmarPin) {
    buttonConfirmarPin.onclick = () => {
        let pin_ingresado = parseInt(document.getElementById("inputPin").value);
		miCajeroAutomatico.validar_pin(pin_ingresado);

        if (miCajeroAutomatico.sesion === true) {
         window.location.href = "menu.html";
    }
    };
}
    const buttonConsultarSaldo = document.getElementById("buttonConsultarSaldo");
	if (buttonConsultarSaldo) {
	buttonConsultarSaldo.onclick = () => 
	{ 	  
         window.location.href = "consultar_saldo.html";
	}
    };
	const buttonCajaAhorroPesos = document.getElementById("buttonCajaAhorroPesos");
	if (buttonCajaAhorroPesos) {
	buttonCajaAhorroPesos.onclick = () => 
	{ 	  
         window.location.href = "saldo.html";
	}
    };
	const buttonCajaAhorroDolares = document.getElementById("buttonCajaAhorroDolares");
	if (buttonCajaAhorroDolares) {
	buttonCajaAhorroDolares.onclick = () => 
	{ 	  
         window.location.href = "saldo_dolares.html";
	}
    };
	const buttonCuentaCorrientePesos = document.getElementById("buttonCuentaCorrientePesos");
	if (buttonCuentaCorrientePesos) {
	buttonCuentaCorrientePesos.onclick = () => 
	{ 	  
         window.location.href = "saldo_corriente_pesos.html";
	}
    };
	const buttonCuentaCorrienteDolares = document.getElementById("buttonCuentaCorrienteDolares");
	if (buttonCuentaCorrienteDolares) {
	buttonCuentaCorrienteDolares.onclick = () => 
	{ 	  
         window.location.href = "saldo_corriente_dolares.html";
	}
    };
	const buttonVolverMenu = document.getElementById("buttonVolverMenu");
if (buttonVolverMenu) {
    buttonVolverMenu.onclick = () => {
        window.location.href = "menu.html";
    };
}
const buttonSalir = document.getElementById("buttonSalir");
if (buttonSalir) {
    buttonSalir.onclick = () => {
     miCajeroAutomatico.salir(); 
     window.location.href = "pantalla_bienvenida.html"; 
    };
}
const buttonExtraccion = document.getElementById("buttonExtraccion");
if (buttonExtraccion) {
     buttonExtraccion.onclick = () => { 
     window.location.href = "extraccion.html"; 
    };
}
const buttonAhorroPesos = document.getElementById("buttonAhorroPesos");
if (buttonAhorroPesos) {
     buttonAhorroPesos.onclick = () => { 
     window.location.href = "seleccionar_importe.html"; 
    };
}
const buttonAhorroDolares = document.getElementById("buttonAhorroDolares");
if (buttonAhorroDolares) {
     buttonAhorroDolares.onclick = () => { 
     window.location.href = "seleccionar_importe_dolares.html"; 
    };
}
const button1000 = document.getElementById("button1000");
 if (button1000) {
         button1000.onclick = () => { miCajeroAutomatico.retirar_dinero(1000);
		 window.location.href = "favor_retirar.html";
    };
}

 const button2000 = document.getElementById("button2000");
 if (button2000) {
         button2000.onclick = () => { miCajeroAutomatico.retirar_dinero(2000);
		 window.location.href = "favor_retirar.html";
    };
 }
 const button5000 = document.getElementById("button5000");
 if (button5000) {
         button5000.onclick = () => { miCajeroAutomatico.retirar_dinero(5000);
		 window.location.href = "favor_retirar.html";
    };
 }
 const button10000 = document.getElementById("button10000");
 if (button10000) {
         button10000.onclick = () => { miCajeroAutomatico.retirar_dinero(10000);
		 window.location.href = "favor_retirar.html";
    };
 }
 const button20000 = document.getElementById("button20000");
 if (button20000) {
         button20000.onclick = () => { miCajeroAutomatico.retirar_dinero(20000);
		 window.location.href = "favor_retirar.html";
    };
}
	const buttonFavorRetirar = document.getElementById("buttonFavorRetirar");
	if (buttonFavorRetirar) {
	buttonFavorRetirar.onclick = () => 
	{ 	  
         window.location.href = "saldo.html";
	}
	}
	const buttonOtroImporte = document.getElementById("buttonOtroImporte");
if (buttonOtroImporte) {
    buttonOtroImporte.onclick = () => {
        window.location.href = "otro_importe.html";
    };
}
const button1000D = document.getElementById("button1000D");
 if (button1000D) {
         button1000D.onclick = () => { miCajeroAutomatico.retirar_dinero_dolares(1000);
		 window.location.href = "favor_retirar_dolares.html";
    };
}

 const button2000D = document.getElementById("button2000D");
 if (button2000D) {
         button2000D.onclick = () => { miCajeroAutomatico.retirar_dinero_dolares(2000);
		 window.location.href = "favor_retirar_dolares.html";
    };
 }
 const button5000D = document.getElementById("button5000D");
 if (button5000D) {
         button5000D.onclick = () => { miCajeroAutomatico.retirar_dinero_dolares(5000);
		 window.location.href = "favor_retirar_dolares.html";
    };
 }
 	const buttonOtroImporteD = document.getElementById("buttonOtroImporteD");
if (buttonOtroImporteD) {
    buttonOtroImporteD.onclick = () => {
        window.location.href = "otro_importe_dolares.html";
    };
}
 const buttonFavorRetirarDolares = document.getElementById("buttonFavorRetirarDolares");
	if (buttonFavorRetirarDolares) {
	buttonFavorRetirarDolares.onclick = () => 
	{ 	  
         window.location.href = "saldo_dolares.html";
	}
	}
const buttonConfirmarImporte = document.getElementById("buttonConfirmarImporte");
if (buttonConfirmarImporte) {
    buttonConfirmarImporte.onclick = () => {
        let monto = parseInt(document.getElementById("inputOtroImporte").value);

        if (!isNaN(monto) && monto > 0) {
            miCajeroAutomatico.retirar_dinero(monto);
            window.location.href = "favor_retirar.html";
        } else {
            alert("Por favor ingrese un número válido.");
        }
    };
}
const buttonConfirmarImporteDolares = document.getElementById("buttonConfirmarImporteDolares");
if (buttonConfirmarImporteDolares) {
    buttonConfirmarImporteDolares.onclick = () => {
        let monto_dolares = parseInt(document.getElementById("inputOtroImporteDolares").value);

        if (!isNaN(monto_dolares) && monto_dolares > 0) {
            miCajeroAutomatico.retirar_dinero_dolares(monto_dolares);
            window.location.href = "favor_retirar_dolares.html";
        } else {
            alert("Por favor ingrese un número válido.");
        }
    };
}
const buttonDepositar = document.getElementById("buttonDepositar");
	if (buttonDepositar) {
	buttonDepositar.onclick = () => 
	{
         window.location.href = "elegir_cuenta_deposito.html";
    }
};
const buttonCajaAhorroPesosDeposito = document.getElementById("buttonCajaAhorroPesosDeposito");
	if (buttonCajaAhorroPesosDeposito) {
	buttonCajaAhorroPesosDeposito.onclick = () => 
	{ 	  
         window.location.href = "depositar_pesos.html";
	}
    };
	const buttonCajaAhorroDolaresDeposito = document.getElementById("buttonCajaAhorroDolaresDeposito");
	if (buttonCajaAhorroDolaresDeposito) {
	buttonCajaAhorroDolaresDeposito.onclick = () => 
	{ 	  
         window.location.href = "depositar_dolares.html";
	}
    };
const buttonConfirmarDepositoPesos = document.getElementById("buttonConfirmarDepositoPesos");
if (buttonConfirmarDepositoPesos) {
    buttonConfirmarDepositoPesos.onclick = () => {
        let monto_deposito = parseInt(document.getElementById("inputDepositoPesos").value);

        if (!isNaN(monto_deposito) && monto_deposito > 0) {
            miCajeroAutomatico.depositar_pesos(monto_deposito);
            window.location.href = "operacion_completada.html";
        } else {
            alert("Por favor ingrese un número válido.");
        }
    };
}
const buttonConfirmarDepositoDolares = document.getElementById("buttonConfirmarDepositoDolares");
if (buttonConfirmarDepositoDolares) {
    buttonConfirmarDepositoDolares.onclick = () => {
        let monto_deposito_dolares = parseInt(document.getElementById("inputDepositoDolares").value);

        if (!isNaN(monto_deposito_dolares) && monto_deposito_dolares > 0) {
            miCajeroAutomatico.depositar_dolares(monto_deposito_dolares);
            window.location.href = "operacion_completada.html";
        } else {
            alert("Por favor ingrese un número válido.");
        }
    };
}
const buttonTransferencia = document.getElementById("buttonTransferencia");
	if (buttonTransferencia) {
	buttonTransferencia.onclick = () => 
	{ 	  
         window.location.href = "transferencia.html";
	}
    };
const buttonConfirmarCuenta = document.getElementById("buttonConfirmarCuenta");
if (buttonConfirmarCuenta) {
    buttonConfirmarCuenta.onclick = () => {
        let cuenta = parseInt(document.getElementById("inputConfirmarCuenta").value);

        if (!isNaN(cuenta) && cuenta === miCajeroAutomatico.numero_cuenta) {
            window.location.href = "confirmar_transferencia.html";
        } else {
            alert("Por favor ingrese un número de cuenta válido.");
        }
    };
}
const buttonConfirmarTransferencia = document.getElementById("buttonConfirmarTransferencia");
if (buttonConfirmarTransferencia) {
    buttonConfirmarTransferencia.onclick = () => {
        let transfer = parseInt(document.getElementById("inputConfirmarTransferencia").value);

        if (!isNaN(transfer) && transfer > 0) {
			miCajeroAutomatico.transferir_dinero(transfer);
            window.location.href = "operacion_completada.html";
        } else {
            alert("Por favor ingrese un monto válido.");
        }
    };
}
const buttonClaves = document.getElementById("buttonClaves");
	if (buttonClaves) {
	buttonClaves.onclick = () => 
	{
         window.location.href = "clave_actual.html";
    }
};
const buttonConfirmarClaveActual = document.getElementById("buttonConfirmarClaveActual");
if (buttonConfirmarClaveActual) {
    buttonConfirmarClaveActual.onclick = () => {
        let clave_actual = parseInt(document.getElementById("inputClaveActual").value);

        if (clave_actual === miCajeroAutomatico.pin) {
            window.location.href = "clave_nueva.html";
        } else {
            alert("Clave incorrecta.");
        }
    };
}
const buttonConfirmarClaveNueva = document.getElementById("buttonConfirmarClaveNueva");
if (buttonConfirmarClaveNueva) {
    buttonConfirmarClaveNueva.onclick = () => {
        let clave_nueva = parseInt(document.getElementById("inputClaveNueva").value);

        if (clave_nueva.toString().length !== 4) {
			alert("La nueva clave debe tener 4 digitos.");
        } else {
			miCajeroAutomatico.clave_nueva = clave_nueva;
			miCajeroAutomatico.guardar_estado();
            window.location.href = "repetir_clave.html";
        }
    };
}
const buttonRepetirClave = document.getElementById("buttonRepetirClave");
if (buttonRepetirClave) {
    buttonRepetirClave.onclick = () => {
        let clave_repetida = parseInt(document.getElementById("inputRepetirClave").value);

        if (clave_repetida === miCajeroAutomatico.clave_nueva) {
			miCajeroAutomatico.pin = miCajeroAutomatico.clave_nueva;
			miCajeroAutomatico.guardar_estado();
			window.location.href = "operacion_completada.html";
        } else {
			alert("Clave incorrecta.");
        }
    };
}
}
iniciar_controlador();
