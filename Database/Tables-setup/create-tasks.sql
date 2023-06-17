create table tasks(
    id int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    userid int,
    projectid int NOT NULL,

    -- 0: Pending. 1: InProgress. 2: InReview. 3: Finished.
    progress int NOT NULL,
    -- 0:low. 1: Med. 2: High.
    priority int,
    
    title varchar(50) NOT NULL,
    description varchar(250),

    FOREIGN KEY(userid) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY(projectid) REFERENCES projects(id) ON DELETE CASCADE,
    
);

