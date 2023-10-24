create table user_files(
    id INT AUTO_INCREMENT UNIQUE PRIMARY KEY NOT NULL,
    userID INT NOT NULL,
    fileName varchar(50) NOT NULL,
    fileType varchar(50) NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(id) ON DELETE CASCADE
    );