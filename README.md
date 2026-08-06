# 🚀 Resume Builder

A full-stack MERN Resume Builder that allows users to create professional resumes using multiple templates, enhance content with AI, securely manage their accounts, and export resumes as PDF.

---

<p align="center">
  <img src="https://github.com/user-attachments/assets/f6448d63-2f9e-4fa1-9000-5c5db9cfa079" width="900" alt="Resume Builder">
</p>

## 🌐 Live Demo

- 🌐 **Frontend:** [Live Website](https://resume-builder-xkse.vercel.app)
- ⚙️ **Backend:** [Render API](https://resume-builder-o3g9.onrender.com)
  
---

## 🧪 Demo Account

> **Note:** This project uses the Resend Email API for email verification. Due to the free-tier limitations of Resend, new user registrations may not receive verification emails. To explore the application, please use the demo account below.

**Email:** resumebuilder.demo04@gmail.com

**Password:** 123456

---

# ✨ Features

- 🔐 JWT Authentication
- 📧 Email Verification using Resend
- 🔑 OTP-based Forgot Password & Reset Password
- 🤖 AI-powered Resume Summary & Experience Enhancement
- 📝 Multiple Resume Templates
- 👀 Live Resume Preview
- 📄 Export Resume as PDF
- ✏️ Create, Update & Delete Resumes
- 📱 Fully Responsive Design
- ☁️ Cloud Deployment using Vercel & Render

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Axios

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- Multer
- Cookie Parser
- CORS
- OpenAI API
- Resend Email API

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Vercel
- Render

---

# 📂 Folder Structure

```
RESUME-BUILDER
│
├── client
│   ├── public
│   ├── src
│   │   ├── Components
│   │   ├── pages
│   │   ├── app
│   │   │   ├── features
│   │   │   └── store.js
│   │   ├── configs
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server
│   ├── Controllers
│   ├── middleware
│   ├── model
│   ├── routes
│   ├── configs
│   ├── utils
│   ├── uploads
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 📸 Screenshots

## Home Page
<img width="1919" height="984" alt="image" src="https://github.com/user-attachments/assets/f6448d63-2f9e-4fa1-9000-5c5db9cfa079" />

---

## Login Page
<img width="1918" height="989" alt="image" src="https://github.com/user-attachments/assets/7d9e9f21-4a78-44bb-9e24-7a4cab45170f" />

---

## Resume Builder
<img width="1897" height="992" alt="image" src="https://github.com/user-attachments/assets/ef34d228-bc42-4f2e-8bd3-94405ab729a7" />

---

## AI Resume Enhancement

<img width="1903" height="987" alt="image" src="https://github.com/user-attachments/assets/4195bc6f-e45b-4ec5-a86d-d3f05dfd222e" />



---



# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/TusharPavaiya04/RESUME-BUILDER.git
```

Move into project

```bash
cd RESUME-BUILDER
```

---

## Install Frontend

```bash
cd client
npm install
```

---

## Install Backend

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

OPENAI_API_KEY=

RESEND_API_KEY=

FRONTEND_URL=
```

---

# ▶️ Run Locally

### Backend

```bash
cd server
npm run dev
```

### Frontend

```bash
cd client
npm run dev
```

---

# 📌 REST API Modules

- Authentication
- User Management
- Resume CRUD
- AI Resume Enhancement
- Email Verification
- Forgot Password
- Reset Password

---

# 🚀 Project Highlights

- Built a scalable full-stack MERN application with a modular architecture.
- Implemented secure JWT authentication with bcrypt password hashing.
- Added email verification and OTP-based password reset using the Resend API.
- Integrated the OpenAI API to generate AI-powered resume summaries and experience descriptions.
- Developed RESTful APIs using Express.js and MongoDB Atlas with Mongoose.
- Managed application state using Redux Toolkit.
- Deployed the frontend on Vercel and backend on Render.
  
---

# 📚 What I Learned

- Building full-stack MERN applications
- REST API development
- JWT Authentication
- MongoDB Schema Design
- Redux Toolkit State Management
- AI API Integration
- Email Verification using Resend
- Secure Authentication
- Deployment using Vercel & Render

---

# 🔮 Future Improvements

- More Resume Templates
- Drag & Drop Resume Sections
- Resume Sharing with Public Links
- ATS Resume Score Checker
- Theme Customization
- Multi-language Support
- AI Interview Question Generator

---

# 👨‍💻 Author

**Tushar Pavaiya**

- GitHub: https://github.com/TusharPavaiya04
- LinkedIn: https://linkedin.com/in/tushar-pavaiya

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
