This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Fame. - Premium Lifestyle Discovery Platform

A curated platform for discovering premium experiences in fitness, dining, wellness, beauty, and nightlife.

## 🚀 Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Update database (run these in Supabase SQL Editor)
# - supabase/fresh-install.sql (if new project)
# - supabase/update-policies.sql
# - supabase/add-new-features.sql (⭐ NEW - adds v2.0 features)
# - supabase/make-admin.sql

# 4. Start the app
npm run dev
```

Visit `http://localhost:3000` and explore all the new features!

📖 **Detailed instructions:** See `NEW-FEATURES-SETUP.md` for v2.0 features or `QUICK-START.md` for basic setup

## ✨ Features

- 🔐 User authentication with role-based access
- 📝 Users can create and share listings
- 👑 Admin dashboard for managing all listings
- 🔍 Smart search with category detection
- 🎨 Smooth animations and modern UI
- 💾 Save favorite listings
- 📱 Fully responsive design
- ⭐ **User reviews and ratings** (new)
- 📅 **Booking management system** (new)
- 👤 **User profile management** (new)
- 🎯 **Concierge service requests** (new)
- 🤝 **Partner applications** (new)
- 📊 **Admin request management** (new)

## 🛠️ Tech Stack

- **Framework:** Next.js 15.1.11 (App Router)
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **Styling:** CSS Modules
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── dashboard/         # User & admin dashboards
│   ├── listings/          # Browse listings
│   └── login/             # Authentication
├── components/            # Reusable components
└── lib/                   # Utilities & configs

supabase/
├── schema.sql             # Database schema
├── update-policies.sql    # Enable user creation
├── clear-mock-data.sql    # Remove demo data
└── make-admin.sql         # Promote users to admin
```

## 🎯 Setup Checklist

- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Run database setup scripts
- [ ] Create admin user
- [ ] Test user flow
- [ ] Remove mock data

See `CHECKLIST.md` for the complete setup guide.

## 📝 Common Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔑 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## 🐛 Troubleshooting

**Can't create listings?**
- Run `supabase/update-policies.sql`

**Mock data still showing?**
- Run `supabase/clear-mock-data.sql`

**Can't access admin dashboard?**
- Run `supabase/make-admin.sql` with your user ID

See `SETUP.md` for more troubleshooting tips.

## 📚 Documentation

- `QUICK-START.md` - Get running in 5 minutes
- `SETUP.md` - Detailed setup instructions
- `CHECKLIST.md` - Step-by-step checklist
- **`WHATS-NEW-V2.md`** - ⭐ New features overview
- **`NEW-FEATURES-SETUP.md`** - ⭐ Setup guide for v2.0 features
- **`QUICK-REFERENCE.md`** - ⭐ Quick lookup guide
- **`TESTING-CHECKLIST.md`** - ⭐ Complete testing guide
- `.kiro/steering/` - Project conventions and patterns
- `supabase/README.md` - Database migration guide

## 🚀 Deployment

Ready to deploy? Make sure:

1. All SQL scripts have been run
2. Mock data is removed
3. Environment variables are set in your hosting platform
4. At least one admin user is created

Deploy to Vercel:

```bash
npm run build
# Deploy to Vercel or your preferred platform
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

Built with ❤️ using Next.js, TypeScript, and Supabase
