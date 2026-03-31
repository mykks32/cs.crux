# 1341. Movie Rating

## Problem

You are given three tables: **Movies**, **Users**, and **MovieRating**.

### Movies Table

| Column Name | Type    |
|-------------|---------|
| movie_id    | int     |
| title       | varchar |

- `movie_id` is the primary key  
- Each movie has a **unique title**

### Users Table

| Column Name | Type    |
|-------------|---------|
| user_id     | int     |
| name        | varchar |

- `user_id` is the primary key  
- The column `name` has unique values

### MovieRating Table

| Column Name | Type    |
|-------------|---------|
| movie_id    | int     |
| user_id     | int     |
| rating      | int     |
| created_at  | date    |

- `(movie_id, user_id)` is the primary key  
- `created_at` is the user's review date

---

## Task

1. Find the **user name** who has rated the greatest number of movies.  
   - In case of a tie, return the **lexicographically smaller user name**

2. Find the **movie name** with the **highest average rating in February 2020**.  
   - In case of a tie, return the **lexicographically smaller movie name**

---

## Example

### Input

#### Movies

| movie_id | title      |
|----------|------------|
| 1        | Avengers   |
| 2        | Frozen 2   |
| 3        | Joker      |

#### Users

| user_id | name    |
|---------|---------|
| 1       | Daniel  |
| 2       | Monica  |
| 3       | Maria   |
| 4       | James   |

#### MovieRating

| movie_id | user_id | rating | created_at |
|----------|---------|--------|------------|
| 1        | 1       | 3      | 2020-01-12 |
| 1        | 2       | 4      | 2020-02-11 |
| 1        | 3       | 2      | 2020-02-12 |
| 1        | 4       | 1      | 2020-01-01 |
| 2        | 1       | 5      | 2020-02-17 |
| 2        | 2       | 2      | 2020-02-01 |
| 2        | 3       | 2      | 2020-03-01 |
| 3        | 1       | 3      | 2020-02-22 |
| 3        | 2       | 4      | 2020-02-25 |

---

### Output

| results    |
|------------|
| Daniel     |
| Frozen 2   |

---

### Explanation

- **User:**  
  Daniel and Monica have each rated 3 movies (`Avengers`, `Frozen 2`, `Joker`)  
  Daniel is **lexicographically smaller** than Monica, so the result is `Daniel`

- **Movie:**  
  - Average rating in February 2020:
    - Frozen 2 → (5 + 2)/2 = 3.5  
    - Joker → (3 + 4)/2 = 3.5  
  - Avengers → (4 + 2)/2 = 3.0  
  Frozen 2 is **lexicographically smaller** than Joker, so the result is `Frozen 2`