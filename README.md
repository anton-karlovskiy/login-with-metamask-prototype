# Octav Technical Project

There are 2 directories in this repo: a [`backend`](./backend) which is a REST API written in Express, and a [`frontend`](./frontend) which is a Next.js application.

#### Start the project using yarn

From the root folder of this repo, run

```bash
yarn install # Install root dependencies
cd backend && yarn install # Install backend dependencies
cd ../frontend && yarn install # Install frontend dependencies
cd .. # Go back to root folder
yarn start # Will launch the frontend and the backend at the same time
```

The backend should be running on `localhost:8000`, and the frontend on `localhost:3000`.

Alternatively, you can start the frontend and the backend separately:

```bash
# Start the backend
cd backend
yarn start

# Start the frontend
cd frontend
yarn start
```