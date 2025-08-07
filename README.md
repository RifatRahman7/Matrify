# Matrify 💍

**Live Site:** [https://matrify-ph-12.web.app/](https://matrify-ph-12.web.app/)

Matrify is a modern Matrimonial Web Application designed to help individuals find the perfect life partner. It features a clean, intuitive interface and a powerful biodata filtering system to match users with suitable profiles based on their preferences.

---

## 🔧 Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- DaisyUI
- React Router


**Backend:**
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK (for token verification)
- cors
- dotenv
- firebase-admin
- Firebase Authentication

---

## 🚀 Core Features

- 🔐 **Authentication**
  - Google & Email/Password Login (Firebase Auth)
  - JWT protected routes (admin/user)

- 📄 **User Biodata Management**
  - Create, read, update, and delete biodata
  - Upload profile images or image links
  - Filter by age, division, gender, and other criteria

- 📊 **Admin Panel**
  - Manage users and all biodatas
  - View user-specific biodata stats

- 🧠 **Smart Matching**
  - Match biodatas based on type, division, and partner preferences

- 📱 **Responsive Design**
  - Fully mobile and tablet-friendly UI with elegant transitions and shadows
 
  🔧 Dependencies:
   Frontend (client/package.json):
bash
npm install react react-dom react-router-dom axios tailwindcss daisyui firebase

These will be used:
react: Main library for building UI

react-router-dom: Routing for SPA navigation

axios: To handle HTTP requests

firebase: For authentication and hosting

tailwindcss: Utility-first CSS framework

daisyui: Component library built on TailwindCSS


Backend (server/package.json):
bash

npm install express mongoose cors dotenv jsonwebtoken firebase-admin

These will be used:
express: Backend web framework

mongoose: MongoDB ODM for handling schemas and database

cors: Middleware to allow cross-origin requests

dotenv: To manage environment variables

jsonwebtoken: For creating and verifying tokens (auth)

firebase-admin: For verifying Firebase tokens securely from the server


  ⚙️ How to Run Locally


1. Clone the repo
  
Navigate to client & install dependencies

bash

cd client

npm install

npm run dev

Navigate to server & install dependencies


bash

cd server

npm install

npm run start

Set environment variables in .env file (Firebase, Mongo URI, etc.)

