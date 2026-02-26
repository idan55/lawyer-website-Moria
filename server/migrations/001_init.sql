-- Table to store Google OAuth tokens (one row for the lawyer)
CREATE TABLE IF NOT EXISTS google_tokens (
    id SERIAL PRIMARY KEY,
    access_token TEXT NOT NULL,
    refresh_token TEXT NOT NULL,
    scope TEXT,
    expiry_date BIGINT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table to store booked appointments
CREATE TABLE IF NOT EXISTS appointments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    duration INT NOT NULL CHECK (duration IN (30, 60)),
    language TEXT NOT NULL CHECK (language IN ('en','fr','he','nl')),
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    google_event_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);