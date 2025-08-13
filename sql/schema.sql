-- wrangler d1 execute care_db --file sql/schema.sql --remote
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_metadata;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS services_subcategories;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS user_roles;

-- CREATE TABLE QUERIES 

CREATE TABLE roles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  description TEXT DEFAULT ''
);

CREATE TABLE user_roles (
  user_id TEXT NOT NULL,
  role_id INTEGER NOT NULL,
  assigned_at TEXT DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE services (
    id TEXT NOT NULL,
    name TEXT,
    display_name TEXT,
    description TEXT,
    provider_description TEXT,
    client_description TEXT,
    enabled TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY ('id')
);

CREATE TABLE services_subcategories (
    id TEXT NOT NULL,
    service_id TEXT NOT NULL,
    name TEXT,
    display_name TEXT,
    description TEXT,
    enabled TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY ('id'),
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX idx_services_subcategories_service_id ON services_subcategories(service_id);

CREATE TABLE users (
    id TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    user_verified TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    email TEXT NOT NULL UNIQUE,
    email_verified TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    verification_token TEXT,
    password_hash TEXT NOT NULL,
    user_type TINYINT(1) NOT NULL CHECK (enabled IN (1, 2)),
    service_type TINYINT(1) NOT NULL CHECK (enabled IN (1, 2)),
    enabled TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY ('id')
);

CREATE TABLE users_metadata (
    id TEXT NOT NULL,
    user_id TEXT NOT NULL UNIQUE,
    PRIMARY KEY ('id')
);

