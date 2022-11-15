---
title: 常见算法
categories: 
- JavaScript
---

### 数组差集

```ts
// code from: react-dnd
/**
 * @param itemsA
 * @param itemsB
 */
function xor<T extends string | number>(itemsA: T[], itemsB: T[]): T[] {
	const map = new Map<T, number>()
	const insertItem = (item: T) => {
		map.set(item, map.has(item) ? map.get(item) + 1 : 1)
	}
	itemsA.forEach(insertItem)
	itemsB.forEach(insertItem)

	const result: T[] = []
	map.forEach((count, key) => {
		if (count === 1) {
			result.push(key)
		}
	})
	return result
}

xor([1, 2], [3, 4]) // [1, 2, 3, 4]
xor([1, 2], [2, 1]) // [1, 2]
```

### 数组是否相等

```ts
// code from: react-dnd
/**
 * Determines if two arrays of items are equal
 * @param a The first array of items
 * @param b The second array of items
 */
function isEqual<T>(a: T, b: T) {
  return a === b
}

function areArraysEqual<T>(a: T[], b: T[]): boolean {
	if (a.length !== b.length) {
		return false
	}
	for (let i = 0; i < a.length; ++i) {
		if (!isEqual(a[i], b[i])) {
			return false
		}
	}
	return true
}
```