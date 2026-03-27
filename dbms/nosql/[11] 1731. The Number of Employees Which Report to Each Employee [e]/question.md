# 1731. The Number of Employees Which Report to Each Employee

## Problem

You are given an **Employees** table containing employee information.

### Employees Table

| Column Name | Type    |
|-------------|---------|
| employee_id | int     |
| name        | varchar |
| reports_to  | int     |
| age         | int     |

### Notes

- `employee_id` is unique
- `reports_to` indicates the **manager** an employee reports to
- If `reports_to` is **NULL**, the employee does not report to anyone
- A **manager** is defined as an employee who has **at least one direct report**

---

## Task

For each **manager**, report:

- `employee_id`
- `name`
- `reports_count` — number of employees who report directly to them
- `average_age` — average age of direct reports (rounded to nearest integer)

---

## Requirements

- Only include **managers**
- Round **average_age** to **nearest integer**
- Sort result by **employee_id**

---

## Example 1

### Input

| employee_id | name    | reports_to | age |
|-------------|---------|------------|-----|
| 9           | Hercy   | null       | 43  |
| 6           | Alice   | 9          | 41  |
| 4           | Bob     | 9          | 36  |
| 2           | Winston | null       | 37  |

---

### Output

| employee_id | name  | reports_count | average_age |
|-------------|-------|---------------|-------------|
| 9           | Hercy | 2             | 39          |

---

### Explanation

- **Hercy** has 2 direct reports:
    - Alice (41)
    - Bob (36)

Average age:

```
(41 + 36) / 2 = 38.5 → 39 (rounded)
```

---

## Example 2

### Input

| employee_id | name    | reports_to | age |
|-------------|---------|------------|-----|
| 1           | Michael | null       | 45  |
| 2           | Alice   | 1          | 38  |
| 3           | Bob     | 1          | 42  |
| 4           | Charlie | 2          | 34  |
| 5           | David   | 2          | 40  |
| 6           | Eve     | 3          | 37  |
| 7           | Frank   | null       | 50  |
| 8           | Grace   | null       | 48  |

---

### Output

| employee_id | name    | reports_count | average_age |
|-------------|---------|---------------|-------------|
| 1           | Michael | 2             | 40          |
| 2           | Alice   | 2             | 37          |
| 3           | Bob     | 1             | 37          |

---

### Explanation

- **Michael**
    - Reports: Alice (38), Bob (42)
    - Average: (38 + 42) / 2 = 40

- **Alice**
    - Reports: Charlie (34), David (40)
    - Average: (34 + 40) / 2 = 37

- **Bob**
    - Reports: Eve (37)
    - Average: 37