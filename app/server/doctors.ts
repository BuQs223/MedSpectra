import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with server-side credentials
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * Server-side function to fetch all doctors
 * This can be used in server components
 */
export async function getDoctors() {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('role', 'doctor');
  
  if (error) {
    console.error('Error fetching doctors:', error);
    return { doctors: [], error };
  }
  
  return { doctors: data, error: null };
}

/**
 * Server-side function to fetch a doctor by ID
 */
export async function getDoctorById(id: string) {
  const { data, error } = await supabase
    .from('user')
    .select('*')
    .eq('id', id)
    .eq('role', 'doctor')
    .single();
  
  if (error) {
    console.error('Error fetching doctor:', error);
    return { doctor: null, error };
  }
  
  return { doctor: data, error: null };
}

/**
 * Server-side function to fetch doctors with filters
 */
export async function getFilteredDoctors({
  specialty,
  status,
  search,
  limit = 10,
  offset = 0
}: {
  specialty?: string;
  status?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('user')
    .select('*')
    .eq('role', 'doctor');
  
  if (specialty) {
    query = query.eq('specialty', specialty);
  }
  
  if (status) {
    query = query.eq('status', status);
  }
  
  if (search) {
    query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
  }
  
  // Apply pagination
  query = query.range(offset, offset + limit - 1);
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching filtered doctors:', error);
    return { doctors: [], error };
  }
  
  return { doctors: data, error: null };
} 