# TypeScript Array Cheatsheet

---

## Declaration & Initialization

```ts
// Type annotation
const a: number[] = [1, 2, 3];
const b: Array<string> = ["a", "b", "c"];

// Readonly
const r: readonly number[] = [1, 2, 3];
const r2: ReadonlyArray<number> = [1, 2, 3];

// Tuple
const t: [string, number] = ["age", 30];
const tOpt: [string, number?] = ["age"];

// Typed with interface
interface User { id: number; name: string }
const users: User[] = [{ id: 1, name: "Alice" }];

// Empty with type
const empty: string[] = [];

// Array constructor
const filled = new Array<number>(3).fill(0); // [0, 0, 0]
const from = Array.from<number>({ length: 3 }, (_, i) => i); // [0, 1, 2]
```

---

## Type Utilities

```ts
// Infer element type
type Arr = string[];
type Elem = Arr[number]; // string

// Tuple to union
type T = [string, number];
type U = T[number]; // string | number

// Generic array function
function first<T>(arr: T[]): T | undefined {
	return arr[0];
}

// Array of union
const mixed: (string | number)[] = [1, "a", 2];

// Nested
const matrix: number[][] = [[1, 2], [3, 4]];
```

---

## Mutation Methods

```ts
const arr = [1, 2, 3];

arr.push(4);               // append — returns new length
arr.pop();                 // remove last — returns removed element
arr.unshift(0);            // prepend — returns new length
arr.shift();               // remove first — returns removed element

arr.splice(1, 1);          // remove 1 element at index 1
arr.splice(1, 0, 99);      // insert 99 at index 1
arr.splice(1, 1, 99);      // replace index 1 with 99

arr.sort();                // in-place sort (lexicographic by default)
arr.sort((a, b) => a - b); // numeric ascending
arr.sort((a, b) => b - a); // numeric descending

arr.reverse();             // in-place reverse

arr.fill(0);               // fill all with 0
arr.fill(0, 1, 3);         // fill index 1 to 2 with 0
```

---

## Non-Mutation Methods

```ts
const arr = [1, 2, 3, 4, 5];

// Access
arr[0];                          // 1
arr.at(-1);                      // 5 (last element)
arr.indexOf(3);                  // 2
arr.lastIndexOf(3);              // 2
arr.includes(3);                 // true

// Slice
arr.slice(1, 3);                 // [2, 3] (end exclusive)
arr.slice(-2);                   // [4, 5]

// Join & string
arr.join(", ");                  // "1, 2, 3, 4, 5"
arr.toString();                  // "1,2,3,4,5"

// Combine
arr.concat([6, 7]);              // [1, 2, 3, 4, 5, 6, 7]
[...arr, ...[6, 7]];            // spread equivalent

// Flatten
[[1, 2], [3]].flat();            // [1, 2, 3]
[[1, [2]]].flat(Infinity);       // [1, 2] (deep)
[[1, 2], [3]].flatMap(x => x);  // [1, 2, 3]
```

---

## Iteration Methods

```ts
const arr = [1, 2, 3, 4, 5];

// forEach — no return
arr.forEach((val, idx, array) => console.log(val));

// map — transform each element
const doubled = arr.map((x): number => x * 2);

// filter — keep matching elements
const evens = arr.filter((x): x is number => x % 2 === 0);

// reduce — accumulate
const sum = arr.reduce((acc, x) => acc + x, 0);
const sumRight = arr.reduceRight((acc, x) => acc + x, 0);

// find / findIndex
const found = arr.find(x => x > 3);       // 4
const idx = arr.findIndex(x => x > 3);    // 3

// findLast / findLastIndex (ES2023)
const last = arr.findLast(x => x < 4);         // 3
const lastIdx = arr.findLastIndex(x => x < 4); // 2

// some / every
arr.some(x => x > 4);   // true
arr.every(x => x > 0);  // true
```

---

## Typed Callbacks

```ts
const nums: number[] = [1, 2, 3];

const mapped: number[] = nums.map((x: number): number => x * 2);

const filtered: number[] = nums.filter((x: number): boolean => x > 1);

const reduced: number = nums.reduce(
	(acc: number, x: number): number => acc + x,
	0
);

// Typed predicate (type guard)
function isString(x: unknown): x is string {
	return typeof x === "string";
}
const mixed = [1, "a", 2, "b"];
const strings = mixed.filter(isString); // string[]
```

---

## Destructuring & Spread

```ts
const arr = [1, 2, 3, 4, 5];

// Destructure
const [first, second, ...rest] = arr;
// first: 1, second: 2, rest: [3, 4, 5]

// Skip elements
const [, , third] = arr; // 3

// Swap
let a = 1, b = 2;
[a, b] = [b, a];

// Spread copy (shallow)
const copy = [...arr];

// Spread merge
const merged = [...arr, ...[6, 7]];

// Spread into function
Math.max(...arr);

// Typed destructure
const [x, y]: [number, number] = [10, 20];
```

