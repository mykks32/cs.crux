-- Movies Table
CREATE TABLE Movies
    (
        movie_id INT PRIMARY KEY,
        title    VARCHAR UNIQUE
    );

-- Users Table
CREATE TABLE Users
    (
        user_id INT PRIMARY KEY,
        name    VARCHAR UNIQUE
    );

-- MovieRating Table
CREATE TABLE MovieRating
    (
        movie_id   INT,
        user_id    INT,
        rating     INT,
        created_AT DATE,

        PRIMARY KEY (movie_id, user_id)
    )