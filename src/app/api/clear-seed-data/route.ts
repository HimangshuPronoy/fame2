import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// API route to clear seed data (for development only)
export async function POST() {
  try {
    // Delete all listings (this will cascade to saved_listings due to foreign key)
    const { error } = await supabase
      .from('listings')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all except impossible UUID

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'All listings cleared successfully' 
    });
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to clear listings',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
