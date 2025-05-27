let arr = [1, 2, 3];
let a = arr.slice();
let b = arr.filter(() => true);
let c = [...arr];
let d = [].concat(...arr);
let e = arr.map((n) => n);
let f = Array.from(arr);
let g = new Array(...arr);

[a, b, c, d, e, f, g].forEach((e) => {
  console.log(e);
})