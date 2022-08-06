FROM node:14
WORKDIR /app
COPY package*.json ./
RUN [ "mkdir", ".mysql" ]
RUN [ "wget", "https://storage.yandexcloud.net/cloud-certs/CA.pem", "-O", "./.mysql/root.crt" ]
RUN [ "chmod", "0600", ".mysql/root.crt" ]
RUN npm install
# For production use:
# RUN npm ci --only=production
COPY . .
EXPOSE 8000
EXPOSE 9229
EXPOSE 80/tcp
CMD ["node", "server.js"]
