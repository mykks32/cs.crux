db.RequestAccepted.aggregate([
    // UNION ALL -> $facet two column
    {
        $facet: {
            requester: [
                { $project: { _id: 0, id: "$requester_id" } }
                ],
            accepter: [
                { $project: { _id: 0, id: "$accepter_id" } }
                ]
            }
        },
    //    <- FACET_OUTPUT ->
    //    +--------------------------------------------+--------------------------------------------+
    //    |accepter                                    |requester                                   |
    //    +--------------------------------------------+--------------------------------------------+
    //    |[{"id": 2}, {"id": 3}, {"id": 3}, {"id": 4}]|[{"id": 1}, {"id": 1}, {"id": 2}, {"id": 3}]|
    //    +--------------------------------------------+--------------------------------------------+

    // Project combined concat Array with id
    {
        $project: {
            combined: {
                $concatArrays: ["$requester", "$accepter"]
                }
            }
        },
    //    <- PROJECT_OUTPUT ->
    //    +----------------------------------------------------------------------------------------+
    //    |combined                                                                                |
    //    +----------------------------------------------------------------------------------------+
    //    |[{"id": 1}, {"id": 1}, {"id": 2}, {"id": 3}, {"id": 2}, {"id": 3}, {"id": 3}, {"id": 4}]|
    //    +----------------------------------------------------------------------------------------+

    // Unwind Array
    { $unwind: "$combined" },
    //    <- UNWIND_OUTPUT ->
    //    +---------+
    //    |combined |
    //    +---------+
    //    |{"id": 1}|
    //    |{"id": 1}|
    //    |{"id": 2}|
    //    |{"id": 3}|
    //    |{"id": 2}|
    //    |{"id": 3}|
    //    |{"id": 3}|
    //    |{"id": 4}|
    //    +---------+

    // $repaceRoot -> replaces the entire document with a specified nested field
    // { $replaceRoot: { newRoot: "$address" } } converts { name: "Alice", address: { city: "Kathmandu" } } into { city: "Kathmandu" }.
    {
        $replaceRoot: {
            newRoot: "$combined"
            }
        },
    //    <- REPLACE_ROOT_OUTPUT ->
    //    +--+
    //    |id|
    //    +--+
    //    |1 |
    //    |1 |
    //    |2 |
    //    |3 |
    //    |2 |
    //    |3 |
    //    |3 |
    //    |4 |
    //    +--+

    // GROUP by id
    {
        $group: {
            _id: '$id',
            num: {$sum: 1}
            }
        },
    //    <- GROUP_OUTPUT ->
    //    +---+---+
    //    |_id|num|
    //    +---+---+
    //    |2  |2  |
    //    |3  |3  |
    //    |4  |1  |
    //    |1  |2  |
    //    +---+---+

    // SORT by num
    {
        $sort: {
            num: -1
            }
        },
    //    <- SORT_OUTPUT ->
    //    +---+---+
    //    |_id|num|
    //    +---+---+
    //    |3  |3  |
    //    |2  |2  |
    //    |1  |2  |
    //    |4  |1  |
    //    +---+---+

    // LIMIT to 1
    {
        $limit: 1
        },
    // <- LIMIT_OUTPUT ->
    //    +---+---+
    //    |_id|num|
    //    +---+---+
    //    |3  |3  |
    //    +---+---+

    // PROJECT id & num
    {
        $project: {
            _id: 0,
            id: '$_id',
            num: 1
            }
        }
    //    <- FINAL_OUTPUT ->
    //    +--+---+
    //    |id|num|
    //    +--+---+
    //    |3 |3  |
    //    +--+---+

    ]);