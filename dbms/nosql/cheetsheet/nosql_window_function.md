# MongoDB Window Functions Cheat Sheet

## Window Functions (operate over a set of documents)

- `$sum` — sum of values  
- `$avg` — average of values  
- `$count` — count documents  
- `$min` — minimum value  
- `$max` — maximum value  
- `$documentNumber` — sequential row number (ROW_NUMBER)  
- `$rank` — rank with gaps for ties  
- `$denseRank` — rank without gaps for ties  
- `$first` — first value in window (FIRST_VALUE)  
- `$last` — last value in window (LAST_VALUE)  
- `$shift` — value n documents before/after (LAG / LEAD)  
- `$push` — collect values into array  
- `$addToSet` — collect unique values  

---

## DOCUMENTS (physical document frame — SQL ROWS equivalent)

- `unbounded` — from first document to current  
- `current` — only current document  
- `-n` — n documents before current  
- `+n` — n documents after current  
- `[ x , y ]` — custom range relative to current  

---

## RANGE (value-based frame)

- `unbounded` — all values ≤ current  
- `current` — only current value  
- `-n` — values ≥ current − n  
- `+n` — values ≤ current + n  
- `[ x , y ]` — custom value range  

---

## partitionBy

group documents for separate calculation (optional)

---

## sortBy

define document order in the partition (optional)

---

## Basic Syntax

```js
db.collection.aggregate([
  {
    $setWindowFields: {
      partitionBy: <expression>,
      sortBy: { field: 1 | -1 },
      output: {
        fieldName: {
          $function: <expression>,
          window: {
            documents: [ "unbounded", "current" ]
          }
        }
      }
    }
  }
])