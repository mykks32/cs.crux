# SQL Window Functions Cheat Sheet

## Window Functions (operate over a set of rows)
- `SUM` – sum of values  
- `AVG` – average of values  
- `COUNT` – count rows  
- `MIN` – minimum value  
- `MAX` – maximum value  
- `ROW_NUMBER` – sequential row number  
- `RANK` – rank with gaps for ties  
- `DENSE_RANK` – rank without gaps for ties  
- `NTILE(n)` – split rows into `n` buckets  
- `FIRST_VALUE` – first value in window  
- `LAST_VALUE` – last value in window  
- `LAG` – value `n` rows before  
- `LEAD` – value `n` rows after  
- `CUME_DIST` – cumulative distribution (0–1)  
- `PERCENT_RANK` – normalized rank (0–1)  

## ROWS (physical row frame)
- `UNBOUNDED PRECEDING` – from first row to current  
- `CURRENT ROW` – only current row  
- `n PRECEDING` – n rows before current  
- `n FOLLOWING` – n rows after current  
- `BETWEEN x AND y` – custom range relative to current  

## RANGE (value-based frame)
- `UNBOUNDED PRECEDING` – all values ≤ current  
- `CURRENT ROW` – only current value  
- `n PRECEDING` – values ≥ current – n  
- `n FOLLOWING` – values ≤ current + n  
- `BETWEEN x AND y` – custom value range  

## PARTITION BY
- group rows for separate calculation (optional)  

## ORDER BY
- define row order in the partition (optional)  