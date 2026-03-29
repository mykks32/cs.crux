db.activity.aggregate([
    // between 2019-06-28 and 2019-07-27
    {
        $match: {
            activity_date: {
                $gt: "2019-06-28",
                $lte: "2019-07-27"
                }
            }
        },
    // group by activity_date
    {
        $group: {
            _id: "$activity_date",
            // addToSet for Distinct user_id
            active_users: { $addToSet: "$user_id" }
            }
        },
    {
        $project: {
            _id: 0,
            day: "$_id",
            active_users: { $size: "$active_users" }
            }
        }
    ]);