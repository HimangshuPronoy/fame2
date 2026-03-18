# Vercel Deployment Guide

## 🚀 Environment Variables for Vercel

Copy these **3 environment variables** to your Vercel project settings:

### Required Variables:

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

## 📋 Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/new
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Add New Project"
   - Select your GitHub repository: `HimangshuPronoy/fame2`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)

4. **Add Environment Variables**
   Click "Environment Variables" and add these 3 variables:

   **Variable 1:**
   ```
   Name:  NEXT_PUBLIC_SUPABASE_URL
   Value: https://your-project-id.supabase.co
   ```

   **Variable 2:**
   ```
   Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
   Value: your-anon-key-here
   ```

   **Variable 3:**
   ```
   Name:  SUPABASE_SERVICE_ROLE_KEY
   Value: your-service-role-key-here
   ```

   ⚠️ **Important:** Get these values from:
   - Supabase Dashboard → Settings → API
   - Or from your local `.env.local` file

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? fame2 (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Supabase URL when prompted

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your anon key when prompted

vercel env add SUPABASE_SERVICE_ROLE_KEY
# Paste your service role key when prompted

# Deploy to production
vercel --prod
```

---

## 🔑 Where to Find Your Supabase Credentials

### Method 1: Supabase Dashboard
1. Go to: https://app.supabase.com
2. Select your project
3. Click "Settings" (gear icon)
4. Click "API"
5. Copy the values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### Method 2: Your Local .env.local File
```bash
# View your local environment variables
cat .env.local
```

Copy the values from there to Vercel.

---

## ✅ Post-Deployment Checklist

After deployment, verify these:

### 1. Database Migration
```sql
-- Run in Supabase SQL Editor
supabase/add-new-features.sql
```

### 2. Create Admin User
```sql
-- Run in Supabase SQL Editor
-- Replace 'your-user-id' with your actual user ID
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'your-user-id';
```

### 3. Test Your Deployment
Visit your Vercel URL and test:
- [ ] Homepage loads
- [ ] Can sign up
- [ ] Can log in
- [ ] Can browse listings
- [ ] Can view listing details
- [ ] Can write a review
- [ ] Can make a booking
- [ ] Dashboard works
- [ ] Admin panel works (if admin)

### 4. Check Build Logs
If deployment fails:
1. Go to Vercel Dashboard
2. Click on your project
3. Click "Deployments"
4. Click on the failed deployment
5. Check the build logs for errors

---

## 🔧 Common Issues & Solutions

### Issue 1: Build Fails
**Error:** "Module not found" or "Cannot find module"

**Solution:**
```bash
# Locally, ensure build works
npm run build

# If it works locally, redeploy
vercel --prod
```

### Issue 2: Environment Variables Not Working
**Error:** "Supabase client error" or blank pages

**Solution:**
1. Check variable names are EXACTLY:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
2. No extra spaces in values
3. Redeploy after adding variables

### Issue 3: Database Connection Fails
**Error:** "Failed to fetch" or "Network error"

**Solution:**
1. Verify Supabase URL is correct
2. Check Supabase project is not paused
3. Verify RLS policies are set up
4. Run `supabase/add-new-features.sql`

### Issue 4: 404 on All Pages
**Error:** All routes return 404

**Solution:**
1. Check build output in Vercel logs
2. Ensure Next.js version is correct
3. Verify `next.config.mjs` is correct
4. Redeploy

---

## 🎯 Vercel Project Settings

### Recommended Settings:

**General:**
- Framework: Next.js
- Node.js Version: 18.x (default)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

**Environment Variables:**
- Add all 3 Supabase variables
- Available for: Production, Preview, Development

**Domains:**
- Add custom domain (optional)
- Configure DNS settings

**Git:**
- Production Branch: `main`
- Auto-deploy: Enabled

---

## 📊 Monitoring Your Deployment

### Vercel Analytics (Optional)
```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to your app (already configured if using latest Next.js)
```

### Check Deployment Status
```bash
# Via CLI
vercel ls

# Via Dashboard
# Visit: https://vercel.com/dashboard
```

---

## 🔄 Updating Your Deployment

### Automatic Deployments
Every time you push to GitHub:
```bash
git add .
git commit -m "your message"
git push
```
Vercel will automatically deploy!

### Manual Redeploy
```bash
# Via CLI
vercel --prod

# Via Dashboard
# Click "Redeploy" on any deployment
```

---

## 🌐 Custom Domain Setup (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your domain (e.g., `fame.com`)

2. **Configure DNS**
   - Add CNAME record:
     ```
     Type: CNAME
     Name: www (or @)
     Value: cname.vercel-dns.com
     ```

3. **Wait for Verification**
   - Usually takes 5-60 minutes
   - Vercel will auto-configure SSL

---

## 📝 Environment Variables Reference

### Complete List:

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Secret | Yes | Supabase service role key (admin) |

### Security Notes:
- ✅ `NEXT_PUBLIC_*` variables are exposed to the browser (safe)
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` is server-only (never exposed)
- 🔒 Never commit `.env.local` to git
- 🔐 Rotate keys if accidentally exposed

---

## 🎉 Success!

Once deployed, your app will be live at:
```
https://your-project.vercel.app
```

Share this URL with users and start testing!

---

## 🆘 Need Help?

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

**Supabase Support:**
- Documentation: https://supabase.com/docs
- Support: https://supabase.com/support

**Project Issues:**
- Check `DEPLOYMENT-READY.md`
- Check `TESTING-CHECKLIST.md`
- Review build logs in Vercel

---

**Ready to deploy?** Follow Option 1 above and you'll be live in 5 minutes! 🚀
