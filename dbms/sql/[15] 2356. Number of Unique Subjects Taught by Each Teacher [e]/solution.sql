SELECT
    t.teacher_id,
    COUNT(DISTINCT t.subject_id) AS cnt
FROM teacher t
GROUP BY t.teacher_id;