---

## Sorting

```ts
// String sort
["banana", "apple", "cherry"].sort();
// ["apple", "banana", "cherry"]

// Number sort
[10, 2, 5].sort((a, b) => a - b);  // [2, 5, 10] ascending
[10, 2, 5].sort((a, b) => b - a);  // [10, 5, 2] descending

// Object sort by field
type User = { name: string; age: number };
const users: User[] = [
	{ name: "Bob", age: 30 },
	{ name: "Alice", age: 25 },
];
users.sort((a, b) => a.age - b.age);
users.sort((a, b) => a.name.localeCompare(b.name));

// Stable sort (ES2019+, guaranteed in TS/V8)
// sort() is stable — equal elements preserve original order
```

---

## Common Patterns

```ts
// Unique values
const unique = [...new Set([1, 1, 2, 3])]; // [1, 2, 3]

// Chunk array
function chunk<T>(arr: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
		arr.slice(i * size, i * size + size)
	);
}

// Group by
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
	return arr.reduce((acc, item) => {
		const k = String(item[key]);
		(acc[k] ??= []).push(item);
		return acc;
	}, {} as Record<string, T[]>);
}

// Zip two arrays
function zip<A, B>(a: A[], b: B[]): [A, B][] {
	return a.map((val, i) => [val, b[i]]);
}

// Range
const range = (start: number, end: number): number[] =>
	Array.from({ length: end - start }, (_, i) => i + start);
// range(1, 5) => [1, 2, 3, 4]

// Remove falsy
const clean = [0, 1, "", "a", null, undefined, false].filter(Boolean);
// [1, "a"]

// Sum / Min / Max
const nums = [3, 1, 4, 1, 5];
const sum = nums.reduce((a, b) => a + b, 0);
const min = Math.min(...nums);
const max = Math.max(...nums);

// Partition
function partition<T>(arr: T[], pred: (x: T) => boolean): [T[], T[]] {
	return arr.reduce<[T[], T[]]>(
		([pass, fail], x) => pred(x) ? [[...pass, x], fail] : [pass, [...fail, x]],
		[[], []]
	);
}
```

---

## Immutable Updates (spread pattern)

```ts
const arr = [1, 2, 3, 4, 5];

// Add at end
const added = [...arr, 6];

// Add at start
const prepended = [0, ...arr];

// Remove by index
const removed = arr.filter((_, i) => i !== 2);

// Remove by value
const withoutThree = arr.filter(x => x !== 3);

// Replace by index
const replaced = arr.map((x, i) => (i === 2 ? 99 : x));

// Insert at index
const inserted = [...arr.slice(0, 2), 99, ...arr.slice(2)];

// Update object in array
type Item = { id: number; val: string };
const items: Item[] = [{ id: 1, val: "a" }, { id: 2, val: "b" }];
const updated = items.map(item =>
	item.id === 1 ? { ...item, val: "z" } : item
);
```

---

## ES2023+ Methods

```ts
// toSorted — non-mutating sort
const sorted = [3, 1, 2].toSorted((a, b) => a - b); // [1, 2, 3]

// toReversed — non-mutating reverse
const reversed = [1, 2, 3].toReversed(); // [3, 2, 1]

// toSpliced — non-mutating splice
const spliced = [1, 2, 3, 4].toSpliced(1, 1, 99); // [1, 99, 3, 4]

// with — replace at index immutably
const withVal = [1, 2, 3].with(1, 99); // [1, 99, 3]

// findLast / findLastIndex
[1, 2, 3, 4].findLast(x => x % 2 === 0);      // 4
[1, 2, 3, 4].findLastIndex(x => x % 2 === 0); // 3
```

---

## Type Guards with Arrays

```ts
// Narrowing in filter
const values: (string | number)[] = [1, "a", 2, "b"];
const strings = values.filter((x): x is string => typeof x === "string");
// string[]

// Array.isArray narrowing
function process(x: string | string[]) {
	if (Array.isArray(x)) {
		x.forEach(console.log); // x: string[]
	} else {
		console.log(x);         // x: string
	}
}

// Non-null assertion after find
const arr = [1, 2, 3];
const val = arr.find(x => x === 2)!; // number (asserts not undefined)
```

---

## Utility Types for Arrays

```ts
// Extract element type from array type
type ElementType<T extends readonly unknown[]> = T[number];

type E = ElementType<string[]>; // string
type F = ElementType<[1, "a"]>; // 1 | "a"

// Tuple length
type Len = [1, 2, 3]["length"]; // 3

// Head / Tail of tuple
type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;
type Tail<T extends unknown[]> = T extends [unknown, ...infer R] ? R : never;

type H = Head<[1, 2, 3]>; // 1
type Ta = Tail<[1, 2, 3]>; // [2, 3]
```