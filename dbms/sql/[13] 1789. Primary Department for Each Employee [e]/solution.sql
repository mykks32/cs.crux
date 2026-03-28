SELECT e.employee_id,
       e.department_id
--     *
FROM Employee e
LEFT JOIN Employee e2
          ON e.employee_id = e2.employee_id
              AND e2.primary_flag = 'Y'
-- Out of Left join for *
-- (e1.employee_id, e1.department_id, e1.primary_flag, e2.employee_id, e2.department_id, e2.primary_flag)
-- (1, 1, 'N', NULL, NULL, NULL),
-- (2, 1, 'Y', 2, 1, 'Y'),
-- (2, 2, 'N', 2, 1, 'Y'),
-- (3, 3, 'N', NULL, NULL, NULL),
-- (4, 2, 'N', 4, 3, 'Y'),
-- (4, 3, 'Y', 4, 3, 'Y'),
-- (4, 4, 'N', 4, 3, 'Y');
WHERE e.primary_flag = 'Y'
   OR e2.employee_id IS NULL
-- Output for *
-- (1, 1, 'N', NULL, NULL, NULL),
-- (2, 1, 'Y', 2, 1, 'Y'),
-- (3, 3, 'N', NULL, NULL, NULL),
-- (4, 3, 'Y', 4, 3, 'Y');