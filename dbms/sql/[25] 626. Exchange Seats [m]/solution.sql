SELECT
    CASE
        -- When id is ODD And next id <= total Ids then id = id + 1
        -- for id = 1 and 2 <= 5 (true) then id = 2
        -- for id = 3 and 4 <= 5 (true) then id = 4
        -- for id = 5 and 6 <= 5 (false) so id = 5
        WHEN MOD(id, 2) = 1 AND id + 1 <= (SELECT MAX(id) FROM Seat) THEN id + 1
        -- When Id is EVEN then id = id - 1
        -- For id = 2 [EVEN] then id = 1
        -- for id = 4 [EVEN] then id = 3
        WHEN MOD(id, 2) = 0 THEN id - 1
        ELSE id
    END AS id,
    student
FROM Seat
ORDER BY id;
-- <- OUTPUT ->
-- +--+-------+
-- |id|student|
-- +--+-------+
-- |1 |Doris  |
-- |2 |Abbot  |
-- |3 |Green  |
-- |4 |Emerson|
-- |5 |Jeames |
-- +--+-------+
