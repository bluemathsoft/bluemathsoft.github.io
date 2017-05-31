---
layout: post
title: How to Emscripten simplest C function
keywords: emscripten,webassembly
---

How to Emscripten simplest C function
===

Compiling native code to Javascript/WebAssembly is the next advanced technology in Web programming. But if you are just getting started with it, you might find yourself lost in the myriads of details. Here's a simple recipe to get you on track.

You want to port a legacy native library written in C to run in browser. What's the minimal recipe to achieve that before you have to worry about advanced things like memory buffer allocations.

Let's define a simple C function

``` c
int simpleadd(int x, int y) {
  return x+y;
}
```

Assuming you have installed Emscripten SDK already and you have **emcc** in your path, execute following

    emcc simple.c -o simple.bc
    emcc simple.bc -o simple.js \
      -s EXPORTED_FUNCTIONS='["_simpleadd"]'

Now let's write Javascript code that calls this function

``` javascript
// test.js
let em = require('./simple')

let simpleadd = em.cwrap('simpleadd',
  'number', // return value
  ['number','number'] // arguments
);

let result = simpleadd(5,20);
console.log(result);
```

That's it. Run it!

    node test.js
    25


Want to run it in browser?

``` html
<html>
  <head>
    <script src="simple.js"></script>
  </head>
  <body>
    <script>
      let simpleadd = Module.cwrap('simpleadd',
        'number', // return value
        ['number','number'] // arguments
      );
      let result = simpleadd(5,20);
      document.body.textContent = result+'';
    </script>
  </body>
</html>
```
