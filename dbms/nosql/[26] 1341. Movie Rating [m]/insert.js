// Insert into Movies collection
db.Movies.insertMany([
  { movie_id: 1, title: "Avengers" },
  { movie_id: 2, title: "Frozen 2" },
  { movie_id: 3, title: "Joker" }
]);

// Insert into Users collection
db.Users.insertMany([
  { user_id: 1, name: "Daniel" },
  { user_id: 2, name: "Monica" },
  { user_id: 3, name: "Maria" },
  { user_id: 4, name: "James" }
]);

// Insert into MovieRating collection
db.MovieRating.insertMany([
  { movie_id: 1, user_id: 1, rating: 3, created_at: new Date("2020-01-12") },
  { movie_id: 1, user_id: 2, rating: 4, created_at: new Date("2020-02-11") },
  { movie_id: 1, user_id: 3, rating: 2, created_at: new Date("2020-02-12") },
  { movie_id: 1, user_id: 4, rating: 1, created_at: new Date("2020-01-01") },
  { movie_id: 2, user_id: 1, rating: 5, created_at: new Date("2020-02-17") },
  { movie_id: 2, user_id: 2, rating: 2, created_at: new Date("2020-02-01") },
  { movie_id: 2, user_id: 3, rating: 2, created_at: new Date("2020-03-01") },
  { movie_id: 3, user_id: 1, rating: 3, created_at: new Date("2020-02-22") },
  { movie_id: 3, user_id: 2, rating: 4, created_at: new Date("2020-02-25") }
]);