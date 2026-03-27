-- Employees Table
CREATE TABLE employees
	(
		employee_id INT UNIQUE,
		name        VARCHAR,
		reports_to  INT,
		age         INT
	)