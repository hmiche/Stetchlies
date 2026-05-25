require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('posts')
    .select('body')
    .eq('slug', 'adorable-baby-rattle-crochet-pattern-free-amigurumi-guide')
    .single();
    
  if (error) {
    console.error("Error fetching post:", error.message);
    return;
  }
  
  let body = data.body;
  
  // Find all instances of </RoundBlock> that are not preceded by a newline and add a newline
  // Specifically, replacing any text directly attached to </RoundBlock>
  body = body.replace(/([^\n])\s*<\/RoundBlock>/g, '$1\n  </RoundBlock>');
  
  console.log("Saving fixed MDX body...");
  const { error: updateError } = await supabase
    .from('posts')
    .update({ body })
    .eq('slug', 'adorable-baby-rattle-crochet-pattern-free-amigurumi-guide');
    
  if (updateError) {
    console.error("Failed to update:", updateError.message);
  } else {
    console.log("Successfully fixed the rattle post in Supabase!");
  }
}

run();
