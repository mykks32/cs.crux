// Insert in query collection
db.queries.insertMany([
  { query_name: "Dog", result: "Golden Retriever", position: 1, rating: 5 },
  { query_name: "Dog", result: "German Shepherd", position: 2, rating: 5 },
  { query_name: "Dog", result: "Mule", position: 200, rating: 1 },
  { query_name: "Cat", result: "Shirazi", position: 5, rating: 2 },
  { query_name: "Cat", result: "Siamese", position: 3, rating: 3 },
  { query_name: "Cat", result: "Sphynx", position: 7, rating: 4 }
]);