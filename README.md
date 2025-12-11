# Gestion d'Astreinte – Frontend Application

Frontend application built with React that provides a modern, responsive user interface for managing on-call schedules. This project is the frontend for the Gestion d'Astreinte system and communicates with the Laravel API backend.

## Features

- Authentication flow: Secure login for administrators and secretaries.
- Token management: Automatic handling of authentication tokens for secure API communication.
- Protected routes: Dashboard routes restricted to authenticated users.
- Responsive layout: Sidebar-based layout adapted to different screen sizes.
- Full CRUD interfaces (UI): Modals and tables for managing services and agents.
- Dynamic data loading: Components fetch and display API data with loading and error states.
- Themed design: Tailwind CSS for consistent styling.

## Tech stack

- Framework: React 18+
- Build tool: Create React App (CRA)
- Language: JavaScript (ES6+) + JSX
- Routing: React Router DOM
- API communication: Axios
- Styling: Tailwind CSS

## Prerequisites

- Node.js (recommended: v20.x or higher)
- npm (bundled with Node.js)
- Git

Important: The frontend requires the backend API to be running.

## Backend repository

Start the backend first before launching the frontend. The backend should be available (by default) at:
http://127.0.0.1:8000

## Getting started

Follow these steps to install and run the project locally.

1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_FRONTEND_REPO.git
```

2. Navigate into the project
```bash
cd gestion-astreinte-frontend
```

3. Install dependencies
```bash
npm install
```

## Configuration

By default the frontend expects the backend API at:
http://127.0.0.1:8000/api

If you need to change the backend URL, edit the Axios baseURL in `src/services/api.js`. Example:
```js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
```

If you use environment variables (recommended for multiple environments), create a `.env` at project root and add:
```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```
Then reference `process.env.REACT_APP_API_URL` in `src/services/api.js`.

## Running the application

1. Start the backend server (in the backend repo):
```bash
cd gestion-astreinte-backend
php artisan serve
```

2. Start the frontend development server:
```bash
cd gestion-astreinte-frontend
npm start
```

The app will open in the browser at:
http://localhost:3000

The page reloads automatically when code changes are made.

## Building for production

To create an optimized production build:
```bash
npm run build
```

Serve the `build` directory with a static server or deploy to your hosting provider.

## Project structure

Main source files are located in the `src/` directory:

src/
- components/      # Reusable UI components (Modal, Table, Form controls)
- pages/           # Page components (LoginPage, ServicesPage, AgentsPage, etc.)
- services/        # API modules and Axios instance (api.js)
- hooks/           # Custom React hooks (useAuth, useFetch, etc.)
- routes/          # Route definitions and protected route wrappers
- App.js           # Main layout (sidebar + routing)
- index.js         # App entry point with router and providers
- index.css        # Tailwind imports and base styles

## Example API usage (curl)

Login (Admin/Secretary)
```bash
curl -X POST http://127.0.0.1:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"secret"}'
```

Fetch services (use returned token as Bearer)
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://127.0.0.1:8000/api/services
```

## Authentication and token flow (suggested implementation)

- After successful login, store the access token in memory or in a secure httpOnly cookie (preferred).
- Attach the token to Axios requests via an Authorization header: `Authorization: Bearer <token>`.
- Implement an auth context or provider to manage login state, logout, and refresh logic if needed.
- Protect dashboard routes using a PrivateRoute component that checks authentication state.

