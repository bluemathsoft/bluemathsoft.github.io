---
layout: post
title: Basic Linear Algebra
keywords: linear algebra,math,lapack,emscripten,javascript
category: 2_BlueMath Updates
---

I've been working for couple of weeks now on BlueMath library. The first module I decided to build was basic linear algebra, because that's typically most frequently used module in a math kernel library and other libraries also depend on it. It's fairly well understood and has multiple implementations available in open source. I spent some time reviewing different libraries that offer linear algebra and tried couple of different approaches before implementing a pure Javascript version of it.

There are two distinct implementations of linear algebra modules - LAPACK and GSL (Gnu Scientific Library). Netlib's LAPACK is one of the oldest math libraries out there. It's written in Fortran, but has bindings for C. Most of the open source math libraries use LAPACK, including numpy. It has the reputation of being most reliable library for the job, because it's seen lot of usage and has been optimized very well. The biggest problem with LAPACK though is its API syntax. For today's programmers Fortran function syntax is as obscure as assembly code. Even though C bindings are available, they directly copy the fortran api, including 4-character function names! This was one of the primary reasons behind development of Gnu Scientific library. GSL implements linalg subroutines in legible C code and has relatively friendly API. I could read through the code and consult the theory books that were referenced in the documentation. That gave me better understanding of the algorithms.

Conventional wisdom in Software engineering says that reuse the code as much as possible. Therefore I looked into using Emscripten to compile LAPACK/GSL to Javascript. And indeed I found that there's emscripten compiled version of CLAPACK [1] called [emlapack](https://github.com/likr/emlapack). It worked quite nice for the example calculation of eigen values on its project page. With that example as a start and LAPACK API docs, I tried to do LU decomposition and Least Squares operations using emlapack. I succeeded in invoking the APIs without errors, however the returned results were anything but correct. Most likely the reason is some error in my understanding of the format of input data that emscripten-ed LAPACK expects. After spending half a day, I gave up. Even if it would have worked, the prospect of coding to an obscure API interface wasn't welcoming. LAPACK source is available for investigation, but lack of understanding of Fortran makes it virtually a black box.

At this point I decided to implement the routines in Javascript itself. It so happens that I've implemented some of these routines in JS in the past. Now I'm doing them in its slightly well-behaved cousin TypeScript.

As of now, bluemath defines Vector and Matrix classes. The Matrix class has methods for basic operations - scaling, matrix multiplication, transpose, slicing, cloning, etc. In addition I implented LU decomposition and solving of system of linear equations on top of it. This also allowed implementation of inverse and determinant computation. I reviewed numpy's `ndarray` code and considered implementing N-dimensional array instead of 2x2 Matrix. However it seemed to be too much sophistication too early. A generic structure like `ndarray` is elegant because it handles a wide variety of data - from one dimensional vectors to giant datasets - in single format. If such generic use cases seem relevant to bluemath, we can implement it in future. For now a 2D Matrix class will suffice. The Matrix is (and so is Vector) implemented on top of JS's TypedArrays, thus using efficient in-memory storage of these data structures.

All the methods are being unit tested with a QUnit test suite. I gathered some test examples from other libraries (but was surprised to find so little of it). Then I made up some examples of my own and solved them using numpy or Wolfram alpha and verified that bluemath also produces same results within satisfactory tolerance.



[1] CLAPACK is LAPACK with its fortran code converted to C using f2c compiler
