# 🌸 Flori - POS & E-Commerce Platform

> A hybrid Point-of-Sale (POS) and E-commerce solution designed for florists. This application connects in-store operations with online customer sales, featuring bouquet customization, scheduled deliveries, and role-based access control.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Database Schema](#-database-schema)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [License](#-license)

---

## ✨ Features

### 👤 Customer (E-Commerce)
* **Bouquet Customization:** Interactive interface to select specific flowers, wrapping paper, and ribbons to create a custom arrangement.
* **Order Scheduling:** Ability to place orders ahead of time for specific dates (birthdays, anniversaries).
* **Shopping Cart:** Full cart functionality with order summary and checkout.
* **User Dashboard:** View order history and track current order status.

### 🏪 Seller (POS System)
* **POS Interface:** Fast checkout interface designed for efficient in-store processing.
* **Order Management:** View and update the status of online and scheduled orders (e.g., *Pending* -> *Processing* -> *Ready* -> *Delivered*).
* **Inventory Check:** Real-time visibility of available flower stock to prevent overselling.

### 🛡️ Admin (Dashboard)
* **User Management:** Create and manage Seller and Admin accounts.
* **Inventory Management:** CRUD operations for flowers, ancillary products, and pricing.
* **Analytics:** View sales reports, top-selling flowers, and revenue charts.

### 🔐 Security
* **Authentication:** Secure login using **JSON Web Tokens (JWT)**.
* **Role-Based Access Control (RBAC):** Middleware triggers to restrict API endpoints based on `Admin`, `Seller`, or `Customer` roles.

---

## 🛠 Tech Stack

**Frontend:**
* **React.js:** Functional Components & Hooks
* **State Management:** Context API / Redux
* **Styling:** CSS Modules / Tailwind CSS
* **HTTP Client:** Axios

**Backend:**
* **Node.js:** Runtime environment
* **Express.js:** Web framework
* **Security:** `jsonwebtoken` (Auth), `bcryptjs` (Password Hashing), `cors`

**Database:**
* **MySQL:** Relational Database
* **Sequelize:** ORM for schema definition, relationships, and migrations

---

## 🗄 Database Schema

The application uses a relational database structure managed via Sequelize models:

* **Users:** Stores Admin, Seller, and Customer credentials and profiles.
* **Products:** Inventory items (Flowers, Vases, Add-ons) with stock levels and prices.
* **Orders:** Master table linking Users to OrderItems with total price and status.
* **OrderItems:** Links Orders to Products (handling quantity and snapshots of price at time of purchase).
* **Customizations:** Stores specific configuration details for custom bouquets (e.g., *Wrapper Type: Kraft Paper*, *Ribbon: Red Silk*).

---

## ⚙ Prerequisites

Before running this project, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (v14 or higher)
* [MySQL Server](https://www.mysql.com/)
* npm or yarn

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/flower-shop-project.git](https://github.com/your-username/flower-shop-project.git)
cd flower-shop-project