SELECT a.activity_date           AS day,
       -- Count Distinct user_id of the group
       COUNT(DISTINCT a.user_id) AS active_users
FROM activity a
-- Between 2019-06-28 to 2019-7-27
WHERE a.activity_date
          BETWEEN '2019-6-28'
          AND '2019-7-27'
GROUP BY a.activity_date
