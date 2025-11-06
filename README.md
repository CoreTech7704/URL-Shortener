# 🚀 Advanced URL Shortener (Node.js + MongoDB)

A **full-featured URL Shortener** web app built with **Node.js**, **Express**, and **MongoDB**, featuring **user authentication**, **role-based authorization**, and an **EJS-based dashboard**.

This project allows users to shorten long URLs, manage their own links, and for admins to view and control all URLs in the system.

> 🧠 **Now includes:** Authentication, Authorization, Role-based Routing (Admin / User)

---

## 🧩 Features

- 🔗 Shorten long URLs easily  
- 🧭 Redirect users instantly to the original links  
- 💾 Persistent storage using MongoDB  
- 🔐 JWT + Cookie-based Authentication  
- 🧑‍💻 Role-based Authorization (`NORMAL` and `ADMIN`)  
- 🧭 Admin Dashboard — view all shortened URLs  
- 🌐 EJS Frontend with server-side rendering  
- 🧠 Visit tracking (timestamp-based history)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Token (JWT) + Cookies |
| Authorization | Role-based middleware |
| View Engine | EJS |
| Styling | Tailwind CSS *(planned)* |

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/CoreTech7704/URL-Shortener.git
cd URL-Shortener
```

2. Install dependencies
npm install

3. Setup environment variables

Create a .env file in the project root:

PORT=8001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_256_bit_secret

4. Start the development server
npm start


Then open in browser:

http://localhost:8001

📦 Project Structure
short-url-nodejs/
│
├── controllers/       # Route controllers (optional layer)
├── middlewares/       # Auth & role-based access control
├── models/            # Mongoose schemas (User, URL)
├── routes/            # Express routes (user, url, static, admin)
├── views/             # EJS templates (login, signup, home)
├── public/            # Static assets (CSS, JS)
├── index.js             # Main server file
└── package.json       # Project dependencies and scripts

🧭 Roadmap

 Basic URL shortening

 MongoDB integration

 JWT setup

 User login & signup pages

 Role-based access (Admin / Normal)

 Admin dashboard showing all URLs

👨‍💻 Author

CoreTech7704
📧 GitHub: CoreTech7704

📄 License

This project is licensed under the MIT License.

Developed with ❤️, ☕, and endless curiosity 💡