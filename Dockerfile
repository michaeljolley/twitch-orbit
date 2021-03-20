FROM node:12.6.0-alpine as build

WORKDIR /app

# Copy dependency files
COPY ./package.json ./

# Clean install depdenencies
RUN npm i --silent

# Copy the rest of the files
COPY ./ .

RUN npm run build

# Put together the release image with the just build artifacts
FROM node:12.6.0-alpine

WORKDIR /app

# Copy dependency files
COPY ./package.json ./

# Clean install production-only dependencies
RUN npm i --silent --only=production

# Copy built project
COPY --from=build /app/dist ./

CMD [ "node", "index.js" ]