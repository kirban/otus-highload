FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
# For production use:
# RUN npm ci --only=production
COPY . .
EXPOSE 8000
EXPOSE 9229
CMD node server.js
