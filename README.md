# 🛒 MERN E-Commerce Website

A full-stack **E-Commerce Web Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**.
The project focuses on clean UI, secure authentication, and a scalable architecture — suitable for learning purposes as well as real‑world deployment.

---

## 🚀 Project Overview

This application allows users to:

* 🔐 Register and log in securely
* 🛍️ Browse products with detailed views
* 🛒 Add and remove items from the cart
* 📦 Place orders
* 👤 View user profile and order history

The project follows a **modular frontend–backend structure**, making it easy to scale, maintain, and extend with new features.

---

## ✨ Features

### 👤 User Features

* JWT-based authentication and authorization
* Product listing and detailed product pages
* Shopping cart management
* Secure order placement
* User profile with order history

### ⚙️ Backend Features

* RESTful API architecture
* Secure authentication using JWT
* Password hashing with bcrypt
* MongoDB models for Users, Products, and Orders
* Middleware-based route protection

---

## 🛠️ Tech Stack

### 🎨 Frontend

* **React.js (Vite)** – Fast development and optimized performance
* **React Router DOM** – Single Page Application navigation
* **Axios** – API communication
* **Tailwind CSS** – Responsive and modern UI styling
* **React Icons** – Icon library
* **React Toastify** – User notifications

### ⚙️ Backend

* **Node.js** – Server-side JavaScript runtime
* **Express.js** – REST API framework
* **MongoDB** – NoSQL database
* **Mongoose** – Schema and model handling
* **JWT** – Secure authentication
* **bcrypt** – Password hashing
* **dotenv** – Environment variable management
* **CORS** – Cross-origin request handling

---

## 📁 Project Structure

```
MERN-Ecommerce/
├── backend/
├── frontend/
├── README.md
└── vercel.json
```

---

## ⚙️ Installation & Setup

### Prerequisites

* Node.js
* MongoDB (local or Atlas)
* Git

### Clone the Repository

```
git clone https://github.com/vijaydev-07/MERN-Ecommerce.git
cd MERN-Ecommerce
```

---

## 🔧 Setup Instructions

### Backend Setup

```
cd backend
npm install
```

Create a `.env` file inside the **backend** folder:

```
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```
npm start
```

➡ Backend runs on: **[http://localhost:4000](http://localhost:4000)**

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

➡ Frontend runs on: **[http://localhost:5173](http://localhost:5173)**

---

## 🔐 Authentication Flow

* Passwords are securely hashed using **bcrypt**
* JWT token is generated on successful login
* Protected routes are handled using authentication middleware
* Token is stored on the client side for session management

---

## 📡 API Overview

### 🔑 Auth Routes

```
POST /api/auth/signup
POST /api/auth/login
```

### 📦 Product Routes

```
GET /api/products
GET /api/products/:id
```

### 🛒 Order Routes

```
POST /api/orders
GET /api/orders/my-orders
```

---

## 🚀 Deployment

* **Frontend**: Vercel
* **Backend**: Render / Railway
* **Database**: MongoDB Atlas

---

## 📌 Future Enhancements

* Payment gateway integration (Razorpay / Stripe)
* Admin dashboard for product and order management
* Product search, filter, and pagination
* Wishlist functionality
* Improved UI animations and performance optimization

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.
Feel free to fork the repository and submit a pull request.

---

## 👨‍💻 Author

**Vijay Dev**
🔗 GitHub: [https://github.com/vijaydev-07](https://github.com/vijaydev-07)

---

## 📄 License

This project is open-source and available under the **MIT License**.
