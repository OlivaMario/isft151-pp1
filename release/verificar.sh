#!/bin/sh
for archivo in frontend/index.html frontend/estilos.css frontend/simulador.js; do
    if [ ! -f "$archivo" ]; then
        echo "Falta el archivo $archivo"
        exit 1
    fi
done
echo "El frontend está completo y listo para desplegar"
