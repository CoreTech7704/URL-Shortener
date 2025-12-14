# 🚀 Advanced URL Shortener — v1.5.0

Node.js · Express · MongoDB · EJS · Auth · Security-Hardened

Using Node.js, Express, and MongoDB, this production-ready URL shortener offers rate limiting, role-based authorization, authentication, and a safe server-rendered dashboard with EJS.

This project goes beyond simple CRUD to show real-world backend engineering techniques.

---

## ✨ Highlights
- 🔐 JWT + Cookie-based Authentication
- 🧑‍💻 Role-Based Authorization (NORMAL, ADMIN)
- 🚦 Rate-Limited URL Creation (abuse protection)
- 🧠 Secure URL Validation (protocol whitelisting)
- 🧾 Duplicate URL Prevention
- 📊 Click Analytics (timestamp-based)
- 🛡️ Security Hardened
    - Helmet headers
    - Payload size limits
    - Secure ID generation (nanoid)
    - Zero known npm vulnerabilities
- 🌐 Server-Side Rendering (EJS)
- 🚀 Railway-ready deployment

---

## 🧩 Features

- 🔗 Shorten long URLs
- 🔁 Instant redirection
- 👤 User authentication (login / signup)
- 🧑‍💻 User dashboard — manage your URLs
- 🧭 Admin dashboard — manage all URLs
- 🗑️ Delete URLs with access control
- 📈 Track visit history (timestamps)
- 🔐 Protected routes & middleware
- ⚠️ Graceful error handling (404 / invalid URLs)

---

## 🛠️ Tech Stack


| Layer | Technology |
|-------|-------------|
| Backend | Node.js |
| Framework | Express.js |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Token (JWT) + Cookies |
| Authorization | Role-based middleware |
| View Engine | EJS |
| Security | Helmet, Rate Limiting |
| ID Generation | nanoid |
| Styling | Tailwind CSS |

---

## 📦 Project Structure
```bash
URL-Shortener/
│
├── controllers/        # Business logic
├── middlewares/        # Auth & role guards
├── models/             # Mongoose schemas
├── public/             # Static assets
├── routes/             # Express routes
├── serviece/           # authentication services
├── views/              # EJS templates
├── connect.js          # MongoDB connection
├── index.js            # App entry point
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

1️⃣ Clone the repository
```bash
git clone https://github.com/CoreTech7704/URL-Shortener.git
cd URL-Shortener
```

2️⃣ Install dependencies
```bash
npm install
```

3️⃣ Environment variables
Create a .env file in the project root:
```bash
PORT=8001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_256_bit_secret
```

4️⃣ Start the server
```bash
npm start
```
Visit: http://localhost:8001

---

## 🔐 Security Considerations

This project follows backend security best practices:
- ✅ Payload size limits (10kb)
- ✅ Rate limiting on URL creation
- ✅ Secure, collision-safe ID generation
- ✅ URL protocol whitelisting (http, https)
- ✅ Auth & authorization enforced on protected routes
- ✅ Helmet security headers
- ✅ Zero known npm audit vulnerabilities

---

## 🚀 Deployment

The project is ready for Railway deployment.
Key requirements:
- Node.js ≥ 18
- MongoDB Atlas or Railway MongoDB plugin
- Environment variables configured in Railway dashboard

---

## 👨‍💻 Author

CoreTech7704(Sarvam Patel)  
GitHub: https://github.com/CoreTech7704

---

## 📄 License

This project is licensed under the MIT License.

---

## Closing Note

Built with a strong emphasis on practical backend engineering, discipline, and real-world security considerations.  
A solid foundation not merely a demonstration.

Developed with ❤️, ☕, and endless curiosity 💡