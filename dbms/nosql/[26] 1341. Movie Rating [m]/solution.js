db.MovieRating.aggregate([
    // Lookup in Users Collections
    {
        $lookup: {
            from: 'Users',
            localField: 'user_id',
            foreignField: 'user_id',
            as: 'users_rating'
            }
        },
    {
        $unwind: '$users_rating'
        },

    //    <- LOOKUP_UNWIND_OUTPUT ->
    //    +------------------------+------------------------+--------+------+-------+-----------------------------------------------------------------------------+
    //    |_id                     |created_at              |movie_id|rating|user_id|users_rating                                                                 |
    //    +------------------------+------------------------+--------+------+-------+-----------------------------------------------------------------------------+
    //    |69cba3c43b56083e4ce4248a|2020-01-12T00:00:00.000Z|1       |3     |1      |{"_id": {"$oid": "69cba3c43b56083e4ce42486"}, "user_id": 1, "name": "Daniel"}|
    //    |69cba3c43b56083e4ce4248b|2020-02-11T00:00:00.000Z|1       |4     |2      |{"_id": {"$oid": "69cba3c43b56083e4ce42487"}, "user_id": 2, "name": "Monica"}|
    //    |69cba3c43b56083e4ce4248c|2020-02-12T00:00:00.000Z|1       |2     |3      |{"_id": {"$oid": "69cba3c43b56083e4ce42488"}, "user_id": 3, "name": "Maria"} |
    //    |69cba3c43b56083e4ce4248d|2020-01-01T00:00:00.000Z|1       |1     |4      |{"_id": {"$oid": "69cba3c43b56083e4ce42489"}, "user_id": 4, "name": "James"} |
    //    |69cba3c43b56083e4ce4248e|2020-02-17T00:00:00.000Z|2       |5     |1      |{"_id": {"$oid": "69cba3c43b56083e4ce42486"}, "user_id": 1, "name": "Daniel"}|
    //    |69cba3c43b56083e4ce4248f|2020-02-01T00:00:00.000Z|2       |2     |2      |{"_id": {"$oid": "69cba3c43b56083e4ce42487"}, "user_id": 2, "name": "Monica"}|
    //    |69cba3c43b56083e4ce42490|2020-03-01T00:00:00.000Z|2       |2     |3      |{"_id": {"$oid": "69cba3c43b56083e4ce42488"}, "user_id": 3, "name": "Maria"} |
    //    |69cba3c43b56083e4ce42491|2020-02-22T00:00:00.000Z|3       |3     |1      |{"_id": {"$oid": "69cba3c43b56083e4ce42486"}, "user_id": 1, "name": "Daniel"}|
    //    |69cba3c43b56083e4ce42492|2020-02-25T00:00:00.000Z|3       |4     |2      |{"_id": {"$oid": "69cba3c43b56083e4ce42487"}, "user_id": 2, "name": "Monica"}|
    //    +------------------------+------------------------+--------+------+-------+-----------------------------------------------------------------------------+

    // LOOKUP in Movies collections
    {
        $lookup: {
            from: "Movies",
            localField: "movie_id",
            foreignField: "movie_id",
            as: "movie_info"
            }
        },
    { $unwind: "$movie_info" },
    //    <- LOOKUP_OUTPUT ->
    //    +------------------------+------------------------+--------+---------------------------------------------------------------------------------+------+-------+
    //    |_id                     |created_at              |movie_id|movie_info                                                                       |rating|user_id|
    //    +------------------------+------------------------+--------+---------------------------------------------------------------------------------+------+-------+
    //    |69cba3c43b56083e4ce4248a|2020-01-12T00:00:00.000Z|1       |{"_id": {"$oid": "69cba3c33b56083e4ce42483"}, "movie_id": 1, "title": "Avengers"}|3     |1      |
    //    |69cba3c43b56083e4ce4248b|2020-02-11T00:00:00.000Z|1       |{"_id": {"$oid": "69cba3c33b56083e4ce42483"}, "movie_id": 1, "title": "Avengers"}|4     |2      |
    //    |69cba3c43b56083e4ce4248c|2020-02-12T00:00:00.000Z|1       |{"_id": {"$oid": "69cba3c33b56083e4ce42483"}, "movie_id": 1, "title": "Avengers"}|2     |3      |
    //    |69cba3c43b56083e4ce4248d|2020-01-01T00:00:00.000Z|1       |{"_id": {"$oid": "69cba3c33b56083e4ce42483"}, "movie_id": 1, "title": "Avengers"}|1     |4      |
    //    |69cba3c43b56083e4ce4248e|2020-02-17T00:00:00.000Z|2       |{"_id": {"$oid": "69cba3c33b56083e4ce42484"}, "movie_id": 2, "title": "Frozen 2"}|5     |1      |
    //    |69cba3c43b56083e4ce4248f|2020-02-01T00:00:00.000Z|2       |{"_id": {"$oid": "69cba3c33b56083e4ce42484"}, "movie_id": 2, "title": "Frozen 2"}|2     |2      |
    //    |69cba3c43b56083e4ce42490|2020-03-01T00:00:00.000Z|2       |{"_id": {"$oid": "69cba3c33b56083e4ce42484"}, "movie_id": 2, "title": "Frozen 2"}|2     |3      |
    //    |69cba3c43b56083e4ce42491|2020-02-22T00:00:00.000Z|3       |{"_id": {"$oid": "69cba3c33b56083e4ce42485"}, "movie_id": 3, "title": "Joker"}   |3     |1      |
    //    |69cba3c43b56083e4ce42492|2020-02-25T00:00:00.000Z|3       |{"_id": {"$oid": "69cba3c33b56083e4ce42485"}, "movie_id": 3, "title": "Joker"}   |4     |2      |
    //    +------------------------+------------------------+--------+---------------------------------------------------------------------------------+------+-------+

    // Define all categories in parallel
    // $facet -> Runs multiple pipelines simultaneously like CTEs
    {
        $facet: {
            // Top user by count
            topUsers: [
                {
                    $group: {
                        _id: {
                            user_id: "$users_rating.user_id",
                            name: "$users_rating.name"
                            },
                        count: { $sum: 1 }
                        }
                    },
                //    <- GROUP_BY_OUTPUT ->
                //    +--------------------------------+-----+
                //    |_id                             |count|
                //    +--------------------------------+-----+
                //    |{"user_id": 3, "name": "Maria"} |2    |
                //    |{"user_id": 4, "name": "James"} |1    |
                //    |{"user_id": 2, "name": "Monica"}|3    |
                //    |{"user_id": 1, "name": "Daniel"}|3    |
                //    +--------------------------------+-----+
                {
                    $sort: {
                        count: -1,
                        '_id.name': 1
                        }
                    },
                {
                    $limit: 1
                    },
                //    <- SORT_LIMIT_OUTPUT
                //    +--------------------------------+-----+
                //    |_id                             |count|
                //    +--------------------------------+-----+
                //    |{"user_id": 1, "name": "Daniel"}|3    |
                //    +--------------------------------+-----+
                { $project: { _id: 0, results: "$_id.name" } }
                ],
            // Top movie by avg rating in Feb 2020
            topMovie: [
                {
                    $match: {
                        created_at: { $gte: new Date("2020-02-01"), $lte: new Date("2020-02-29") }
                        }
                    },
                {
                    $group: {
                        _id: { movie_id: "$movie_info.movie_id", title: "$movie_info.title" },
                        avgRating: { $avg: "$rating" }
                        }
                    },
                //    <- MATCH_GROUP_OUTPUT ->
                //    +------------------------------------+---------+
                //    |_id                                 |avgRating|
                //    +------------------------------------+---------+
                //    |{"movie_id": 2, "title": "Frozen 2"}|3.5      |
                //    |{"movie_id": 1, "title": "Avengers"}|3        |
                //    |{"movie_id": 3, "title": "Joker"}   |3.5      |
                //    +------------------------------------+---------+
                { $sort: { avgRating: -1, "_id.title": 1 } },
                { $limit: 1 },
                { $project: { _id: 0, results: "$_id.title" } }
                ]
            }
        },
    //    <- FACET_OUTPUT ->
    //    +-------------------------+-----------------------+
    //    |topMovie                 |topUsers               |
    //    +-------------------------+-----------------------+
    //    |[{"results": "Frozen 2"}]|[{"results": "Daniel"}]|
    //    +-------------------------+-----------------------+
    {
        $project: {
            combined: { $concatArrays: ["$topUsers", "$topMovie"] }
            }
        },
    //    <- PROJECT_OUTPUT ->
    //    +------------------------------------------------+
    //    |combined                                        |
    //    +------------------------------------------------+
    //    |[{"results": "Daniel"}, {"results": "Frozen 2"}]|
    //    +------------------------------------------------+

    { $unwind: "$combined" },
    // $repaceRoot -> replaces the entire document with a specified nested field
    // { $replaceRoot: { newRoot: "$address" } } converts { name: "Alice", address: { city: "Kathmandu" } } into { city: "Kathmandu" }.
    { $replaceRoot: { newRoot: "$combined" } }
    //    <- FINAL_OUTPUT ->
    //    +--------+
    //    |results |
    //    +--------+
    //    |Daniel  |
    //    |Frozen 2|
    //    +--------+
    ])