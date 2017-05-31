---
layout: post
title: How to Emscripten C function with array argument
---

How to Emscripten C function with array argument
===

You have successfully emscriptened the simplest C function. Now you want to do something serious by passing an array of numbers to the C function. This post will describe how to go about it.

Here's the C function that accepts an array of `double`s and multiplies it by a multiplier. The content of array are overwritten by the result, thus the array argument acts as input as well as output.

``` c
void arraymul(int length, double *arr, double multiplier) {
  for(int i=0; i<length; i++) {
    arr[i] = arr[i] * multiplier;
  }
}
```

Compile it into javascript
``` bash
$ emcc arraymul.c -o arraymul.js -s EXPORTED_FUNCTIONS='["_arraymul"]'
```

Here's the javascript code that will invoke the C routine

``` javascript
let em = require('./arraymul')

let arraymul = em.cwrap('arraymul',
    null, // Function return void
    // Integers, Floating point numbers and pointers all
    // are considered 'number'
    ['number','number','number']
  );

let length = 5;
let multiplier = 12;

// Allocate array memory (sizeof double = 8) and
// get a pointer to it
let parr = em._malloc(length*8);

// Populate the array
// We create Float64Array in javascript code and map it to
// the pointer that we received above. We can then populate
// the array with values we want to pass as input
let arr = new Float64Array(em.HEAPF64.buffer, parr, length);
arr.set([0.5,1.0,1.5,2.0,2.5]);

// Invoke the function
arraymul(length, parr, multiplier);

console.log(arr);
```

Let's execute
``` bash
$ node test.js
Float64Array [ 6, 12, 18, 24, 30 ]
```

You can run the same code in browser with minor changes, as described in this [post](/2017/05/30/how-to-emscripten-simplest-c-function.html).
