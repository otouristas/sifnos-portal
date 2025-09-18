-- Update existing villages with authentic Sifnos content and add missing ones

-- Update existing villages with authentic descriptions and hotel counts
UPDATE villages SET 
    description = 'The capital of Sifnos, known for its picturesque streets and vibrant nightlife.',
    updated_at = NOW()
WHERE slug = 'apollonia';

UPDATE villages SET 
    description = 'The main port of Sifnos with a beautiful sandy beach and waterfront restaurants.',
    updated_at = NOW()
WHERE slug = 'kamares';

UPDATE villages SET 
    description = 'One of the most popular beaches with golden sand and shallow waters perfect for families.',
    updated_at = NOW()
WHERE name = 'Platis Gialos';

UPDATE villages SET 
    description = 'The medieval capital of Sifnos with impressive architecture and stunning sea views.',
    updated_at = NOW()
WHERE slug = 'kastro';

UPDATE villages SET 
    description = 'A tranquil fishing village with a sheltered bay, sandy beach, and peaceful atmosphere.',
    updated_at = NOW()
WHERE slug = 'vathi';

UPDATE villages SET 
    description = 'A charming coastal settlement with three beautiful beaches and a relaxed atmosphere.',
    updated_at = NOW()
WHERE slug = 'faros';

UPDATE villages SET 
    description = 'An elegant village known for its neoclassical mansions and beautiful architecture.',
    updated_at = NOW()
WHERE slug = 'artemonas';

UPDATE villages SET 
    description = 'A scenic area famous for its iconic monastery and beautiful beaches.',
    updated_at = NOW()
WHERE name = 'Chrissopigi';

-- Insert additional authentic villages if they don't exist
INSERT INTO villages (name, slug, description) 
SELECT 'Agios Loukas', 'agios-loukas', 'A small, quiet settlement offering authentic island living and scenic views.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'agios-loukas');

INSERT INTO villages (name, slug, description) 
SELECT 'Exambela', 'exambela', 'A traditional village with panoramic views and authentic Cycladic character.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'exambela');

INSERT INTO villages (name, slug, description) 
SELECT 'Katavati', 'katavati', 'A picturesque inland village with traditional character and central location.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'katavati');

INSERT INTO villages (name, slug, description) 
SELECT 'Kato Petali', 'kato-petali', 'A quiet village with traditional character near the island''s capital.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'kato-petali');

INSERT INTO villages (name, slug, description) 
SELECT 'Pano Petali', 'pano-petali', 'An elevated village offering spectacular views and traditional atmosphere.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'pano-petali');

INSERT INTO villages (name, slug, description) 
SELECT 'Troullaki', 'troullaki', 'A small, peaceful settlement with rural charm and natural beauty.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'troullaki');

INSERT INTO villages (name, slug, description) 
SELECT 'Herronisos', 'herronisos', 'A remote fishing village on the northern tip of the island with authentic charm.'
WHERE NOT EXISTS (SELECT 1 FROM villages WHERE slug = 'herronisos');
