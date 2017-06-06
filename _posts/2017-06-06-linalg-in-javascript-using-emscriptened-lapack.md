---
layout: post
title: Linear Algebra in Javascript using Emscriptened LAPACK
---

After my first post about the solutions I was exploring to get basic linear algebra working in Javascript, I’ve made several more experiments and have made reasonable progress. I mainly explored two approaches

Purist - Read Golub and Van Loan and implement the algorithms from theory
Pragmatic - Emscripten one of the existing linear algebra libraries (LAPACK or GSL) and build higher level API on top of it.
I gave the purist approach an honest shot for a week. Although I enjoyed learning the algorithms and implementing them, it didn’t seem to justify breaking the cardinal rule of software engineering - reuse if you can!

As I described in first post, I had given emscripten a try as a pragmatic solution. However the results weren’t promising in first go. But I gave it another shot and this time I was significantly more successful. In the process of learning emscripten, I churned out couple of how-to tutorials as well.

In past few days as I’ve gained more familiarity with the LAPACK API, it was easier to implement basic linalg functionality like LU decomposition, matrix multiplication, Cholesky decomposition, etc. I used the emlapack library, which taught me tons about emscripten build process.

With this success under belt, I soon made another unexpected discovery which made Emscripten solution really sweet. I found that numpy uses a light weight version of LAPACK. They have written some custom scripts and generated a stripped down set of LAPACK library that they compile and call from Python for numpy. It didn’t take me more than few minutes to roll up a CMake build solution to compile this lapacklite into Javascript using emscripten (see 1). The lapacklite.js is half in size compared to emlapack.js. It also loads as much faster.

With this much progress, I could start building a linalg API that is similar to numpy/matlab.
