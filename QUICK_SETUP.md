# 🚀 Quick Setup Guide - React + Neon Version

## 5-Minute Installation

### 1. Prerequisites ✓
- [ ] Node.js 18.x or higher installed
- [ ] npm or yarn installed
- [ ] Neon account (free tier)

### 2. Installation Steps

#### A. Install Dependencies
```bash
cd delivery-tracking-react
npm install
```

#### B. Set Up Neon Database

1. Go to [neon.tech](https://neon.tech) and create free account
2. Create a new project
3. Go to SQL Editor
4. Copy entire contents of `schema.sql`
5. Paste and execute in SQL Editor
6. Copy your connection string from project dashboard

#### C. Configure Environment Variables

Create `.env.local` file:

```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint]/[database]?sslmode=require"
NEXTAUTH_SECRET="run-this-command: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="DeliverTrack"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### D. Run Development Server

```bash
npm run dev
```

### 3. Access System

**Customer Page:**
```
http://localhost:3000
```

**Admin Panel:**
```
http://localhost:3000/admin/login
```

**Login Credentials:**
- Username: `admin`
- Password: `admin123`

### 4. Test Tracking

Try these tracking numbers:
- TRK1000001 (In Transit)
- TRK1000002 (Out for Delivery)
- TRK1000003 (Delivered)

## That's it! 🎉

### Next Steps:
1. ✅ Change admin password in dashboard
2. ✅ Add your own customers
3. ✅ Create deliveries
4. ✅ Customize colors in `tailwind.config.js`
5. ✅ Deploy to Vercel

### Deployment to Vercel:

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Need Help?
Check `README.md` for detailed documentation.

---

**Pro Tip**: Neon's free tier includes:
- 0.5 GB storage
- Autoscaling compute
- Perfect for this project!

**Tech Stack**: Next.js 14 + React + TypeScript + Neon PostgreSQL + Tailwind CSS
