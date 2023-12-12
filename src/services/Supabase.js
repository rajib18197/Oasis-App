import { createClient } from "@supabase/supabase-js";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZnaWFsdnR5Y3ptZmhodXN2dmttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyNTcwMDEsImV4cCI6MjAxNzgzMzAwMX0.Jco7hk8OyaX7rC1fUQ2Kfc_sHSZgSxj0IOHm01EstC8";

export const SUPABASE_URL = "https://vgialvtyczmfhhusvvkm.supabase.co";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
