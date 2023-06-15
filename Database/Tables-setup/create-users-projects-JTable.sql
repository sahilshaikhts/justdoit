create table users_projects(
    userid int NOT NULL,
    projectid int NOT NULL,
    user_role CHAR(20) NOT NULL,
    FOREIGN KEY(userid) REFERENCES users(id),
    FOREIGN KEY(projectid) REFERENCES projects(id),
);