-- Active: 1693405713937@@127.0.0.1@3306@jdi
-- Junction table (users<==>projects)
create table jt_users_projects(
    user_id int NOT NULL,
    project_id int NOT NULL,
    user_role int NOT NULL,
    
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);