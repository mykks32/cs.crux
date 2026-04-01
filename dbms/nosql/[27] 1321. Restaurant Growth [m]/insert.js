// Insert Into customer collection
db.customer.insertMany([
  { customer_id: 1, name: 'Jhon', visited_on: new Date('2019-01-01'), amount: 100 },
  { customer_id: 2, name: 'Daniel', visited_on: new Date('2019-01-02'), amount: 110 },
  { customer_id: 3, name: 'Jade', visited_on: new Date('2019-01-03'), amount: 120 },
  { customer_id: 4, name: 'Khaled', visited_on: new Date('2019-01-04'), amount: 130 },
  { customer_id: 5, name: 'Winston', visited_on: new Date('2019-01-05'), amount: 110 },
  { customer_id: 6, name: 'Elvis', visited_on: new Date('2019-01-06'), amount: 140 },
  { customer_id: 7, name: 'Anna', visited_on: new Date('2019-01-07'), amount: 150 },
  { customer_id: 8, name: 'Maria', visited_on: new Date('2019-01-08'), amount: 80 },
  { customer_id: 9, name: 'Jaze', visited_on: new Date('2019-01-09'), amount: 110 },
  { customer_id: 1, name: 'Jhon', visited_on: new Date('2019-01-10'), amount: 130 },
  { customer_id: 3, name: 'Jade', visited_on: new Date('2019-01-10'), amount: 150 }
]);