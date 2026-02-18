# Backend Application

A simple Node.js backend application with MongoDB for dockerization purposes.

## Features

- Express.js REST API
- MongoDB integration with Mongoose
- Two API endpoints:
  - `GET /api/users` - Get all users
  - `POST /api/users` - Create a new user
- Health check endpoint: `GET /health`

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB connection string

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### GET /api/users
Get all users from the database.

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 30,
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-02-17T..."
}
```

## Docker

### Build the image:
```bash
docker build -t backend .
```

### Run the container:
```bash
docker run -p 3000:3000 --env-file .env backend
```

## Docker Compose

See the root `docker-compose.yml` for running the backend with MongoDB.
