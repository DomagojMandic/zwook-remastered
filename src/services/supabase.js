import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbnlndGRnd2hxZWN1aG9jbWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMTQ5NTgsImV4cCI6MjA4Nzc5MDk1OH0.6Pr5QxWI0Va_wLH6FXX0H_dRJ8GNi0OKiHD-B9T3iEM";
export const SUPABASE_URL = "https://qknygtdgwhqecuhocmas.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
