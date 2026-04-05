-- Department Table
CREATE TABLE "Department"
    (
        id   INT PRIMARY KEY,
        name VARCHAR
    );

-- Employee Table
CREATE TABLE "Employee"
    (
        id           INT PRIMARY KEY,
        name         VARCHAR,
        salary       INT,
        departmentId INT,
        FOREIGN KEY (departmentId) REFERENCES "Department" (id)
    );
