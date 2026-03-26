# 1211. Queries Quality and Percentage

## Problem

You are given a table **Queries** containing information about database queries.

### Queries Table

| Column Name | Type    |
|-------------|---------|
| query_name  | varchar |
| result      | varchar |
| position    | int     |
| rating      | int     |

### Notes

- This table **may contain duplicate rows**
- `position` ranges from **1 to 500**
- `rating` ranges from **1 to 5**
- A query with **rating < 3** is considered a **poor query**

---

## Definitions

### Query Quality

Query quality is defined as:

```
quality = AVG(rating / position)
```

That is, for each query:

1. Compute `rating / position`
2. Take the **average** for each `query_name`

---

### Poor Query Percentage

Poor query percentage is defined as:

```
poor_query_percentage = 
(number of queries with rating < 3 / total queries) * 100
```

---

## Requirements

- Calculate results **for each query_name**
- Round **quality** to **2 decimal places**
- Round **poor_query_percentage** to **2 decimal places**
- Return results in **any order**

---

## Example

### Input

#### Queries Table

| query_name | result           | position | rating |
|------------|------------------|----------|--------|
| Dog        | Golden Retriever | 1        | 5      |
| Dog        | German Shepherd  | 2        | 5      |
| Dog        | Mule             | 200      | 1      |
| Cat        | Shirazi          | 5        | 2      |
| Cat        | Siamese          | 3        | 3      |
| Cat        | Sphynx           | 7        | 4      |

---

## Output

| query_name | quality | poor_query_percentage |
|------------|---------|-----------------------|
| Dog        | 2.50    | 33.33                 |
| Cat        | 0.66    | 33.33                 |

---

## Explanation

### Dog

Quality:

```
((5 / 1) + (5 / 2) + (1 / 200)) / 3
= (5 + 2.5 + 0.005) / 3
= 2.50
```

Poor Query Percentage:

- Poor queries: 1 (rating < 3)
- Total queries: 3

```
(1 / 3) * 100 = 33.33
```

---

### Cat

Quality:

```
((2 / 5) + (3 / 3) + (4 / 7)) / 3
= (0.4 + 1 + 0.57) / 3
= 0.66
```

Poor Query Percentage:

- Poor queries: 1
- Total queries: 3

```
(1 / 3) * 100 = 33.33
```