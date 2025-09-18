-- Simple seed script that checks for existing data before inserting

-- Insert Villages only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'apollonia') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Apollonia', 'apollonia', 'The capital and main town of Sifnos, featuring traditional Cycladic architecture');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'artemonas') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Artemonas', 'artemonas', 'A picturesque village known for its neoclassical mansions and pottery workshops');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'kastro') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Kastro', 'kastro', 'The medieval capital with stunning sunset views and Venetian architecture');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'platis-gialos') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Platis Gialos', 'platis-gialos', 'A beautiful beach resort area with crystal clear waters');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'kamares') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Kamares', 'kamares', 'The main port of Sifnos with a lovely sandy beach and tavernas');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'vathi') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Vathi', 'vathi', 'A peaceful bay with a sandy beach and traditional pottery workshops');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'faros') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Faros', 'faros', 'A charming fishing village with excellent seafood restaurants');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'chrissopigi') THEN
        INSERT INTO villages (name, slug, description) VALUES
        ('Chrissopigi', 'chrissopigi', 'Famous for its monastery and stunning coastal views');
    END IF;
END $$;

-- Insert Categories only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'accommodation') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Accommodation', 'accommodation', 'Hotels, villas, rooms & guesthouses', 'bed');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'food-drink') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Food & Drink', 'food-drink', 'Restaurants, taverns, cafés & bakeries', 'utensils-crossed');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'pottery-crafts') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Pottery & Crafts', 'pottery-crafts', 'Studios, workshops & traditional crafts', 'palette');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'experiences') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Experiences', 'experiences', 'Tours, activities & local experiences', 'camera');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'vehicle-rentals') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Vehicle Rentals', 'vehicle-rentals', 'Cars, scooters, ATVs & boat rentals', 'car');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'wellness') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Wellness', 'wellness', 'Yoga, spas, retreats & wellness', 'heart');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'culture') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Culture', 'culture', 'Museums, history & cultural sites', 'building-2');
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'beaches-nature') THEN
        INSERT INTO categories (name, slug, description, icon) VALUES
        ('Beaches & Nature', 'beaches-nature', 'Beaches, hiking trails & natural sites', 'waves');
    END IF;
END $$;

