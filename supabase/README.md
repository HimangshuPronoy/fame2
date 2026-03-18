# Supabase SQL Files

This folder contains all database migration and setup files for Fame.

## 📁 Files Overview

| File | Purpose | Run When |
|------|---------|----------|
| `schema.sql` | Original database schema | ⚠️ Legacy - use fresh-install.sql instead |
| `fresh-install.sql` | Complete fresh database setup | Starting from scratch |
| `add-new-features.sql` | **New features migration** | **After initial setup** |
| `update-policies.sql` | Enable user listing creation | If users can't create listings |
| `clear-mock-data.sql` | Remove demo/seed data | Before going to production |
| `make-admin.sql` | Promote user to admin role | Creating admin users |
| `add-user-ownership.sql` | Add user_id to listings | Legacy migration |

## 🚀 Quick Start

### New Project Setup
```sql
-- 1. Run fresh install
fresh-install.sql

-- 2. Enable user features
update-policies.sql

-- 3. Add new features
add-new-features.sql

-- 4. Make yourself admin
make-admin.sql
```

### Existing Project (Adding New Features)
```sql
-- Just run this one file!
add-new-features.sql
```

## 📋 Detailed Guide

### 1. fresh-install.sql
**What it does:**
- Creates `profiles` table
- Creates `listings` table
- Creates `saved_listings` table
- Sets up RLS policies
- Creates triggers for auto-updates
- Sets up user profile creation

**When to use:**
- Brand new database
- Starting from scratch
- Resetting everything (⚠️ deletes all data)

**Run once:** Yes

### 2. add-new-features.sql ⭐
**What it does:**
- Creates `reviews` table
- Creates `bookings` table
- Creates `partner_applications` table
- Creates `concierge_requests` table
- Creates `user_preferences` table
- Creates `notifications` table
- Creates `listing_images` table
- Sets up all RLS policies
- Creates all triggers

**When to use:**
- After initial setup
- Adding v2.0 features
- Upgrading existing database

**Run once:** Yes (idempotent - safe to run multiple times)

### 3. update-policies.sql
**What it does:**
- Allows authenticated users to create listings
- Updates listing policies
- Enables user-generated content

**When to use:**
- Users can't create listings
- Getting "permission denied" errors
- After fresh install

**Run once:** Yes

### 4. make-admin.sql
**What it does:**
- Promotes a user to admin role
- Grants admin permissions

**When to use:**
- Creating admin users
- Promoting existing users
- Setting up admin accounts

**Run multiple times:** Yes (once per admin user)

**How to use:**
```sql
-- Replace 'your-user-id-here' with actual user ID
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'your-user-id-here';
```

### 5. clear-mock-data.sql
**What it does:**
- Deletes all demo listings
- Removes seed data
- Cleans up test data

**When to use:**
- Before production launch
- Removing demo content
- Starting with clean slate

**Run once:** Yes (before production)

### 6. add-user-ownership.sql
**What it does:**
- Adds user_id column to listings
- Legacy migration from old schema

**When to use:**
- Upgrading from very old version
- Usually not needed

**Run once:** If needed

### 7. schema.sql
**What it does:**
- Original schema file
- Contains base tables

**When to use:**
- ⚠️ Legacy file
- Use `fresh-install.sql` instead

**Run once:** Only if you already used it

## 🎯 Common Scenarios

### Scenario 1: Brand New Project
```sql
1. fresh-install.sql
2. update-policies.sql
3. add-new-features.sql
4. make-admin.sql (with your user ID)
```

### Scenario 2: Existing Project, Adding Features
```sql
1. add-new-features.sql
```

### Scenario 3: Reset Everything
```sql
1. fresh-install.sql (⚠️ deletes all data)
2. update-policies.sql
3. add-new-features.sql
4. make-admin.sql
```

### Scenario 4: Going to Production
```sql
1. Ensure all migrations are run
2. clear-mock-data.sql
3. Verify with test user
4. Create admin users with make-admin.sql
```

## 🔍 Verification

After running migrations, verify with:

```sql
-- Check all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Expected tables:
-- bookings
-- concierge_requests
-- listing_images
-- listings
-- notifications
-- partner_applications
-- profiles
-- reviews
-- saved_listings
-- user_preferences
```

## 🐛 Troubleshooting

### "Table already exists" error
- This is normal if running migrations multiple times
- Migrations use `CREATE TABLE IF NOT EXISTS`
- Safe to ignore

### "Permission denied" error
- Run `update-policies.sql`
- Check user is authenticated
- Verify RLS policies

### "Function does not exist" error
- Run `fresh-install.sql` first
- Ensure triggers are created
- Check Supabase logs

### Can't create listings
```sql
-- Run this:
update-policies.sql
```

### Not an admin
```sql
-- Run this with your user ID:
make-admin.sql
```

### Missing new features
```sql
-- Run this:
add-new-features.sql
```

## 📊 Database Schema

### Core Tables (from fresh-install.sql)
- `profiles` - User accounts
- `listings` - Business listings
- `saved_listings` - User favorites

### Feature Tables (from add-new-features.sql)
- `reviews` - User reviews & ratings
- `bookings` - Reservations
- `partner_applications` - Partnership requests
- `concierge_requests` - Service requests
- `user_preferences` - User settings
- `notifications` - User notifications
- `listing_images` - Multiple images

## 🔒 Security

All tables have:
- Row Level Security (RLS) enabled
- Proper access policies
- User isolation
- Admin permissions

## 📚 Additional Resources

- `NEW-FEATURES-SETUP.md` - Detailed setup guide
- `QUICK-REFERENCE.md` - Quick lookup
- `TESTING-CHECKLIST.md` - Testing guide
- `WHATS-NEW-V2.md` - Feature overview

## ⚠️ Important Notes

1. **Always backup** before running migrations
2. **Test in development** first
3. **Run migrations in order** (see Quick Start)
4. **Don't run fresh-install.sql** on production (deletes data)
5. **Migrations are idempotent** (safe to run multiple times)

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review Supabase logs for errors
3. Verify environment variables are set
4. Check user authentication status
5. Ensure correct user permissions

---

**Quick Start:** Run `add-new-features.sql` to add all v2.0 features! 🚀
