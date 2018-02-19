const Foo = "Foo";
const Bar = "Bar";

let x = {
    [Foo]: 100,
    [Bar]: "hello",
};

let a = x[Foo]; // has type 'number'
let b = x[Bar]; // has type 'string'
console.log(a);
console.log(b);