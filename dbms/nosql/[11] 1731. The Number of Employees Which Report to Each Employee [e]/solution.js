db.employees.aggregate([
	// match all the report_to is not null
	{
		$match: { reports_to: { $ne: null } }
		},
	// group based on report_to that are not null
	{
		$group: {
			// group based on report_to
			_id: '$reports_to',
			// count total docs in the group
			reports_count: {
				$sum: 1
				},
			// average of the age in the group
			average_age: {
				$avg: "$age" }
			}
		},
	{
		// self join on employee_id and _id in group
		$lookup: {
			from: 'employees',
			localField: '_id',
			foreignField: 'employee_id',
			as: 'manager'
			}
		},
	{
		$unwind: '$manager'
		},
	{
		// project employee_id, name, average_age, reports_count
		$project: {
			_id: 0,
			employee_id: "$manager.employee_id",
			name: "$manager.name",
			reports_count: 1,
			average_age: { $round: ["$average_age", 0] }
			}
		},
	// sort by employee_id
	{
		$sort: {
			employee_id: 1
		}
	}
	])