----------------------------------
-- Using CTEs and Window Function
-----------------------------------
WITH
    total_weight AS
        (SELECT queue.person_name,
                --  ROWS – physical row frames:
                -- 	UNBOUNDED PRECEDING – from first row to current
                SUM(weight) OVER (ORDER BY turn ROWS UNBOUNDED PRECEDING) AS cum_weight
         FROM queue
         ORDER BY cum_weight DESC)
-- Get Person Name and Cumulative Weight
-- +-----------+----------+
-- |person_name|cum_weight|
-- +-----------+----------+
-- |Winston    |1875      |
-- |Bob        |1375      |
-- |Marie      |1200      |
-- |John Cena  |1000      |
-- |Alex       |600       |
-- |Alice      |250       |
-- +-----------+----------+

SELECT t.person_name
FROM total_weight t
WHERE t.cum_weight <= 1000
-- Name and Cumulative Weight less than 1000
-- +-----------+----------+
-- |person_name|cum_weight|
-- +-----------+----------+
-- |John Cena  |1000      |
-- |Alex       |600       |
-- |Alice      |250       |
-- +-----------+----------+
LIMIT 1;
-- Only First element
-- +-----------+
-- |person_name|
-- +-----------+
-- |John Cena  |
-- +-----------+

-----------------------------
-- Using Select & Join only
-----------------------------
SELECT p1.person_name
FROM Queue p1
         JOIN Queue p2
              ON p2.turn <= p1.turn
-- Here we find all the users whose turn is less or equal to user
-- +---------+-----------+------+----+---------+-----------+------+----+
-- |person_id|person_name|weight|turn|person_id|person_name|weight|turn|
-- +---------+-----------+------+----+---------+-----------+------+----+
-- |6        |John Cena  |400   |3   |5        |Alice      |250   |1   |
-- |6        |John Cena  |400   |3   |3        |Alex       |350   |2   |
-- |6        |John Cena  |400   |3   |6        |John Cena  |400   |3   |
-- +---------+-----------+------+----+---------+-----------+------+----+
GROUP BY p1.person_id, p1.person_name, p1.turn
-- Group by person_id, person_name, turn
-- +---------+-----------+----+
-- |person_id|person_name|turn|
-- +---------+-----------+----+
-- |1        |Winston    |6   |
-- |5        |Alice      |1   |
-- |2        |Marie      |4   |
-- |6        |John Cena  |3   |
-- |3        |Alex       |2   |
-- |4        |Bob        |5   |
-- +---------+-----------+----+
HAVING SUM(p2.weight) <= 1000
-- Sum of Group whose weight <= 1000
-- +---------+-----------+----+
-- |person_id|person_name|turn|
-- +---------+-----------+----+
-- |5        |Alice      |1   |
-- |6        |John Cena  |3   |
-- |3        |Alex       |2   |
-- +---------+-----------+----+
ORDER BY p1.turn DESC
LIMIT 1;
-- Sorted by Descending and got only 1st row
-- +-----------+
-- |person_name|
-- +-----------+
-- |John Cena  |
-- +-----------+

