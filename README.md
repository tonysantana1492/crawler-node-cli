## Guía de Uso

Primero, instalar las dependencias:

```bash
npm install
```

Segundo, crear un enlace simbólico a tu proyecto (permitirá ejecutar los comandos de tu proyecto tal y commo si hubieras instalado tu paquete globalmente):

```bash
npm link
```

Tercero, la herramienta funciona con mongodb, así que asegurese de tener el servicio instalado y funcionando .

Cuarto, Disfrute de la experiencia!!!

```bash
crawler -u http://ejemplo.com -m MaxDistancia -d BaseDeDatos
```

## Aclaraciones

Una vez que la herramienta finaliza, la línea de consola no se cierra automáticamente.