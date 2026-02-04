-- Add notes and category fields to user_schedule_items
ALTER TABLE public.user_schedule_items 
ADD COLUMN notes TEXT,
ADD COLUMN category TEXT DEFAULT 'general';

-- Create index for category filtering
CREATE INDEX idx_user_schedule_items_category ON public.user_schedule_items(user_id, category);