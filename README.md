# 🚀 Delivery Tracking System - React + Neon Edition

A modern, full-stack delivery tracking system built with **Next.js 14**, **React**, **TypeScript**, **Neon PostgreSQL**, and **Tailwind CSS**. Features real-time package tracking, admin dashboard, and beautiful UI with smooth animations.

## ✨ Features

### Customer Features
- 📦 **Real-time Package Tracking** - Track packages using unique tracking numbers
- 📍 **Visual Timeline** - Beautiful animated delivery timeline with status updates
- 💳 **Package Details** - View sender, recipient, and complete package information
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile

### Admin Features
- 🔐 **Secure Authentication** - NextAuth.js with session management
- 📊 **Dashboard** - Statistics overview with real-time data
- ✏️ **CRUD Operations** - Complete delivery and customer management
- 🔍 **Search & Filter** - Quick search and status filtering
- 📝 **Status Updates** - Automatic tracking history on status changes
- 🎨 **Modern UI** - Bold industrial-tech design with Framer Motion animations

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Neon PostgreSQL (Serverless)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Password Hashing**: bcryptjs

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Neon PostgreSQL account (free tier available)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo>
cd delivery-tracking-react
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Neon Database

1. Create a free account at [Neon](https://neon.tech)
2. Create a new project
3. Copy your connection string

### 4. Run Database Schema

1. Go to your Neon project's SQL Editor
2. Copy and paste the entire contents of `schema.sql`
3. Execute the SQL to create tables and insert sample data

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Neon Database Connection
DATABASE_URL="postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"
NEXTAUTH_URL="http://localhost:3000"

# App Configuration
NEXT_PUBLIC_APP_NAME="DeliverTrack"
```

**Important**: 
- Replace `DATABASE_URL` with your Neon connection string
- Generate a secure `NEXTAUTH_SECRET`: `openssl rand -base64 32`

### 6. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Test the Application

**Customer Tracking:**
- Visit: `http://localhost:3000`
- Try tracking numbers: TRK1000001, TRK1000002, TRK1000003

**Admin Panel:**
- Visit: `http://localhost:3000/admin/login`
- Login: `admin` / `admin123`

## 📁 Project Structure

```
delivery-tracking-react/
├── app/                          # Next.js App Router
│   ├── admin/                   # Admin pages
│   │   ├── dashboard/          # Dashboard page
│   │   ├── deliveries/         # Deliveries management
│   │   ├── customers/          # Customers management
│   │   ├── login/              # Admin login
│   │   └── layout.tsx          # Admin layout
│   ├── api/                     # API Routes
│   │   ├── auth/               # NextAuth endpoints
│   │   ├── track/              # Public tracking API
│   │   └── admin/              # Admin APIs
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/                  # React components
│   ├── admin/                  # Admin components
│   ├── Navbar.tsx              # Main navbar
│   ├── TrackingForm.tsx        # Tracking input form
│   ├── TrackingResults.tsx     # Results display
│   └── FeatureCards.tsx        # Feature cards
├── lib/                         # Utilities
│   ├── db.ts                   # Neon database connection
│   └── auth.ts                 # NextAuth configuration
├── public/                      # Static files
├── schema.sql                   # Database schema
├── .env.example                 # Environment template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎨 Design System

### Colors
- **Primary**: `#FF6B35` (Orange)
- **Secondary**: `#004E89` (Navy)
- **Success**: `#06D6A0` (Green)
- **Warning**: `#FFA400` (Orange)
- **Danger**: `#EF476F` (Red)
- **Dark**: `#1A1A2E`

### Typography
- **Heading**: Rajdhani (Bold, Uppercase, Wide Tracking)
- **Body**: Space Mono (Monospace)

### Components
All components use Tailwind CSS utilities with custom classes defined in `globals.css`:
- `.btn-primary-custom` - Primary buttons
- `.card-custom` - Info cards
- `.status-badge` - Status indicators
- `.timeline` - Delivery timeline
- `.form-control-custom` - Form inputs
- `.table-custom` - Data tables

## 🔒 Security Features

- ✅ NextAuth.js session-based authentication
- ✅ bcrypt password hashing
- ✅ SQL injection prevention (parameterized queries)
- ✅ Protected API routes
- ✅ Environment variable security
- ✅ HTTPS recommended for production

## 📊 Database Schema

### Tables

**users** - Admin accounts
```sql
- id: SERIAL PRIMARY KEY
- username: VARCHAR(50) UNIQUE
- password: VARCHAR(255) (hashed)
- email: VARCHAR(100)
- full_name: VARCHAR(100)
- role: VARCHAR(20)
- created_at: TIMESTAMP
```

**customers** - Customer information
```sql
- id: SERIAL PRIMARY KEY
- name: VARCHAR(100)
- email: VARCHAR(100)
- phone: VARCHAR(20)
- address: TEXT
- created_at: TIMESTAMP
```

**deliveries** - Delivery packages
```sql
- id: SERIAL PRIMARY KEY
- tracking_number: VARCHAR(50) UNIQUE
- customer_id: INTEGER (FK)
- sender_name: VARCHAR(100)
- sender_address: TEXT
- recipient_name: VARCHAR(100)
- recipient_address: TEXT
- recipient_phone: VARCHAR(20)
- package_description: TEXT
- weight: DECIMAL(10,2)
- status: VARCHAR(20)
- current_location: VARCHAR(200)
- delivery_fee: DECIMAL(10,2)
- estimated_delivery: DATE
- notes: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**tracking_history** - Status history
```sql
- id: SERIAL PRIMARY KEY
- delivery_id: INTEGER (FK)
- status: VARCHAR(50)
- location: VARCHAR(200)
- description: TEXT
- created_at: TIMESTAMP
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Environment Variables for Production

```env
DATABASE_URL="your-neon-production-url"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"
NEXT_PUBLIC_APP_NAME="DeliverTrack"
```

## 🎯 API Endpoints

### Public Endpoints
- `GET /api/track?tracking={number}` - Track a package

### Admin Endpoints (Authenticated)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/deliveries` - List all deliveries
- `POST /api/admin/deliveries` - Create delivery
- `GET /api/admin/deliveries/:id` - Get delivery details
- `PUT /api/admin/deliveries/:id` - Update delivery
- `DELETE /api/admin/deliveries/:id` - Delete delivery
- `GET /api/admin/customers` - List customers
- `POST /api/admin/customers` - Create customer

## 🔧 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
      // ...
    }
  }
}
```

### Change Company Name

Update `NEXT_PUBLIC_APP_NAME` in `.env.local` and navbar components.

### Add Features

1. Create new components in `components/`
2. Add new pages in `app/`
3. Create API routes in `app/api/`
4. Update database schema if needed

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check Neon project is active
- Ensure connection string includes `?sslmode=require`

### Authentication Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and retry

### Build Errors
- Run `npm install` to ensure dependencies are installed
- Check Node.js version (18.x+)
- Verify TypeScript errors with `npm run lint`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎓 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Neon Documentation](https://neon.tech/docs)
- [NextAuth.js](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)

## 📄 License

Open source - Free for educational and commercial use

## 🙏 Acknowledgments

- Built with Next.js, React, and Neon
- Styled with Tailwind CSS
- Animated with Framer Motion
- Icons from React Icons

---

**Version**: 2.0.0 (React Edition)  
**Created**: January 2026  
**Tech Stack**: Next.js 14 + React + TypeScript + Neon PostgreSQL

---

## 🚀 Ready to Deploy?

1. Set up Neon database
2. Configure environment variables
3. Run `npm run build`
4. Deploy to Vercel

**Need help?** Check the troubleshooting section or review the Next.js documentation.

Enjoy your modern Delivery Tracking System! 🎉
