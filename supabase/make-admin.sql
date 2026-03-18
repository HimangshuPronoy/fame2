-- ==============================================
-- Fame. — Make User Admin
-- Run this in Supabase SQL Editor to promote a user to admin
-- ==============================================

-- Step 1: Find your user ID
-- Copy the ID of the user you want to make admin
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- Step 2: Replace 'YOUR-USER-ID-HERE' with the actual ID from above
-- Then run this query:
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'YOUR-USER-ID-HERE';

-- Step 3: Verify the user is now admin
SELECT p.id, u.email, p.role, p.full_name
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.role = 'admin';
