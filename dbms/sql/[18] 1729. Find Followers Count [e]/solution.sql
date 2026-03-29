SELECT f.user_id,
       -- Count no of followers
       COUNT(f.follower_id) AS followers_count
FROM followers f
-- Group by user_id
GROUP BY f.user_id
ORDER BY f.user_id