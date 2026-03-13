# 🍔 Foodie Frenzy

A modern full-stack food ordering application with a user-friendly frontend, a centralized admin panel, and a robust backend.

🔗 **Live Demo**: [https://foodie-frenzyy.vercel.app/](https://foodie-frenzyy.vercel.app/)

## 🚀 Features
- **Frontend**: Seamless food browsing experience, interactive cart, and secure checkout.
- **Admin Panel**: Complete dashboard for managing food inventory, tracking orders, and updating delivery statuses.
- **Backend**: Scalable Node.js & Express API integrated with MongoDB for data persistence.
- **Stripe Integration**: Fully functional and secure online payment processing.
- **Authentication**: JWT-based secure user sign-up and login.
- **Responsive Design**: Optimized for all devices using Tailwind CSS and Framer Motion for smooth animations.

## 📂 Project Structure
- `frontend/`: React + Vite application for customers.
- `admin/`: React + Vite dashboard for administrators.
- `backend/`: Node.js/Express server and RESTful API.

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/Ashutoshjhaaa/Food-app.git
cd "food app"
```

### 2. Install Dependencies
Install dependencies for all modules:
```bash
# Root
npm install

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install

# Admin
cd ../admin && npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
# Also add any frontend env variables if needed (e.g., API URL)
```

### 4. Run the Application
Start the development servers:
- **Backend**: `cd backend && npm run dev`
- **Frontend**: `cd frontend && npm run dev`
- **Admin**: `cd admin && npm run dev`

## 📦 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, React Icons
- **Backend**: Node.js, Express 5, MongoDB (Mongoose)
- **Authentication**: JSON Web Token (JWT), Bcryptjs
- **Payment**: Stripe API
- **File Uploads**: Multer
- **Deployment**: Vercel (Frontend/Admin)

## 🛡️ License
Distributed under the MIT License.

## ✍️ Author
**Ashutosh Jha**
- GitHub: [@Ashutoshjhaaa](https://github.com/Ashutoshjhaaa)
- Portfolio: [Foodie Frenzy](https://foodie-frenzyy.vercel.app/)
