-- user with most ratings
(SELECT u.name AS results
 FROM MovieRating m
          JOIN Users u ON u.user_id = m.user_id
 -- Group by user_id, name
 GROUP BY u.user_id, u.name
 -- <- GROUP_BY_OUTPUT ->
-- +-------+------+-----+
-- |user_id|name  |count|
-- +-------+------+-----+
-- |2      |Monica|3    |
-- |3      |Maria |2    |
-- |4      |James |1    |
-- |1      |Daniel|3    |
-- +-------+------+-----
 ORDER BY COUNT(*) DESC, u.name
 LIMIT 1)
-- <- ORDER_BY_OUTPUT ->
-- +-------+------+-----+
-- |user_id|name  |count|
-- +-------+------+-----+
-- |1      |Daniel|3    |
-- +-------+------+-----+

-- Union with users name and movie title
UNION ALL

-- movie with the highest average rating in February 2020
(SELECT m.title AS results
 FROM MovieRating mr
          JOIN Movies m ON m.movie_id = mr.movie_id
 -- <- JOIN_OUTPUT ->
-- +--------+-------+------+----------+--------+--------+
-- |movie_id|user_id|rating|created_at|movie_id|title   |
-- +--------+-------+------+----------+--------+--------+
-- |1       |1      |3     |2020-01-12|1       |Avengers|
-- |1       |2      |4     |2020-02-11|1       |Avengers|
-- |1       |3      |2     |2020-02-12|1       |Avengers|
-- |1       |4      |1     |2020-01-01|1       |Avengers|
-- |2       |1      |5     |2020-02-17|2       |Frozen 2|
-- |2       |2      |2     |2020-02-01|2       |Frozen 2|
-- |2       |3      |2     |2020-03-01|2       |Frozen 2|
-- |3       |1      |3     |2020-02-22|3       |Joker   |
-- |3       |2      |4     |2020-02-25|3       |Joker   |
-- +--------+-------+------+----------+--------+--------+

 -- Extract February 2020 data
 WHERE EXTRACT(MONTH FROM mr.created_at) = 2
   AND EXTRACT(YEAR FROM mr.created_at) = 2020
 -- <- WHERE_OUTPUT ->
-- +--------+-------+------+----------+--------+--------+
-- |movie_id|user_id|rating|created_at|movie_id|title   |
-- +--------+-------+------+----------+--------+--------+
-- |1       |2      |4     |2020-02-11|1       |Avengers|
-- |1       |3      |2     |2020-02-12|1       |Avengers|
-- |2       |1      |5     |2020-02-17|2       |Frozen 2|
-- |2       |2      |2     |2020-02-01|2       |Frozen 2|
-- |3       |1      |3     |2020-02-22|3       |Joker   |
-- |3       |2      |4     |2020-02-25|3       |Joker   |
-- +--------+-------+------+----------+--------+--------+

-- Group by movie_id and movie title
 GROUP BY m.movie_id, m.title
 -- <- GROUP_BY_OUTPUT ->
-- +--------+--------+---+
-- |movie_id|title   |avg|
-- +--------+--------+---+
-- |1       |Avengers|3  |
-- |2       |Frozen 2|3.5|
-- |3       |Joker   |3.5|
-- +--------+--------+---+
 ORDER BY AVG(mr.rating) DESC, m.title
 LIMIT 1)
-- +--------+--------+---+
-- |movie_id|title   |avg|
-- +--------+--------+---+
-- |2       |Frozen 2|3.5|
-- +--------+--------+---+

-- <- OUTPUT ->
-- +--------+
-- |results |
-- +--------+
-- |Daniel  |
-- |Frozen 2|
-- +--------+
