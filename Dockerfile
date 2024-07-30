# Build stage
FROM node:16 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:16

WORKDIR /app

COPY --from=build /app/build ./build

RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "80"]