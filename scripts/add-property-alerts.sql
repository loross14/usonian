-- Property Alerts Table
-- Run this migration in Supabase SQL Editor to enable property listing alerts

-- Create property_alerts table
CREATE TABLE IF NOT EXISTS property_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id TEXT NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'notified', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  notified_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,

  -- Prevent duplicate alerts for same property/email combo
  UNIQUE(property_id, email)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_property_alerts_property ON property_alerts(property_id);
CREATE INDEX IF NOT EXISTS idx_property_alerts_email ON property_alerts(email);
CREATE INDEX IF NOT EXISTS idx_property_alerts_status ON property_alerts(status);
CREATE INDEX IF NOT EXISTS idx_property_alerts_active ON property_alerts(property_id, status)
  WHERE status = 'active';

-- Enable Row Level Security
ALTER TABLE property_alerts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public signup)
CREATE POLICY "Allow anon insert on property_alerts"
  ON property_alerts FOR INSERT
  WITH CHECK (true);

-- Allow service role full access (for admin/notification jobs)
CREATE POLICY "Allow service role full access on property_alerts"
  ON property_alerts FOR ALL
  USING (auth.role() = 'service_role');

-- View: Active alerts with property info (for notification jobs)
CREATE OR REPLACE VIEW active_property_alerts AS
SELECT
  pa.id as alert_id,
  pa.email,
  pa.created_at as subscribed_at,
  p.id as property_id,
  p.home_name,
  p.slug as property_slug,
  p.status as property_status,
  a.name as architect_name
FROM property_alerts pa
JOIN properties p ON pa.property_id = p.id
LEFT JOIN architects a ON p.architect_id = a.id
WHERE pa.status = 'active';

-- Grant access to the view
GRANT SELECT ON active_property_alerts TO authenticated;
GRANT SELECT ON active_property_alerts TO service_role;

COMMENT ON TABLE property_alerts IS 'Stores user email alerts for specific properties. Users get notified when off-market properties become listed.';
