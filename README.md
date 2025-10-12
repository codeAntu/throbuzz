# 🚀 Throbuzz

> A modern, full-stack social media platform built with Next.js

🚀 [throbuzz.vercel.app](https://throbuzz.vercel.app/)

---

## 🛠️ Tech Stack

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/MongoDB-green?style=for-the-badge&logo=mongodb" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary" />
  <img src="https://img.shields.io/badge/Nodemailer-yellow?style=for-the-badge&logo=nodemailer" />
  <img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun" />
</div>

---

## 📖 About

Throbuzz is a comprehensive social media platform that enables users to connect, share content, and engage with their community. Built with modern web technologies, it offers a seamless experience for creating posts, following users, and discovering trending content.

---

## ✨ Features

### Authentication & Security

- Email registration with OTP and JWT authentication
- Password hashing and secure session management
- Middleware-based route protection

### Social & Content

- Create, edit, delete, share, and set posts as private or public
- Like, Nested comments and replies for rich discussions
- Advanced search for posts and users
- Real-time notifications for activity

### User Experience

- Responsive UI with dark/light theme
- Guest user support
- Animated transitions and skeleton loaders
- Rich profiles with bio, social links, and profile images

### Backend & Performance

- Fast username checks using Bloom filter and Redis
- Efficient data loading and trending feeds via advanced MongoDB aggregation
- Modular Next.js API routes
- Cloudinary-powered media uploads and optimization

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/codeantu/throbuzz.git
   cd throbuzz
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   REDIS_URL=your_redis_connection_string

   # Authentication
   JWT_SECRET=your_jwt_secret_key
   NEXTAUTH_SECRET=your_nextauth_secret

   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret

   # Email
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   RESEND_API_KEY=your_resend_api_key
   ```

4. **Run the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 📧 Email Integration

The platform includes automated email functionality for:

- Account verification
- Activity notifications (likes, comments, follows)
- Password reset and account security
- Admin notifications

---

## ☁️ Cloud Integration

Cloudinary is integrated for:

- User profile pictures
- Post images and media uploads
- Image optimization and fast delivery

---

<div align="center">
  <p>⭐ If you find this project useful, please consider giving it a star!</p>
  <p>Made with ❤️ by CodeAntu</p>
</div>
