create table tasks(
    id int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    user_id int,
    project_id int NOT NULL,

    -- 0: Pending. 1: InProgress. 2: InReview. 3: Finished.
    progress int NOT NULL,
    -- 0:low. 1: Med. 2: High.
    priority int NOT NULL,
    
    title varchar(50) NOT NULL,
    description varchar(250),

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
    
);

