# Simulador de cajero automático para personas mayores

Programa de inclusión digital bancaria. Entorno de simulación web que replica la experiencia de un cajero automático de las redes Banelco y Link, para practicar sin riesgo financiero y sin miedo al error.

## Resumen

La aplicación muestra un cajero automático con sus partes físicas (pantalla táctil, botones laterales, teclado numérico, ranura de tarjeta, ranura de depósito, lector de huella, dispensador de billetes y salida de comprobante) y guía a la persona paso a paso mediante un asistente con texto y voz. Se desarrolla como proyecto de la cátedra Prácticas Profesionalizantes I, ISFT 151.

## Funcionalidades incorporadas

- Inserción de tarjeta y validación de PIN con límite de intentos y retención de tarjeta.
- Pantalla táctil: las opciones se pueden tocar en pantalla o con los botones laterales.
- Retirar dinero, con montos predefinidos u otro monto.
- Transferir dinero a destinatarios de una agenda de práctica.
- Consultar saldo.
- Recargar celular, con elección de empresa, número y monto.
- Cambiar PIN, con verificación del PIN actual y repetición del nuevo.
- Depositar dinero, con ingreso de billetes por la ranura de depósito.
- Pagar servicios, con código de pago e importe calculado.
- Comprobante opcional para cada operación y devolución de la tarjeta.
- Asistente secuencial con texto y voz, y botón para repetir la indicación.
- Glosario de terminología bancaria básica.
- Selector de red bancaria: Banelco o Link.
- Uso con mouse, pantalla táctil o teclado.

### 📑 Planillas del Proyecto

- **Diseño Orientado a Objetos**  
  [Abrir planilla](https://docs.google.com/spreadsheets/d/1ss2p9Kbbjr4YsfrbftigA4fid2JgOwakMq_N7JGnrBo/edit?usp=sharing)

- **Diseño de Interfaz Gráfica**  
  [Abrir planilla](https://docs.google.com/spreadsheets/d/1NrtxgcXpAZG5R9ki0iZbxoadk5YY0Nd2iEA2FwMLf6o/edit?usp=sharing)

- **Requerimientos Funcionales**  
  [Abrir planilla](https://docs.google.com/spreadsheets/d/1Ff3EqMrZeURV9coUC0zHdmu7m6XiRF2w55-JP-tjUfg/edit?usp=sharing)

## Despliegue

El sitio estático se publica desde la carpeta `frontend` con GitHub Pages mediante el flujo definido en `.github/workflows/despliegue.yml`.

Enlace de despliegue: [Simulador de cajero automático](https://olivamario.github.io/isft151-pp1/)

## Tutorial de uso

Video que explica cómo usar el simulador de cajero automático. Tocá la imagen para verlo en YouTube.

[![Tutorial del simulador de cajero automático](https://img.youtube.com/vi/p3Xvq4aSdIg/hqdefault.jpg)](https://youtu.be/p3Xvq4aSdIg)

## Estructura

- `api`: documentación de la API.
- `srs`: especificación de requerimientos.
- `media`: material de difusión institucional.
- `testing`: casos de prueba.
- `release`: scripts de preparación y despliegue.
- `backend`: capa de backend.
- `frontend`: capa de frontend. La lógica está en la clase `cajeroAutomatico` de `simulador.js`.

## Integrantes

- Gambini Matias
- Marcovecchio Mijael
- Oliva Mario
- Squirru Pedro


