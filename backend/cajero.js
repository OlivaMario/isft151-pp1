class CajeroAutomatico
{
	constructor( )
	{
		//Propiedades

		this.saldo = 100500;
		this.numero_cuenta = 123456;
        this.limite_extraccion = 50000;
		this.sesion = false;
	}
    validar_pin(numero_pin)
	{
		if ( numero_pin == 1234 )
		{
			this.sesion = true;
		}
		else
		{
			alert('Numero de pin incorrecto');
		}
	}

    retirar_dinero(monto_a_retirar)
	{
			if (this.sesion = true && monto_a_retirar > 0 && monto_a_retirar <= this.saldo && monto_a_retirar <= this.limite_extraccion )
		{
			this.saldo = this.saldo - monto_a_retirar;
			this.limite_extraccion = this.limite_extraccion - monto_a_retirar;
			alert('Por favor retire su dinero');
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
	transferir_dinero(monto_a_transferir)
	{
         if (this.sesion = true && monto_a_transferir > 0 && monto_a_transferir <= this.saldo)
		{
			this.saldo = this.saldo - monto_a_transferir;
			alert('Transaccion realizada con exito');
		}
		else
		{
			alert('No posee saldo suficiente');
		}
	}
	consultar_saldo()
	{
		alert('Saldo disponible: ' + this.saldo);
	}
	salir()
	{
			this.sesion = false;
			alert('Gracias por utilizar el cajero');
	}
}


let miCajeroAutomatico = new CajeroAutomatico();


function iniciar_controlador() {
	const buttonIngresarTarjeta = document.getElementById("buttonIngresarTarjeta");
	if (buttonIngresarTarjeta) {
	buttonIngresarTarjeta.onclick = () => 
	{ 	
     let pin_ingresado = prompt("Ingrese su PIN:");
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

		
	/*buttonExtraccion.onclick = () => 
	{ 	
		actualizar_vista(); 
	}
	
	buttonTransferencia.onclick = () => 
	{
		actualizar_vista();
	}
	
	buttonConsultarSaldo.onclick = () => 
	{
		actualizar_vista();
	}
	buttonSalir.onclick = () => 
	{	
		actualizar_vista();
	}
}
*/
}
iniciar_controlador();
