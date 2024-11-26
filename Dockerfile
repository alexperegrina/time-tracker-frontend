# Imagen base con Node.js
FROM node:18

# Configurar directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

COPY etc/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

# Exponer el puerto del servidor de desarrollo Angular
EXPOSE 4200

# Comando para iniciar el servidor de desarrollo
CMD ["npm", "run", "start-docker"]