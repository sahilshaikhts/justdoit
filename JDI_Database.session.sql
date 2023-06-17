-- @block
DROP table users;

--@block
create table users(
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY NOT NULL,
    username varchar(128),
    email varchar(128),
    hashed_password varchar(128)
);

--@block
insert into users(username, email, hashed_password)
values(
        'SahilShaikh',
        'sahilshaikhts@gmail.com',
        '123noi1=123_23kinaASDds/'
    )

--@block
select * from users;
select * from projects;
select * from tasks;