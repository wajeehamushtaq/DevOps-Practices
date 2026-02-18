# STAGE 1: Build Stage
FROM node:18-alpine AS build-stage

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build

# STAGE 2: Production Stage
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the first stage to Nginx's html folder
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Nginx runs automatically, no need for a CMD
