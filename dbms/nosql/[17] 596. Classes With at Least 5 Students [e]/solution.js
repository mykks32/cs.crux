db.courses.aggregate([
    // Group by class
    {
        $group: {
            _id: '$class',
            count: {
                $sum: 1
                }
            }
        },
    // Match by count >= 5 (i.e. Having c >= 5)
    {
        $match: {
            count: {
                $gte: 5
                }
            }
        },
    // Project class
    {
        $project: {
            _id: 0,
            class: '$_id'
            }
        }
    ])