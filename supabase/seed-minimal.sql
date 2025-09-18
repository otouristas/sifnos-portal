-- Minimal seed script - plain INSERTs only
-- Run this only if your database is empty or you want to add sample data

-- First, let's add some villages (skip if they exist)
INSERT INTO villages (name, slug, description) 
SELECT 'Apollonia', 'apollonia', 'The capital and main town of Sifnos, featuring traditional Cycladic architecture'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'apollonia');

INSERT INTO villages (name, slug, description) 
SELECT 'Artemonas', 'artemonas', 'A picturesque village known for its neoclassical mansions and pottery workshops'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'artemonas');

INSERT INTO villages (name, slug, description) 
SELECT 'Kastro', 'kastro', 'The medieval capital with stunning sunset views and Venetian architecture'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'kastro');

INSERT INTO villages (name, slug, description) 
SELECT 'Platis Gialos', 'platis-gialos', 'A beautiful beach resort area with crystal clear waters'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'platis-gialos');

INSERT INTO villages (name, slug, description) 
SELECT 'Kamares', 'kamares', 'The main port of Sifnos with a lovely sandy beach and tavernas'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'kamares');

INSERT INTO villages (name, slug, description) 
SELECT 'Vathi', 'vathi', 'A peaceful bay with a sandy beach and traditional pottery workshops'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'vathi');

INSERT INTO villages (name, slug, description) 
SELECT 'Faros', 'faros', 'A charming fishing village with excellent seafood restaurants'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'faros');

-- Add categories (skip if they exist)
INSERT INTO categories (name, slug, description, icon) 
SELECT 'Accommodation', 'accommodation', 'Hotels, villas, rooms & guesthouses', 'bed'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'accommodation');

INSERT INTO categories (name, slug, description, icon) 
SELECT 'Food & Drink', 'food-drink', 'Restaurants, taverns, cafés & bakeries', 'utensils-crossed'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'food-drink');

INSERT INTO categories (name, slug, description, icon) 
SELECT 'Pottery & Crafts', 'pottery-crafts', 'Studios, workshops & traditional crafts', 'palette'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'pottery-crafts');

INSERT INTO categories (name, slug, description, icon) 
SELECT 'Experiences', 'experiences', 'Tours, activities & local experiences', 'camera'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'experiences');

INSERT INTO categories (name, slug, description, icon) 
SELECT 'Vehicle Rentals', 'vehicle-rentals', 'Cars, scooters, ATVs & boat rentals', 'car'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'vehicle-rentals');

-- Add sample businesses (skip if they exist)
INSERT INTO businesses (
    name, slug, description, category_id, village_id, 
    phone, email, website, address, price_range, 
    verified, featured, tags, features, languages, season
) 
SELECT 
    'Artemon Pottery Workshop',
    'artemon-pottery-workshop',
    'Traditional pottery workshop creating authentic Sifnian ceramics using local clay and time-honored techniques.',
    (SELECT id FROM categories WHERE slug = 'pottery-crafts'),
    (SELECT id FROM villages WHERE slug = 'artemonas'),
    '+30 22840 31245',
    'info@artemonpottery.gr',
    'https://artemonpottery.gr',
    'Main Street, Artemonas, Sifnos 84003',
    '€€',
    true,
    true,
    ARRAY['Traditional', 'Handmade', 'Local Clay'],
    ARRAY['Pottery Classes', 'Custom Orders', 'Shipping Available'],
    ARRAY['Greek', 'English'],
    'Year Round'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'artemon-pottery-workshop');

INSERT INTO businesses (
    name, slug, description, category_id, village_id, 
    phone, email, website, address, price_range, 
    verified, featured, tags, features, languages, season
) 
SELECT 
    'Omega3 Traditional Taverna',
    'omega3-traditional-taverna',
    'Seaside taverna serving fresh seafood and traditional Sifnian specialties with stunning sunset views.',
    (SELECT id FROM categories WHERE slug = 'food-drink'),
    (SELECT id FROM villages WHERE slug = 'platis-gialos'),
    '+30 22840 71234',
    'reservations@omega3sifnos.com',
    'https://omega3sifnos.com',
    'Platis Gialos Beach, Sifnos 84003',
    '€€€',
    true,
    true,
    ARRAY['Seafood', 'Sunset Views', 'Family-run'],
    ARRAY['Sea View', 'Outdoor Seating', 'WiFi', 'Parking'],
    ARRAY['Greek', 'English', 'French'],
    'April - October'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'omega3-traditional-taverna');

INSERT INTO businesses (
    name, slug, description, category_id, village_id, 
    phone, email, website, address, price_range, 
    verified, featured, tags, features, languages, season
) 
SELECT 
    'Kastro Traditional Suites',
    'kastro-traditional-suites',
    'Luxury suites in restored medieval houses with panoramic sea views and authentic island architecture.',
    (SELECT id FROM categories WHERE slug = 'accommodation'),
    (SELECT id FROM villages WHERE slug = 'kastro'),
    '+30 22840 51678',
    'info@kastrosuites.gr',
    'https://kastrosuites.gr',
    'Medieval Village, Kastro, Sifnos 84003',
    '€€€€',
    true,
    true,
    ARRAY['Luxury', 'Sea View', 'Historic'],
    ARRAY['Sea View', 'Air Conditioning', 'WiFi', 'Breakfast'],
    ARRAY['Greek', 'English', 'German'],
    'April - November'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'kastro-traditional-suites');

INSERT INTO businesses (
    name, slug, description, category_id, village_id, 
    phone, email, website, address, price_range, 
    verified, featured, tags, features, languages, season
) 
SELECT 
    'Sifnos Hiking Adventures',
    'sifnos-hiking-adventures',
    'Guided hiking tours exploring ancient paths, hidden beaches, and traditional villages.',
    (SELECT id FROM categories WHERE slug = 'experiences'),
    (SELECT id FROM villages WHERE slug = 'apollonia'),
    '+30 22840 33456',
    'adventures@sifnoshiking.gr',
    'https://sifnoshiking.gr',
    'Central Square, Apollonia, Sifnos 84003',
    '€€',
    true,
    false,
    ARRAY['Hiking', 'Local Guide', 'Small Groups'],
    ARRAY['Professional Guide', 'Equipment Provided', 'Photography Tips'],
    ARRAY['Greek', 'English'],
    'March - November'
WHERE NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'sifnos-hiking-adventures');

-- Add subscription plans
INSERT INTO subscription_plans (name, description, price, features) 
SELECT 'Free', 'Basic business listing', 0, ARRAY['Basic listing', 'Contact information', '1 photo']
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Free');

INSERT INTO subscription_plans (name, description, price, features) 
SELECT 'Premium', 'Enhanced business profile', 29, ARRAY['Enhanced listing', 'Up to 10 photos', 'Priority in search']
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Premium');

INSERT INTO subscription_plans (name, description, price, features) 
SELECT 'Professional', 'Full business solution', 79, ARRAY['Premium features', 'Unlimited photos', 'Featured placement', 'Booking integration']
WHERE NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Professional');
