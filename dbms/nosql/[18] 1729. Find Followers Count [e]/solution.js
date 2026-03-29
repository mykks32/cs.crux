db.followers.aggregate([
    // Group by user_id
    {
        $group: {
            _id: '$user_id',
            // Count Total followers
            follower_count: {
                $sum: 1
                }
            }
        },
    // Project only user_id & followers_count
    {
        $project: {
            _id: 0,
            user_id: '$_id',
            follower_count: 1
            }
        },
    {
        $sort: {
            user_id: 1
            }
        }
    ])