-- Customer Table
CREATE TABLE Customer
    (
        customer_id INT,
        name        VARCHAR,
        visited_on  DATE,
        amount      INT,

        PRIMARY KEY (customer_id, visited_on)
    )