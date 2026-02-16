# STAGE 1
FROM node:18-alpine As build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . . 
RUN npm run build

# Stage 2: Production Stage
FROM nginx:stable-alpine AS production-stage

# Copy the build output from the first stage to Nginx's html folder
# Note: Use 'dist' if using Vite, or 'build' if using Create React App
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 (standard for HTTP)
EXPOSE 80

# Nginx runs automatically, no need for a CMD