import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fdqedteopboxusmyslza.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcWVkdGVvcGJveHVzbXlzbHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MzcwNTcsImV4cCI6MjA4MDIxMzA1N30.erqbQcgfD0yp2MUzxxAJxWu49-8ohKhsPv4bT9cuK08'; // copiar desde Supabase → Project Settings → API

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
