-- To reset database delete database.db
-- Run sqlite3 database.db
-- Run query below to create table

CREATE TABLE users (
    username TEXT PRIMARY KEY,
    password TEXT 
);

INSERT INTO users VALUES ("alex", "123");
