-- wrangler d1 execute acu-react-production-database --file schema.sql --remote
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS navigation_items;
DROP TABLE IF EXISTS endpoints;
DROP TABLE IF EXISTS endpoint_columns;

-- CREATE TABLE QUERIES 
CREATE TABLE users (
    id TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    enabled TINYINT(1) NOT NULL DEFAULT 0 CHECK (enabled IN (0, 1)),
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY ('id')
);

