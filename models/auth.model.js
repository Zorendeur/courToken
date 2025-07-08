import { supabase } from "../services/supabaseClient.js";

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
}

export async function getUserFromToken(token) {
  const { data, error } = await supabase.auth.getUser(token);
  return { data, error };
}
