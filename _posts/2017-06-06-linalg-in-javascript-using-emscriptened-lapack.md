---
layout: post
title: Linear Algebra in Javascript using Emscriptened LAPACK
category: 2_BlueMath Library
---

After my [first post](http://www.bluemathsoftware.com/2017/05/17/basic-linear-algebra.html) about the solutions I was exploring to get basic linear algebra working in Javascript, I’ve made several more experiments and have made reasonable progress. I mainly explored two approaches

* Purist - Read Golub and Van Loan and implement the algorithms from theory
* Pragmatic - Emscripten one of the existing linear algebra libraries (LAPACK or GSL) and build higher level API on top of it.

I gave the purist approach an honest shot for a week. Read the theory from the standard textbook and implemented the algorithms for LU decomposition and equation solving. Although I enjoyed learning the algorithms and implementing them, it didn’t seem to justify breaking the cardinal rule of software engineering - *Reuse what you can!*

As I described in first post, I had given emscripten a try as a pragmatic solution. However the results weren’t promising in first go. But I gave it another shot and this time I was significantly more successful. In the process of learning emscripten, I churned out a [few](http://www.bluemathsoftware.com/2017/05/30/how-to-emscripten-simplest-c-function.html) [how-to](http://www.bluemathsoftware.com/2017/05/31/how-to-emscripten-c-function-array-argument.html) [tutorials](http://www.bluemathsoftware.com/2017/05/31/how-to-emscripten-small-c-library.html) as well.

I tried to compile the original CLAPACK code using emscripten myself, but later on I realized how similar it was to [emlapack](https://github.com/likr/emlapack). So I instead decided to use emlapack itself. The library taught me tons about the build process of emscripten.

In past few days as I’ve gained more familiarity with the LAPACK API, it was easier to implement basic linalg functionality like LU decomposition and equation solving on top of LAPACK api. 

With this success under belt, I soon made another unexpected discovery which made Emscripten solution really sweet. I found that numpy uses a light weight version of LAPACK. They have written some custom scripts and generated a stripped down set of LAPACK library that they compile and call from Python for numpy. It didn’t take me more than few minutes to roll up a [CMake build solution](https://github.com/bluemathsoft/numpy/commit/32a35403b7845679bc11f00cf196a3cadc9ebbd3) to compile this lapacklite into Javascript using emscripten. The lapacklite.js is lesser than half in size (1.7M) compared to emlapack.js (3.7M). It also loads as much faster.

With this much progress, I have started building a linalg API that is similar to numpy/matlab.

Update (Jun 15,2017)
---

The `linalg` API is now ready for some basic functionality. It is largely inspired from `numpy` conventions.

[Check it out](/docs/index.html).
