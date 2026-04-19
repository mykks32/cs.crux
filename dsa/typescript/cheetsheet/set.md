# TypeScript `Set` — Complete Notes

## What is a Set?

A `Set` is a collection of **unique values**. Duplicates are automatically ignored. It uses *SameValueZero* equality — meaning `NaN === NaN` inside a Set (unlike regular `===`).

---

## Creating a Set

```ts
// Inferred type
const nums = new Set([1, 2, 3]);           // Set<number>

// Explicit type
const ids: Set<string> = new Set();

// From any iterable
const letters = new Set("hello");          // Set {'h', 'e', 'l', 'o'}
```

---

## Core Methods

| Method / Property | Returns | Description |
|---|---|---|
| `add(value)` | `Set<T>` | Adds value; duplicates silently ignored. Chainable. |
| `has(value)` | `boolean` | Returns `true` if value exists — **O(1)** |
| `delete(value)` | `boolean` | Removes value; `true` if it existed |
| `clear()` | `void` | Removes all elements |
| `size` | `number` | Count of unique elements (property, not a method) |

```ts
const s = new Set<number>();

s.add(1).add(2).add(2);   // {1, 2}  — duplicate ignored
s.has(2);                  // true
s.delete(1);               // true
s.size;                    // 1
s.clear();                 // {}
```

---

## Iteration

```ts
const s = new Set([10, 20, 30]);

// for…of (recommended)
for (const v of s) console.log(v);

// forEach
s.forEach((v) => console.log(v));

// Spread to array
const arr  = [...s];
const arr2 = Array.from(s);

// keys / values / entries — all yield values (k === v in a Set)
for (const [k, v] of s.entries()) {
  console.log(k, v);  // k === v
}
```

> **Note:** Sets preserve **insertion order** during iteration.

---

## Set Operations

### Native (ES2025 / TypeScript 5.5+ with `"lib": ["ES2025"]`)

```ts
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

a.union(b)                // Set {1, 2, 3, 4}
a.intersection(b)         // Set {2, 3}
a.difference(b)           // Set {1}        → in a but not b
a.symmetricDifference(b)  // Set {1, 4}
a.isSubsetOf(b)           // false
a.isSupersetOf(b)         // false
a.isDisjointFrom(b)       // false
```

### Polyfill Patterns (pre-ES2025)

```ts
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// Union
const union = new Set([...a, ...b]);

// Intersection
const inter = new Set([...a].filter(x => b.has(x)));

// Difference (a − b)
const diff  = new Set([...a].filter(x => !b.has(x)));

// Symmetric difference
const symDiff = new Set([...a, ...b].filter(x => !a.has(x) || !b.has(x)));
```

---

## Common Patterns

### Deduplicate an array

```ts
const arr    = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];   // [1, 2, 3]
```

### Fast membership check

```ts
// O(n) — array
arr.includes("admin");

// O(1) — Set (prefer this for large lists)
const allowed = new Set(["admin", "mod", "user"]);
allowed.has(role);
```

### Count unique values

```ts
const count = new Set(arr).size;
```

### Toggle an element

```ts
s.has(v) ? s.delete(v) : s.add(v);
```

### Convert between Set and Array

```ts
const arr = [1, 2, 3];

const set = new Set(arr);       // Array → Set
const back = Array.from(set);   // Set → Array
const back2 = [...set];         // Set → Array (spread)
```

---

## `Set` vs `Array` — When to Use Which

| Use case | Prefer |
|---|---|
| Unique values only | `Set` |
| Fast membership check (`has`) | `Set` |
| Need index access (`arr[0]`) | `Array` |
| Need `map`, `filter`, `reduce` | `Array` |
| Order + uniqueness both matter | `Set` (preserves insertion order) |

---

## WeakSet

A `WeakSet` holds **object references weakly** — entries are garbage-collected when no other references exist.

**Limitations:**
- Only objects (no primitives)
- Not iterable (no `for…of`, no `size`)
- No `clear()` method

```ts
const seen = new WeakSet<object>();

seen.add(obj);
seen.has(obj);    // true
seen.delete(obj);
```

> **Use case:** Tagging DOM nodes or objects without preventing garbage collection.

---

## TypeScript-Specific Tips

```ts
// Read-only Set
const frozen: ReadonlySet<number> = new Set([1, 2, 3]);
// frozen.add(4);  ❌ compile error

// Type narrowing with has()
function process(val: string | number, allowed: Set<string>) {
  if (allowed.has(val as string)) {
    // val treated as string here
  }
}

// Generic utility — union two sets
function union<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a, ...b]);
}
```

---

## Quick Reference

```
new Set(iterable?)     → create
.add(v)                → insert (chainable)
.has(v)                → lookup O(1)
.delete(v)             → remove
.clear()               → reset
.size                  → count
[...set]               → to array
new Set([...a, ...b])  → union
[...a].filter(x=>b.has(x))  → intersection
[...a].filter(x=>!b.has(x)) → difference
```