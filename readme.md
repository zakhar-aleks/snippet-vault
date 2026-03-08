# Snippet Vault

## Running with docker
docker-compose up --build

## Manual Installation

### Backend
1. Navigate to the backend directory.
2. Install dependencies: `npm install`.
3. Configure environment variables in `.env`.
4. Start the server: `npm run start:dev`.

### Frontend
1. Navigate to the frontend directory.
2. Install dependencies: `npm install`.
3. Configure environment variables in `.env.local`.
4. Start the development server: `npm run dev`.

## Environment Variables

### Backend (.env)
* `DB_URI`: MongoDB connection string.
* `FRONTEND_URL`: URL of your frontend deployment.
* `PORT`: Port for the NestJS server (e.g., 8080).

### Frontend (.env.local)
* `NEXT_PUBLIC_API_URL`: URL of the backend server (e.g., http://127.0.0.1:8080).

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /snippet | Retrieve all snippets (supports pagination and search) |
| GET | /snippet/:id | Retrieve a specific snippet by ID |
| POST | /snippet | Create a new snippet |
| PATCH | /snippet/:id | Update an existing snippet |
| DELETE | /snippet/:id | Remove a snippet |