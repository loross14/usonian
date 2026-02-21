-- MCM Homes Platform Database Schema
-- Run this in Supabase SQL Editor: https://uygwdpsdgwrspopcauae.supabase.co

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Architects table
CREATE TABLE architects (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  birth_year INTEGER,
  death_year INTEGER,
  birthplace TEXT,
  biography TEXT,
  fellowship_years TEXT,
  image_url TEXT,
  property_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Properties table
CREATE TABLE properties (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  home_name TEXT NOT NULL,
  full_address TEXT,
  parsed_city TEXT,
  parsed_state TEXT,
  country TEXT DEFAULT 'USA',
  latitude NUMERIC,
  longitude NUMERIC,
  year_built INTEGER NOT NULL,
  architect_id TEXT REFERENCES architects(id) ON DELETE SET NULL,
  client_owner TEXT,
  current_owner TEXT,
  preservation_status TEXT,
  significance TEXT,
  description TEXT,
  curator_notes TEXT,
  square_footage INTEGER,
  bedrooms SMALLINT,
  bathrooms NUMERIC,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','sold','archived','donated','museum')),
  best_image_url TEXT,
  last_sale_price NUMERIC(15,2),
  last_sale_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property sales history
CREATE TABLE property_sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
  sale_date DATE,
  sale_price NUMERIC(15,2),
  buyer TEXT,
  seller TEXT,
  notes TEXT,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property images
CREATE TABLE property_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT REFERENCES properties(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  is_best BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_properties_architect ON properties(architect_id);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_architects_slug ON architects(slug);
CREATE INDEX idx_property_sales_property ON property_sales(property_id);
CREATE INDEX idx_property_images_property ON property_images(property_id);

-- Enable Row Level Security
ALTER TABLE architects ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;

-- Newsletter subscribers
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT,                              -- 'homepage', 'footer', 'property_page', etc.
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);
CREATE INDEX idx_subscribers_status ON subscribers(status);

-- Enable RLS on subscribers
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Public read policies (anyone can read, authenticated users can write)
CREATE POLICY "Allow public read on architects" ON architects FOR SELECT USING (true);
CREATE POLICY "Allow public read on properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow public read on property_sales" ON property_sales FOR SELECT USING (true);
CREATE POLICY "Allow public read on property_images" ON property_images FOR SELECT USING (true);

-- Subscribers: allow insert from anon (for signup), but no public read
CREATE POLICY "Allow anon insert on subscribers" ON subscribers FOR INSERT WITH CHECK (true);