-- Insert Sample Businesses only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'artemon-pottery-workshop') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Artemon Pottery Workshop',
            'artemon-pottery-workshop',
            'Traditional pottery workshop creating authentic Sifnian ceramics using local clay and time-honored techniques passed down through generations.',
            (SELECT id FROM categories WHERE slug = 'pottery-crafts'),
            (SELECT id FROM villages WHERE slug = 'artemonas'),
            '+30 22840 31245',
            'info@artemonpottery.gr',
            'https://artemonpottery.gr',
            'Main Street, Artemonas, Sifnos 84003',
            '€€',
            true,
            true,
            ARRAY['Traditional', 'Handmade', 'Local Clay', 'Workshops'],
            ARRAY['Pottery Classes', 'Custom Orders', 'Shipping Available', 'Gift Shop'],
            ARRAY['Greek', 'English'],
            'Year Round'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'omega3-traditional-taverna') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Omega3 Traditional Taverna',
            'omega3-traditional-taverna',
            'Seaside taverna serving fresh seafood and traditional Sifnian specialties with stunning sunset views over the Aegean Sea.',
            (SELECT id FROM categories WHERE slug = 'food-drink'),
            (SELECT id FROM villages WHERE slug = 'platis-gialos'),
            '+30 22840 71234',
            'reservations@omega3sifnos.com',
            'https://omega3sifnos.com',
            'Platis Gialos Beach, Sifnos 84003',
            '€€€',
            true,
            true,
            ARRAY['Seafood', 'Sunset Views', 'Family-run', 'Traditional'],
            ARRAY['Sea View', 'Outdoor Seating', 'WiFi', 'Parking', 'Reservations'],
            ARRAY['Greek', 'English', 'French'],
            'April - October'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'kastro-traditional-suites') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Kastro Traditional Suites',
            'kastro-traditional-suites',
            'Luxury suites in restored medieval houses with panoramic sea views and authentic Cycladic architecture in the historic Kastro village.',
            (SELECT id FROM categories WHERE slug = 'accommodation'),
            (SELECT id FROM villages WHERE slug = 'kastro'),
            '+30 22840 51678',
            'info@kastrosuites.gr',
            'https://kastrosuites.gr',
            'Medieval Village, Kastro, Sifnos 84003',
            '€€€€',
            true,
            true,
            ARRAY['Luxury', 'Sea View', 'Historic', 'Adults Only'],
            ARRAY['Sea View', 'Air Conditioning', 'WiFi', 'Breakfast', 'Concierge'],
            ARRAY['Greek', 'English', 'German'],
            'April - November'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'sifnos-hiking-adventures') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Sifnos Hiking Adventures',
            'sifnos-hiking-adventures',
            'Guided hiking tours exploring ancient paths, hidden beaches, and traditional villages with experienced local guides.',
            (SELECT id FROM categories WHERE slug = 'experiences'),
            (SELECT id FROM villages WHERE slug = 'apollonia'),
            '+30 22840 33456',
            'adventures@sifnoshiking.gr',
            'https://sifnoshiking.gr',
            'Central Square, Apollonia, Sifnos 84003',
            '€€',
            true,
            false,
            ARRAY['Hiking', 'Local Guide', 'Small Groups', 'Photography'],
            ARRAY['Professional Guide', 'Equipment Provided', 'Photography Tips', 'Refreshments'],
            ARRAY['Greek', 'English'],
            'March - November'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'kamares-beach-hotel') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Kamares Beach Hotel',
            'kamares-beach-hotel',
            'Family-run hotel directly on Kamares beach offering comfortable rooms with sea views and traditional Greek hospitality.',
            (SELECT id FROM categories WHERE slug = 'accommodation'),
            (SELECT id FROM villages WHERE slug = 'kamares'),
            '+30 22840 31890',
            'info@kamaresbeachhotel.gr',
            'https://kamaresbeachhotel.gr',
            'Kamares Beach, Sifnos 84003',
            '€€',
            true,
            false,
            ARRAY['Beach Front', 'Family Friendly', 'Traditional', 'Budget Friendly'],
            ARRAY['Beach Access', 'Sea View', 'WiFi', 'Breakfast', 'Family Rooms'],
            ARRAY['Greek', 'English'],
            'April - October'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'vathi-pottery-studio') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Vathi Pottery Studio',
            'vathi-pottery-studio',
            'Working pottery studio in the peaceful bay of Vathi where visitors can watch master potters at work and purchase authentic ceramics.',
            (SELECT id FROM categories WHERE slug = 'pottery-crafts'),
            (SELECT id FROM villages WHERE slug = 'vathi'),
            '+30 22840 71567',
            'studio@vathipottery.gr',
            NULL,
            'Vathi Bay, Sifnos 84003',
            '€',
            false,
            false,
            ARRAY['Traditional', 'Working Studio', 'Authentic', 'Local Artists'],
            ARRAY['Live Demonstrations', 'Purchase Pottery', 'Custom Orders', 'Workshop Tours'],
            ARRAY['Greek', 'English'],
            'Year Round'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'faros-fish-taverna') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Faros Fish Taverna',
            'faros-fish-taverna',
            'Authentic fishing village taverna serving the daily catch with traditional recipes and local ingredients in a charming seaside setting.',
            (SELECT id FROM categories WHERE slug = 'food-drink'),
            (SELECT id FROM villages WHERE slug = 'faros'),
            '+30 22840 71234',
            'farostaverna@gmail.com',
            NULL,
            'Faros Harbor, Sifnos 84003',
            '€€',
            true,
            false,
            ARRAY['Fresh Fish', 'Local Catch', 'Traditional', 'Harbor View'],
            ARRAY['Fresh Seafood', 'Harbor View', 'Local Ingredients', 'Family Recipes'],
            ARRAY['Greek', 'English'],
            'May - September'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM businesses WHERE slug = 'sifnos-scooter-rental') THEN
        INSERT INTO businesses (
            name, slug, description, category_id, village_id, 
            phone, email, website, address, price_range, 
            verified, featured, tags, features, languages, season
        ) VALUES (
            'Sifnos Scooter Rental',
            'sifnos-scooter-rental',
            'Reliable scooter and ATV rentals to explore the island at your own pace. Well-maintained vehicles with full insurance and support.',
            (SELECT id FROM categories WHERE slug = 'vehicle-rentals'),
            (SELECT id FROM villages WHERE slug = 'kamares'),
            '+30 22840 33789',
            'rentals@sifnosscooters.gr',
            'https://sifnosscooters.gr',
            'Port Road, Kamares, Sifnos 84003',
            '€€',
            true,
            false,
            ARRAY['Scooters', 'ATVs', 'Insurance', 'Island Exploration'],
            ARRAY['Full Insurance', 'Free Delivery', 'Maps Provided', '24/7 Support'],
            ARRAY['Greek', 'English', 'Italian'],
            'April - October'
        );
    END IF;
END $$;

-- Insert Subscription Plans only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Free') THEN
        INSERT INTO subscription_plans (name, description, price, features) VALUES
        ('Free', 'Basic business listing', 0, ARRAY['Basic listing', 'Contact information', '1 photo']);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Premium') THEN
        INSERT INTO subscription_plans (name, description, price, features) VALUES
        ('Premium', 'Enhanced business profile', 29, ARRAY['Enhanced listing', 'Up to 10 photos', 'Priority in search', 'Analytics']);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM subscription_plans WHERE name = 'Professional') THEN
        INSERT INTO subscription_plans (name, description, price, features) VALUES
        ('Professional', 'Full business solution', 79, ARRAY['Premium features', 'Unlimited photos', 'Featured placement', 'Booking integration', 'Advanced analytics']);
    END IF;
END $$;
