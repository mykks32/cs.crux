-- EXPLAIN ANALYSE
WITH depart_salary_rank
         AS ( SELECT e.departmentid,
                     e.salary,
                     e.name,
                     -- DENSE_RANK() assigns ranking within each department
                     -- PARTITION BY e.departmentid → resets rank for each department
                     -- ORDER BY e.salary DESC → highest salary gets rank 1
                     DENSE_RANK() OVER (PARTITION BY e.departmentid ORDER BY e.salary DESC) AS rank
              FROM "Employee" e )
-- <- CTE_OUTPUT ->
-- +------------+------+-----+----+
-- |departmentid|salary|name |rank|
-- +------------+------+-----+----+
-- |1           |90000 |Max  |1   |
-- |1           |85000 |Joe  |2   |
-- |1           |85000 |Randy|2   |
-- |1           |70000 |Will |3   |
-- |1           |69000 |Janet|4   |
-- |2           |80000 |Henry|1   |
-- |2           |60000 |Sam  |2   |
-- +------------+------+-----+----+

SELECT d.name     AS Department,
       dsr.name   AS Employee,
       dsr.salary AS Salary
FROM depart_salary_rank dsr
JOIN "Department" d
     ON dsr.departmentid = d.id
-- <- JOIN_OUTPUT ->
-- +----------+--------+------+
-- |department|employee|salary|
-- +----------+--------+------+
-- |IT        |Joe     |85000 |
-- |Sales     |Henry   |80000 |
-- |Sales     |Sam     |60000 |
-- |IT        |Max     |90000 |
-- |IT        |Janet   |69000 |
-- |IT        |Randy   |85000 |
-- |IT        |Will    |70000 |
-- +----------+--------+------+
WHERE rank <= 3
-- <- FINAL_OUTPUT ->
-- +----------+--------+------+
-- |department|employee|salary|
-- +----------+--------+------+
-- |IT        |Max     |90000 |
-- |IT        |Joe     |85000 |
-- |IT        |Randy   |85000 |
-- |IT        |Will    |70000 |
-- |Sales     |Henry   |80000 |
-- |Sales     |Sam     |60000 |
-- +----------+--------+------+


----------------------------------
-- <- EXPLAIN_ANALYZE_OUTPUT ->
-----------------------------------
-- +---------------------------------------------------------------------------------------------------------------------------+
-- |QUERY PLAN                                                                                                                 |
-- +---------------------------------------------------------------------------------------------------------------------------+
-- |Hash Join  (cost=117.20..154.06 rows=1130 width=68) (actual time=0.034..0.042 rows=6 loops=1)                              |
-- |  Hash Cond: (e.departmentid = d.id)                                                                                       |
-- |  ->  WindowAgg  (cost=78.62..101.20 rows=1130 width=48) (actual time=0.016..0.021 rows=6 loops=1)                         |
-- |        Run Condition: (dense_rank() OVER (?) <= 3)                                                                        |
-- |        ->  Sort  (cost=78.60..81.43 rows=1130 width=40) (actual time=0.010..0.011 rows=7 loops=1)                         |
-- |              Sort Key: e.departmentid, e.salary DESC                                                                      |
-- |              Sort Method: quicksort  Memory: 25kB                                                                         |
-- |              ->  Seq Scan on "Employee" e  (cost=0.00..21.30 rows=1130 width=40) (actual time=0.003..0.004 rows=7 loops=1)|
-- |  ->  Hash  (cost=22.70..22.70 rows=1270 width=36) (actual time=0.014..0.015 rows=2 loops=1)                               |
-- |        Buckets: 2048  Batches: 1  Memory Usage: 17kB                                                                      |
-- |        ->  Seq Scan on "Department" d  (cost=0.00..22.70 rows=1270 width=36) (actual time=0.011..0.012 rows=2 loops=1)    |
-- |Planning Time: 0.117 ms                                                                                                    |
-- |Execution Time: 0.071 ms                                                                                                   |
-- +---------------------------------------------------------------------------------------------------------------------------+