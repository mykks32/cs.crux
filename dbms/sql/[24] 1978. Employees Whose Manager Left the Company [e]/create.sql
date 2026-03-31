-- Employees Table
CREATE TABLE Employees
    (
        employee_id INT PRIMARY KEY ,
        name        VARCHAR,
        manager_id  INT,
        salary      INT
    )