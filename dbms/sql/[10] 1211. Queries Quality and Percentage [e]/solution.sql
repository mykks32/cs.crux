SELECT
	query_name,
	-- quality = avg(rating / position)
	ROUND(AVG(rating::NUMERIC / position), 2) AS quality,
	-- poor query percentage
	ROUND(
			COUNT(CASE WHEN rating < 3 THEN 1 END) * 100.0
				/ COUNT(*),
			2) AS poor_query_percentage

FROM Queries
GROUP BY query_name
ORDER BY quality DESC;