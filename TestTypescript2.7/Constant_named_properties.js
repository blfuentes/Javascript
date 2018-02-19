var Foo = "Foo";
var Bar = "Bar";
var x = (_a = {},
    _a[Foo] = 100,
    _a[Bar] = "hello",
    _a);
var a = x[Foo]; // has type 'number'
var b = x[Bar]; // has type 'string'
console.log(a);
console.log(b);
var _a;
