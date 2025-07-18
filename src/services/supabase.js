import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiYXdmY2JxcnVsc3B0enpyZnRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTQ2MTgsImV4cCI6MjA2NjUzMDYxOH0.mYAaUIix9VZQG0DLcFl8WLXk8o4hBc2o8ReIXSVmtTA";
export const SUPABASE_URL = "https://abawfcbqrulsptzzrfta.supabase.co";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
