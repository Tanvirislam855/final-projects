# 🔄 SwapBD — Premium Peer-to-Peer Second-Hand Marketplace

An ultra-fast, modern, and secure full-stack second-hand marketplace built for Bangladesh. **SwapBD** empowers users to effortlessly buy, sell, and trade pre-owned goods with real-time analytics, instant search, and integrated digital payments.

<p center>
  <img width="100%" alt="SwapBD" src="" />
</p>

<p align="center">
  <a href=""><strong>🌐 Live Demo</strong></a> ·
  <a href="#-key-features"><strong>✨ Features</strong></a> ·
  <a href="#-tech-stack"><strong>🛠️ Tech Stack</strong></a> ·
  <a href="#-getting-started"><strong>🚀 Getting Started</strong></a>
</p>

---

## ✨ Key Features

### 🛒 Buyer Experience
- **Smart Catalog & Search:** High-performance product discovery with instant text search, dynamic category filtering, and pagination.
- **Wishlist & Cart Management:** Seamlessly save favorites and manage multi-item shopping carts.
- **Secure Stripe Checkout:** Integrated payment processing ensuring safe transactions for all orders.
- **Personal User Dashboard:** Track order histories, view live delivery statuses, and manage profile settings.

### 💼 Seller & Admin Suite
- **Interactive Analytics Dashboard:** Real-time metrics on sales, active listings, user growth, and revenue powered by Recharts.
- **Product & Inventory Control:** Effortless CRUD operations for managing product inventories, approvals, and categories.
- **User & Order Management:** Comprehensive administrative tools to review system activity, manage permissions, and resolve orders.

### 🎨 Design & Performance
- **Adaptive Theme System:** Built-in Dark and Light mode powered by `next-themes` and Shadcn UI primitives.
- **Fluid Micro-interactions:** Smooth dynamic animations using Framer Motion and Lottie.

---

## 🛠️ Tech Stack

### Core Architecture
- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server Actions)
- **Library:** [React](https://react.dev/)
- **Database:** [MongoDB](https://www.mongodb.com/) with official Node Driver / Mongoose Adapter
- **Authentication:** [Better Auth](https://better-auth.com/) (Email/Password & Social OAuth)

### UI & UX Styling
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [Shadcn UI](https://ui.shadcn.com/) / [Radix UI](https://www.radix-ui.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Lottie React](https://github.com/Gamote/lottie-react)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
- **Theme:** [Next Themes](https://github.com/pacocoursey/next-themes)

### Payments & Utilities
- **Payment Gateway:** [Stripe](https://stripe.com/)
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Class Utilities:** `clsx`, `tailwind-merge`, `class-variance-authority`

---

## 🚀 Getting Started

Follow these instructions to set up **SwapBD** locally on your machine.

### Prerequisites

Ensure you have the following installed/configured:
- **Node.js**: `v18.x` or higher
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Database**: Active MongoDB instance (Local or MongoDB Atlas)
- **Stripe Account**: For testing payment gateways

---

### 🔑 Environment Variables

Create a `.env.local` file in the root folder and add the following keys:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Authentication (Better Auth)
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# Social Auth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Payments (Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key