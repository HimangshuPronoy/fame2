# 🚀 Deployment Checklist

## Pre-Deployment Steps

### 1. Database Setup (REQUIRED)
Run these SQL files in your Supabase SQL Editor in order:

```bash
1. supabase/schema.sql          # Creates tables and RLS policies
2. supabase/add-user-ownership.sql  # Adds user_id column and ownership policies
```

### 2. Create Admin User (REQUIRED)
After creating your account, run this in Supabase SQL Editor:

```sql
-- Replace 'your-email@example.com' with your actual email
UPDATE profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id FROM auth.users 
  WHERE email = 'your-email@example.com'
);
```

### 3. Environment Variables (REQUIRED)
Ensure `.env.local` has these values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Build Test (REQUIRED)
```bash
npm run build
```

Should complete with no errors. ✅ Already passing!

---

## Deployment to Vercel

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Deploy
```bash
vercel
```

Follow the prompts:
- Link to existing project or create new
- Set up project settings
- Deploy

### Step 3: Add Environment Variables in Vercel
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all three environment variables from `.env.local`
3. Make sure they're available for Production, Preview, and Development

### Step 4: Configure Supabase for Production
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Vercel production URL to "Site URL"
3. Add your Vercel URL to "Redirect URLs" (e.g., `https://your-app.vercel.app/**`)

### Step 5: Redeploy
```bash
vercel --prod
```

---

## Post-Deployment Testing

### Test User Flow
- [ ] Can create account
- [ ] Can log in
- [ ] Can create listing
- [ ] Can edit own listing
- [ ] Can delete own listing
- [ ] Can search listings
- [ ] Can filter by category
- [ ] Can view listing details
- [ ] Mobile responsive works

### Test Admin Flow
- [ ] Admin dashboard accessible
- [ ] Can create listings
- [ ] Can edit any listing
- [ ] Can delete any listing
- [ ] Can feature listings
- [ ] Can clear seed data

### Performance Checks
- [ ] Images load quickly
- [ ] No console errors
- [ ] Animations are smooth
- [ ] Search is responsive
- [ ] Pages load under 3 seconds

---

## Optional Enhancements (Post-Launch)

### Week 1
- [ ] Set up email verification in Supabase
- [ ] Add Google Analytics
- [ ] Monitor error logs
- [ ] Add 10-20 real listings

### Week 2
- [ ] Implement pagination (if >50 listings)
- [ ] Add user profile editing
- [ ] Set up automated backups
- [ ] Add rate limiting

### Month 1
- [ ] Reviews system
- [ ] Email notifications
- [ ] Advanced filters
- [ ] Analytics dashboard

---

## Monitoring & Maintenance

### Daily (First Week)
- Check Vercel deployment logs
- Monitor Supabase usage
- Review user feedback

### Weekly
- Check error rates
- Review performance metrics
- Update content as needed

### Monthly
- Database backups
- Security updates
- Feature additions based on feedback

---

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

## Current Status

✅ Build passing  
✅ All core features implemented  
✅ Error handling in place  
✅ SEO optimized  
✅ Mobile responsive  
✅ Security measures active  

**You're ready to deploy!** 🎉
