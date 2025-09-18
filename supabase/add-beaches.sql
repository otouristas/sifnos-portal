-- Add Beaches & Nature category if it doesn't exist
INSERT INTO categories (name, slug, description, icon) 
SELECT 'Beaches & Nature', 'beaches-nature', 'Beautiful beaches, hiking trails & natural sites', 'waves'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'beaches-nature');

-- Create beaches table if it doesn't exist (this might need to be run separately if table doesn't exist)
CREATE TABLE IF NOT EXISTS beaches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    village_id UUID REFERENCES villages(id),
    location_description TEXT,
    distance_from_apollonia TEXT,
    beach_type TEXT, -- sandy, pebble, mixed
    water_quality TEXT, -- crystal clear, blue flag, etc.
    wind_protection TEXT, -- excellent, good, moderate, poor
    access_method TEXT, -- car, bus, hiking, boat
    parking_available BOOLEAN DEFAULT false,
    facilities TEXT[], -- sunbeds, restaurants, etc.
    perfect_for TEXT[], -- families, seclusion, etc.
    key_highlights TEXT[],
    coordinates POINT, -- for map integration
    photos TEXT[],
    blue_flag BOOLEAN DEFAULT false,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Sifnos Beaches with photos
INSERT INTO beaches (
    name, slug, description, village_id, location_description, distance_from_apollonia,
    beach_type, water_quality, wind_protection, access_method, parking_available,
    facilities, perfect_for, key_highlights, blue_flag, featured, photos
) VALUES 
(
    'Platis Gialos',
    'platis-gialos',
    'One of the largest and most popular sandy beaches on Sifnos, especially beloved by Greek visitors. It consistently earns the Blue Flag from the FEE, thanks to its compliance with 32 strict environmental and quality criteria.',
    (SELECT id FROM villages WHERE name = 'Platis Gialos' LIMIT 1),
    'Southern Sifnos',
    '7 km from Apollonia',
    'sandy',
    'Blue Flag certified crystal clear waters',
    'moderate',
    'Bus service from Apollonia or by car',
    true,
    ARRAY['Sunbeds & Umbrellas', 'Restaurants', 'Water Sports', 'Beach Bars', 'Shops', 'Pottery Studios'],
    ARRAY['Families', 'Swimming', 'Food Lovers', 'Water Sports'],
    ARRAY['Blue Flag awarded beach', 'White Tower (ancient beacon) nearby', 'Hiking routes to southern villages', 'View of Kitriani islet with ancient church'],
    true,
    true,
    ARRAY['/src/assets/beaches/plats-gialos.webp']
),
(
    'Kamares',
    'kamares-beach',
    'The main port of Sifnos and the island''s largest coastal village, just 5 km from the capital Apollonia. As the main arrival point, it offers the highest concentration of services and facilities.',
    (SELECT id FROM villages WHERE name = 'Kamares' LIMIT 1),
    'Western Sifnos (Port)',
    '5 km from Apollonia',
    'sandy',
    'crystal clear protected bay waters',
    'good',
    'Main port arrival point, walking distance from port',
    true,
    ARRAY['Sunbeds & Umbrellas', 'Restaurants', 'Beach Bars', 'Shops', 'Natural Shade', 'Port Authority', 'Municipal Information Office', 'Grocery Stores', 'Bakeries', 'Pottery Workshops'],
    ARRAY['Convenience', 'Families', 'Port Proximity', 'Hiking'],
    ARRAY['Main arrival port for ferries', 'Starting point for scenic hiking routes', 'Trails to Church of the Nymfon and Mavri Spilia (Black Cave)', 'Connection to NATURA protected areas'],
    false,
    true
),
(
    'Vathi',
    'vathi-beach',
    'Located 10 km west of Apollonia, Vathi is a peaceful coastal village known for its wide, sandy beach and tranquil vibe. Once a major pottery hub, the village retains its artisanal charm.',
    (SELECT id FROM villages WHERE name = 'Vathi' LIMIT 1),
    'Western Sifnos',
    '10 km from Apollonia',
    'sandy',
    'crystal clear sheltered waters',
    'excellent',
    'Bus service from Apollonia, road access',
    true,
    ARRAY['Sunbeds & Umbrellas', 'Restaurants', 'Beach Bars', 'Natural Shade', 'Pottery Studios'],
    ARRAY['Tranquility', 'Scenery', 'Swimming', 'Archaeology', 'Nature'],
    ARRAY['Prehistoric archaeological site', 'Rare sand lilies (August blooming)', '16th-century Church of Taxiarches', 'Hiking trails to Platy Gialos and Fykiada'],
    false,
    true,
    ARRAY['/src/assets/beaches/vathi.webp']
),
(
    'Chrissopigi',
    'chrissopigi-beach',
    'Located 10 km from Apollonia, near Platy Gialos, Chrissopigi is the most photographed and revered location on the island. Home to the Monastery of Panagia Chrissopigi (1523), the patron saint of Sifnos.',
    (SELECT id FROM villages WHERE name = 'Chrissopigi' LIMIT 1),
    'Southeastern Sifnos',
    '10 km from Apollonia',
    'mixed',
    'crystal clear waters with dramatic rocks',
    'moderate',
    'Bus to Faros then 15-minute walk, or drive',
    false,
    ARRAY['Restaurant', 'Limited Sunbeds', 'Monastery'],
    ARRAY['Photography', 'Snorkeling', 'Natural Beauty', 'Religious Interest'],
    ARRAY['Monastery of Panagia Chrissopigi (1523)', 'Patron saint of Sifnos', 'Annual religious festival', 'Nearby White Tower ancient beacon'],
    false,
    true,
    ARRAY['/src/assets/beaches/chrysopigi.webp']
),
(
    'Faros',
    'faros-beach',
    'Seven kilometers from Apollonia, Faros is a traditional fishing village and once the main port of Sifnos. Named after the ancient lighthouse, it offers serene beaches and cultural experiences.',
    (SELECT id FROM villages WHERE name = 'Faros' LIMIT 1),
    'Southeastern Sifnos',
    '7 km from Apollonia',
    'sandy',
    'crystal clear protected bay waters',
    'good',
    'Bus service from Apollonia, road access',
    true,
    ARRAY['Sunbeds & Umbrellas', 'Restaurants', 'Natural Shade', 'Lit Walking Path'],
    ARRAY['Relaxation', 'Swimming', 'Local Atmosphere', 'Coastal Walks'],
    ARRAY['Traditional fishing village', 'Ancient lighthouse history', 'Monastery of Stavros on Fasolou beach', 'Hiking trails to Agios Andreas Acropolis and Kastro'],
    false,
    false,
    ARRAY['/src/assets/beaches/faros.webp']
),
(
    'Herronisos',
    'herronisos-beach',
    'The northernmost beach of Sifnos, 15 km from Apollonia, Herronisos is a secluded fishing village famed for its peaceful atmosphere, traditional pottery, and small beach.',
    (SELECT id FROM villages WHERE slug = 'apollonia' LIMIT 1), -- Using Apollonia as closest village
    'Northern Sifnos',
    '15 km from Apollonia',
    'pebble',
    'crystal clear waters',
    'moderate',
    'Limited bus service, better accessible by car',
    true,
    ARRAY['Small Tavernas', 'Traditional Pottery'],
    ARRAY['Seclusion', 'Traditional Charm', 'Pottery'],
    ARRAY['Northernmost beach on the island', 'Traditional fishing village', 'Ancient beacon tower', 'Agios Georgios church'],
    false,
    false,
    ARRAY['/src/assets/beaches/heronissos.webp']
),
(
    'Vroulidia',
    'vroulidia-beach',
    'Located just 1 km from Herronisos and 14 km from Apollonia, Vroulidia is a tranquil pebble beach ideal for relaxation. It offers two seaside cafés that provide umbrellas and sunbeds.',
    (SELECT id FROM villages WHERE slug = 'apollonia' LIMIT 1), -- Using Apollonia as closest village
    'Northern Sifnos',
    '14 km from Apollonia',
    'pebble',
    'crystal clear turquoise waters',
    'poor',
    'Dirt road access then 10-minute hike down',
    false,
    ARRAY['Two Seaside Cafés', 'Umbrellas & Sunbeds'],
    ARRAY['Seclusion', 'Natural Beauty', 'Snorkeling', 'Peace and Quiet'],
    ARRAY['Tranquil pebble beach', 'Crystal clear waters', 'Unspoiled natural setting'],
    false,
    false,
    ARRAY['/src/assets/beaches/vroulidia.webp']
),
(
    'Fykiada',
    'fykiada-beach',
    'A secluded sandy beach accessible only by sea or hiking trails from Platy Gialos and Vathi. Near the beach stands the chapel of Agios Georgios and one of the island''s oldest olive trees.',
    (SELECT id FROM villages WHERE name = 'Platis Gialos' LIMIT 1),
    'Between Platy Gialos and Vathi',
    '8 km from Apollonia',
    'sandy',
    'pristine crystal clear waters',
    'variable',
    'Only by foot via hiking trails or by boat',
    false,
    ARRAY['None - Unspoiled Beach'],
    ARRAY['Adventure', 'Hiking', 'Complete Seclusion'],
    ARRAY['Completely undeveloped beach', 'Ancient olive tree', 'Chapel of Agios Georgios', 'Only accessible by hiking or boat'],
    false,
    false,
    ARRAY['/src/assets/beaches/fykiada.webp']
);

