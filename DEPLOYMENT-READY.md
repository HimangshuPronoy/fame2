# Deployment Ready Checklist

Use this checklist before deploying Fame. v2.0 to production.

## ✅ Pre-Deployment Checklist

### Database Setup
- [ ] Ran `supabase/fresh-install.sql` OR `supabase/schema.sql`
- [ ] Ran `supabase/update-policies.sql`
- [ ] Ran `supabase/add-new-features.sql` ⭐
- [ ] Ran `supabase/make-admin.sql` (created at least one admin)
- [ ] Ran `supabase/clear-mock-data.sql` (removed demo data)
- [ ] Verified all 10 tables exist
- [ ] Tested RLS policies work correctly
- [ ] Created database backup

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is set
- [ ] All variables are in production environment
- [ ] No sensitive data in `.env.local.example`
- [ ] `.env.local` is in `.gitignore`

### Code Quality
- [ ] No TypeScript errors (`npm run build`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] All imports resolve correctly
- [ ] No console.log statements in production code
- [ ] No TODO comments for critical features

### Feature Testing

#### User Features
- [ ] Sign up works
- [ ] Login works
- [ ] Logout works
- [ ] Browse listings works
- [ ] View listing details works
- [ ] Save/unsave listings works
- [ ] View saved listings works
- [ ] Create booking works
- [ ] View bookings works
- [ ] Write review works
- [ ] View reviews works
- [ ] Update profile works
- [ ] Submit concierge request works
- [ ] Submit partner application works

#### Admin Features
- [ ] Admin can access admin panel
- [ ] Admin can create listings
- [ ] Admin can edit any listing
- [ ] Admin can delete any listing
- [ ] Admin can view concierge requests
- [ ] Admin can update request status
- [ ] Admin can view partner applications
- [ ] Admin can approve/reject applications
- [ ] Non-admins cannot access admin routes

### Security
- [ ] RLS policies tested and working
- [ ] Users can only see their own data
- [ ] Admins have proper elevated permissions
- [ ] Authentication required for protected routes
- [ ] No sensitive data exposed in client
- [ ] API keys are environment variables
- [ ] CORS configured correctly
- [ ] SQL injection prevented (Supabase handles this)

### Performance
- [ ] Pages load in < 3 seconds
- [ ] Images are optimized
- [ ] No unnecessary re-renders
- [ ] Database queries are efficient
- [ ] No memory leaks
- [ ] Bundle size is reasonable

### UI/UX
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Forms have validation
- [ ] Error messages are user-friendly
- [ ] Success messages appear
- [ ] Loading states show
- [ ] Empty states are helpful
- [ ] Navigation is intuitive
- [ ] Buttons are accessible
- [ ] Colors have good contrast

### Browser Testing
- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Works on iOS Safari
- [ ] Works on Android Chrome

### Content
- [ ] All placeholder text replaced
- [ ] All images have alt text
- [ ] All links work
- [ ] Contact information is correct
- [ ] Terms of service added (if needed)
- [ ] Privacy policy added (if needed)

### Documentation
- [ ] README.md is up to date
- [ ] Setup instructions are clear
- [ ] API documentation exists (if applicable)
- [ ] Known issues documented
- [ ] Support contact provided

## 🚀 Deployment Steps

### 1. Final Code Review
```bash
# Check for errors
npm run build

# Run linter
npm run lint

# Test locally
npm run dev
```

### 2. Database Preparation
```sql
-- In Supabase SQL Editor

-- 1. Verify all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- 2. Remove demo data
-- Run: supabase/clear-mock-data.sql

-- 3. Create admin user
-- Run: supabase/make-admin.sql

-- 4. Backup database
-- Use Supabase dashboard backup feature
```

### 3. Environment Setup
```bash
# Production environment variables
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
```

### 4. Deploy to Vercel
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Or use Vercel dashboard
# 1. Connect GitHub repo
# 2. Configure environment variables
# 3. Deploy
```

### 5. Post-Deployment Verification
- [ ] Visit production URL
- [ ] Test sign up
- [ ] Test login
- [ ] Create a test listing
- [ ] Make a test booking
- [ ] Write a test review
- [ ] Test admin features
- [ ] Check all pages load
- [ ] Verify mobile responsiveness

## 🔍 Post-Deployment Monitoring

### Week 1
- [ ] Monitor error logs
- [ ] Check database performance
- [ ] Review user feedback
- [ ] Fix critical bugs
- [ ] Monitor server costs

### Week 2-4
- [ ] Analyze user behavior
- [ ] Optimize slow queries
- [ ] Add missing features
- [ ] Improve UX based on feedback
- [ ] Plan next iteration

## 🐛 Common Issues & Solutions

### Issue: Users can't create listings
**Solution:**
```sql
-- Run update-policies.sql
```

### Issue: Admin features not visible
**Solution:**
```sql
-- Make user admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'user-id';
```

### Issue: New features not working
**Solution:**
```sql
-- Run add-new-features.sql
```

### Issue: Build fails
**Solution:**
```bash
# Check TypeScript errors
npm run build

# Fix errors and rebuild
```

### Issue: Environment variables not working
**Solution:**
- Check variable names (must start with NEXT_PUBLIC_ for client)
- Restart development server
- Redeploy to production

## 📊 Success Metrics

Track these after deployment:
- [ ] User sign-ups
- [ ] Active users
- [ ] Listings created
- [ ] Bookings made
- [ ] Reviews written
- [ ] Concierge requests
- [ ] Partner applications
- [ ] Page load times
- [ ] Error rates
- [ ] User retention

## 🎯 Launch Checklist

### Pre-Launch (1 week before)
- [ ] Complete all testing
- [ ] Fix all critical bugs
- [ ] Prepare marketing materials
- [ ] Set up analytics
- [ ] Configure monitoring
- [ ] Create support documentation

### Launch Day
- [ ] Deploy to production
- [ ] Verify all features work
- [ ] Monitor error logs
- [ ] Be available for support
- [ ] Announce launch
- [ ] Monitor user feedback

### Post-Launch (1 week after)
- [ ] Review analytics
- [ ] Address user feedback
- [ ] Fix reported bugs
- [ ] Optimize performance
- [ ] Plan improvements

## 🆘 Emergency Contacts

**Database Issues:**
- Supabase Dashboard: https://app.supabase.com
- Supabase Support: support@supabase.com

**Hosting Issues:**
- Vercel Dashboard: https://vercel.com/dashboard
- Vercel Support: support@vercel.com

**Code Issues:**
- Check GitHub Issues
- Review error logs
- Check Sentry (if configured)

## 📝 Rollback Plan

If critical issues occur:

1. **Immediate:**
   - Revert to previous deployment
   - Notify users of downtime
   - Investigate issue

2. **Database:**
   - Restore from backup
   - Re-run migrations if needed
   - Verify data integrity

3. **Code:**
   - Revert to last stable commit
   - Redeploy
   - Test thoroughly

## ✅ Final Sign-Off

- [ ] All checklist items completed
- [ ] Team has reviewed
- [ ] Backup plan in place
- [ ] Support team ready
- [ ] Monitoring configured
- [ ] Documentation complete

**Deployed by:** _______________  
**Date:** _______________  
**Version:** 2.0.0  
**Status:** ✅ Ready for Production

---

## 🎉 You're Ready!

Once all items are checked, you're ready to deploy Fame. v2.0 to production!

**Good luck with your launch!** 🚀
