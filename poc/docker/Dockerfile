# Traer la última versión de la imagen oficial de node.
FROM node:latest

# Creamos una carpeta que usaremos cómo nuestro directorio principal.
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Copiar el archivo package.json e instalar las dependencias.
COPY package.json .
RUN npm install --quiet

# Copiar el código de nuestra aplicación.
# La carpeta node_modules será omitida en esta copia
# ya que se figura en el archivo ".dockerignore".
COPY . .

# Exponer el puerto 3000 del contenedor.
# De esta manera podremos vincular un puerto del host
# al puerto 3000 de nuestro contenedor.
EXPOSE 3000

# Iniciar la aplicación al iniciar al contenedor.
CMD npm start
