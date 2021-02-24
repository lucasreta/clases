# Ejemplo Básico de Uso de Docker

Instalar el CLI de Docker, pararse dentro de este directorio y ejecutar el comando:

```
docker build . -t buildsimple
```

Una vez finalizado el build, ejecutar el siguiente comando para iniciar un contenedor que corra la imagen:

```
docker run -p 8001:3000 --name buildsimple buildsimple
```

Ingesando a http://localhost:8001 accedera a la API definida en `index.js`.
