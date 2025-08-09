-- wrangler d1 execute care_db --file schema.sql --remote
DROP TABLE IF EXISTS users;


-- CREATE TABLE QUERIES 
CREATE TABLE users (
    id TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL,
    user_type TINYINT(1) NOT NULL CHECK (enabled IN (1, 2)),
    service_type TINYINT(1) NOT NULL CHECK (enabled IN (1, 2)),
    enabled TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    PRIMARY KEY ('id')
);

