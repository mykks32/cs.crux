# 1141. User Activity for the Past 30 Days I

**Difficulty:** Easy

## Table: Activity

| Column Name   | Type |
|---------------|------|
| user_id       | int  |
| session_id    | int  |
| activity_date | date |
| activity_type | enum |

- The table may contain duplicate rows.
- Each session belongs to exactly one user.
- activity_type ∈ ('open_session', 'end_session', 'scroll_down', 'send_message').

## Problem Description

Find the number of **distinct active users per day** for the last 30 days ending on **2019-07-27 (inclusive)**.

A user is considered active on a day if they performed **at least one activity** on that day.

## Objective

- Count unique `user_id` for each `activity_date`
- Only include dates within the range:
    - From **2019-06-28** to **2019-07-27** (30 days inclusive)
- Ignore days with zero active users

## Example

### Input

Activity table:

| user_id | session_id | activity_date | activity_type |
|---------|------------|---------------|---------------|
| 1       | 1          | 2019-07-20    | open_session  |
| 1       | 1          | 2019-07-20    | scroll_down   |
| 1       | 1          | 2019-07-20    | end_session   |
| 2       | 4          | 2019-07-20    | open_session  |
| 2       | 4          | 2019-07-21    | send_message  |
| 2       | 4          | 2019-07-21    | end_session   |
| 3       | 2          | 2019-07-21    | open_session  |
| 3       | 2          | 2019-07-21    | send_message  |
| 3       | 2          | 2019-07-21    | end_session   |
| 4       | 3          | 2019-06-25    | open_session  |
| 4       | 3          | 2019-06-25    | end_session   |

### Output

| day        | active_users |
|------------|--------------|
| 2019-07-20 | 2            |
| 2019-07-21 | 2            |

## Explanation

- 2019-07-20 → Users 1 and 2 were active → 2 users
- 2019-07-21 → Users 2 and 3 were active → 2 users
- Days outside the 30-day window are ignored
- Days with zero active users are not included in the result  