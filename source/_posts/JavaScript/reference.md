---
title: Reference
categories: 
- JavaScript
---

## Reference

它是一个比较抽象的类型，为了更好地描述语言的底层行为逻辑，并不存在于实际的 js 代码中。(见：8.7)

由三部分构成：
1. base value：值只可能是 undefined, an Object, a Boolean, a String, a Number, or an environment record 其中的一种（就是属性所在的对象或者就是 EnvironmentRecord，the base value is the context in which the referenced name lives）
2. referenced name
3. strict reference

操作Reference的一些方法：

1. GetBase(V). Returns the base value component of the reference V.
2. GetReferencedName(V). Returns the referenced name component of the reference V.
3. IsStrictReference(V). Returns the strict reference component of the reference V.
4. HasPrimitiveBase(V). Returns true if the base value is a Boolean, String, or Number.
5. IsPropertyReference(V). Returns true if either the base value is an object or HasPrimitiveBase(V) is true; otherwise returns false.（即为undefined或environment record时返回false）
6. IsUnresolvableReference(V). Returns true if the base value is undefined and false otherwise.

```js
var foo = 1;

// 对应的Reference是：
var fooReference = {
  base: EnvironmentRecord,
  name: 'foo',
  strict: false
};
```

### MemberExpression

[11.2]

MemberExpression一共有5种类型

1. PrimaryExpression // 原始表达式 可以参见《JavaScript权威指南第四章》
2. FunctionExpression // 函数定义表达式
3. MemberExpression [ Expression ] // 属性访问表达式
4. MemberExpression . IdentifierName // 属性访问表达式
5. new MemberExpression Arguments // 对象创建表达式

The production MemberExpression : MemberExpression [ Expression ] is evaluated as follows:

1. Let baseReference be the result of evaluating MemberExpression.
2. Let baseValue be GetValue(baseReference).
3. Let propertyNameReference be the result of evaluating Expression.
4. Let propertyNameValue be GetValue(propertyNameReference).
5. Call CheckObjectCoercible(baseValue).
6. Let propertyNameString be ToString(propertyNameValue).
7. If the syntactic production that is being evaluated is contained in strict mode code, let strict be true, else let strict be false.
8. Return a value of type Reference whose base value is baseValue and whose referenced name is propertyNameString, and whose strict mode flag is strict.

### GetValue

[8.7.1]

1. If Type(V) is not Reference, return V.
2. Let base be the result of calling GetBase(V).
3. If IsUnresolvableReference(V), throw a ReferenceError exception.
4. If IsPropertyReference(V), then
    a. If HasPrimitiveBase(V) is false, then let get be the [[Get]] internal method of base, otherwise let get be the special [[Get]] internal method defined below.
    b. Return the result of calling the get internal method using base as its this value, and passing GetReferencedName(V) for the argument.
5. Else, base must be an environment record.
  Return the result of calling the GetBindingValue (see 10.2.1) concrete method of base passing GetReferencedName(V) and IsStrictReference(V) as arguments.
  
### 函数中this的指向

规范 11.2.3 Function Calls

1. Let ref be the result of evaluating MemberExpression.(see 11.2.1 Property Accessors，evaluating MemberExpression返回的是一个Reference)
2. Let func be GetValue(ref).
3. Let argList be the result of evaluating Arguments, producing an internal list of argument values (see 11.2.4).
4. If Type(func) is not Object, throw a TypeError exception.
5. If IsCallable(func) is false, throw a TypeError exception.
6. If Type(ref) is Reference, then
    a. If IsPropertyReference(ref) is true, then Let thisValue be GetBase(ref).
    b. Else, the base of ref is an Environment Record Let thisValue be the result of calling the ImplicitThisValue concrete method of GetBase(ref).
7. Else, Type(ref) is not Reference. Let thisValue be undefined.
8. Return the result of calling the [[Call]] internal method on func, providing thisValue as the this value and providing the list argList as the argument values.

### 例1

