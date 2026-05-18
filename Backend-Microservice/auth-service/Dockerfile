FROM node:20-alpine
WORKDIR /app

COPY shared ./shared

COPY auth-service/package*.json ./
RUN npm install
COPY auth-service/ .

RUN npm run build
EXPOSE 3002
CMD ["node", "dist/main"]