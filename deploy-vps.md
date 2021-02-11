

# Pasos para Deploy en VPS:

**Aclaración:**

<pre>
En los ejemplos de código, se marcará <b>en negrita</b> todo lo que deba ser modificado.
</pre>

## Configuración inicial

Conectarse a la VPS por SSH:

<pre>
ssh <b>usuario</b>@<b>ip</b>
</pre>

Ir al directorio `/var/www`:

```
cd /var/www
```

Clonar el repositorio del proyecto a deployar:

<pre>
git clone <b>url-repositorio</b> <b>nombre-de-carpeta</b>
</pre>

## Configuración del servidor

Una vez que tenemos el repositorio clonado en `/var/www/nombre-de-carpeta`, evaluar si:

- El proyecto es solo una colección de archivos .html,.css,.js que deben servirse al navegador, o
- El proyecto requiere de un backend en Node.JS

### Servidor de archivos

En el primer caso, solo debemos configurar nginx para que apunte a la carpeta donde estan nuestros archivos.

Para esto, debemos ir a la carpeta donde se encuentran las configuraciones de los distintos sitios que nginx
se encargará de servir:

```
cd /etc/nginx/sites-available
```

Si no existe un archivo de configuración, podemos copiar el archivo `default` para utilizar como template al
configurar nuestro sitio.

<pre>
cp default <b>nombre-de-sitio</b>
</pre>

Ahora entramos con nuestro editor de preferencia al archivo creado, en mi caso vim ([cheat sheet de comandos](https://vim.rtorr.com/)):

<pre>
vim <b>nombre-de-sitio</b>
</pre>

Nuestro archivo debería terminar viendose de la siguiente manera:

<pre>
server {
	listen 80;
	listen [::]:80;

	server_name <b>dominio.com</b>;

	root <b>/var/www/nombre-de-carpeta</b>;
	index index.html;

	location / {
		try_files $uri $uri/ =404;
	}
}
</pre>

De esta forma, indicaremos a nginx que para el dominio especificado en el valor de `server_name`, debe
servir los contenidos que se encuentren en el directorio al cual apunta la variable `root`. Se especifica
que para todos los requests que lleguen al servidor (`location /`), se trate de proveer un archivo acorde
al solicitado (`try_files $uri`). Caso contrario, el servidor devolvera un error 404 - No Encontrado.

### Proxy a desarrollo en Node

Si el proyecto tambien requiere de un backend, debemos completar algunos pasos adicionales.

Primero, debemos asegurarnos de que PM2 este corriendo nuestro proyecto:

```
pm2 list
```

Si vemos a nuestro proyecto corriendo en el listado devuelto, podemos proceder. Caso contrario, debemos
entrar al directorio de nuestro backend y levantar el proyecto:

<pre>
cd <b>/var/www/nombre-de-carpeta/backend</b>
pm2 start <b>index.js</b> --name <b>nombre-del-backend</b>
</pre>

Una vez que esta corriendo en algun puerto, debemos editar nuevamente la configuración de nuestro servidor:

<pre>
vim <b>/etc/nginx/sites-available/nombre-de-sitio</b>
</pre>

Agregamos las líneas que estan _en italicas_, modificando los valores en **negrita** por los correspondientes:

<pre>
server {
  listen 80;
  listen [::]:80;

  server_name <b>dominio.com</b>;

  root <b>/var/www/nombre-de-carpeta</b>;
  index index.html;

  location / {
    try_files $uri $uri/ =404;
  }
  <i>
  location <b>/endpoint-de-backend</b> {
    proxy_pass http://localhost:<b>8080</b>;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
  </i>
}
</pre>

De esta manera, todos los requests que lleguen a `/endpoint-de-backend` serán dirigidos por el proxy
a nuestro desarrollo en Node.JS.

### Habilitación del sitio

Una vez que tenemos nuestro archivo de configuración dentro del directorio `/etc/nginx/sites-available` listo,
debemos asegurarnos de habilitar el sitio.

La configuración por defecto de ngnix se encarga de leer todos los archivos que se encuentren dentro del subdirectorio
`/etc/nginx/sites-enabled`, por lo cual debemos crear un link simbolico de nuestro archivo en `sites-available` (sitios 
disponibles) dentro del subdirectorio `sites-enabled` (sitios habilitados):

<pre>
ln -s /etc/nginx/sites-available/<b>nombre-de-sitio</b> /etc/nginx/sites-enabled/<b>nombre-de-sitio</b>
</pre>

De esta manera, cualquier cambio que hagamos en la configuración dentro de `sites-available` se vera reflejada en 
`sites-enabled` al reiniciar el servicio de nginx.

_ _ _ _

**Apartado:** Si quisieramos eliminar temporalmente un sitio, podríamos hacerlo eliminando unicamente el link simbolico, pero 
conservando la configuración dentro de `sites-available` para uso futuro:

<pre>
rm /etc/nginx/sites-enabled/<b>nombre-de-sitio</b>
</pre>

_ _ _ _


Una vez que nuestro sitio esta habilitado, solo debemos reiniciar el servidor para que los cambios entren en vigencia:

```
sudo systemctl restart nginx.service
```

## SSL

Primero debemos instalar certbot, la herramienta que se encargara de generar y renovar nuestros certificados:

```
sudo apt install certbot python3-certbot-nginx
```

Luego hay que validar que exista una configuración para el dominio que queremos asegurar.

<pre>
cd /etc/nginx/sites-available
grep -rl <b>dominio.com</b>
</pre>

Si existe, llamamos a certbot especificando en los parametros el tipo de servidor y el nombre de el o los dominios
para los cuales queremos generar o renovar los certificados:

<pre>
certbot --nginx -d <b>dominio.com</b> -d <b>www.dominio.com</b>
</pre>

Por último, reiniciamos el servidor:

```
systemctl restart nginx
```
