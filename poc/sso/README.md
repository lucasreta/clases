# Google SSO Proof-Of-Concept

Integra todas las funcionalidades descriptas en https://developers.google.com/identity/sign-in/web/sign-in .

Configurar puerto y CLIENT_ID en el archivo .env y ejecutar el comando:

```
npm start
```

Dirigiendose a http://localhost:PORT, va a encontrar un botón de login que interacuta con el SSO de Google, 
y que al ingresar envía el idtoken al backend para validación adicional.
