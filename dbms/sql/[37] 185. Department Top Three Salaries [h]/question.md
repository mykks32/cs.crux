# 185. Department Top Three Salaries

**Difficulty:** Hard

## Table: Employee

| Column Name  | Type    |
|--------------|---------|
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |

- `id` is the primary key.
- `departmentId` is a foreign key referencing Department.

## Table: Department

| Column Name | Type    |
|-------------|---------|
| id          | int     |
| name        | varchar |

- `id` is the primary key.

## Problem Description

A **high earner** in a department is an employee whose salary is among the **top three distinct salaries** in that department.

You need to identify all such employees across all departments.

## Objective

- For each department:
    - Determine the **top 3 unique salaries**
    - Find employees whose salary belongs to these top 3 values
- Return:
    - `Department` (department name)
    - `Employee` (employee name)
    - `Salary`

Return the result in any order.

## Example

### Input

Employee table:

| id | name  | salary | departmentId |
|----|-------|--------|--------------|
| 1  | Joe   | 85000  | 1            |
| 2  | Henry | 80000  | 2            |
| 3  | Sam   | 60000  | 2            |
| 4  | Max   | 90000  | 1            |
| 5  | Janet | 69000  | 1            |
| 6  | Randy | 85000  | 1            |
| 7  | Will  | 70000  | 1            |

Department table:

| id | name  |
|----|-------|
| 1  | IT    |
| 2  | Sales |

### Output

| Department | Employee | Salary |
|------------|----------|--------|
| IT         | Max      | 90000  |
| IT         | Joe      | 85000  |
| IT         | Randy    | 85000  |
| IT         | Will     | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |

## Explanation

### IT Department
- Unique salaries → 90000, 85000, 70000, 69000
- Top 3 → 90000, 85000, 70000
- Employees included:
    - Max (90000)
    - Joe, Randy (85000)
    - Will (70000)

### Sales Department
- Unique salaries → 80000, 60000
- Top 3 → 80000, 60000
- Employees included:
    - Henry (80000)
    - Sam (60000)  