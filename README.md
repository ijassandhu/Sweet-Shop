
# 🍬 Sweet Shop Management System

A full-stack web application to manage inventory, sales, and user access for a boutique sweet shop — built with modern backend and frontend technologies.

---

## 📌 Project Overview

The **CraveCraft** is a full-stack web application designed to manage the inventory and sales of a boutique sweet shop. It provides a seamless experience for both customers and administrators.

The system focuses on **simplicity, performance, and clean UI/UX**, while demonstrating real-world concepts such as authentication, role-based access control, and real-time inventory handling.

### 🎯 Target Audience

#### Customers
- Browse available sweets
- Search and filter sweets by category or price
- Add items to cart and purchase
- View real-time stock availability

#### Administrators
- Add new sweet products
- Update prices and details
- Restock inventory
- Delete discontinued products

---

## 🧱 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Prisma
- **Database:** SQLite  
  *(Easily replaceable with PostgreSQL or MySQL)*
- **Authentication:** JWT (JSON Web Tokens)
- **Testing:** Jest

### Frontend
- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **HTTP Client:** Axios

### Development Tools
- **Version Control:** Git
- **API Testing:** Swagger UI, Postman

---

## ✨ Features

### 🔐 Authentication & Security
- Secure user registration and login
- JWT-based stateless authentication
- Role-Based Access Control (USER / ADMIN)
- Protected frontend routes for admin functionality

---

### 🍭 Sweet Management (CRUD)
- Browse sweets with responsive cards
- Search by name
- Filter by category and price range
- Admin-only access to:
  - Create sweets
  - Update sweet details
  - Delete sweets
- Stock indicators and category badges

---

### 🛒 Shopping Experience
- Add multiple sweets to cart
- Increase/decrease quantities
- Real-time stock validation
- Prevent over-ordering beyond inventory
- Sequential checkout logic to ensure stock accuracy
- Fully responsive design (desktop + mobile)

---

### 📦 Inventory Control
- Automatic stock deduction on purchase
- Admin restocking without editing full product details
- Out-of-stock visual indicators
- Disabled purchase button when stock reaches zero

---

## 🗂️ Project Structure
```bash
sweet-shop-management-system/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Request handlers (auth, sweets)
│   │   ├── routes/             # API route definitions
│   │   ├── middleware/         # Auth & role-based middleware
│   │   ├── utils/              # Helper utilities (JWT, hashing)
│   │   └── prisma.js           # Prisma client instance
│   │
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── dev.db              # SQLite database (generated)
│   │
│   ├── tests/                  # Jest test suite
│   ├── server.js               # Application entry point
│   ├── package.json            # Backend dependencies
│   └── .env                    # Environment variables (ignored)
│
└── frontend/
    ├── src/
    │   ├── api/                # Axios API configuration
    │   ├── assets/             # Images, icons, static assets
    │   ├── components/         # Reusable UI components (Navbar, SweetCard)
    │   ├── context/            # Global state & Auth context
    │   ├── pages/              # Main views (Login, Register, Dashboard, Admin)
    │   ├── routes/             # Protected & public routes
    │   ├── utils/              # Helper functions
    │   ├── App.jsx             # Root component
    │   ├── main.jsx            # React entry point
    │   └── style.css           # Global Tailwind styles
    │
    ├── index.html              # HTML entry file
    ├── vite.config.js          # Vite configuration
    ├── tailwind.config.js      # Tailwind configuration
    └── package.json            # Frontend dependencies

```


---


* API Base URL: `http://localhost:8000`
* Swagger Docs: `http://localhost:8000/docs`

---

---

````md
## ⚙️ Setup & Run Instructions

### ✅ Prerequisites
- Node.js **18+**
- npm

---

### 🔧 Backend Setup

```bash
cd backend
npm install
````

#### Environment Variables

Create a `.env` file inside the `backend` directory:

```env
JWT_SECRET=your_secret_key
```

#### Database Setup

```bash
npx prisma migrate dev
```

#### Start Backend Server

```bash
node server.js
```

* API Base URL: `http://localhost:5000`

---

### 🎨 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

* Frontend URL: `http://localhost:5173`

---

## 🧪 Testing

The backend follows a **Test-Driven Development (TDD)** approach.

### Run Tests

```bash
cd backend
npm test
```

### Test Coverage Includes

* User registration and login
* JWT token generation and validation
* Sweet CRUD operations
* Inventory purchase and restock logic
* Error handling and edge cases

---

## 🖼️ Screenshots

<img width="1896" height="877" alt="Screenshot 2025-12-14 212420" src="https://github.com/user-attachments/assets/55099616-e061-4373-ad9d-7f08f5006d97" />


---

## 🤖 AI Usage Disclosure

AI tools were used responsibly to assist development while maintaining full ownership of architecture, logic, and design decisions.

### Tools Used

* ChatGPT
* Copilot


### How AI Helped

* Breaking down assignment requirements into manageable modules
* Generating boilerplate Express routes and controllers
* Assisting with Prisma schema and queries
* Writing and refactoring Jest unit tests
* Improving frontend UI using Tailwind CSS
* Debugging frontend ↔ backend integration issues

### Human Oversight

* Designed overall system architecture
* Implemented authentication and authorization logic
* Defined business rules for inventory management
* Reviewed and refactored all AI-generated code
* Ensured clean coding practices and readability


---

## 🚀 Future Improvements

* 📦 Order history for users
* 📊 Admin analytics dashboard
* 💳 Payment gateway integration
* 🐳 Dockerization for deployment
* ☁️ Cloud hosting (AWS / Render / Railway)

---

## 📄 License

This project is created for **educational and portfolio purposes**.

---

