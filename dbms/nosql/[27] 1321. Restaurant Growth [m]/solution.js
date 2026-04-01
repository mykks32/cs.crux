db.customer.aggregate([
    // Compute daily_amount
    // CTEs for daily_amount
    {
        $facet: {
            daily_amount: [
                { $group: { _id: '$visited_on', amount: { $sum: '$amount' } } },
                { $project: { _id: 0, visited_on: '$_id', amount: 1 } },
                { $sort: { visited_on: 1 } }
                ]
            }
        },

    // Unwind and replace
    { $unwind: '$daily_amount' },
    // $repaceRoot -> replaces the entire document with a specified nested field
    // { $replaceRoot: { newRoot: "$address" } } converts { name: "Alice", address: { city: "Kathmandu" } } into { city: "Kathmandu" }.
    { $replaceRoot: { newRoot: '$daily_amount' } },
    //  <- FACET_OUTPUT ->
    //  +------+------------------------+
    //  |amount|visited_on              |
    //  +------+------------------------+
    //  |100   |2019-01-01T00:00:00.000Z|
    //  |110   |2019-01-02T00:00:00.000Z|
    //  |120   |2019-01-03T00:00:00.000Z|
    //  |130   |2019-01-04T00:00:00.000Z|
    //  |110   |2019-01-05T00:00:00.000Z|
    //  |140   |2019-01-06T00:00:00.000Z|
    //  |150   |2019-01-07T00:00:00.000Z|
    //  |80    |2019-01-08T00:00:00.000Z|
    //  |110   |2019-01-09T00:00:00.000Z|
    //  |280   |2019-01-10T00:00:00.000Z|
    //  +------+------------------------+

    // amountLast7Day with window function
    // ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    {
        $setWindowFields: {
            sortBy: { visited_on: 1 },
            output: {
                amountLast7Days: {
                    $sum: '$amount',
                    window: { documents: [-6, 0] }
                    },
                amountAverageLast7Days: {
                    $avg: '$amount',
                    window: {documents: [-6, 0]}
                    },
                cnt_last_7_days: {
                    $count: {},
                    window: { documents: [-6, 0] }
                    }
                }
            }
        },
    //    <- WINDOW_OUTPUT ->
    //    +------+----------------------+---------------+---------------+------------------------+
    //    |amount|amountAverageLast7Days|amountLast7Days|cnt_last_7_days|visited_on              |
    //    +------+----------------------+---------------+---------------+------------------------+
    //    |100   |100                   |100            |1              |2019-01-01T00:00:00.000Z|
    //    |110   |105                   |210            |2              |2019-01-02T00:00:00.000Z|
    //    |120   |110                   |330            |3              |2019-01-03T00:00:00.000Z|
    //    |130   |115                   |460            |4              |2019-01-04T00:00:00.000Z|
    //    |110   |114                   |570            |5              |2019-01-05T00:00:00.000Z|
    //    |140   |118.33333333333333    |710            |6              |2019-01-06T00:00:00.000Z|
    //    |150   |122.85714285714286    |860            |7              |2019-01-07T00:00:00.000Z|
    //    |80    |120                   |840            |7              |2019-01-08T00:00:00.000Z|
    //    |110   |120                   |840            |7              |2019-01-09T00:00:00.000Z|
    //    |280   |142.85714285714286    |1000           |7              |2019-01-10T00:00:00.000Z|
    //    +------+----------------------+---------------+---------------+------------------------+

    // Match only last 7 days documents
    { $match: { cnt_last_7_days: 7 } },
    //    <- MATCH_OUTPUT ->
    //    +------+----------------------+---------------+---------------+------------------------+
    //    |amount|amountAverageLast7Days|amountLast7Days|cnt_last_7_days|visited_on              |
    //    +------+----------------------+---------------+---------------+------------------------+
    //    |150   |122.85714285714286    |860            |7              |2019-01-07T00:00:00.000Z|
    //    |80    |120                   |840            |7              |2019-01-08T00:00:00.000Z|
    //    |110   |120                   |840            |7              |2019-01-09T00:00:00.000Z|
    //    |280   |142.85714285714286    |1000           |7              |2019-01-10T00:00:00.000Z|
    //    +------+----------------------+---------------+---------------+------------------------+

    // Project final Output
    {
        $project: {
            visited_on: 1,
            amount: '$amountLast7Days',
            average_amount: {
                $round: ['$amountAverageLast7Days',2]
                }
            }
        },
    //    <- PROJECT_FINAL_OUTPUT ->
    //    +------+--------------+------------------------+
    //    |amount|average_amount|visited_on              |
    //    +------+--------------+------------------------+
    //    |860   |122.86        |2019-01-07T00:00:00.000Z|
    //    |840   |120           |2019-01-08T00:00:00.000Z|
    //    |840   |120           |2019-01-09T00:00:00.000Z|
    //    |1000  |142.86        |2019-01-10T00:00:00.000Z|
    //    +------+--------------+------------------------+

    ])