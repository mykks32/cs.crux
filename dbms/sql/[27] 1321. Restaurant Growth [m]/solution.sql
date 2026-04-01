-- Group By visited_on
WITH daily_amount AS (
    -- Sum all payments per day
    SELECT visited_on,
           SUM(amount) AS amount
    FROM Customer
    -- Group by visited_on
    GROUP BY visited_on
    ORDER BY visited_on)


SELECT visited_on,
       amount,
       ROUND(average_amount, 2) AS average_amount
FROM (SELECT visited_on,
             -- Sum of amount in 7-day window
             SUM(amount) OVER (
                 ORDER BY visited_on
                 -- n PRECEDING = CURRENT - n ( CURRENT row - n ROW)
                 ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
                 ) AS amount,
             -- <- SUM_OUTPUT ->
             -- +----------+------+
             -- |visited_on|amount|
             -- +----------+------+
             -- |2019-01-01|100   |
             -- |2019-01-02|210   |
             -- |2019-01-03|330   |
             -- |2019-01-04|460   |
             -- |2019-01-05|570   |
             -- |2019-01-06|710   |
             -- |2019-01-07|860   |
             -- |2019-01-08|840   |
             -- |2019-01-09|840   |
             -- |2019-01-10|1000  |
             -- +----------+------+

             -- Average of 7-day window
             AVG(amount) OVER (
                 ORDER BY visited_on
                 -- n PRECEDING = CURRENT - n ( CURRENT row - n ROW)
                 ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
                 ) AS average_amount,
             -- <- AVERAGE_OUTPUT ->
             -- +----------+--------------------+
             -- |visited_on|average_amount      |
             -- +----------+--------------------+
             -- |2019-01-01|100                 |
             -- |2019-01-02|105                 |
             -- |2019-01-03|110                 |
             -- |2019-01-04|115                 |
             -- |2019-01-05|114                 |
             -- |2019-01-06|118.3333333333333333|
             -- |2019-01-07|122.8571428571428571|
             -- |2019-01-08|120                 |
             -- |2019-01-09|120                 |
             -- |2019-01-10|142.8571428571428571|
             -- +----------+--------------------+

             -- COUNT of each day preceding days
             COUNT(*) OVER (
                 ORDER BY visited_on
                 ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
                 ) AS cnt_last_7_days
              -- <- COUNT_OUTPUT ->
              -- +----------+---------------+
              -- |visited_on|cnt_last_7_days|
              -- +----------+---------------+
              -- |2019-01-01|1              |
              -- |2019-01-02|2              |
              -- |2019-01-03|3              |
              -- |2019-01-04|4              |
              -- |2019-01-05|5              |
              -- |2019-01-06|6              |
              -- |2019-01-07|7              |
              -- |2019-01-08|7              |
              -- |2019-01-09|7              |
              -- |2019-01-10|7              |
              -- +----------+---------------+

      FROM daily_amount) t
WHERE t.cnt_last_7_days = 7
-- <- FINAL_OUTPUT ->
-- +----------+------+--------------+
-- |visited_on|amount|average_amount|
-- +----------+------+--------------+
-- |2019-01-07|860   |122.86        |
-- |2019-01-08|840   |120           |
-- |2019-01-09|840   |120           |
-- |2019-01-10|1000  |142.86        |
-- +----------+------+--------------+

