# syntax=docker/dockerfile:1.3

# Build stage
FROM node:alpine AS build

# Install Java
RUN apk add --no-cache openjdk21

# Install the OpenAPI client generator
RUN npm install @openapitools/openapi-generator-cli -g

# Set the working directoy
WORKDIR /app

# Copy the package.json and package-lock.json. This is done first so that the npm install is cached
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . ./

# Build the app (Client is generated during build)
RUN npm run generate-client && npm run build

# Runtime stage using NGINX
FROM nginx:stable-alpine AS frontend

# Copy the nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the start-nginx.sh script 
COPY ./nginx/start-nginx.sh /start-nginx.sh

# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 3000

# Healthchecks (Since running in container, use static NGINX port 3000, instead of public accessible 'FRONTEND_PORT', which gets translated by docker for external hosts)
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/ || exit 1

# Make the script executable and start nginx
RUN chmod +x /start-nginx.sh
ENTRYPOINT ["/bin/sh", "/start-nginx.sh"]