-- Prevent overlapping time ranges at DB level for stronger double-booking protection.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE appointments
ADD CONSTRAINT appointments_no_overlap
EXCLUDE USING GIST (
  tstzrange(start_time, end_time, '[)') WITH &&
);