```js
var foo = {
  bar: function () {
    return this;
  }
};
 
// 分析
foo.bar()

// 根据第1步和第6步可得this即为GetBase(ref)，即为foo
1. evaluating MemberExpression，即为foo.bar，其Reference为：
ref = {
  base: foo,
  name: 'bar',
  strict: false
};
6. ref是一个Reference，其base value是foo，为一个对象，所以IsPropertyReference(ref)返回true，此时this为GetBase(ref)，即为foo
```

### 例2

```js
var value = 1;

var foo = {
  value: 2,
  bar: function () {
    return this.value;
  }
}

console.log(foo.bar()); // 2
console.log((foo.bar)()); // 2
console.log((foo.bar = foo.bar)()); // 1
console.log((false || foo.bar)()); // 1
console.log((foo.bar, foo.bar)()); // 1

// 分析(foo.bar)()
11.1.6 The Grouping Operator
The production PrimaryExpression : ( Expression ) is evaluated as follows:
Return the result of evaluating Expression. This may be of type Reference.

根据上述的规范(foo.bar)的结果就是foo.bar，等同于例1

// 分析(foo.bar = foo.bar)()
11.13.1 Simple Assignment
The production AssignmentExpression : LeftHandSideExpression = AssignmentExpression is evaluated as follows:

1. Let lref be the result of evaluating LeftHandSideExpression.
2. Let rref be the result of evaluating AssignmentExpression.
3. Let rval be GetValue(rref).
4. Throw a SyntaxError exception if the following conditions are all true:
  Type(lref) is Reference is true
  IsStrictReference(lref) is true
  Type(GetBase(lref)) is Environment Record
  GetReferencedName(lref) is either "eval" or "arguments"
5. Call PutValue(lref, rval).
6. Return rval.

根据上述的规范的第3步得到rval是一个具体的值，不是一个Reference，再根据 11.2.3 中的第7步得this为undefined，在非严格模式下，this 的值为 undefined 的时候，其值会被隐式转换为全局对象

// 分析(false || foo.bar)()
11.11 Binary Logical Operators（二元逻辑运算符）
The production LogicalORExpression : LogicalORExpression || LogicalANDExpression is evaluated as follows:

1. Let lref be the result of evaluating LogicalORExpression.
2. Let lval be GetValue(lref).
3. If ToBoolean(lval) is true, return lval.
4. Let rref be the result of evaluating LogicalANDExpression.
5. Return GetValue(rref).

根据上述的规范得最后返回的是GetValue(rref)，即一个具体的值，不是一个Reference

// 分析(foo.bar, foo.bar)()
11.14 Comma Operator ( , )
The production Expression : Expression , AssignmentExpression is evaluated as follows:

1. Let lref be the result of evaluating Expression.
2. Call GetValue(lref).
3. Let rref be the result of evaluating AssignmentExpression.
4. Return GetValue(rref).

根据上述的规范得最后返回的是GetValue(rref)，即一个具体的值，不是一个Reference
```

### 例3

```js
function foo() {
  console.log(this)
}

foo(); 
```
MemberExpression 是 foo，解析标识符，查看规范 10.3.1 Identifier Resolution，会返回一个 Reference 类型的值。根据11.2.3中的第6步，base value 值是 Environment Record，所以IsPropertyReference(ref)返回false，调用 ImplicitThisValue(ref)，查看规范 10.2.1.1.6，ImplicitThisValue 方法的介绍：该函数始终返回 undefined。所以最后 this 的值就是 undefined。

### 陷阱题

```js
function Foo(){
	getName = function(){
		console.log(1);					
  ;
	return this
}
			
function getName(){
	console.log(5);
}

Foo().getName(); // 1

// this返回的是undefined，结果为1的原因是因为执行Foo的时候，其内部的getName方法将全局的覆盖了
```

[参考1](http://es5.github.io/#x15.1)
[参考2](http://yanhaijing.com/es5/#80)
[参考3](https://github.com/mqyqingfeng/Blog/issues/7)