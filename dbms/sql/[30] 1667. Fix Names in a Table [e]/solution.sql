SELECT user_id,
       -- Concat(str1, str2, ... )
       CONCAT(
           -- Upper & left substring for 1st letter
               UPPER(LEFT(name, 1)),
           -- Lower and Substring from 2nd letter
               LOWER(SUBSTRING(name, 2))) AS name
FROM users
ORDER BY user_id