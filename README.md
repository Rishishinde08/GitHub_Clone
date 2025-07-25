﻿# 🐙 GitHub Clone

A full-stack GitHub-like platform built using **React**, **Node.js**, **Express**, and **MongoDB**. Users can register, log in, create repositories, push content, view commits, and manage their code – just like GitHub!
---

## 🧰 Tech Stack

### 🔹 Frontend:
- React.js
- Tailwind CSS / Bootstrap
- Axios
- React Router DOM

### 🔸 Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (for authentication)
- bcryptjs (for password hashing)
- AWS SDK (for file storage)
- Socket.IO (for real-time updates)
- Yargs, UUID

---

## ✨ Features

- 🧑 User Registration & Login
- 🔐 JWT-based Authentication
- 📁 Create & Delete Repositories
- 📂 Upload & View Files
- 📝 Commit history with timestamps
- 🔍 Search repositories
- 👥 User profile with public repositories
- ⚡ Real-time repository updates via Socket.IO
- 🌐 Fully Responsive UI

---

## 📂 Project Structure

github-clone/
├── client/ # React Frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
│
├── server/ # Node.js Backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── index.js
│ └── .env
│
├── README.md
└── package.json

yaml
Copy
Edit

---

## 🔧 Installation

### ⚙️ Prerequisites
- Node.js and npm
- MongoDB (Local or Atlas)
- Git

---

### 🛠️ Steps to Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/Rishishinde08/GitHub_Clone.git
cd github-clone

cd server
npm install

⚡ Real-time with Socket.IO
Used for:

Live repository updates

Activity notifications

Realtime file push events

