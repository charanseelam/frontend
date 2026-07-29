# Dockerfile for forex-backend
FROM node:18-bullseye-slim

WORKDIR /usr/src/app

# Install build deps required by sqlite3, then clean up
RUN apt-get update && apt-get install -y python3 make g++ ca-certificates --no-install-recommends && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --production

COPY . .

ENV PORT=5000
EXPOSE 5000

CMD ["npm", "start"]
