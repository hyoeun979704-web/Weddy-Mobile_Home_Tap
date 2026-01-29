-- Create comment_likes table for community comment likes
CREATE TABLE public.community_comment_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comment_id uuid NOT NULL REFERENCES public.community_comments(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(comment_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.community_comment_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Comment likes are publicly viewable" 
ON public.community_comment_likes 
FOR SELECT 
USING (true);

CREATE POLICY "Users can add their own comment likes" 
ON public.community_comment_likes 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own comment likes" 
ON public.community_comment_likes 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_community_comment_likes_comment_id ON public.community_comment_likes(comment_id);