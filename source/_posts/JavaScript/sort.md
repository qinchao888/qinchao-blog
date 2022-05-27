---
title: 排序
categories: 
- JavaScript
---

### 冒泡排序

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
```