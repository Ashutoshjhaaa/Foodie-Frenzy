# Food Ordering App

A full-stack food ordering application with an Admin panel, Frontend for users, and a robust Backend.

## 🚀 Features
- **Frontend**: User-friendly interface for browsing menu, adding items to cart, and placing orders.
- **Admin Panel**: Dashboard to manage food items, view orders, and update statuses.
- **Backend**: Node.js & Express API with MongoDB integration.
- **Payment Integration**: Stripe for secure online payments.
- **Authentication**: JWT-based user authentication.

## 📂 Project Structure
- `/frontend`: React application for users.
- `/admin`: React dashboard for management.
- `/backend`: Node.js server and API routes.

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ashutoshjhaaa/Food-app.git
cd "food app"
```

### 2. Install Dependencies
Run this in the root, and also inside each folder:
```bash
npm install
cd frontend && npm install
cd ../admin && npm install
cd ../backend && npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory with the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 4. Run the Application
- **Backend**: `npm run dev` (inside /backend)
- **Frontend**: `npm run dev` (inside /frontend)
- **Admin**: `npm run dev` (inside /admin)

## 📦 Tech Stack
- **Frontend**: React.js, Vite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: CSS / Tailwind
- **Payment**: Stripe API

## 🛡️ License
Distributed under the MIT License.
