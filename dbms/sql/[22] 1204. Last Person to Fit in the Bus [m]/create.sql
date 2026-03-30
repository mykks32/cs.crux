-- Queue Table
CREATE TABLE Queue
    (
        person_id   INT UNIQUE,
        person_name VARCHAR,
        weight      INT,
        turn        INT
    )