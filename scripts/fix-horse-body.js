require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase
    .from('posts')
    .select('body')
    .eq('slug', 'crochet-pattern-adorable-amigurumi-horse')
    .single();
    
  if (error) {
    console.error("Error fetching post:", error.message);
    return;
  }
  
  let body = data.body;
  
  // Fix Round 9 tag
  body = body.replace(/RoundBlock>\s*<RoundBlock label="Round 10:"/g, '</RoundBlock>\n  <RoundBlock label="Round 10:"');
  
  // Find where it got cut off and remove the cut off part
  const cutOffIndex = body.lastIndexOf('<RoundBlock label="Round');
  if (cutOffIndex !== -1) {
    body = body.substring(0, cutOffIndex);
  }
  
  // Add closing tags
  body += `</RoundsWrapper>\n</NoteCard>\n`;
  
  console.log("Saving fixed MDX body...");
  const { error: updateError } = await supabase
    .from('posts')
    .update({ body })
    .eq('slug', 'crochet-pattern-adorable-amigurumi-horse');
    
  if (updateError) {
    console.error("Failed to update:", updateError.message);
  } else {
    console.log("Successfully fixed the post in Supabase!");
  }
}

run();
