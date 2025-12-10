/**
 * This script is for one-time use to seed the first admin user.
 * 
 * Instructions:
 * 1. Make sure you have created your `.env.local` file.
 * 2. Add your Supabase Service Role Key to your `.env.local` file:
 *    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
 *    (You can find this in your Supabase project dashboard under Settings > API)
 * 3. Change the `adminEmail` and `adminPassword` variables below to your desired credentials.
 * 4. Run the script from your terminal: `node --env-file=.env.local scripts/seed-admin.mjs`
 * 5. After running successfully, you can log in with these credentials on the login page.
 * 6. For security, you can delete this script after use.
 */

import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // Explicitly load environment variables
import { createClient } from '@supabase/supabase-js';

// --- !!! CONFIGURE THESE VALUES !!! ---
const adminEmail = 'admin@example.com'; // Change this to your desired admin email
const adminPassword = 'secure-password-123'; // Change this to a strong password
// -----------------------------------------

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('--- Environment Variables Debug ---');
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '***** (loaded)' : 'UNDEFINED');
console.log('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '***** (loaded)' : 'UNDEFINED');
console.log('-----------------------------------');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in your .env.local file.');
  process.exit(1);
}

// Create a Supabase client with the service role key to bypass RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  console.log(`Attempting to create admin user: ${adminEmail}...`);

  const { data, error } = await supabaseAdmin.auth.signUp({
    email: adminEmail,
    password: adminPassword,
  });

  if (error) {
    if (error.message.includes('User already registered')) {
        console.warn(`Warning: User ${adminEmail} already exists.`);
    } else {
        console.error('Error creating admin user:', error.message);
        process.exit(1);
    }
  } else if (data.user) {
    // In Supabase, signUp also logs the user in, but we don't need that here.
    // The user is created and can be logged in via the UI.
    console.log(`✅ Successfully created admin user: ${data.user.email}`);
    console.log('You can now log in with this user on the login page.');
  } else {
    console.error('An unknown error occurred.');
  }
}

createAdminUser();
