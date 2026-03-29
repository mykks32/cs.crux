// Insert in followers
    db.followers.insertMany([
        {user_id: 0, follower_id: 1},
        {user_id: 1, follower_id: 0},
        {user_id: 2, follower_id: 0},
        {user_id: 2, follower_id: 1}
        ])