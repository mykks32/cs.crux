SELECT
-- 	*
	DISTINCT l1.num AS "ConsecutiveNums"
FROM Logs l1
-- l2 -> id (1) = id (2) and l1.num and l2.num are equal
JOIN Logs l2 ON l2.id = l1.id + 1 AND l2.num = l1.num
-- l3 -> id (1) = id (3) and l1.num and l3.num are equal
JOIN logs l3 ON l3.id = l1.id + 2 AND l3.num = l1.num;

WITH consecutive_groups AS (
-- 	('1', 1, 0),
-- 	('1', 2, 0),
-- 	('1', 3, 0),
-- 	('1', 5, 1),
-- 	('2', 4, 3),
-- 	('2', 6, 4),
-- 	('2', 7, 4);
	SELECT
		num,
		id,
		id - ROW_NUMBER() OVER (PARTITION BY num ORDER BY id) AS grp
	FROM Logs
)
SELECT
-- 	('1', 0, 3),
-- 	('1', 1, 1),
-- 	('2', 3, 1),
-- 	('2', 4, 2);
-- 	num, grp, COUNT(*)
	DISTINCT num AS "ConsecutiveNums"
FROM consecutive_groups
GROUP BY num, grp
HAVING COUNT(*) >= 3
-- [{"ConsecutiveNums": "1"}]
