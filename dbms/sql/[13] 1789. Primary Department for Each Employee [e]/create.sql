-- create primary_flag enum
-- Y -> primary department
-- N -> not primary department
CREATE TYPE PRIMARY_FLAG_ACTION AS ENUM ('Y', 'N');

-- Create Employee Table
CREATE TABLE employee
    (
        employee_id   INT,
        department_id INT,
        primary_flag  PRIMARY_FLAG_ACTION,

        -- pk (employee_id, department_id)
        PRIMARY KEY (employee_id, department_id)
    )