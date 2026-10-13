-- Migration number: 0001

CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  role TEXT NOT NULL DEFAULT 'user',
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  displayName TEXT NOT NULL UNIQUE,
  avatarUrl TEXT,
  bio TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  level INTEGER,
  CHECK (role IN ('user', 'admin'))
);