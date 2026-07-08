FROM node:20-slim
WORKDIR /app
COPY backend/package*.json ./backend/
RUN cd backend && npm install
COPY . .
EXPOSE 4000
CMD ["node", "backend/server.js"]
