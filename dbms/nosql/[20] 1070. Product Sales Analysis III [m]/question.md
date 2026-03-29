# 1070. Product Sales Analysis III

**Difficulty:** Medium

## Table: Sales

| Column Name | Type |
|-------------|------|
| sale_id     | int  |
| product_id  | int  |
| year        | int  |
| quantity    | int  |
| price       | int  |

- (sale_id, year) is the primary key.
- Each row represents a sale of a product in a given year.
- A product may have multiple sales entries in the same year.

## Problem Description

Each product can have multiple sales records across different years.

You need to:
- Identify the **first year** each product was sold.
- Return all sales entries that occurred in that first year.

## Objective

For each `product_id`:
- Find the earliest `year` (first_year)
- Return all records where the product was sold in that year

The result should include:
- product_id
- first_year
- quantity
- price

Return the result in any order.

## Example

### Input

Sales table:

| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| 1       | 100        | 2008 | 10       | 5000  |
| 2       | 100        | 2009 | 12       | 5000  |
| 7       | 200        | 2011 | 15       | 9000  |

### Output

| product_id | first_year | quantity | price |
|------------|------------|----------|-------|
| 100        | 2008       | 10       | 5000  |
| 200        | 2011       | 15       | 9000  |

## Explanation

- Product 100 → first year = 2008 → include all sales from 2008
- Product 200 → first year = 2011 → include all sales from 2011  