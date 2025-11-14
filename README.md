# StickIt - A Full-Stack MERN Task Manager

Live Demo: https://stickit-eta.vercel.app

# About This Project

StickIt is a full-stack MERN (MongoDB, Express, React, Node.js) application inspired by a restaurant's kitchen ticket line. It's a responsive, secure, and interactive task manager that allows users to create, manage, and reorder their notes just like a chef managing orders.

This project was built from the ground up to demonstrate a complete, end-to-end understanding of modern full-stack web development, from database modeling and API security to dynamic frontend state management and deployment.
<img width="1867" height="907" alt="image" src="https://github.com/user-attachments/assets/4623df6c-4c02-4526-a344-b24f27cf9534" />


# Key Features
  * Full User Authentication: Secure registration and login using JWT (JSON Web Tokens) and bcrypt for password hashing.

  * Combined Auth UI: A single, responsive, tabbed component for both "Sign In" and "Sign Up," featuring password visibility toggles.

  * Full CRUD Functionality: Logged-in users can Create, Read, Update, and Delete their own tasks.

  * Drag-and-Drop: Interactive, "magnetic" reordering of tasks implemented using dnd-kit to manage the frontend state.

  * Custom Styling: A fully custom, responsive UI built from scratch with pure CSS, featuring a dark mode, a "kitchen ticket" aesthetic (monospace fonts), and animated page-load effects.

  * Protected Routes: Both frontend and backend routes are protected. The API ensures users can only access and modify their own data, and the React app redirects unauthorized users to the login page.

  * Dual Deployment: The application is split into two services for scalability and best practices:

Frontend (React + Vite) is deployed on Vercel.

Backend (Node.js + Express) is deployed on Render.

# Tech Stack
 ## Frontend

- React

- Vite (Build Tool)

- React Router (Page Navigation)

- dnd-kit (Drag-and-Drop)

- Axios (API Requests)

- CSS (Custom Styling)

## Backend

- Node.js

- Express.js (API Framework)

- MongoDB Atlas (Cloud Database)

- Mongoose (Object Data Modeling)

- JWT (JSON Web Tokens) (Authentication)

- bcrypt.js (Password Hashing)

- CORS (Cross-Origin Resource Sharing)

# Deployment

Vercel (Frontend Hosting)

Render (Backend Hosting)
