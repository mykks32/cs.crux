SELECT c.class
FROM courses c
-- Group by class
GROUP BY c.class
-- Having count >= 5
HAVING COUNT(c.student) >= 5