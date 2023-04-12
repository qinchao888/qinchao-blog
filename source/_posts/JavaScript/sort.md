---
title: 排序
categories: 
- JavaScript
---

### sort

```js
[1, 3, 4, 5, 2].sort((a, b) => a > b ? 1 : -1);
/** 
 * chrome和firefox中返回值都是 1,2,3,4,5
 * 但是两者的处理逻辑正好相反：
 * 
 * chrome：
 * a代表后一个值，b代表前一个值，返回 -1 时交换顺序
 * 
 * firefox：
 * a代表前一个值，b代表后一个值，返回 1 时交换顺序
 * 
 * 所以在结果上表现无差异，但是如果内部有一些判断逻辑，则可能会出现结果不一致的情况
 */

['abc', 'bc', 'df', 'ab', 'eg', 'abcd'].sort((a, b) => {
  if (a.length > b.length && a.includes(b)) {
    return 1;
  }
  return a < b ? -1 : 1; // 默认排序（按照ASCII的大小比较的）
})
// chrome: ['ab', 'abc', 'bc', 'abcd', 'df', 'eg']
// firefox: [ "ab", "bc", "abc", "abcd", "df", "eg" ]
/*
chrome: 排序过程
bc abc -> abc bc
df bc -> abc bc df
ab df -> abc bc ab df
ab bc -> abc ab bc df
ab abc -> ab abc bc df
eg bc -> ab abc bc eg df
eg df -> ab abc bc df eg
abcd bc -> ab abc bc abcd df eg
abcd eg -> ab abc bc abcd df eg
abcd df -> ab abc bc abcd df eg

firefox: 排序过程
abc bc -> bc abc
abc df -> bc abc df
df ab -> bc abc ab df
abc ab -> bc ab abc df
bc ab -> ab bc abc df
df eg -> ab bc abc df eg
eg abcd -> ab bc abc df abcd eg
df abcd -> ab bc abc abcd df eg
abc abcd -> ab bc abc abcd df eg
*/
```

[参考](https://sort.hust.cc/)

### 冒泡排序

1. 相邻的两个元素进行比较，交换大的元素，每轮比较后，大的元素沉底（小的元素慢慢的浮到顶端）
2. 外层控制循环次数，共需执行 arr.length - 1 次

```js
/**
 * 平均时间复杂度：O(n^2)
 * 有序情况下：O(n)，即在设置flag的情况下，发生数组有序则终止循环
 * 逆序情况下：n-1 + n-2 + .... 1 = n*(n - 1)/2，即为 O(n ^ 2)
 * 空间复杂度：O(1)
 * 两个临时变量（交换时的临时变量、flag），只需要常量级的临时空间，空间复杂度为 O(1)
 * 稳定性：稳定（即对于两个相等的元素，排序后的顺序与之前的顺序一致）
*/
function bubbleSort (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// 优化，已经有序的数据，遍历一遍即可
function bubbleSort (arr) {
  for (var i = 0; i < arr.length - 1; i++) {
    var flag = true
    for (var j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        flag = false
      }
    }
    if (flag) {
      break;
    }
  }
  return arr;
}
```

### 选择排序

每轮遍历中将当前元素和其后元素进行比较，选择最小值的索引，在外层进行交换，每轮交换后，小的元素位于前面

```js
/**
 * 平均时间复杂度：O(n^2)
 * 最好情况和最坏情况都是O(n^2)
 * 空间复杂度：O(1)
 * 稳定性：不稳定，如 [2, 2, 1]，两个元素2在排序后顺序与之前不一致
 */
function selectionSort (arr) {
  var len = arr.length
  var minIndex, temp
  for (var i = 0; i < len - 1; i++) {
    minIndex = i
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```