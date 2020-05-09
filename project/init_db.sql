-- To reset database delete database.db
-- Run sqlite3 database.db
-- Run query below to create table

CREATE TABLE users (
    password TEXT PRIMARY KEY,
    username TEXT 
);

INSERT INTO users VALUES ('123', 'alex');
INSERT INTO users VALUES ('term', 'momme');
