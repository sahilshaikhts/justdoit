create table users(
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY NOT NULL,
    username varchar(50) NOT NULL,
    email varchar(50) UNIQUE NOT NULL,
    hashed_password varchar(128) NOT NULL
);