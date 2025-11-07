# PrimeNews

**PrimeNews** is a full-stack news web application built using the **MERN stack (MongoDB, Express, React, Node.js)**. It provides a seamless platform for users to read, search, and filter news articles, while admins can efficiently manage content.

---

## 🌐 Live Site

[PrimeNews Live](https://newspaper-c828c.web.app/)

---

## 🛠 Admin Credentials

- **Email:** fuad@gmail.com
- **Password:** fu123!

> Use these credentials to access the admin panel and manage news content.

---

## 🚀 Features

1. **User Authentication:** Secure login and registration system for both users and admins.
2. **Admin Dashboard:** Manage news articles, categories, and publishers efficiently.
3. **Add/Edit/Delete Articles:** Full CRUD functionality for admins.
4. **Categorized News:** Organized by Politics, Sports, Technology, Health, and more.
5. **Search & Filter:** Find articles quickly by keywords, tags, or category.
6. **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
7. **User-friendly Interface:** Modern, clean, and intuitive UI built with TailwindCSS.
8. **Publisher Management:** Add and manage publishers directly from the admin dashboard.
9. **Article Details Page:** Each article displays title, image, description, and publisher details.
10. **Role-based Access Control:** Different permissions for admin and regular users.
11. **Real-time Updates:** Instantly reflects new or updated articles.
12. **Secure Backend:** Node.js and Express API with MongoDB for robust data storage.
13. **Multi-tag Support:** Improve discoverability through tagged content.
14. **Deployment Ready:** Deploy easily via Vercel/Netlify (frontend) and Render/Railway (backend).

---

## 🛠 Tech Stack

- **Frontend:** React, TailwindCSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens) & Firebase Authentication (optional)
- **Deployment:** Vercel / Netlify (Frontend), Render / Railway (Backend)

---

## 📦 Dependencies Used

```json
{
  "@tailwindcss/vite": "^4.1.11",
  "@tanstack/react-query": "^5.90.2",
  "axios": "^1.11.0",
  "firebase": "^12.0.0",
  "lottie-react": "^2.4.1",
  "lucide-react": "^0.544.0",
  "react": "^19.1.0",
  "react-countup": "^6.5.3",
  "react-dom": "^19.1.0",
  "react-google-charts": "^5.2.1",
  "react-hook-form": "^7.61.1",
  "react-hot-toast": "^2.5.2",
  "react-icons": "^5.5.0",
  "react-lottie": "^1.2.10",
  "react-router": "^7.7.1",
  "react-select": "^5.10.2",
  "react-toastify": "^11.0.5",
  "sweetalert2": "^11.23.0",
  "swiper": "^12.0.2",
  "tailwindcss": "^4.1.11"
}
```

---

## ⚙️ How to Run the Project Locally

Follow these steps to set up and run the project on your local machine:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-username>/PrimeNews.git
cd PrimeNews
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add your Firebase or API keys:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_BASE_URL=http://localhost:5000
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

Then open the app in your browser at:
👉 `http://localhost:5173`

### 5️⃣ Run the Backend (if applicable)

If you have a backend folder for Express/MongoDB:

```bash
cd server
npm install
npm run dev
```

Make sure your `.env` backend variables (MongoDB URI, JWT secret, etc.) are configured properly.

### 6️⃣ Build for Production

```bash
npm run build
```

You can preview the build locally using:

```bash
npm run preview
```

---

## 🧰 Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 🧩 Deployment

### Frontend

- Deploy on **Netlify** or **Vercel**.
- Set environment variables in your hosting platform dashboard.

### Backend

- Deploy on **Render**, **Railway**, or **Vercel Serverless Functions**.
- Add environment variables and connect MongoDB.

---
