# Math Module — TypeScript / JavaScript Reference

> Built-in `namespace Math` — no import needed.

---

## Constants

| Constant | Value |
|---|---|
| `Math.PI` | 3.14159265358979… |
| `Math.E` | 2.71828182845904… |
| `Math.LN2` | 0.69314718055994… |
| `Math.LN10` | 2.30258509299404… |
| `Math.SQRT2` | 1.41421356237309… |
| `Math.LOG2E` | 1.44269504088896… |
| `Math.LOG10E` | 0.43429448190325… |

---

## Rounding

### `Math.abs(x: number): number`
Returns the absolute (non-negative) value of `x`.
```ts
Math.abs(-5)    // 5
Math.abs(3.7)   // 3.7
Math.abs(0)     // 0
```

### `Math.round(x: number): number`
Rounds to the nearest integer. Ties (`.5`) round up.
```ts
Math.round(4.5)   // 5
Math.round(4.4)   // 4
Math.round(-4.5)  // -4
```

### `Math.floor(x: number): number`
Rounds down toward negative infinity.
```ts
Math.floor(4.9)   // 4
Math.floor(-4.1)  // -5
```

### `Math.ceil(x: number): number`
Rounds up toward positive infinity.
```ts
Math.ceil(4.1)   // 5
Math.ceil(-4.9)  // -4
```

### `Math.trunc(x: number): number`
Removes the fractional part — truncates toward zero.
```ts
Math.trunc(4.9)   // 4
Math.trunc(-4.9)  // -4
```

---

## Comparison

### `Math.max(...values: number[]): number`
Returns the largest of the given values.
```ts
Math.max(1, 5, 3)         // 5
Math.max(...[10, 2, 8])   // 10
```

### `Math.min(...values: number[]): number`
Returns the smallest of the given values.
```ts
Math.min(1, 5, 3)  // 1
Math.min(-2, 0)    // -2
```

### `Math.sign(x: number): number`
Returns `1`, `-1`, or `0` indicating the sign of `x`.
```ts
Math.sign(42)   // 1
Math.sign(-7)   // -1
Math.sign(0)    // 0
```

---

## Power & Roots

### `Math.pow(base: number, exp: number): number`
Returns `base` raised to the power `exp`. Prefer the `**` operator in modern TypeScript.
```ts
Math.pow(2, 10)  // 1024
2 ** 10          // 1024  (same)
```

### `Math.sqrt(x: number): number`
Returns the square root of `x`. Returns `NaN` for negative inputs.
```ts
Math.sqrt(9)   // 3
Math.sqrt(2)   // 1.4142135623730951
Math.sqrt(-1)  // NaN
```

### `Math.cbrt(x: number): number`
Returns the cube root of `x`.
```ts
Math.cbrt(27)   // 3
Math.cbrt(-8)   // -2
```

### `Math.hypot(...values: number[]): number`
Returns √(x² + y² + …) — Euclidean distance without overflow risk.
```ts
Math.hypot(3, 4)    // 5
Math.hypot(1, 1, 1) // 1.7320508075688772
```

---

## Logarithms & Exponentials

### `Math.log(x: number): number`
Natural log (base e). Returns `-Infinity` for `0`, `NaN` for negative.
```ts
Math.log(Math.E)  // 1
Math.log(1)       // 0
```

### `Math.log2(x: number): number`
Log base-2.
```ts
Math.log2(1024)  // 10
Math.log2(1)     // 0
```

### `Math.log10(x: number): number`
Log base-10.
```ts
Math.log10(1000)  // 3
Math.log10(1)     // 0
```

### `Math.exp(x: number): number`
Returns `e` raised to the power `x`.
```ts
Math.exp(1)  // 2.718281828459045  (e)
Math.exp(0)  // 1
```

---

## Trigonometry *(input in radians)*

> Convert degrees to radians: `deg * Math.PI / 180`

### `Math.sin(x: number): number`
```ts
Math.sin(Math.PI / 2)  // 1
Math.sin(0)            // 0
```

### `Math.cos(x: number): number`
```ts
Math.cos(0)       // 1
Math.cos(Math.PI) // -1
```

### `Math.tan(x: number): number`
```ts
Math.tan(Math.PI / 4)  // ~1
Math.tan(0)            // 0
```

### `Math.asin(x: number): number`
Inverse sine — returns radians in `[-π/2, π/2]`.
```ts
Math.asin(1)   // π/2
Math.asin(0)   // 0
```

### `Math.acos(x: number): number`
Inverse cosine — returns radians in `[0, π]`.
```ts
Math.acos(1)   // 0
Math.acos(-1)  // π
```

### `Math.atan(x: number): number`
Inverse tangent — returns radians in `(-π/2, π/2)`.
```ts
Math.atan(1)   // π/4
Math.atan(0)   // 0
```

### `Math.atan2(y: number, x: number): number`
Angle (radians) of the vector `(x, y)` from the positive x-axis. Handles all quadrants correctly.
```ts
Math.atan2(1, 1)   // π/4   (45°)
Math.atan2(1, -1)  // 3π/4  (135°)
```

---

## Random

### `Math.random(): number`
Returns a float in `[0, 1)`.
```ts
// Random float [0, 1)
Math.random()

// Random integer [min, max)
const rand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min) + min)

rand(1, 7)  // dice roll: 1–6
```

---

## Bitwise / Misc

### `Math.clz32(x: number): number`
Count leading zeros in the 32-bit binary representation.
```ts
Math.clz32(1)  // 31
Math.clz32(4)  // 29
```

### `Math.fround(x: number): number`
Returns the nearest 32-bit float representation of `x`.
```ts
Math.fround(1.337)  // 1.3370000123977661
```

### `Math.imul(a: number, b: number): number`
32-bit integer multiplication — matches C-style overflow behavior.
```ts
Math.imul(3, 4)           // 12
Math.imul(0xffffffff, 5)  // -5
```

---

## Quick-reference cheat sheet

| Goal | Method |
|---|---|
| Absolute value | `Math.abs(x)` |
| Round to nearest | `Math.round(x)` |
| Round down | `Math.floor(x)` |
| Round up | `Math.ceil(x)` |
| Remove decimals | `Math.trunc(x)` |
| Largest value | `Math.max(...arr)` |
| Smallest value | `Math.min(...arr)` |
| Power | `Math.pow(b, e)` / `b ** e` |
| Square root | `Math.sqrt(x)` |
| Natural log | `Math.log(x)` |
| Random float | `Math.random()` |
| Random int | `Math.floor(Math.random() * n)` |