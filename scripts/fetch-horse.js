require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('posts')
    .select('body')
    .eq('slug', 'crochet-pattern-adorable-amigurumi-horse')
    .single();
    
  if (error) {
    console.error("Error fetching post:", error.message);
  } else {
    console.log("----- START BODY -----");
    console.log(data.body);
    console.log("----- END BODY -----");
  }
}

run();
