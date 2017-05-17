---
layout: post
---

Basic Linear Algebra
===

I've been working couple of weeks on BlueMath library by now. One of the first set of functionality I decided to build was basic linear algebra, because that's typically most frequently used module in a math kernel library. Also it's fairly well understood and has multiple implementations available in open source. I spent some time reviewing different libraries that offer linear algebra and tried couple of different approaches before implementing a pure Javascript version of it.

There are two distinct implementation of linear algebra modules - 1. based on LAPACK, 2. Gnu Scientific Library. Netlib's LAPACK is one of the oldest math libraries out there. It's written in Fortran, but is available to be called from C/C++ code. Most of the open source math libraries use LAPACK, including numpy. It has the reputation of being most reliable library for the job, because it has been used the most and has been optimized very well. The big problem with LAPACK is its API syntax. For today's programmers Fortran function syntax is as obscure as assembly code. Even though C bindings are available, they directly copy the fortran api, including 4-character function names! This was one of the primary reasons behind development of Gnu Scientific library. GSL implements linalg subroutines in legible C code and has relatively friendly API. I could read through the code and consult the theory books that were referenced in the documentation, so as to understand how the algorithm works.

Conventional wisdom in Software engineering says that reuse the code as much as possible. Therefore I looked into using Emscripten to compile LAPACK/GSL to Javascript. And indeed I found that there's emscripten compiled version of CLAPACK [1] called [emlapack](https://github.com/likr/emlapack). It worked quite nices for the example calculation of eigen values as listed on project page. With that as a reference and LAPACK API docs, I tried to do LU decomposition and Least Squares operations using emlapack. I succeeded in invoking the APIs without errors, however the returned results were anything but correct. Most likely the error was in my understanding of the format of input datat that emscriptened LAPACK expected. After spending half of the day, I gave up. Even though it would have worked, the prospect of coding to an obscure API interface didn't seem promising. Even though its code is available, lack of understanding of Fortran makes it virtually a black box.

At this point I decided to implement the routines in Javascript itself. It so happens that I've implemented some of these routines in JS in the past.

As of now, bluemath defines Vector and Matrix classes. The Matrix class has methods for basic operations - scaling, matrix multiplication, transpose, slicing, cloning, etc. In addition I implented LU decomposition and solving of system of linear equations on top of it. This also allowed implementation of inverse and determinant computation. I reviewed numpy's `ndarray` code and considered implementing N-dimensional array instead of 2x2 Matrix class like I eventually did. However it seemed to be too much sophistication too early. A generic structure like `ndarray` is elegant because it handles a wide variety of data - from one dimensional vectors to giant datasets - in single format. But if such generic use cases seem relevant to bluemath, we can implement it in future. For now a 2D Matrix class is sufficient for necessary linear algebra. The Matrix class is (and so is Vector) implemented on top of JS's TypedArrays, thus using efficient in-memory storage of these data structures.

All the methods are being unit tested with a QUnit test suite. I gathered some test examples from other libraries (but was surprised to find so little of it). Then I made up some examples of my own and solved them using numpy or Wolfram alpha and verified that bluemath also produces same results within satisfactory tolerance.



[1] CLAPACK is LAPACK source code converted from Fortran to C using f2c
