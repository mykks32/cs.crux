// Insert into employees collections
	db.employees.insertMany([
		{
			employee_id: 9,
			name: "Hercy",
			reports_to: null,
			age: 43
			},
		{
			employee_id: 6,
			name: "Alice",
			reports_to: 9,
			age: 41
			},
		{
			employee_id: 4,
			name: "Bob",
			reports_to: 9,
			age: 36
			},
		{
			employee_id: 2,
			name: "Winston",
			reports_to: null,
			age: 37
			}
		]);