Gestion d'Astreinte – Frontend Application
Interface utilisateur développée avec React pour la gestion des plannings d'astreinte.

This project is the frontend for the Gestion d'Astreinte application. It provides a modern, responsive, and user-friendly interface for administrators and secretaries to interact with the
 Laravel API Backend
.

 Features

Authentication Flow: Secure login for administrators and secretaries.

Token Management: Automatic handling of authentication tokens for secure API communication.

Protected Routes: Dashboard routes are restricted to authenticated users.

Responsive Layout: Sidebar-based layout adapted to all screen sizes.

Full CRUD Interfaces: User-friendly modals and tables for managing:

Services (with secretary assignment)

Agents

(Soon: Periods, Plannings, etc.)

Dynamic Data Loading: Components fetch and display API data with loading/error states.

Themed Design: OCP-inspired styles using Tailwind CSS.

 Tech Stack

Framework: React 18+

Build Tool: Create React App (CRA)

Language: JavaScript (ES6+) with JSX

Routing: React Router DOM

API Communication: Axios

Styling: Tailwind CSS

 Getting Started

Follow these steps to install and run the project locally.

 Prerequisites

Make sure the following are installed:

Node.js (recommended: v20.x or higher)

npm (bundled with Node.js)

Git

Important:
This frontend requires the backend API to be running.
 Backend Repository

Start the backend first before launching the frontend.

 Installation

Clone the repository

git clone https://github.com/YOUR_USERNAME/YOUR_FRONTEND_REPO.git


Navigate into the project

cd gestion-astreinte-frontend


Install dependencies

npm install

Configuration

The frontend communicates with the backend API located at:

http://127.0.0.1:8000


If you need to change the backend URL, edit:

src/services/api.js

Modify the baseURL:

const apiClient = axios.create({
  baseURL: 'http://YOUR_API_URL/api',
  // ...
});

 Running the Application
1. Start the Backend Server

In gestion-astreinte-backend:

php artisan serve

2. Start the Frontend Development Server

In gestion-astreinte-frontend:

npm start


This will automatically open the application in your browser at:

http://localhost:3000


The page reloads automatically when code changes are made.

 Project Structure

Main source files are located in the src/ directory:

src/
│
├── components/# Reusable UI components (e.g., Modal.js)

├── pages/# Page components (LoginPage.js, ServicesPage.js, etc.)

├── services/# API communication modules (api.js with Axios config)

├── App.js# Main layout (sidebar + routing)

├── index.js# App entry point with router setup

└── index.css# Tailwind CSS imports and base styles
