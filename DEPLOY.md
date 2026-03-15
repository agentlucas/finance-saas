# Deployment Guide

## Backend Deployment (Railway)

### Automated Setup (Completed)
✅ GitHub repository created: `agentlucas/finance-saas`  
✅ Railway project created: `divine-courage`  
✅ PostgreSQL database provisioned

### Manual Steps (Required)

1. **Add API Service to Railway:**
   - Go to https://railway.com/project/f3e7b3e5-b0ce-4fe6-8cb4-52d368f5f8a9
   - Click "+ New" → "GitHub Repo"
   - Select `agentlucas/finance-saas`
   - Set root directory: `apps/api`
   - Set build command: `pnpm install && pnpm prisma generate && pnpm build`
   - Set start command: `node dist/main.js`

2. **Configure Environment Variables:**
   ```bash
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRATION=15m
   JWT_REFRESH_EXPIRATION=7d
   PORT=3001
   NODE_ENV=production
   ```

3. **Run Database Migrations:**
   After first deployment, run:
   ```bash
   railway run prisma db push
   railway run prisma db seed
   ```

4. **Enable Public Domain:**
   - In Railway service settings
   - Generate domain or add custom domain

---

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel CLI installed: `npm i -g vercel`
- Logged in: `vercel login`

### Deployment Steps

1. **Deploy to Vercel:**
   ```bash
   cd apps/web
   vercel --prod
   ```

2. **Configure Environment Variables in Vercel:**
   ```bash
   NEXT_PUBLIC_API_URL=<backend-railway-url>
   ```

3. **Set Project Settings:**
   - Framework: Next.js
   - Root Directory: `apps/web`
   - Build Command: `cd ../.. && pnpm install && pnpm --filter @finance-saas/web build`
   - Install Command: (leave empty)

---

## Post-Deployment Verification

### Backend Health Check:
```bash
curl https://<railway-url>/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-03-15T...",
  "service": "finance-saas-api",
  "version": "0.1.0"
}
```

### Frontend Check:
Visit `https://<vercel-url>` and verify the landing page loads.

---

## Current Status

**✅ DEPLOYMENT COMPLETE!**

**Completed:**
- ✅ GitHub repo created and code pushed
- ✅ Railway project created with PostgreSQL
- ✅ Monorepo scaffold complete
- ✅ Backend API with auth, users, accounts, transactions, categories
- ✅ Frontend with Next.js, Tailwind, basic pages
- ✅ Deployment config files added
- ✅ Backend deployed to Railway
- ✅ Backend health check passing
- ✅ Public domain generated for backend
- ✅ Frontend deployed to Vercel
- ✅ Database migrations completed (via Railway SSH)
- ✅ Database seeded with initial categories
- ✅ Full stack verified and working

**Live URLs:**
- **Frontend:** https://web-omega-hazel-40.vercel.app
- **Backend API:** https://finance-api-production-7f7c.up.railway.app
- **Health Check:** https://finance-api-production-7f7c.up.railway.app/health

**Test Credentials:**
| Email | Password | Role | Notes |
|-------|----------|------|-------|
| admin@test.com | admin123 | ADMIN | ✅ Full access - Phase 1 verified |
| user@test.com | user123 | USER | ✅ Standard user access |

**Environment Variables:**
- Vercel: `NEXT_PUBLIC_API_URL` = https://finance-api-production-7f7c.up.railway.app
- Railway: `FRONTEND_URL` = https://web-omega-hazel-40.vercel.app

**Phase 1 Status:** ✅ **COMPLETE**
- Frontend login flow implemented and working
- Admin user created with proper ADMIN role
- Authentication, JWT storage, logout all functional
- Protected routes working
- CORS configured correctly

**Deployment Date:** March 15, 2026  
**Last Updated:** March 15, 2026 - Phase 1 Completion
