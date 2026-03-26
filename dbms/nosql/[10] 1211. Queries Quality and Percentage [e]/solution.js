db.queries.aggregate([
	// Group by query_name
	// find quality, poor rating count, total rating count
	{
		$group: {
			_id: '$query_name',
			quality: { $avg: { $divide: ["$rating", "$position"] } },
			poor_count: { $sum: { $cond: [{ $lt: ["$rating", 3] }, 1, 0] } },
			total_count: { $sum: 1 }
			}
		},
	// project query_name, quality, poor_query_percentage
	{
		$project: {
			_id: 0,
			query_name: '$_id',
			// Round to 2
			quality: {
				$round: [
					'$quality',
					2
					]
				},
			// Round to 2
			poor_query_percentage: {
				$round: [
					{
						$divide: [
							'$poor_count',
							'$total_count'
							]
						},
					2
					]
				}
			}
		},
	// Sort by quality
	{
		$sort: {
			quality: -1
			}
		}
	])