DROP TABLE IF EXISTS users

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR (255) NOT NULL,
  enqueued_at TIMESTAMP,
  is_admin BOOLEAN,
  table_id REFERENCES pool_tables(id) ON DELETE CASCADE
)