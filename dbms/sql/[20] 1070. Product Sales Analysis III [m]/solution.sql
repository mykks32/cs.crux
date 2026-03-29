WITH product_min_year AS (
    SELECT
        product_id,
        -- minimum year
        MIN(year) AS first_year
    FROM Sales
    -- group by product_id
    GROUP BY product_id
)

SELECT
    s.product_id,
    s.year AS first_year,
    s.quantity,
    s.price
FROM Sales s
JOIN product_min_year p
     ON s.product_id = p.product_id
        -- And determines only first year row is given
         AND s.year = p.first_year;