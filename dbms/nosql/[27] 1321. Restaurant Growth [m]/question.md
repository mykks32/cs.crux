# 1321. Restaurant Growth

## Problem

You are given a **Customer** table:

### Customer Table

| Column Name | Type |
|-------------|------|
| customer_id | int  |
| name        | varchar |
| visited_on  | date |
| amount      | int  |

- `(customer_id, visited_on)` is the **primary key**
- `visited_on` is the date the customer visited
- `amount` is the total paid by the customer
- There will be **at least one customer every day**

---

## Task

Compute the **7-day moving average** of how much customers paid:

- Window = **current day + previous 6 days**
- `average_amount` must be **rounded to 2 decimal places**
- Return results **ordered by visited_on ascending**
- Only return days where **7-day window exists**

---

## Example

### Input

| customer_id | name   | visited_on | amount |
|-------------|--------|------------|--------|
| 1 | Jhon | 2019-01-01 | 100 |
| 2 | Daniel | 2019-01-02 | 110 |
| 3 | Jade | 2019-01-03 | 120 |
| 4 | Khaled | 2019-01-04 | 130 |
| 5 | Winston | 2019-01-05 | 110 |
| 6 | Elvis | 2019-01-06 | 140 |
| 7 | Anna | 2019-01-07 | 150 |
| 8 | Maria | 2019-01-08 | 80 |
| 9 | Jaze | 2019-01-09 | 110 |
| 1 | Jhon | 2019-01-10 | 130 |
| 3 | Jade | 2019-01-10 | 150 |

---

## Output

| visited_on | amount | average_amount |
|------------|--------|----------------|
| 2019-01-07 | 860 | 122.86 |
| 2019-01-08 | 840 | 120 |
| 2019-01-09 | 840 | 120 |
| 2019-01-10 | 1000 | 142.86 |

---

## Explanation

### 2019-01-07

```
100 + 110 + 120 + 130 + 110 + 140 + 150 = 860
860 / 7 = 122.86
```

---

### 2019-01-08

```
110 + 120 + 130 + 110 + 140 + 150 + 80 = 840
840 / 7 = 120
```

---

### 2019-01-09

```
120 + 130 + 110 + 140 + 150 + 80 + 110 = 840
840 / 7 = 120
```

---

### 2019-01-10

```
130 + 110 + 140 + 150 + 80 + 110 + 130 + 150 = 1000
1000 / 7 = 142.86
```