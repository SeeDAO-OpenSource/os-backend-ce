# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
#COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "start:dev"]