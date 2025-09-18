-- Create categories table
CREATE TABLE public.categories (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create villages table  
CREATE TABLE public.villages (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscription_plans table
CREATE TABLE public.subscription_plans (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL, -- price in cents
    description TEXT,
    features TEXT[],
    stripe_price_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_profiles table
CREATE TABLE public.user_profiles (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    business_name TEXT,
    phone TEXT,
    subscription_plan_id UUID REFERENCES public.subscription_plans(id),
    subscription_status TEXT DEFAULT 'inactive',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create businesses table
CREATE TABLE public.businesses (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    category_id UUID NOT NULL REFERENCES public.categories(id),
    village_id UUID NOT NULL REFERENCES public.villages(id),
    owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    maps_url TEXT,
    languages TEXT[],
    season TEXT,
    booking TEXT,
    price_range TEXT,
    features TEXT[],
    tags TEXT[],
    description TEXT,
    meta_title TEXT,
    meta_description TEXT,
    photo_urls TEXT[],
    verified BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    subscription_plan_id UUID REFERENCES public.subscription_plans(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    content TEXT,
    excerpt TEXT,
    meta_title TEXT,
    meta_description TEXT,
    featured_image_url TEXT,
    author_id UUID REFERENCES auth.users(id),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);

-- RLS Policies for villages (public read)
CREATE POLICY "Villages are viewable by everyone" ON public.villages FOR SELECT USING (true);

-- RLS Policies for subscription_plans (public read)
CREATE POLICY "Subscription plans are viewable by everyone" ON public.subscription_plans FOR SELECT USING (true);

-- RLS Policies for user_profiles
CREATE POLICY "Users can view their own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for businesses
CREATE POLICY "Businesses are viewable by everyone" ON public.businesses FOR SELECT USING (true);
CREATE POLICY "Business owners can update their businesses" ON public.businesses FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Business owners can insert their businesses" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = owner_id);

-- RLS Policies for blog_posts
CREATE POLICY "Published blog posts are viewable by everyone" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Authors can view their own posts" ON public.blog_posts FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Authors can update their own posts" ON public.blog_posts FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can insert their own posts" ON public.blog_posts FOR INSERT WITH CHECK (auth.uid() = author_id);

-- Insert initial data
INSERT INTO public.categories (name, slug, description, icon) VALUES
('Accommodation', 'accommodation', 'Hotels, Rooms, Villas, Guesthouses', 'building'),
('Food & Drink', 'food-drink', 'Restaurants, Taverns, Cafés, Bakeries', 'utensils'),
('Pottery & Crafts', 'pottery-crafts', 'Studios, Shops, Workshops', 'palette'),
('Experiences', 'experiences', 'Cooking classes, Hiking guides, Festivals, Boat tours', 'map'),
('Vehicle Rentals', 'vehicle-rentals', 'Car, Scooter, ATV, Boat rental', 'car'),
('Culture', 'culture', 'Associations, Events, Folklore, Architecture', 'landmark'),
('Museums & History', 'museums-history', 'Archaeological, Folklore, Churches', 'university'),
('Wellness', 'wellness', 'Yoga, Spa, Retreats', 'heart');

INSERT INTO public.villages (name, slug, description) VALUES
('Apollonia', 'apollonia', 'The capital and main town of Sifnos'),
('Artemonas', 'artemonas', 'Traditional village with neoclassical architecture'),
('Kastro', 'kastro', 'Medieval castle town with stunning views'),
('Kamares', 'kamares', 'The main port of Sifnos'),
('Faros', 'faros', 'Coastal village with beautiful lighthouse'),
('Vathi', 'vathi', 'Picturesque bay with sandy beach'),
('Platis Gialos', 'platis-gialos', 'Popular beach resort area'),
('Chrissopigi', 'chrissopigi', 'Monastery village by the sea');

INSERT INTO public.subscription_plans (name, price, description, features, stripe_price_id) VALUES
('Free', 0, 'Simple business listing', ARRAY['Basic listing', 'Contact information', 'Category placement'], null),
('Basic', 14900, 'Enhanced visibility', ARRAY['Featured in search', 'Photo gallery', 'Premium support', 'Analytics dashboard'], null),
('Sponsored', 24900, 'Maximum exposure', ARRAY['Top placement', 'Homepage featuring', 'Social media promotion', 'SEO optimization', 'Priority support'], null),
('Premium', 59900, 'Dedicated website', ARRAY['Custom subdomain', 'Dedicated website', 'Advanced SEO', 'Premium branding', 'VIP support', 'Marketing campaigns'], null);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_businesses_updated_at BEFORE UPDATE ON public.businesses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to create user profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();