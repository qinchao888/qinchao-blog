---
title: uuid
categories: 
- Other
---

UUID为32位的十六进制数，因此实际上是16-byte (128-bit)

1个二进制数等于1个bit，1个16进制数等于4个二进制数，即等于4个bit，所以：一个16进制数等于半个字节

[参考1](https://cloud.tencent.com/developer/article/1530850)

[参考2](https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid)

[参考3](https://www.ietf.org/rfc/rfc4122.txt)

```js
function uuid () {
  var s = [];
  var hexDigits = '0123456789abcdef';
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';  // 版本号
  s[19] = hexDigits.substr((parseInt(s[19], 16) & 0x3) | 0x8, 1); // 时钟序列，取值在 8 ~ 11之间，取1位，故值只能为：1 8 9（原因：未知）
  s[8] = s[13] = s[18] = s[23] = "-";
  var uuid = s.join('');
  return uuid;
}
```

```js
'f' & 0x3 // 0（原因：此处的f被当成了未识别的字符串，而非16进制的f）
parseInt('f', 16) & 0x3 // 3
```