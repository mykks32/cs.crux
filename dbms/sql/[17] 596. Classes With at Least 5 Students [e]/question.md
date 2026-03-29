# 596. Classes With at Least 5 Students

**Difficulty:** Easy

## Table: Courses

| Column Name | Type    |
|-------------|---------|
| student     | varchar |
| class       | varchar |

- (student, class) is the primary key.
- Each row indicates a student enrolled in a class.

## Problem Description

Each row represents a student taking a class.

You need to identify classes that have **at least 5 students enrolled**.

## Objective

- Count the number of students in each class
- Return only those classes where the count is **≥ 5**

Return the result table in any order.

## Example

### Input

Courses table:

| student | class    |
|---------|----------|
| A       | Math     |
| B       | English  |
| C       | Math     |
| D       | Biology  |
| E       | Math     |
| F       | Computer |
| G       | Math     |
| H       | Math     |
| I       | Math     |

### Output

| class |
|-------|
| Math  |

## Explanation

- Math → 6 students → included
- English → 1 student → excluded
- Biology → 1 student → excluded
- Computer → 1 student → excluded  