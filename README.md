
# 🚀 URL Shortener (Node.js + MongoDB)

A simple and efficient **URL Shortener** built with **Node.js**, **Express**, and **MongoDB**.  
This project allows users to shorten long URLs and access them through custom short links.

> ⚠️ **Note:** This project is still under development. New features, enhancements, and fixes are being added regularly.

---

## 🧩 Features

- 🔗 Shorten long URLs easily  
- 🧭 Redirect users to the original link  
- 💾 Persistent storage using MongoDB  
- 🔒 JWT-based authentication (in progress)  
- 🌐 EJS-based frontend (in progress)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | JSON Web Token (JWT) |
| View Engine | EJS |
| Styling | Tailwind CSS (planned) |

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/CoreTech7704/URL-Shortener.git
cd URL-Shortener
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add:

```env
PORT=8001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_256_bit_secret
```

### 4. Start the server

```bash
npm start
```

Server will start at:

```
http://localhost:8001
```

---

## 📦 Project Structure

```
short-url-nodejs/
│
├── controllers/       # Route controllers
├── models/            # Mongoose models
├── routes/            # Express routes
├── service/           # Utility and helper functions (e.g. auth.js)
├── views/             # EJS templates
├── public/            # Static assets (CSS, JS)
├── app.js             # Main application entry
└── package.json       # Dependencies and scripts
```

---

## 🧭 Roadmap

* [x] Basic URL shortening
* [x] MongoDB integration
* [x] JWT setup
* [ ] User login & signup pages
* [ ] Analytics for links
* [ ] Frontend styling with Tailwind CSS
* [ ] Deployment to Render / Vercel

---

## 👨‍💻 Author

**CoreTech7704**
📧 *GitHub:* [CoreTech7704](https://github.com/CoreTech7704)

---

## 📄 License

This project is licensed under the **MIT License**.

---

*Developed with ❤️ and caffeine ☕*

```

---

Would you like me to also generate a short **project description + tags** for your GitHub repo (for the “About” section at the top)?  
It helps people discover your project more easily.
```
