import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://czresmdmorjrerzyzphj.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6cmVzbWRtb3JqcmVyenl6cGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc1ODgxNDUsImV4cCI6MjAzMzE2NDE0NX0.acsBl5DdJ3G-Y8H0VWKxQe7IfAgPGFk1FRPGaXExiJs`;

export const supabase = createClient(supabaseUrl, supabaseKey);
