db.Sales.aggregate([
    {
        // Get first year per product
        $group: {
            _id: "$product_id",
            first_year: { $min: "$year" }
            }
        },
    {
        // Join back with Sales
        $lookup: {
            from: "Sales",
            let: { pid: "$_id", fy: "$first_year" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$product_id", "$$pid"] },
                                { $eq: ["$year", "$$fy"] }
                                ]
                            }
                        }
                    }
                ],
            as: "sales"
            }
        },
    {
        // Unwind joined results
        $unwind: "$sales"
        },
    // Deduplicate here
    {
        $group: {
            _id: "$_id",
            first_year: { $first: "$first_year" },
            quantity: { $first: "$sales.quantity" },
            price: { $first: "$sales.price" }
            }
        },
    // Project fields
    {
        $project: {
            _id: 0,
            product_id: "$_id",
            first_year: 1,
            quantity: 1,
            price: 1
            }
        }
    ]);