# Admin Panel Enhancement Guide

## What's Been Added

### 1. Database Schema Enhancement
**File:** `supabase/enhance-listings.sql`

New fields added to listings table:
- `bio` - Detailed business description
- `hours` - Business hours (JSONB)
- `amenities` - Array of amenities
- `tags` - Array of tags
- `social_links` - Social media links (JSONB)
- `email` - Business email
- `address` - Street address
- `city` - City name
- `country` - Country (default: Mongolia)
- `latitude/longitude` - GPS coordinates
- `video_url` - YouTube/Vimeo video
- `booking_url` - Direct booking link
- `menu_url` - Menu link (for restaurants)

### 2. TypeScript Types Updated
**File:** `src/lib/supabase.ts`

The `Listing` interface now includes all new fields with proper typing.

### 3. Admin Panel Features
**File:** `src/app/dashboard/admin/page.tsx`

The admin panel now has:
- Multi-tab form interface (Basic Info, Details, Hours, Media)
- Image gallery support
- Business hours editor
- Amenities selector with common options
- Tags management
- Social media links
- All new fields integrated

### 4. CSS Styles
**File:** `src/app/dashboard/admin/admin.module.css`

Added tab styles for the multi-tab interface.

## How to Deploy

### Step 1: Run Database Migration
```bash
# In Supabase SQL Editor, run:
supabase/enhance-listings.sql
```

### Step 2: Build and Test
```bash
npm run build
npm run dev
```

### Step 3: Test the Admin Panel
1. Go to `/dashboard/admin`
2. Click "Add Listing"
3. Fill in the multi-tab form:
   - **Basic Info**: Title, description, bio, location, contact
   - **Details**: Website, booking URL, amenities, tags, social media
   - **Hours**: Set business hours for each day
   - **Media**: Cover image, gallery images, video URL

### Step 4: Verify
- Create a test listing with all fields
- Check that it saves correctly
- View the listing on the frontend
- Edit the listing to ensure all fields load properly

## Features Overview

### Basic Info Tab
- Title, subtitle, category
- Description & detailed bio
- City, country, address
- Phone, email
- Price range
- Featured checkbox

### Details Tab
- Website, booking, menu URLs
- Amenities (WiFi, Parking, etc.)
- Custom amenities
- Tags for SEO
- Social media links (Facebook, Instagram, Twitter, LinkedIn)

### Hours Tab
- Set hours for each day of the week
- Mark days as closed
- Open/close times

### Media Tab
- Cover image URL
- Gallery images (multiple)
- Video URL (YouTube/Vimeo)
- Image previews

## Next Steps

1. Run the migration SQL
2. Test creating listings with all fields
3. Update the listing detail page to display new fields
4. Add image gallery component
5. Display business hours
6. Show amenities and tags
7. Add social media links

## Notes

- All new fields are optional except title and category
- Images use URLs (Unsplash recommended)
- Hours are stored as JSONB for flexibility
- Amenities and tags are PostgreSQL arrays
- Social links are JSONB for easy extension
