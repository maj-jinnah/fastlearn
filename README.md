# FastLearn — Learn Faster. Build Smarter.

A **Full-Stack Learning Platform** built with **Next.js 15**, combining both frontend and backend logic in a single monorepo. It enables users to explore courses, track their progress, and engage with interactive lessons — all in a seamless and dynamic interface powered by Next.js Server Actions, Next.js API routes.

The platform provides a modern, responsive UI with support for authentication, payments, media uploads, and real-time updates — designed for developers and learners who want to experience a smooth and scalable learning platform.

This project demonstrates how to build a **complete SaaS-style web application** using **Next.js 15**, including backend logic, database operations, authentication, and Stripe payments — all in one framework.

---

## Live Demo

🔗 **Website:** [https://fastlearn-snowy.vercel.app/](https://fastlearn-snowy.vercel.app/)

---

## Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | Next.js 15 (Full Stack) |
| **Frontend** | React 19, Tailwind CSS v4, Radix UI |
| **Backend** | Next.js API Routes, Server Actions |
| **Database** | MongoDB + Mongoose |
| **Authentication** | NextAuth.js (v5 Beta) |
| **Payments** | Stripe |
| **File Uploads** | Cloudinary (via next-cloudinary) |
| **UI Components** | Radix UI, shadcn/ui patterns |
| **Emails** | EmailJS + Resend |

---

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/maj-jinnah/fastlearn.git
cd fastlearn
```
### 2. Install Dependencies
```
npm install
```
### 3. Set Up Environment Variables
Create a ```.env``` file in the root directory and add the following variables:
```
# Database
MONGODB_CONNECTION_URI=your_db_connection_string

# Authentication
AUTH_SECRET=your_auth_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email
RESEND_API_KEY=your_resend_api_key
NEXT_PUBLIC_TEMPLATE_ID=your_templat_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_SERVICE_ID=your_service_id

NEXT_PUBLIC_BASE_URL=your_website_live_url
NEXTAUTH_URL=your_website_live_url

AUTH_TRUST_HOST=true
```
### 4. Run the Development Server
```
npm run dev
```
