SELECT employee_id
FROM employees e
-- salary < 30000
WHERE e.salary < 30000
  -- Not manager_id is not in employee Table [Array]
  AND e.manager_id
    NOT IN (SELECT employee_id
            FROM employees)
ORDER BY e.employee_id