# 🚀 Vercel Deployment Guide for Splitify

## Prerequisites
- Vercel account (sign up at vercel.com)
- Your GitHub repository: https://github.com/tejasrastogi1/splitify

## Step 1: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"New Project"**
3. Import your GitHub repository: `tejasrastogi1/splitify`
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `.next` (default)

### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts:
# - Link to existing project? No
# - Project name: splitify (or your choice)
# - Deploy? Yes
```

## Step 2: Set Up Database

### Using Vercel Postgres (Recommended)
1. In your Vercel dashboard, go to your project
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"Postgres"** 
5. Choose **"Hobby"** plan (free)
6. Click **"Create"**

### Alternative: Using Supabase
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get your database URL from Settings > Database
4. Use the connection string format

## Step 3: Configure Environment Variables

In your Vercel project dashboard:
1. Go to **"Settings"** > **"Environment Variables"**
2. Add these variables:

```env
# Database (auto-filled if using Vercel Postgres)
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...

# App URL (replace with your actual Vercel URL)
NEXT_PUBLIC_BASE_URL=https://your-app-name.vercel.app
```

**Important**: If using Vercel Postgres, these database URLs are automatically added for you!

## Step 4: Run Database Migration

After deployment, your database will be automatically migrated due to the `vercel-build` script.

If you need to run migrations manually:
1. Go to your Vercel project dashboard
2. Click **"Functions"** tab
3. Find a recent deployment log
4. Check that Prisma migrations ran successfully

## Step 5: Test Your Deployment

1. Visit your Vercel URL (e.g., `https://your-app-name.vercel.app`)
2. Test creating a group
3. Test adding expenses
4. Test UPI payment feature
5. Test language switching (English/Hindi)

## Step 6: Custom Domain (Optional)

1. In Vercel dashboard, go to **"Settings"** > **"Domains"**
2. Add your custom domain
3. Update `NEXT_PUBLIC_BASE_URL` environment variable

## Troubleshooting

### Build Errors
- Check Vercel build logs in the dashboard
- Ensure all environment variables are set
- Verify database connection

### Database Issues
- Check that `POSTGRES_PRISMA_URL` is set correctly
- Verify database is accessible from Vercel
- Check Prisma migration logs

### UPI Payment Issues
- Ensure app is accessible via HTTPS (Vercel provides this)
- Test UPI links on mobile devices

## Production Checklist

- [ ] App builds successfully on Vercel
- [ ] Database is connected and migrated
- [ ] Environment variables are set
- [ ] UPI payments work on mobile
- [ ] Both English and Hindi languages work
- [ ] Share functionality works
- [ ] Custom domain configured (if desired)

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check database connection
3. Verify environment variables
4. Test locally first with `npm run build`

Your Splitify app should now be live on Vercel! 🎉
