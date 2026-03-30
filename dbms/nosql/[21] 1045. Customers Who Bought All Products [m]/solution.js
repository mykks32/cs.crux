db.customer.aggregate([
    // lookup in product Table
    {
        $lookup: {
            from: "product",
            localField: "product_key",
            foreignField: "product_key",
            as: "product"
            }
        },
    //    <- OUTPUT ->
    //    +------------------------+-----------+-----------------------------------------------------------------+-----------+
    //    |_id                     |customer_id|product                                                          |product_key|
    //    +------------------------+-----------+-----------------------------------------------------------------+-----------+
    //    |69ca3cfa3b56083e4ce4245f|1          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245d"}, "product_key": 5}]|5          |
    //    |69ca3cfa3b56083e4ce42460|2          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245e"}, "product_key": 6}]|6          |
    //    |69ca3cfa3b56083e4ce42461|3          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245d"}, "product_key": 5}]|5          |
    //    |69ca3cfa3b56083e4ce42462|3          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245e"}, "product_key": 6}]|6          |
    //    |69ca3cfa3b56083e4ce42463|1          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245e"}, "product_key": 6}]|6          |
    //    +------------------------+-----------+-----------------------------------------------------------------+-----------+

    //    Match only that exists
    {
        $match: {
            "product.0": { $exists: true }
            }
        },
    //    <- OUTPUT ->
    //    +------------------------+-----------+-----------------------------------------------------------------+-----------+
    //    |_id                     |customer_id|product                                                          |product_key|
    //    +------------------------+-----------+-----------------------------------------------------------------+-----------+
    //    |69ca3cfa3b56083e4ce4245f|1          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245d"}, "product_key": 5}]|5          |
    //    |69ca3cfa3b56083e4ce42460|2          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245e"}, "product_key": 6}]|6          |
    //    |69ca3cfa3b56083e4ce42461|3          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245d"}, "product_key": 5}]|5          |
    //    |69ca3cfa3b56083e4ce42462|3          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245e"}, "product_key": 6}]|6          |
    //    |69ca3cfa3b56083e4ce42463|1          |[{"_id": {"$oid": "69ca3cf93b56083e4ce4245e"}, "product_key": 6}]|6          |
    //    +------------------------+-----------+-----------------------------------------------------------------+-----------+
    {
        $group: {
            _id: '$customer_id',
            product_count: {
                $addToSet: '$product_key'
                }
            }
        },
    //    <- GROUP_OUTPUT ->
    //    +---+-------------+
    //    |_id|product_count|
    //    +---+-------------+
    //    |2  |[6]          |
    //    |3  |[5, 6]       |
    //    |1  |[6, 5]       |
    //    +---+-------------+

    // Lookup to count total document in the product table
    {
        $lookup: {
            from: "product",
            pipeline: [{ $count: "total_count" }],
            as: "total"
            }
        },
    //    <- LOOKUP_OUTPUT ->
    //    +---+-------------+--------------------+
    //    |_id|product_count|total               |
    //    +---+-------------+--------------------+
    //    |1  |[5, 6]       |[{"total_count": 2}]|
    //    |2  |[6]          |[{"total_count": 2}]|
    //    |3  |[5, 6]       |[{"total_count": 2}]|
    //    +---+-------------+--------------------+

    // Match product_count = total_count in product collection
    // Having (DISTINCT product_key) = (SELECT * FROM product)
    {
        $match: {
            $expr: {
                $eq: [
                    {
                        $size: '$product_count'
                        },
                    {
                        $arrayElemAt: ["$total.total_count", 0]
                        }
                    ]
                }
            }
        },
    //    <- HAVING_MATCH_OUTPUT ->
    //    +---+-------------+--------------------+
    //    |_id|product_count|total               |
    //    +---+-------------+--------------------+
    //    |1  |[6, 5]       |[{"total_count": 2}]|
    //    |3  |[5, 6]       |[{"total_count": 2}]|
    //    +---+-------------+--------------------+
    {
        $project: {
            _id: 0,
            customer_id: '$_id',
            count: '$count'
            }
        }
    //    <- PROJECT_OUTPUT ->
    //    +-----------+
    //    |customer_id|
    //    +-----------+
    //    |1          |
    //    |3          |
    //    +-----------+
    ])