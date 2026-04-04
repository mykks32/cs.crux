db.Orders
    .aggregate([
    // $match: { condition } → filter documents
    {
        $match: {
            // $expr → use aggregation expressions in match
            $expr: {
                // $and: [cond1, cond2] → all must be true
                $and: [
                    // { $eq: [expr1, expr2] } → equality check
                    { $eq: [ { $month: "$order_date" }, 2 ] },
                    { $eq: [ { $year: "$order_date" }, 2020 ] }
                    ]
                }
            }
        },
    //    <- MATCH_OUTPUT ->
    //    +------------------------+------------------------+----------+----+
    //    |_id                     |order_date              |product_id|unit|
    //    +------------------------+------------------------+----------+----+
    //    |69d1440cbcf2c24faa43fc85|2020-02-05T00:00:00.000Z|1         |60  |
    //    |69d1440cbcf2c24faa43fc86|2020-02-10T00:00:00.000Z|1         |70  |
    //    |69d1440cbcf2c24faa43fc88|2020-02-11T00:00:00.000Z|2         |80  |
    //    |69d1440cbcf2c24faa43fc89|2020-02-17T00:00:00.000Z|3         |2   |
    //    |69d1440cbcf2c24faa43fc8a|2020-02-24T00:00:00.000Z|3         |3   |
    //    |69d1440cbcf2c24faa43fc8c|2020-02-25T00:00:00.000Z|5         |50  |
    //    |69d1440cbcf2c24faa43fc8d|2020-02-27T00:00:00.000Z|5         |50  |
    //    +------------------------+------------------------+----------+----+

    // GROUP by product_id
    {
        $group: {
            _id: '$product_id',
            unit: { $sum: '$unit' }
            }
        },
    //    <- GROUP_OUTPUT ->
    //    +---+----+
    //    |_id|unit|
    //    +---+----+
    //    |1  |130 |
    //    |3  |5   |
    //    |5  |100 |
    //    |2  |80  |
    //    +---+----+

    // Match greater than equal to 100 units
    {
        $match: {
            unit: {
                $gte: 100
                }
            }
        },
    // Project Product_id and unit
    {
        $project: {
            _id: 0,
            product_id: '$_id',
            unit: 1
            }
        },
    //    <- GROUP_PROJECT_OUTPUT ->
    //    +----------+----+
    //    |product_id|unit|
    //    +----------+----+
    //    |1         |130 |
    //    |5         |100 |
    //    +----------+----+

    // lookup products collection for matched orders
    {
        $lookup: {
            from: 'Products',
            let: {
                product_id: '$product_id',
                },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: [ '$product_id', '$$product_id' ]
                            }
                        }
                    }
                ],
            as: 'matched_orders'
            }
        },
    { $unwind: '$matched_orders' },
    //    <- LOOKUP_OUTPUT ->
    //    +--------------------------------------------------------------------------------------------------------------------------------+----------+----+
    //    |matched_orders                                                                                                                  |product_id|unit|
    //    +--------------------------------------------------------------------------------------------------------------------------------+----------+----+
    //    |{"_id": {"$oid": "69d1440cbcf2c24faa43fc84"}, "product_id": 5, "product_name": "Leetcode Kit", "product_category": "T-shirt"}   |5         |100 |
    //    |{"_id": {"$oid": "69d1440cbcf2c24faa43fc80"}, "product_id": 1, "product_name": "Leetcode Solutions", "product_category": "Book"}|1         |130 |
    //    +--------------------------------------------------------------------------------------------------------------------------------+----------+----+

    // Project product_id, product_name, unit
    {
        $project: {
            product_id: 1,
            product_name: '$matched_orders.product_name',
            unit: 1
            }
        }
    //    <- FINAL_OUTPUT ->
    //    +----------+------------------+----+
    //    |product_id|product_name      |unit|
    //    +----------+------------------+----+
    //    |1         |Leetcode Solutions|130 |
    //    |5         |Leetcode Kit      |100 |
    //    +----------+------------------+----+
    ])
    //    .explain("allPlansExecution")
    //    .explain("executionStats")
    //    .explain("queryPlanner")
