-- Junction table (users<==>projects)
create table jt_users_projects(
    user_id int NOT NULL,
    project_id int NOT NULL,
    user_role CHAR(20) NOT NULL,
    
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);