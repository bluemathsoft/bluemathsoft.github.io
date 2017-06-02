---
layout: post
title: How to port a small C library to Javascript with Emscripten
---

Now that you already know how to compile individual C functions to Javascript, let's take a look at more practical example. Let's emscripten a small off-the-shelf C library.

We choose Linear Algebra library CLAPACK for this task. It's a very mature library that's at base of many math products. The library is self contained, i.e. it doesn't have any external dependencies, making our job less complicated. For this post we are going to compile a subset of CLAPACK, called BLAS (Basic Linear Algebra Subprograms). The original LAPACK library is written in Fortran. CLAPACK is a transpiled version of LAPACK created using F2C compiler. Therefore the BLAS library depends on another sub-library called F2CLib. We are going to compile the C source of these two libraries into bytecode and then link it to generate blas.js.

I've created a repository [lapackjs](https://github.com/bluemathsoft/lapackjs) for this project. In this [commit](https://github.com/bluemathsoft/lapackjs/commit/920b0f6dda69a7afd966e36712e3685d8a9f2979) you can see the custom Makefiles I wrote to get blas.js building.

Assuming `emcc` is in your `PATH` environment variable, you can build blas.js as follows

``` bash
$ git clone git@github.com:bluemathsoft/lapackjs.git
$ cd lapackjs
$ make -f Makefile.em all
```

Now let's invoke a function from this library. We choose the `saxpy` routine.

`saxpy` stands for `ax+y` (s is for single-precision).

The routine takes two arrays `x`, `y` and a multiplier `a`.

For example, if `x = [x0,x1,x2]` and `y = [y0,y1,y2]`, then after `saxpy` is called, `y` will contain `[a*x0+y0 a*x1+y1 a*x2+y2]`

The C function signature is as follows

``` c
int saxpy_(integer *n,
  real *sa, real *sx, integer *incx, real *sy, integer *incy);
```

Note that all the arguments are pointers. Accordingly we will have to allocate pointers. If you peek into [f2c.h](https://github.com/bluemathsoft/lapackjs/blob/master/INCLUDE/f2c.h) you will find that `real` is a typedef for `float`. Therefore we use Float32Array for array and use 4 bytes for size of each element of the array. Note the `f2c_` prefix. It's due to some macro magic in CLAPACK's build configuration.

``` javascript
//
// test-saxpy.js
//
const em = require('./BLAS/blas');

let saxpy = em.cwrap('f2c_saxpy',
    'number', // Function return void
    // Integers, Floating point numbers and pointers all
    // are considered 'number'
    ['number','number','number','number','number','number']
  );

let n = 3;

let pn = em._malloc(4);

let psa = em._malloc(4);

let psx = em._malloc(n*4);
let pincx = em._malloc(4);

let psy = em._malloc(n*4);
let pincy = em._malloc(4);

em.setValue(pn, n, 'i32');
em.setValue(psa, 20, 'float');
em.setValue(pincx, 1, 'i32');
em.setValue(pincy, 1, 'i32');

let sx = new Float32Array(em.HEAPF32.buffer, psx, n);
let sy = new Float32Array(em.HEAPF32.buffer, psy, n);

sx.set([2,4,6]);
sy.set([3,7,1]);

let result = saxpy(pn, psa, psx, pincx, psy, pincy);

console.log(sy);
```

On running
```
$ node test-saxpy.js
Float32Array [ 43, 87, 121 ]
```

You can also load the blas.js in browser and run it like [this](https://github.com/bluemathsoft/lapackjs/blob/master/test-saxpy.html).