-- Add beach-related businesses
INSERT INTO businesses (
    name, slug, description, category_id, village_id, 
    phone, email, website, address, price_range, 
    verified, featured, tags, features, languages, season
) VALUES 
(
    'Platis Gialos Beach Bar',
    'platis-gialos-beach-bar',
    'Beachfront bar and restaurant offering refreshing cocktails, light meals, and stunning sea views on the famous Blue Flag beach.',
    (SELECT id FROM categories WHERE slug = 'food-drink' LIMIT 1),
    (SELECT id FROM villages WHERE name = 'Platis Gialos' LIMIT 1),
    '+30 22840 71888',
    'info@platisgialosbr.gr',
    NULL,
    'Platis Gialos Beach, Sifnos 84003',
    '€€',
    true,
    false,
    ARRAY['Beach Bar', 'Sea View', 'Cocktails', 'Blue Flag Beach'],
    ARRAY['Beachfront Location', 'Cocktails', 'Light Meals', 'Sunbeds', 'WiFi'],
    ARRAY['Greek', 'English'],
    'May - September'
),
(
    'Kamares Pottery Workshop',
    'kamares-pottery-workshop',
    'Traditional pottery workshop at the port village of Kamares, where visitors can watch artisans create beautiful ceramics and purchase authentic Sifnian pottery.',
    (SELECT id FROM categories WHERE slug = 'pottery-crafts' LIMIT 1),
    (SELECT id FROM villages WHERE name = 'Kamares' LIMIT 1),
    '+30 22840 31567',
    'pottery@kamaresworkshop.gr',
    NULL,
    'Port Road, Kamares, Sifnos 84003',
    '€',
    true,
    false,
    ARRAY['Traditional', 'Port Location', 'Authentic', 'Handmade'],
    ARRAY['Live Demonstrations', 'Purchase Pottery', 'Custom Orders', 'Shipping Available'],
    ARRAY['Greek', 'English'],
    'Year Round'
),
(
    'Vathi Traditional Taverna',
    'vathi-traditional-taverna',
    'Family-run taverna in the peaceful bay of Vathi, serving traditional Greek cuisine with fresh local ingredients and beautiful beach views.',
    (SELECT id FROM categories WHERE slug = 'food-drink' LIMIT 1),
    (SELECT id FROM villages WHERE name = 'Vathi' LIMIT 1),
    '+30 22840 71345',
    'taverna@vathi-sifnos.gr',
    NULL,
    'Vathi Bay, Sifnos 84003',
    '€€',
    true,
    false,
    ARRAY['Traditional', 'Family-run', 'Beach View', 'Local Ingredients'],
    ARRAY['Beach View', 'Traditional Recipes', 'Fresh Seafood', 'Local Ingredients'],
    ARRAY['Greek', 'English'],
    'April - October'
),
(
    'Chrysopigi Monastery Tours',
    'chrysopigi-monastery-tours',
    'Guided tours of the historic Monastery of Panagia Chrysopigi (1523), the patron saint of Sifnos, including the annual festival experience.',
    (SELECT id FROM categories WHERE slug = 'experiences' LIMIT 1),
    (SELECT id FROM villages WHERE name = 'Chrissopigi' LIMIT 1),
    '+30 22840 71999',
    'tours@chrysopigi-sifnos.gr',
    'https://chrysopigi-tours.gr',
    'Chrysopigi Peninsula, Sifnos 84003',
    '€',
    true,
    false,
    ARRAY['Religious', 'Cultural', 'Historic', 'Photography'],
    ARRAY['Guided Tours', 'Cultural Experience', 'Photography Spots', 'Religious History'],
    ARRAY['Greek', 'English'],
    'Year Round'
);

-- Update existing villages with more detailed beach descriptions
UPDATE villages SET description = 'The main port and largest coastal village of Sifnos, featuring a beautiful sandy beach, essential services, and traditional pottery workshops.' 
WHERE slug = 'kamares';

UPDATE villages SET description = 'A peaceful bay village with wide sandy beach, traditional pottery studios, and prehistoric archaeological sites.'
WHERE slug = 'vathi';

UPDATE villages SET description = 'A beautiful beach resort area with the island''s Blue Flag certified beach, crystal clear waters, and the historic White Tower nearby.'
WHERE name = 'Platis Gialos';

UPDATE villages SET description = 'Traditional fishing village with serene beaches, ancient lighthouse history, and lit coastal walking paths to Chrysopigi.'
WHERE slug = 'faros';

UPDATE villages SET description = 'The most photographed location on Sifnos, home to the revered Monastery of Panagia Chrysopigi (1523), patron saint of the island.'
WHERE name = 'Chrissopigi';
