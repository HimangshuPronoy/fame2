# 🔄 Setup Flow Diagram

Visual guide to understand the setup process.

---

## 📊 Setup Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    START: Fresh Install                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 1: Local Setup                                         │
│  ├─ npm install                                              │
│  ├─ Copy .env.local.example → .env.local                     │
│  └─ Add Supabase credentials                                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 2: Database Setup (Supabase SQL Editor)                │
│  ├─ Run: update-policies.sql     ✅ REQUIRED                 │
│  ├─ Run: clear-mock-data.sql     ✅ REQUIRED                 │
│  └─ Run: make-admin.sql          ✅ REQUIRED                 │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 3: Start App                                           │
│  ├─ npm run dev                                              │
│  ├─ Visit http://localhost:3000                              │
│  └─ Create account                                           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│  STEP 4: Test Everything                                     │
│  ├─ Create a test listing                                    │
│  ├─ Verify it appears on homepage                            │
│  ├─ Test search (type "gym")                                 │
│  ├─ Test filters (click Filters button)                      │
│  └─ Access admin dashboard                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ✅ COMPLETE: App Ready!                    │
│  • No mock data                                              │
│  • Users can create listings                                 │
│  • Admin dashboard working                                   │
│  • Search & filters functional                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ File Structure

```
Fame/
│
├── 📄 START-HERE.md              ← Read this first!
├── 📄 QUICK-START.md             ← 5-minute guide
├── 📄 COMPLETE-SETUP.md          ← Detailed guide
├── 📄 CHECKLIST.md               ← Printable checklist
├── 📄 SETUP.md                   ← Full documentation
│
├── 📁 supabase/
│   ├── schema.sql                ← Full database schema
│   ├── update-policies.sql       ← ✅ Run 1st
│   ├── clear-mock-data.sql       ← ✅ Run 2nd
│   └── make-admin.sql            ← ✅ Run 3rd
│
├── 📁 src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── user/             ← User dashboard
│   │   │   ├── admin/            ← Admin dashboard
│   │   │   └── create-listing/   ← Create new listing
│   │   ├── listings/             ← Browse all listings
│   │   └── login/                ← Authentication
│   ├── components/               ← Reusable components
│   └── lib/                      ← Utilities
│
└── 📁 .kiro/steering/            ← Project documentation
```

---

## 🔑 Key Concepts

### Database Policies (RLS)

```
Before Setup:
┌──────────────────────────────────┐
│  Only ADMINS can create listings │
│  ❌ Regular users blocked         │
└──────────────────────────────────┘

After Running update-policies.sql:
┌──────────────────────────────────┐
│  ✅ Any user can create listings  │
│  ✅ Only admins can edit/delete   │
└──────────────────────────────────┘
```

### User Roles

```
Regular User:
├─ Can create listings
├─ Can save favorites
├─ Can view dashboard
└─ Cannot edit others' listings

Admin User:
├─ Everything regular users can do
├─ Can edit ANY listing
├─ Can delete ANY listing
└─ Can access admin dashboard
```

---

## 🎯 Success Criteria

Your setup is complete when:

```
✅ npm run dev works without errors
✅ Homepage loads with no mock data
✅ You can create an account
✅ You can create a listing
✅ Listing appears on homepage
✅ Search returns correct results
✅ Filters work properly
✅ Admin dashboard accessible
```

---

## 🔄 Data Flow

### Creating a Listing

```
User fills form
      │
      ▼
Submit button clicked
      │
      ▼
Data sent to Supabase
      │
      ▼
RLS checks: Is user authenticated? ✅
      │
      ▼
Listing inserted into database
      │
      ▼
Success! Listing appears on site
```

### Searching

```
User types "gym"
      │
      ▼
Smart detection: Is "gym" a category? ✅
      │
      ▼
Filter by category = "Gym" or "Fitness"
      │
      ▼
Return matching listings
```

---

## 📈 Next Steps After Setup

```
1. Add Real Content
   └─ Create 5-10 real listings

2. Customize Branding
   └─ Update colors, fonts, copy

3. Test Thoroughly
   └─ Try all features as user & admin

4. Deploy
   └─ Push to Vercel/Netlify

5. Monitor
   └─ Check Supabase logs
```

---

## 🆘 Common Issues

```
Issue: "Permission denied"
├─ Cause: Policies not updated
└─ Fix: Run update-policies.sql

Issue: "Mock data showing"
├─ Cause: Data not cleared
└─ Fix: Run clear-mock-data.sql

Issue: "Can't access admin"
├─ Cause: Not promoted to admin
└─ Fix: Run make-admin.sql with your ID

Issue: "Images not loading"
├─ Cause: Invalid image URLs
└─ Fix: Use Unsplash URLs
```

---

## 🎓 Learning Path

```
Beginner:
1. Follow QUICK-START.md
2. Create test listings
3. Explore the UI

Intermediate:
1. Read COMPLETE-SETUP.md
2. Understand database policies
3. Customize styling

Advanced:
1. Read .kiro/steering/ docs
2. Modify components
3. Add new features
```

---

**Ready to start?** Go to `START-HERE.md` and pick your path!
