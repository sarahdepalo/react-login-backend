CREATE TABLE users (
    id serial PRIMARY KEY,
    fullName text,
    email text,
    username text,
    password varchar(255),
    UNIQUE (username)
);