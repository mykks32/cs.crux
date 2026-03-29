# 1729. Find Followers Count

**Difficulty:** Easy

## Table: Followers

| Column Name | Type |
|-------------|------|
| user_id     | int  |
| follower_id | int  |

- (user_id, follower_id) is the primary key.
- Each row indicates that `follower_id` follows `user_id`.

## Problem Description

Each row represents a follower relationship in a social media application.

You need to calculate how many followers each user has.

## Objective

- Count the number of followers for each `user_id`
- Return the result ordered by `user_id` in ascending order

## Example

### Input

Followers table:

| user_id | follower_id |
|---------|-------------|
| 0       | 1           |
| 1       | 0           |
| 2       | 0           |
| 2       | 1           |

### Output

| user_id | followers_count |
|---------|------------------|
| 0       | 1                |
| 1       | 1                |
| 2       | 2                |

## Explanation

- User 0 → followers: {1} → count = 1
- User 1 → followers: {0} → count = 1
- User 2 → followers: {0, 1} → count = 2  