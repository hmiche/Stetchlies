-- ============================================================
-- Cozy Stitches — Supabase posts table migration (full create)
-- ============================================================

-- Step 1: Create the posts table from scratch
CREATE TABLE IF NOT EXISTS public.posts (
  id             BIGSERIAL     PRIMARY KEY,
  title          TEXT          NOT NULL DEFAULT '',
  slug           TEXT          NOT NULL DEFAULT '',
  description    TEXT          NOT NULL DEFAULT '',
  body           TEXT          NOT NULL DEFAULT '',
  date           DATE          NOT NULL DEFAULT CURRENT_DATE,
  published      BOOLEAN       NOT NULL DEFAULT TRUE,
  featured       BOOLEAN       NOT NULL DEFAULT FALSE,
  category       TEXT          NOT NULL DEFAULT '',
  tags           TEXT[]        NOT NULL DEFAULT '{}',
  author         TEXT          NOT NULL DEFAULT '',
  author_bio     TEXT,
  author_image   TEXT,
  cover_image    TEXT          NOT NULL DEFAULT '',
  cover_image_alt TEXT         NOT NULL DEFAULT '',
  reading_time   INTEGER,
  last_modified  DATE
);

-- Step 2: Add unique constraint on slug
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'posts_slug_unique'
      AND conrelid = 'public.posts'::regclass
  ) THEN
    ALTER TABLE public.posts
      ADD CONSTRAINT posts_slug_unique UNIQUE (slug);
  END IF;
END;
$$;

-- Step 3: Enable RLS
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Step 4: Policies (safe for any Postgres version)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'posts' AND policyname = 'Public can read published posts'
  ) THEN
    EXECUTE 'CREATE POLICY "Public can read published posts"
      ON public.posts FOR SELECT USING (published = TRUE)';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'posts' AND policyname = 'Service role has full access'
  ) THEN
    EXECUTE 'CREATE POLICY "Service role has full access"
      ON public.posts FOR ALL USING (auth.role() = ''service_role'')';
  END IF;
END;
$$;

-- Step 5: Seed the welcome post
INSERT INTO public.posts (
  title, slug, description, body, date, published, featured,
  category, tags, author, author_bio, author_image,
  cover_image, cover_image_alt, reading_time
)
VALUES (
  'Welcome to Cozy Stitches',
  'welcome-to-cozy-stitches',
  'Your home for free crochet patterns, beginner-friendly tutorials, and amigurumi guides. No sign-up required.',
  E'# Welcome to Cozy Stitches!\n\nWe''re so glad you''re here. Whether you''re picking up a hook for the first time or looking for your next amigurumi challenge, this is your space.\n\n## What You''ll Find Here\n\n- **Free patterns** — no paywalls, ever\n- **Step-by-step tutorials** with clear photos\n- **Beginner-friendly guides** that decode all the abbreviations\n\n## Start Here\n\nBrowse our [beginner guides](/category/beginner-guides) or jump straight into [free patterns](/blog).\n\nHappy crocheting! 🧶',
  CURRENT_DATE,
  TRUE,
  TRUE,
  'Guides',
  ARRAY['crochet', 'beginner', 'guides', 'amigurumi'],
  'Emma Wilson',
  'Crochet designer and pattern writer with a love for amigurumi and cozy home crafts.',
  'https://res.cloudinary.com/dzmxgqty7/image/upload/v1779317562/Gemini_Generated_Image_9v35ii9v35ii9v35_twhpdz.png',
  'https://res.cloudinary.com/dzmxgqty7/image/upload/v1779317540/cover_ywb4qq.avif',
  'Beautiful hand-crocheted amigurumi piece',
  4
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Done! Check Table Editor — you should see the posts table.
-- ============================================================