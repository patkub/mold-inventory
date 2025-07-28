-- Create the molds table in Cloudflare D1
CREATE TABLE IF NOT EXISTS molds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    number TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    cycle_time INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Active', 'Maintenance', 'Retired'))
);

-- Create an index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_molds_status ON molds(status);

-- Create an index on number for faster searches
CREATE UNIQUE INDEX IF NOT EXISTS idx_molds_number ON molds(number);
