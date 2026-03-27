SELECT e2.employee_id,
	   e2.name,
	   COUNT(*) AS reports_count,
	   ROUND(AVG(e1.age), 0) AS average_age
FROM employees e1
-- Join employees who report to the manager
JOIN employees e2
	 ON e1.reports_to = e2.employee_id
-- reports_to is not null
WHERE e1.reports_to IS NOT NULL
-- Group by manager to aggregate counts and averages
GROUP BY e2.employee_id, e2.name
-- order by employee_id
ORDER BY e2.employee_id