/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
Object.defineProperty(exports, "__esModule", { value: true });
var ops_1 = __webpack_require__(3);
exports.eye = ops_1.eye;
exports.zeros = ops_1.zeros;
exports.empty = ops_1.empty;
exports.arr = ops_1.arr;
exports.range = ops_1.range;
exports.iszero = ops_1.iszero;
exports.isequal = ops_1.isequal;
exports.torad = ops_1.torad;
exports.todeg = ops_1.todeg;
exports.add = ops_1.add;
exports.mul = ops_1.mul;
exports.sub = ops_1.sub;
exports.div = ops_1.div;
exports.dot = ops_1.dot;
exports.cross = ops_1.cross;
exports.length = ops_1.length;
exports.dir = ops_1.dir;
exports.count = ops_1.count;
var constants_1 = __webpack_require__(1);
exports.EPSILON = constants_1.EPSILON;
var ndarray_1 = __webpack_require__(4);
exports.NDArray = ndarray_1.NDArray;
var complex_1 = __webpack_require__(5);
exports.Complex = complex_1.Complex;
var aabb_1 = __webpack_require__(11);
exports.AABB = aabb_1.AABB;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
var EPSILON = 1e-6;
exports.EPSILON = EPSILON;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

 Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

 This file is part of Zector Math.

 Zector Math is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Zector Math is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with Zector Math.  If not, see <http://www.gnu.org/licenses/>.

 */
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(0);
/**
 * @hidden
 * Compute all n'th degree bernstein polynomials at given parameter value
 */
function bernstein(n, u) {
    let B = new Array(n + 1);
    B[0] = 1.0;
    let u1 = 1.0 - u;
    for (let j = 1; j <= n; j++) {
        let saved = 0.0;
        for (let k = 0; k < j; k++) {
            let temp = B[k];
            B[k] = saved + u1 * temp;
            saved = u * temp;
        }
        B[j] = saved;
    }
    return B;
}
exports.bernstein = bernstein;
/**
 * @hidden
 * Find the index of the knot span in which `u` lies
 * @param {number} p Degree
 * @param {Array.<number>} U Knot vector
 * @param {number} u Parameter
 * @returns {number}
 */
function findSpan(p, U, u) {
    let m = U.length - 1;
    let n = m - p - 1;
    if (common_1.isequal(u, U[n + 1])) {
        return n;
    }
    let low = p;
    let high = n + 1;
    let mid = Math.floor((low + high) / 2);
    while (u < U[mid] || u >= U[mid + 1]) {
        if (u < U[mid]) {
            high = mid;
        }
        else {
            low = mid;
        }
        mid = Math.floor((low + high) / 2);
    }
    return mid;
}
exports.findSpan = findSpan;
/**
 * @hidden
 * Evaluate basis function values
 * @param {number} p Degree
 * @param {Array.<number>} U Knot vector
 * @param {number} i Knot span index
 * @param {number} u Parameter
 * @returns {Array} Basis function values at i,u
 */
function getBasisFunction(p, U, i, u) {
    let N = new Array(p + 1);
    N[0] = 1.0;
    let left = new Array(p + 1);
    let right = new Array(p + 1);
    for (let j = 1; j <= p; j++) {
        left[j] = u - U[i + 1 - j];
        right[j] = U[i + j] - u;
        let saved = 0.0;
        for (let r = 0; r < j; r++) {
            let temp = N[r] / (right[r + 1] + left[j - r]);
            N[r] = saved + right[r + 1] * temp;
            saved = left[j - r] * temp;
        }
        N[j] = saved;
    }
    return N;
}
exports.getBasisFunction = getBasisFunction;
/**
 * @hidden
 * The NURBS book Algo A2.3
 * Compute non-zero basis functions and their derivatives, upto and including
 * n'th derivative (n <= p). Output is 2-dimensional array `ders`
 * @param {number} p Degree
 * @param {number} u Parameter
 * @param {number} i Knot span
 * @param {NDArray} knots Knot vector
 * @param {number} n nth derivative
 * @returns {NDArray} ders ders[k][j] is k'th derivative of
 *            basic function N(i-p+j,p), where 0<=k<=n and 0<=j<=p
 */
function getBasisFunctionDerivatives(p, u, ki, knots, n) {
    let U = knots.data;
    let ndu = common_1.empty([p + 1, p + 1]);
    let ders = common_1.empty([n + 1, p + 1]);
    ndu.set(0, 0, 1.0);
    let a = common_1.empty([2, p + 1]);
    let left = [];
    let right = [];
    for (let j = 1; j <= p; j++) {
        left[j] = u - U[ki + 1 - j];
        right[j] = U[ki + j] - u;
        let saved = 0.0;
        for (let r = 0; r < j; r++) {
            // Lower triangle
            ndu.set(j, r, right[r + 1] + left[j - r]);
            let temp = ndu.getN(r, j - 1) / ndu.getN(j, r);
            // Upper triangle
            ndu.set(r, j, saved + right[r + 1] * temp);
            saved = left[j - r] * temp;
        }
        ndu.set(j, j, saved);
    }
    for (let j = 0; j <= p; j++) {
        ders.set(0, j, ndu.get(j, p));
    }
    // This section computes the derivatives (eq 2.9)
    for (let r = 0; r <= p; r++) {
        let s1 = 0;
        let s2 = 1;
        // Alternate rows in array a
        a.set(0, 0, 1.0);
        for (let k = 1; k <= n; k++) {
            let d = 0.0;
            let rk = r - k;
            let pk = p - k;
            if (r >= k) {
                a.set(s2, 0, a.getN(s1, 0) / ndu.getN(pk + 1, rk));
                d = a.getN(s2, 0) * ndu.getN(rk, pk);
            }
            let j1, j2;
            if (rk >= -1) {
                j1 = 1;
            }
            else {
                j1 = -rk;
            }
            if (r - 1 <= pk) {
                j2 = k - 1;
            }
            else {
                j2 = p - r;
            }
            for (let j = j1; j <= j2; j++) {
                a.set(s2, j, (a.getN(s1, j) - a.getN(s1, j - 1)) / ndu.getN(pk + 1, rk + j));
                d += a.getN(s2, j) * ndu.getN(rk + j, pk);
            }
            if (r <= pk) {
                a.set(s2, k, -a.get(s1, k - 1) / ndu.getN(pk + 1, r));
                d += a.getN(s2, k) * ndu.getN(r, pk);
            }
            ders.set(k, r, d);
            // Switch rows
            let temp = s1;
            s1 = s2;
            s2 = temp;
        }
    }
    // Multiply through by the correct factors (eq 2.9)
    let r = p;
    for (let k = 1; k <= n; k++) {
        for (let j = 0; j <= p; j++) {
            ders.set(k, j, common_1.mul(ders.get(k, j), r));
        }
        r *= p - k;
    }
    return ders;
}
exports.getBasisFunctionDerivatives = getBasisFunctionDerivatives;
function blossom(cpoints, n, ts) {
    let b = cpoints.clone();
    if (ts.length !== n) {
        throw new Error("Number of parameters not equal to degee");
    }
    for (let r = 1; r < n + 1; r++) {
        let t = ts[r - 1];
        for (let i = 0; i < n + 1 - r; i++) {
            b.set(i, common_1.add(common_1.mul((1 - t), b.get(i)), common_1.mul(t, b.get(i + 1))));
        }
    }
    return b.get(0);
}
exports.blossom = blossom;
/**
 * Computes equation of plane passing through given 3 points
 * Eqn of plane is
 *  ax + by + cz + d = 0
 * This routine returns [a,b,c,d]
 * The direction of the normal is defined by assuming that A,B,C are in
 * counter-clockwise direction. i.e. if you curl fingers of right hand
 * in counter-clockwise direction, then the raised thumb will give the
 * direction of the plane normal
 */
function planeFrom3Points(A, B, C) {
    if (A.shape.length !== 1 || B.shape.length !== 1 || C.shape.length !== 1) {
        throw new Error('A,B,C should be 1D position vectors, i.e. Point coord');
    }
    if (A.shape[0] !== 3 || B.shape[0] !== 3 || C.shape[0] !== 3) {
        throw new Error('A,B,C should be points in 3D space');
    }
    let AB = common_1.sub(B, A);
    let AC = common_1.sub(C, A);
    let n = common_1.dir(common_1.cross(AB, AC));
    let d = -common_1.dot(n, A);
    return [n.getN(0), n.getN(1), n.getN(2), d];
}
exports.planeFrom3Points = planeFrom3Points;
/**
 * Finds intersection between two line segments in 3D
 * First line segment extends from p1 to p2, and second extends from p3 to p4
 * Input points are assumed to be coordinates in 3D coord system
 *
 * Algorithm based on C implemention by Paul Bourke
 * http://paulbourke.net/geometry/pointlineplane/lineline.c
 *
 * The method will return a tuple with results (ua, ub),
 * where u is the parameter value on each line
 * If there is no intersection null will be returned
 */
function intersectLineSegLineSeg3D(p1, p2, p3, p4) {
    if (p1.length !== 3 || p2.length !== 3 || p3.length !== 3 || p4.length !== 3) {
        throw new Error('All input points need to be 3D');
    }
    let pt1 = common_1.arr(p1);
    let pt2 = common_1.arr(p2);
    let pt3 = common_1.arr(p3);
    let pt4 = common_1.arr(p4);
    let p13 = common_1.sub(pt1, pt3);
    let p43 = common_1.sub(pt4, pt3);
    if (common_1.iszero(p43.getN(0)) && common_1.iszero(p43.getN(1)) && common_1.iszero(p43.getN(2))) {
        return null;
    }
    let p21 = common_1.sub(pt2, pt1);
    if (common_1.iszero(p21.getN(0)) && common_1.iszero(p21.getN(1)) && common_1.iszero(p21.getN(2))) {
        return null;
    }
    let d1343 = common_1.dot(p13, p43);
    let d4321 = common_1.dot(p43, p21);
    let d1321 = common_1.dot(p13, p21);
    let d4343 = common_1.dot(p43, p43);
    let d2121 = common_1.dot(p21, p21);
    let denom = d2121 * d4343 - d4321 * d4321;
    if (common_1.iszero(denom)) {
        return null;
    }
    let numer = d1343 * d4321 - d1321 * d4343;
    let mua = numer / denom;
    let mub = (d1343 + d4321 * mua) / d4343;
    let pa = common_1.add(pt1, common_1.mul(mua, p21));
    let pb = common_1.add(pt3, common_1.mul(mub, p43));
    // Line segment pa to pb represents shortest line segment between a and b
    // If it's of length zero, then ua, ub represent point of intersection
    // between the two lines
    if (common_1.iszero(common_1.length(common_1.sub(pb, pa)))) {
        return [mua, mub];
    }
    return null;
}
exports.intersectLineSegLineSeg3D = intersectLineSegLineSeg3D;
/**
 * The check works by constructing a line between first and last control
 * point and then finding the distance of other control points from this
 * line. Instead of actually calculating the distance from the line, we
 * do the check if the point lies on the line or not. This is done by
 * substituting the [x,y] coordinates of control point, into the equation
 * of the line. If the result is zero within the tolerance value, then
 * the control point lies on the line. If all control points lie on the line
 * then the curve can be considered a straight line.
 * @param points Array of points in 2D coord
 * @param tolerance Tolerance within which a group of points is co-linear
 */
function arePointsColinear(points, tolerance) {
    if (points.shape.length !== 2 || points.shape[1] !== 2) {
        throw new Error('points should be an array of points in 2D coord');
    }
    let x0 = points.getN(0, 0);
    let y0 = points.getN(0, 1);
    let xn = points.getN(points.length - 1, 0);
    let yn = points.getN(points.length - 1, 1);
    let A = yn - y0;
    let B = xn - x0;
    for (let i = 1; i < points.length - 1; i++) {
        let x = points.getN(i, 0);
        let y = points.getN(i, 1);
        // From the equation of the line of the form
        // y-mx-c = 0
        let value = y - (A / B) * x - (y0 - (A / B) * x0);
        if (!common_1.iszero(value, tolerance)) {
            return false;
        }
    }
    return true;
}
exports.arePointsColinear = arePointsColinear;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(1);
var ndarray_1 = __webpack_require__(4);
var complex_1 = __webpack_require__(5);
/**
 * Convert angle to degrees
 */
function todeg(angleInRadians) {
    return 180 * angleInRadians / Math.PI;
}
exports.todeg = todeg;
/**
 * Convert angle to radians
 */
function torad(angleInDegrees) {
    return Math.PI * angleInDegrees / 180;
}
exports.torad = torad;
/**
 * Check if input equals zero within given tolerance
 */
function iszero(x, tolerance) {
    if (tolerance === void 0) { tolerance = constants_1.EPSILON; }
    // the 'less-than-equal' comparision is necessary for correct result
    // when tolerance = 0
    return Math.abs(x) <= tolerance;
}
exports.iszero = iszero;
/**
 * Check if two input numbers are equal within given tolerance
 */
function isequal(a, b, tolerance) {
    if (tolerance === void 0) { tolerance = constants_1.EPSILON; }
    return iszero(a - b, tolerance);
}
exports.isequal = isequal;
/**
 * Find cube root of given number. Math.pow return NaN while taking
 * cube root of negative number, because some of the results might
 * be complex numbers. This function only return the real cubeRoot
 * of given number
 */
function cuberoot(x) {
    return x < 0 ? -Math.pow(-x, 1 / 3) : Math.pow(x, 1 / 3);
}
exports.cuberoot = cuberoot;
/**
 * Generate array of integers within given range.
 * If both a and b are specified then return [a,b)
 * if only a is specifed then return [0,a)
 */
function range(a, b) {
    if (b === undefined) {
        b = a;
        a = 0;
    }
    b = Math.max(b, 0);
    var arr = [];
    for (var i = a; i < b; i++) {
        arr.push(i);
    }
    return new ndarray_1.NDArray(arr, { datatype: 'i32' });
}
exports.range = range;
/**
 * Creates m-by-n Identity matrix
 *
 * ```
 * eye(2) // Creates 2x2 Identity matrix
 * eye([2,2]) // Creates 2x2 Identity matrix
 * eye([2,3]) // Create 2x3 Identity matrix with main diagonal set to 1
 * eye(2,'i32') // Creates 2x2 Identity matrix of 32-bit integers
 * ```
 */
function eye(arg0, datatype) {
    var n, m;
    if (Array.isArray(arg0)) {
        n = arg0[0];
        if (arg0.length > 1) {
            m = arg0[1];
        }
        else {
            m = n;
        }
    }
    else {
        n = m = arg0;
    }
    var A = new ndarray_1.NDArray({ shape: [n, m], datatype: datatype, fill: 0 });
    var ndiag = Math.min(n, m);
    for (var i = 0; i < ndiag; i++) {
        A.set(i, i, 1);
    }
    return A;
}
exports.eye = eye;
function count(arr, item, tolerance) {
    if (tolerance === void 0) { tolerance = constants_1.EPSILON; }
    var n = 0;
    arr.forEach(function (val) {
        if (isequal(item, val, tolerance)) {
            n++;
        }
    });
    return n;
}
exports.count = count;
/**
 * Creates NDArray filled with zeros
 *
 * ```
 * zeros(2) // Creates array of zeros of length 2
 * zeros([2,2,2]) // Create 2x2x2 matrix of zeros
 * zeros(2,'i16') // Creates array of 2 16-bit integers filled with zeros
 * ```
 */
function zeros(arg0, datatype) {
    var A;
    if (Array.isArray(arg0)) {
        A = new ndarray_1.NDArray({ shape: arg0, datatype: datatype });
    }
    else {
        A = new ndarray_1.NDArray({ shape: [arg0], datatype: datatype });
    }
    A.fill(0);
    return A;
}
exports.zeros = zeros;
/**
 * Creates empty NDArray of given shape or of given length if argument is
 * a number
 */
function empty(arg0, datatype) {
    var A;
    if (Array.isArray(arg0)) {
        A = new ndarray_1.NDArray({ shape: arg0, datatype: datatype });
    }
    else {
        A = new ndarray_1.NDArray({ shape: [arg0], datatype: datatype });
    }
    return A;
}
exports.empty = empty;
/**
 * Shorthand method to create new NDArray object from Javascript Array
 */
function arr(arg) {
    return new ndarray_1.NDArray(arg);
}
exports.arr = arr;
/**
 * Compute dot product of A and B, where both of them are 1D vectors of
 * same length
 */
function dot(A, B) {
    if (A.shape.length !== 1) {
        throw new Error('A is not a 1D array');
    }
    if (B.shape.length !== 1) {
        throw new Error('B is not a 1D array');
    }
    if (A.data.length !== B.data.length) {
        throw new Error("A and B are of different length");
    }
    var dot = 0.0;
    for (var i = 0; i < A.data.length; i++) {
        dot += A.data[i] * B.data[i];
    }
    return dot;
}
exports.dot = dot;
/**
 * Computes cross product of A and B
 * Only defined for A and B to 1D vectors of length at least 3
 * Only first 3 elements of A and B are used
 */
function cross(A, B) {
    if (A.shape.length !== 1 || B.shape.length !== 1) {
        throw new Error('A or B is not 1D');
    }
    if (A.length < 3 || B.length < 3) {
        throw new Error('A or B is less than 3 in length');
    }
    var a1 = A.getN(0);
    var a2 = A.getN(1);
    var a3 = A.getN(2);
    var b1 = B.getN(0);
    var b2 = B.getN(1);
    var b3 = B.getN(2);
    return new ndarray_1.NDArray([
        a2 * b3 - a3 * b2,
        a3 * b1 - a1 * b3,
        a1 * b2 - a2 * b1
    ]);
}
exports.cross = cross;
/**
 * Computes length or magnitude of A, where A is a 1D vector
 */
function length(A) {
    if (A.shape.length !== 1) {
        throw new Error('A is not a 1D array');
    }
    return Math.sqrt(dot(A, A));
}
exports.length = length;
/**
 * Computes direction vector of A, where A is a 1D vector
 */
function dir(A) {
    if (A.shape.length !== 1) {
        throw new Error('A is not a 1D array');
    }
    return div(A, length(A));
}
exports.dir = dir;
/**
 * @hidden
 */
function _add_numbers(a, b) {
    if (typeof a === 'number') {
        if (typeof b === 'number') {
            return a + b;
        }
        else if (b instanceof complex_1.Complex) {
            var answer = b.clone();
            answer.real += a;
            return answer;
        }
    }
    else if (a instanceof complex_1.Complex) {
        if (typeof b === 'number') {
            var answer = a.clone();
            answer.real += b;
            return answer;
        }
        else if (b instanceof complex_1.Complex) {
            var answer = a.clone();
            answer.real += b.real;
            answer.imag += b.imag;
            return answer;
        }
    }
    throw new Error('Addition of incompatible types');
}
/**
 * @hidden
 */
function _add_ndarrays(a, b) {
    if (!a.isShapeEqual(b)) {
        throw new Error('Addition of NDArray with mismatched shapes');
    }
    var answer = a.clone();
    a.forEach(function (value) {
        var index = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            index[_i - 1] = arguments[_i];
        }
        var aval = value;
        var bval = b.get.apply(b, index);
        var ansval = _add_numbers(aval, bval);
        answer.set.apply(answer, index.concat([ansval]));
    });
    return answer;
}
/**
 * @hidden
 */
function _add_ndarray_and_number(a, b) {
    var answer = a.clone();
    a.forEach(function (value) {
        var index = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            index[_i - 1] = arguments[_i];
        }
        var aval = value;
        var ansval = _add_numbers(aval, b);
        answer.set.apply(answer, index.concat([ansval]));
    });
    return answer;
}
/**
 * @hidden
 */
function _add_two(a, b) {
    if (a === 0) {
        return b;
    }
    if (b === 0) {
        return a;
    }
    if (typeof a === 'number') {
        if (typeof b === 'number' || b instanceof complex_1.Complex) {
            return _add_numbers(a, b);
        }
        else if (b instanceof ndarray_1.NDArray) {
            return _add_ndarray_and_number(b, a);
        }
    }
    else if (a instanceof ndarray_1.NDArray) {
        if (typeof b === 'number' || b instanceof complex_1.Complex) {
            return _add_ndarray_and_number(a, b);
        }
        else if (b instanceof ndarray_1.NDArray) {
            return _add_ndarrays(a, b);
        }
    }
    else if (a instanceof complex_1.Complex) {
        if (typeof b === 'number' || b instanceof complex_1.Complex) {
            return _add_numbers(a, b);
        }
        else if (b instanceof ndarray_1.NDArray) {
            return _add_ndarray_and_number(b, a);
        }
    }
    throw new Error('Addition of invalid types');
}
/**
 * Add all arguments in accordance to their types
 * The arguments could be NDArray or numbers (real/complex).
 * If some of them are NDArray's, then their shapes have to match,
 * otherwise exception is thrown
 * The order of addition starts from left to right
 */
function add() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var acc = args[0];
    for (var i = 1; i < args.length; i++) {
        acc = _add_two(acc, args[i]);
    }
    return acc;
}
exports.add = add;
/**
 * @hidden
 */
function _mul_numbers(a, b) {
    if (typeof a === 'number') {
        if (typeof b === 'number') {
            return a * b;
        }
        else if (b instanceof complex_1.Complex) {
            var answer = b.clone();
            answer.real *= a;
            answer.imag *= a;
            return answer;
        }
    }
    else if (a instanceof complex_1.Complex) {
        if (typeof b === 'number') {
            var answer = a.clone();
            answer.real *= b;
            answer.imag *= b;
            return answer;
        }
        else if (b instanceof complex_1.Complex) {
            var answer = new complex_1.Complex();
            answer.real = a.real * b.real - a.imag * b.imag;
            answer.imag = a.imag * b.real + a.real * b.imag;
            return answer;
        }
    }
    throw new Error('Multiplication of incompatible types');
}
/**
 * @hidden
 */
function _mul_two(a, b) {
    if (a === 1) {
        return b;
    }
    if (b === 1) {
        return a;
    }
    if (typeof a === 'number' || a instanceof complex_1.Complex) {
        if (typeof b === 'number' || b instanceof complex_1.Complex) {
            return _mul_numbers(a, b);
        }
        else if (b instanceof ndarray_1.NDArray) {
            var answer_1 = b.clone();
            answer_1.forEach(function (value) {
                var index = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    index[_i - 1] = arguments[_i];
                }
                answer_1.set.apply(answer_1, index.concat([_mul_numbers(a, value)]));
            });
            return answer_1;
        }
    }
    else if (a instanceof ndarray_1.NDArray) {
        if (typeof b === 'number' || b instanceof complex_1.Complex) {
            var answer_2 = a.clone();
            answer_2.forEach(function (value) {
                var index = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    index[_i - 1] = arguments[_i];
                }
                answer_2.set.apply(answer_2, index.concat([_mul_numbers(b, value)]));
            });
            return answer_2;
        }
        else if (b instanceof ndarray_1.NDArray) {
            throw new Error("NDArray*NDarray is not supported. Consider linalg.matmul");
        }
    }
    throw new Error('Multiplication of incompatible types');
}
/**
 * Multiply all arguments in accordance with their data types
 * Each argument can be a number (real or complex) or NDArray.
 * If some of the arguments are NDArrays, then their shapes should
 * be compatible with the other operand of multiplication operation,
 * otherwise an exception is thrown
 * The order of multiplication starts from left to right
 */
function mul() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var acc = args[0];
    for (var i = 1; i < args.length; i++) {
        acc = _mul_two(acc, args[i]);
    }
    return acc;
}
exports.mul = mul;
/**
 * Subtract second argument from first
 * The arguments could be a number (real or complex) or NDArray.
 * If some of the arguments are NDArrays, then their shapes should
 * be compatible with the other operand of subtraction operation,
 * otherwise an exception is thrown
 */
function sub(a, b) {
    return _add_two(a, _mul_two(-1, b));
}
exports.sub = sub;
/**
 * Divide first argument by second
 * The first argument can be a number (real or complex) or NDArray.
 * The second argument can be a number (real or complex)
 */
function div(a, b) {
    if (b instanceof complex_1.Complex) {
        return _mul_two(a, b.inverse());
    }
    else {
        return _mul_two(a, 1 / b);
    }
}
exports.div = div;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ops_1 = __webpack_require__(3);
var constants_1 = __webpack_require__(1);
var complex_1 = __webpack_require__(5);
/**
 * @hidden
 */
function deduceShape(data) {
    var dim = 0;
    var d = data;
    var shape = [data.length];
    while (Array.isArray(d[0])) {
        shape.push(d[0].length);
        dim++;
        d = d[0];
    }
    return shape;
}
/**
 * @hidden
 */
function deduceNumberType(data) {
    if (data instanceof Float32Array) {
        return 'f32';
    }
    else if (data instanceof Float64Array) {
        return 'f64';
    }
    else if (data instanceof Int8Array) {
        return 'i8';
    }
    else if (data instanceof Uint8Array) {
        return 'ui8';
    }
    else if (data instanceof Int16Array) {
        return 'i16';
    }
    else if (data instanceof Uint16Array) {
        return 'ui16';
    }
    else if (data instanceof Int32Array) {
        return 'i32';
    }
    else if (data instanceof Uint32Array) {
        return 'ui32';
    }
    else {
        throw new Error('Unknown datatype');
    }
}
/**
 * @hidden
 */
function populateFromArray(data, idx, arr) {
    if (Array.isArray(arr[0])) {
        var len = 0;
        for (var i = 0; i < arr.length; i++) {
            var l = populateFromArray(data, idx + len, arr[i]);
            len += l;
        }
        return len;
    }
    else {
        for (var i = 0; i < arr.length; i++) {
            data[idx + i] = arr[i];
        }
        return arr.length;
    }
}
function getDataArrayType(typestr) {
    switch (typestr) {
        case 'i8':
            return Int8Array;
        case 'ui8':
            return Uint8Array;
        case 'i16':
            return Int16Array;
        case 'ui16':
            return Uint16Array;
        case 'i32':
            return Int32Array;
        case 'ui32':
            return Uint32Array;
        case 'f32':
            return Float32Array;
        case 'f64':
            return Float64Array;
        default:
            throw new Error('Unknown datatype');
    }
}
/**
 * N-Dimensional Array
 * ===
 *
 * It can store real as well as complex numbers in n-dimensions
 * It can be used to store Vectors (1D) or Matrices (2D).
 * This class stores the data internally in flat typed arrays
 *
 * NDArray is the central class of Bluemath library.
 * It's used to input and output data to/from most of the APIs of this library.
 *
 * Construction
 * ---
 *
 * You can create an NDArray
 *
 * * With shape and/or data type
 * ```javascript
 * // 3-dimensional array with 32-bit integer storage
 * new NDArray({shape:[3,4,3],datatype:'i32'});
 * ```
 *
 * * Initializing it with array data
 * ```javascript
 * // 2x3 Matrix with 64-bit floating point (double) storage
 * new NDArray([[1,1,1],[4,4,4]],{datatype:'f64'});
 * ```
 *
 * * Using standard functions
 * ```javascript
 * zeros([2,2,2]); // Returns 2x2x2 NDArray of zeros
 * eye([4,4]); // Creates 4x4 Identity matrix
 * ```
 *
 * Basic math operations
 * ---
 *
 * Bluemath provides functions that allow basic math operations
 * on NDArrays
 *
 * [[add]]
 *
 * [[sub]]
 *
 * [[mul]]
 *
 * [[div]]
 */
var NDArray = /** @class */ (function () {
    function NDArray(arg0, arg1) {
        this._size = 0;
        this._datatype = 'f32';
        this._idata = [];
        if (Array.isArray(arg0)) {
            this._shape = deduceShape(arg0);
            this._calcSize();
            if (arg1 && arg1.datatype) {
                this._datatype = arg1.datatype;
            }
            this._alloc(this._size, arg0, this._datatype);
            if (arg1 && arg1.idata) {
                this._idata = arg1.idata;
            }
        }
        else if (ArrayBuffer.isView(arg0)) {
            this._data = arg0;
            if (arg1 && arg1.shape) {
                this._shape = arg1.shape;
            }
            else {
                this._shape = [arg0.length];
            }
            // in this case options.datatype is ignored if supplied
            this._datatype = deduceNumberType(arg0);
            this._calcSize();
            if (arg1 && arg1.idata) {
                this._idata = arg1.idata;
            }
        }
        else {
            var options = arg0;
            if (options.datatype) {
                this._datatype = options.datatype;
            }
            if (options.shape) {
                this._shape = options.shape;
                this._calcSize();
                this._alloc(this._size, undefined, this._datatype);
                if (options.fill) {
                    this._data.fill(options.fill);
                }
            }
            if (options.idata) {
                this._idata = options.idata;
            }
        }
    }
    Object.defineProperty(NDArray.prototype, "shape", {
        get: function () {
            return this._shape;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NDArray.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    NDArray.prototype.is1D = function () {
        return this._shape.length === 1;
    };
    NDArray.prototype.is2D = function () {
        return this._shape.length === 2;
    };
    Object.defineProperty(NDArray.prototype, "length", {
        /**
         * Number of elements in outermost (i.e. 0th) dimension
         */
        get: function () {
            return this._shape[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NDArray.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NDArray.prototype, "datatype", {
        get: function () {
            return this._datatype;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set new shape for the data stored in the array
     * The old data remains intact. If the total size with the new shape
     * is larger than the old size, then excess elements of the data are
     * fill with zero.
     * @param shape New shape
     */
    NDArray.prototype.reshape = function (shape) {
        this._shape = shape;
        var oldsize = this._size;
        this._calcSize();
        if (this._size > oldsize) {
            // Rellocate a buffer of bigger size, copy old data to it
            this._alloc(this._size, this._data, this._datatype);
            // Fill the excess elements in new buffer with 0
            this._data.fill(0, oldsize);
        }
        return this;
    };
    /**
     * Create deep copy of the array
     */
    NDArray.prototype.clone = function () {
        var dataArrayType = getDataArrayType(this._datatype);
        var data = new dataArrayType(this._data);
        return new NDArray(data, { shape: this._shape.slice(), idata: this._idata.slice() });
    };
    NDArray.prototype._calcSize = function () {
        this._size = this._shape.reduce(function (prev, cur) { return prev * cur; }, 1);
    };
    NDArray.prototype._alloc = function (size, data, datatype) {
        var dataArrayType = getDataArrayType(datatype);
        this._data = new dataArrayType(size);
        if (Array.isArray(data)) {
            populateFromArray(this._data, 0, data);
        }
        else if (ArrayBuffer.isView(data)) {
            this._data.set(data);
        }
    };
    NDArray.prototype._indexToAddress = function () {
        var indices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            indices[_i] = arguments[_i];
        }
        if (indices.length !== this._shape.length) {
            throw new Error('Mismatched number of dimensions');
        }
        var addr = 0;
        var acc = 0;
        for (var i = this._shape.length - 1; i >= 0; i--) {
            if (i < this._shape.length - 1) {
                addr += acc * indices[i];
                acc = acc * this._shape[i];
            }
            else {
                if (indices[i] < 0) {
                    throw new Error('Invalid index ' + indices[i]);
                }
                if (indices[i] >= this._shape[i]) {
                    throw new Error('Index out of bounds ' + indices[i]);
                }
                addr += indices[i];
                acc = this._shape[i];
            }
        }
        return addr;
    };
    /**
     * @hidden
     */
    NDArray.mapAddressToIndex = function (addr, shape) {
        var index = new Array(shape.length);
        for (var i = shape.length - 1; i >= 0; i--) {
            var d = shape[i];
            index[i] = addr % d;
            addr = Math.floor(addr / d);
        }
        return index;
    };
    /**
     * @hidden
     */
    NDArray.prototype._addressToIndex = function (addr) {
        if (addr >= this._size) {
            throw new Error("Data index out of range");
        }
        return NDArray.mapAddressToIndex(addr, this._shape);
    };
    /**
     * Create nested array
     */
    NDArray.prototype.toArray = function () {
        if (this._shape.length <= 0) {
            throw new Error('Zero shape');
        }
        var aarr = [];
        var step = 1;
        // iterate over dimensions from innermost to outermost
        for (var i = this._shape.length - 1; i >= 0; i--) {
            // Step size in i'th dimension
            var d = this._shape[i];
            step = step * d;
            // number of elements in i'th dimension
            var nelem = this._size / step;
            if (i === this._shape.length - 1) {
                // innermost dimension, create array from all elements
                for (var j = 0; j < nelem; j++) {
                    var arr = new Array(step);
                    for (var k = 0; k < d; k++) {
                        var index = j * step + k;
                        if (this._idata[index] === undefined) {
                            arr[k] = this._data[index];
                        }
                        else {
                            arr[k] = new complex_1.Complex(this._data[index], this._idata[index]);
                        }
                    }
                    aarr.push(arr);
                }
            }
            else {
                // outer dimensions, create array from inner dimension's arrays
                var darr = new Array(nelem);
                for (var j = 0; j < nelem; j++) {
                    darr[j] = aarr.slice(j * d, (j + 1) * d);
                }
                aarr = darr;
            }
        }
        return aarr[0];
    };
    /**
     * Set all members of this array to given value
     */
    NDArray.prototype.fill = function (value) {
        this._data.fill(value);
    };
    NDArray.prototype.isSliceIndex = function (index) {
        if (index.length < this._shape.length) {
            return true;
        }
        for (var i = 0; i < index.length; i++) {
            var item = index[i];
            if (item === undefined ||
                item === null ||
                typeof item === 'string') {
                return true;
            }
        }
        return false;
    };
    /**
     * Set member at given index
     * All but the last argument should specify the index.
     * The last argument is the value to set.
     */
    NDArray.prototype.set = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nargs = args.length;
        var index = (args.slice(0, nargs - 1));
        var val = args[nargs - 1];
        if (this.isSliceIndex(index)) {
            //
            // Input value must be an array and the specified index
            // must resolve to a slice instead of a single item.
            // Assign the contents of input value array to the 
            // this array's slice for specified index
            //
            if (!(val instanceof NDArray)) {
                throw new Error('Input value should be NDArray');
            }
            var valslice = val;
            var slice_recipe = this.createSliceRecipe(index);
            var _a = this.computeSliceShapeAndSize(slice_recipe), sliceshape = _a.shape, slicesize = _a.size;
            if (!NDArray.areShapesEqual(sliceshape, valslice._shape)) {
                throw new Error("Input value has incompatible shape");
            }
            for (var i = 0; i < slicesize; i++) {
                // Convert each address of slice array to index
                var sliceidx = NDArray.mapAddressToIndex(i, sliceshape);
                // Find index into the original array (oldidx) that corresponds
                // to the newidx
                var targetidx = [];
                var rangecount = 0;
                for (var i_1 = slice_recipe.length - 1; i_1 >= 0; i_1--) {
                    if (Array.isArray(slice_recipe[i_1])) {
                        // Every element of the new index corresponds to a range element
                        // in the slice recipe. To map the new index to old index, we
                        // have to take the lower end of the range in slice recipe and
                        // add it to the element in new index
                        var range = slice_recipe[i_1];
                        var low = range[0];
                        var idxelem = sliceidx[sliceidx.length - 1 - rangecount];
                        targetidx.unshift(idxelem + low);
                        rangecount++;
                    }
                    else {
                        // Copy the constant recipe element as-is into index
                        targetidx.unshift(slice_recipe[i_1]);
                    }
                }
                this.set.apply(this, targetidx.concat([(_b = val).get.apply(_b, sliceidx)]));
            }
        }
        else {
            // Assignment of single item
            var addr = this._indexToAddress.apply(this, index);
            if (val instanceof complex_1.Complex) {
                this._data[addr] = val.real;
                this._idata[addr] = val.imag;
            }
            else {
                this._data[addr] = val;
            }
        }
        var _b;
    };
    /**
     * Swaps matrix rows (this must be a 2D array)
     */
    NDArray.prototype.swaprows = function (i, j) {
        if (this._shape.length !== 2) {
            throw new Error('This NDArray is not a Matrix (2D)');
        }
        if (i === j) {
            return; // No need to swap
        }
        var nrows = this._shape[0];
        var ncols = this._shape[1];
        if (i >= nrows || j >= nrows) {
            throw new Error("Index out of range");
        }
        for (var k = 0; k < ncols; k++) {
            var tmp = this.get(i, k);
            this.set(i, k, this.get(j, k));
            this.set(j, k, tmp);
        }
    };
    /**
     * @hidden
     */
    NDArray.prototype.datacompare = function (otherdata, otheridata, tolerance) {
        if (tolerance === void 0) { tolerance = constants_1.EPSILON; }
        for (var i = 0; i < this._data.length; i++) {
            if (this._idata[i] === undefined) {
                if (!ops_1.isequal(this._data[i], otherdata[i], tolerance)) {
                    return false;
                }
            }
            else {
                if (otheridata[i] === undefined) {
                    // other is not complex number
                    return false;
                }
                var thisC = new complex_1.Complex(this._data[i], this._idata[i]);
                var otherC = new complex_1.Complex(otherdata[i], otheridata[i]);
                return thisC.isEqual(otherC);
            }
        }
        return true;
    };
    /**
     * Iterate over each element, invoke a callback with each index and value
     */
    NDArray.prototype.forEach = function (callback) {
        for (var i = 0; i < this._size; i++) {
            var index = this._addressToIndex(i);
            if (this._idata[i] === undefined) {
                callback.apply(void 0, [this._data[i]].concat(index));
            }
            else {
                callback.apply(void 0, [new complex_1.Complex(this._data[i], this._idata[i])].concat(index));
            }
        }
    };
    /**
     * @hidden
     */
    NDArray.areShapesEqual = function (shape1, shape2) {
        if (shape1.length !== shape2.length) {
            return false;
        }
        for (var i = 0; i < shape1.length; i++) {
            if (shape1[i] !== shape2[i]) {
                return false;
            }
        }
        return true;
    };
    /**
     * Checks if the shape of this ndarray matches the shape of other
     */
    NDArray.prototype.isShapeEqual = function (other) {
        return NDArray.areShapesEqual(this._shape, other._shape);
    };
    /**
     * Does equality test for each element of the array as well as the
     * shape of the arrays
     * @param other Other NDArray to compare with
     * @param tolerance
     */
    NDArray.prototype.isEqual = function (other, tolerance) {
        if (tolerance === void 0) { tolerance = constants_1.EPSILON; }
        var shapeequal = this.isShapeEqual(other);
        return shapeequal && other.datacompare(this._data, this._idata, tolerance);
    };
    /**
     * Return 1D copy of this array
     */
    NDArray.prototype.flatten = function () {
        var copy = this.clone();
        copy.reshape([this._size]);
        return copy;
    };
    /**
     * Change between Row-major and Column-major layout
     */
    NDArray.prototype.swapOrder = function () {
        if (this._shape.length !== 2) {
            throw new Error('swapOrder is not defined for ndarrays other than dim 2');
        }
        var clone = this.clone();
        var I = this._shape[0];
        var J = this._shape[1];
        this.reshape([J, I]);
        for (var i = 0; i < J; i++) {
            for (var j = 0; j < I; j++) {
                this.set(i, j, clone.get(j, i));
            }
        }
    };
    NDArray.prototype.createSliceRecipe = function (slices) {
        if (slices.length > this._shape.length) {
            throw new Error('Excess number of dimensions specified');
        }
        var slice_recipe = [];
        // Each slice specifies the index-range in that dimension to return
        for (var i = 0; i < slices.length; i++) {
            var slice = slices[i];
            var max = this._shape[i];
            if (slice === undefined || slice === null || slice === ':') {
                // gather all indices in this dimension
                slice_recipe.push([0, max]);
            }
            else if (typeof slice === 'string') {
                // assume the slice format to be [<from_index>:<to_index>]
                // if from_index or to_index is missing then they are replaced
                // by 0 or max respectively
                var match = /([-\d]*)\:([-\d]*)/.exec(slice);
                var from = 0;
                var to = max;
                if (match) {
                    if (match[1] !== '') {
                        from = parseInt(match[1], 10);
                    }
                    if (match[2] !== '') {
                        to = Math.min(parseInt(match[2], 10), max);
                    }
                }
                slice_recipe.push([from, to]);
            }
            else if (typeof slice === 'number') {
                slice_recipe.push(slice);
            }
            else {
                throw new Error("Unexpected slice :" + slice);
            }
        }
        // If slices argument has less slices than the number of dimensions
        // of this array (i.e. this.shape.length),
        // then we assume that lower (i.e. inner) dimensions are missing and
        // we take that as wildcard and return all indices in those
        // dimensions
        for (var i = slice_recipe.length; i < this._shape.length; i++) {
            slice_recipe.push([0, this._shape[i]]);
        }
        return slice_recipe;
    };
    NDArray.prototype.computeSliceShapeAndSize = function (slice_recipe) {
        // The number of dimensions of the resulting slice equals the
        // number of slice recipies that are ranges
        var shape = [];
        var size = 1;
        for (var i = slice_recipe.length - 1; i >= 0; i--) {
            if (Array.isArray(slice_recipe[i])) {
                var recipe = slice_recipe[i];
                var dim = recipe[1] - recipe[0];
                shape.unshift(dim); // Prepend
                size *= dim;
            }
        }
        return { shape: shape, size: size };
    };
    /**
     * Shorthand for get(...) method to avoid casting to <number>
     */
    NDArray.prototype.getN = function () {
        var slices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slices[_i] = arguments[_i];
        }
        return this.get.apply(this, slices);
    };
    /**
     * Shorthand for get(...) method to avoid casting to <NDArray>
     */
    NDArray.prototype.getA = function () {
        var slices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slices[_i] = arguments[_i];
        }
        return this.get.apply(this, slices);
    };
    /**
     * Shorthand for get(...) method to avoid casting to <Complex>
     */
    NDArray.prototype.getC = function () {
        var slices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slices[_i] = arguments[_i];
        }
        return this.get.apply(this, slices);
    };
    /**
     * Returns a specific element or a new NDArray that's a subset of
     * this array as defined by the slicing recipe.
     * Each element of the slicing recipe (i.e. any argument) can be
     * * A number specifying a specific element or slice of the array
     * in given dimension.
     * * A string of the form '<start>:<stop>', specifying the range of
     * slices in the given dimension. Both '<start>' and '<stop>' are
     * optional
     *
     * Caveats
     * ---
     * * Negative indices not supported yet
     * * No support for `<start>:<stop>:<step>` format yet
     */
    NDArray.prototype.get = function () {
        var slices = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            slices[_i] = arguments[_i];
        }
        var slice_recipe = this.createSliceRecipe(slices);
        console.assert(slice_recipe.length === this._shape.length);
        // Count elements of slice recipe that are ranges
        var nranges = 0;
        for (var i = 0; i < slice_recipe.length; i++) {
            if (Array.isArray(slice_recipe[i])) {
                nranges++;
            }
        }
        // If the slice recipe doesn't contain any ranges, then the
        // result is a single element of the array
        if (nranges === 0) {
            var idx = slice_recipe;
            var addr = this._indexToAddress.apply(this, idx);
            if (this._idata[addr] === undefined) {
                return this._data[addr];
            }
            else {
                return new complex_1.Complex(this._data[addr], this._idata[addr]);
            }
        }
        var _a = this.computeSliceShapeAndSize(slice_recipe), sliceshape = _a.shape, slicesize = _a.size;
        var slicearr = new NDArray({ shape: sliceshape, datatype: this._datatype });
        for (var i = 0; i < slicesize; i++) {
            // Convert each address of slice array to index
            var newidx = slicearr._addressToIndex(i);
            // Find index into the original array (oldidx) that corresponds
            // to the newidx
            var oldidx = [];
            var rangecount = 0;
            for (var i_2 = slice_recipe.length - 1; i_2 >= 0; i_2--) {
                if (Array.isArray(slice_recipe[i_2])) {
                    // Every element of the new index corresponds to a range element
                    // in the slice recipe. To map the new index to old index, we
                    // have to take the lower end of the range in slice recipe and
                    // add it to the element in new index
                    var range = slice_recipe[i_2];
                    var low = range[0];
                    var idxelem = newidx[newidx.length - 1 - rangecount];
                    oldidx.unshift(idxelem + low);
                    rangecount++;
                }
                else {
                    // Copy the constant recipe element as-is into index
                    oldidx.unshift(slice_recipe[i_2]);
                }
            }
            slicearr.set.apply(slicearr, newidx.concat([this.get.apply(this, oldidx)]));
        }
        return slicearr;
    };
    /**
     * @hidden
     */
    NDArray.prototype.take = function (indices, axis) {
        !indices;
        !axis;
        throw new Error('TODO');
    };
    /**
     * @hidden
     */
    NDArray.prototype.max = function (axis) {
        if (axis !== undefined && axis !== null) {
            if (typeof axis === 'number') {
                if (axis >= this._shape.length) {
                    throw new Error('axis is out of range');
                }
                var maxshape = this._shape.slice();
                maxshape.splice(axis, 1);
                var maxsize = maxshape.reduce(function (a, b) { return a * b; }, 1);
                var maxarr = new NDArray({ datatype: this._datatype, shape: maxshape });
                for (var i = 0; i < maxsize; i++) {
                    var maxindex = maxarr._addressToIndex(i);
                    var sliceindex = maxindex.slice();
                    sliceindex.splice(axis, 0, ':');
                    var slice = this.get.apply(this, sliceindex);
                    maxarr.set.apply(maxarr, maxindex.concat([slice.max()]));
                }
                return maxarr;
            }
            else if (Array.isArray(axis)) {
                throw new Error('TODO');
            }
            else {
                throw new Error('Invalid type for axis');
            }
        }
        else {
            if (Object.keys(this._idata).length > 0) {
                throw new Error('TODO');
            }
            else {
                return Math.max.apply(Math.max, this._data);
            }
        }
    };
    /**
     * @hidden
     */
    NDArray.prototype.min = function () {
        throw new Error('TODO');
    };
    /**
     * @hidden
     */
    NDArray.prototype.mean = function () {
        throw new Error('TODO');
    };
    /**
     * @hidden
     */
    NDArray.prototype.all = function () {
        throw new Error('TODO');
    };
    /**
     * @hidden
     */
    NDArray.prototype.any = function () {
        throw new Error('TODO');
    };
    /**
     * @hidden
     */
    NDArray.prototype.sort = function () {
        throw new Error('TODO');
    };
    /**
     * @hidden
     */
    NDArray.prototype.argsort = function () {
        throw new Error('TODO');
    };
    NDArray.prototype.copyfrom = function (other) {
        if (!this.isShapeEqual(other)) {
            throw new Error('Shape mismatch');
        }
        this._data.set(other.data);
    };
    NDArray.prototype.copyto = function (other) {
        other.copyfrom(this);
    };
    /*
    toString(precision=4) {
      return JSON.stringify(this.toArray(), function (key, val) {
        !key; // to avoid unused variable warning
        if(val instanceof Complex) {
          return val.toString();
        } else if(typeof val === 'number') {
          return Number(val.toFixed(precision));
        } else if(Array.isArray(val) && !Array.isArray(val[0])) {
          return '['+val.map(v => {
            if(v instanceof Complex) {
              return v.toString();
            } else {
              return v.toFixed(precision)
            }
          }).join(',')+']';
        } else {
          return val;
        }
      },precision);
    }
    */
    NDArray.prototype.toString = function (precision) {
        if (precision === void 0) { precision = 4; }
        if (['i8', 'ui8', 'i16', 'ui16', 'i32', 'ui32'].indexOf(this._datatype) >= 0) {
            precision = 0;
        }
        function whitespace(length) {
            if (length === void 0) { length = 0; }
            var s = '';
            for (var i = 0; i < length; i++) {
                s += ' ';
            }
            return s;
        }
        if (this._shape.length <= 0) {
            return '[]';
        }
        var sarr = [];
        var step = 1;
        var _loop_1 = function (i) {
            // Step size in i'th dimension
            var d = this_1._shape[i];
            step = step * d;
            // number of elements in i'th dimension
            var nelem = this_1._size / step;
            if (i === this_1._shape.length - 1) {
                // innermost dimension, create array from all elements
                for (var j = 0; j < nelem; j++) {
                    var str = whitespace(i + 1) + '[';
                    for (var k = 0; k < d; k++) {
                        var index = j * step + k;
                        if (this_1._idata[index] === undefined) {
                            str += this_1._data[index].toFixed(precision);
                        }
                        else {
                            str += new complex_1.Complex(this_1._data[index], this_1._idata[index])
                                .toString(precision);
                        }
                        if (k < d - 1) {
                            str += ',';
                        }
                    }
                    str += ']';
                    sarr.push(str);
                }
            }
            else {
                // outer dimensions, create array from inner dimension's arrays
                var sdarr = new Array(nelem);
                for (var j = 0; j < nelem; j++) {
                    sdarr[j] =
                        whitespace(i + 1) + '[\n' +
                            sarr.slice(j * d, (j + 1) * d).map(function (s) { return whitespace(i + 1) + s; }).join(',\n') + '\n' +
                            whitespace(i + 1) + ']';
                }
                sarr = sdarr;
            }
        };
        var this_1 = this;
        // iterate over dimensions from innermost to outermost
        for (var i = this._shape.length - 1; i >= 0; i--) {
            _loop_1(i);
        }
        return sarr[0];
    };
    NDArray.prototype.toHTML = function (precision) {
        if (precision === void 0) { precision = 4; }
        if (['i8', 'ui8', 'i16', 'ui16', 'i32', 'ui32'].indexOf(this._datatype) >= 0) {
            precision = 0;
        }
        var tagnames = ['table', 'tr', 'td'];
        if (this._shape.length <= 0) {
            return '<table></table>';
        }
        var sarr = [];
        var step = 1;
        // iterate over dimensions from innermost to outermost
        for (var i = this._shape.length - 1; i >= 0; i--) {
            // Step size in i'th dimension
            var d = this._shape[i];
            step = step * d;
            var tag = tagnames[(i + 1) % 3];
            var outertag = tagnames[(3 + i) % 3]; // adding 3 wraps around the mod range
            // number of elements in i'th dimension
            var nelem = this._size / step;
            if (i === this._shape.length - 1) {
                // innermost dimension, create array from all elements
                for (var j = 0; j < nelem; j++) {
                    var str = "<" + outertag + ">";
                    for (var k = 0; k < d; k++) {
                        var index = j * step + k;
                        str += "<" + tag + ">";
                        if (this._idata[index] === undefined) {
                            str += this._data[index].toFixed(precision);
                        }
                        else {
                            str += new complex_1.Complex(this._data[index], this._idata[index])
                                .toString(precision);
                        }
                        str += "</" + tag + ">";
                    }
                    str += "</" + outertag + ">";
                    sarr.push(str);
                }
            }
            else {
                // outer dimensions, create array from inner dimension's arrays
                var sdarr = new Array(nelem);
                for (var j = 0; j < nelem; j++) {
                    sdarr[j] = "<" + outertag + ">" +
                        sarr.slice(j * d, (j + 1) * d).join('') +
                        ("</" + outertag + ">");
                }
                sarr = sdarr;
            }
        }
        return sarr[0];
        //return '<table>'+sarr[0]+'</table>';
    };
    return NDArray;
}());
exports.NDArray = NDArray;
var Vec2 = /** @class */ (function (_super) {
    __extends(Vec2, _super);
    function Vec2(x, y) {
        return _super.call(this, [x, y]) || this;
    }
    return Vec2;
}(NDArray));
exports.Vec2 = Vec2;
var Vec3 = /** @class */ (function (_super) {
    __extends(Vec3, _super);
    function Vec3(x, y, z) {
        return _super.call(this, [x, y, z]) || this;
    }
    return Vec3;
}(NDArray));
exports.Vec3 = Vec3;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = __webpack_require__(1);
var ops_1 = __webpack_require__(3);
var Complex = /** @class */ (function () {
    function Complex(real, imag) {
        this.real = real || 0;
        this.imag = imag || 0;
    }
    Complex.prototype.clone = function () {
        return new Complex(this.real, this.imag);
    };
    Complex.prototype.inverse = function () {
        // 1/Complex number is converted to a usable complex number by
        // multiplying both numerator and denominator by complex conjugate
        // of the original number (rationalizing the denominator)
        var r = this.real;
        var i = this.imag;
        var den = r * r + i * i;
        return new Complex(r / den, -i / den);
    };
    Complex.prototype.isEqual = function (other, tolerance) {
        if (tolerance === void 0) { tolerance = constants_1.EPSILON; }
        return ops_1.isequal(this.real, other.real, tolerance) &&
            ops_1.isequal(this.imag, other.imag, tolerance);
    };
    Complex.prototype.toString = function (precision) {
        if (precision === void 0) { precision = 4; }
        var sign = (this.imag >= 0) ? '+' : '-';
        return "(" + this.real.toFixed(precision) +
            ("" + sign + Math.abs(this.imag).toFixed(precision) + "i)");
    };
    return Complex;
}());
exports.Complex = Complex;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __webpack_require__(2);
const common_1 = __webpack_require__(0);
/**
 * Rational or polynomial bezier curve
 * If the weights are specified it's a rational Bezier curve
 */
class BezierCurve {
    constructor(degree, cpoints, weights) {
        this.degree = degree;
        if (!cpoints.is2D()) {
            throw new Error("cpoints is not an array of points");
        }
        this.cpoints = cpoints;
        if (weights) {
            console.assert(weights.length === degree + 1);
        }
        this.weights = weights;
    }
    /**
     * Dimension of the curve. Typically 2D or 3D
     */
    get dimension() {
        return this.cpoints.shape[1];
    }
    /**
     * If the control points are defined in 2D plane, then add z=0 to each
     * of them to define them in 3D space
     */
    to3D() {
        if (this.dimension === 3) {
            return;
        }
        console.assert(this.dimension === 2);
        let cpoints = this.cpoints.toArray();
        for (let i = 0; i < cpoints.length; i++) {
            cpoints[i].push(0);
        }
        this.cpoints = common_1.arr(cpoints);
    }
    /**
     * Is this Rational Bezier Curve
     */
    isRational() {
        return !!this.weights;
    }
    /**
     * Evaluate the Bezier curve at given parameter value
     * Place the evaluated point in the `tess` array at `tessidx`
     */
    evaluate(u, tess, tessidx) {
        let B = helper_1.bernstein(this.degree, u);
        let dim = this.dimension;
        let denominator;
        if (this.weights) {
            denominator = 0;
            for (let i = 0; i < this.degree + 1; i++) {
                denominator += B[i] * this.weights.get(i);
            }
        }
        else {
            denominator = 1;
        }
        if (tess !== undefined && tessidx !== undefined) {
            for (let k = 0; k < this.degree + 1; k++) {
                if (this.weights) {
                    for (let z = 0; z < dim; z++) {
                        tess.set(tessidx, z, tess.get(tessidx, z) +
                            B[k] * this.cpoints.get(k, z) *
                                this.weights.get(k));
                    }
                }
                else {
                    for (let z = 0; z < dim; z++) {
                        tess.set(tessidx, z, tess.get(tessidx, z) +
                            B[k] * this.cpoints.get(k, z));
                    }
                }
            }
            for (let z = 0; z < dim; z++) {
                tess.set(tessidx, z, tess.get(tessidx, z) / denominator);
            }
            return null;
        }
        else {
            throw new Error('Not implemented');
        }
    }
    /**
     * Tessellate the Bezier curve uniformly at given resolution
     */
    tessellate(resolution = 10) {
        let tess = new common_1.NDArray({
            shape: [resolution + 1, this.dimension],
            datatype: 'f32'
        });
        for (let i = 0; i < resolution + 1; i++) {
            this.evaluate(i / resolution, tess, i);
        }
        return tess;
    }
    /**
     * The curve is subdivided into two curves at the mipoint of parameter
     * range. This is done recursively until the curve becomes a straight line
     * within given tolerance.
     * The subdivision involves reparameterizing the curve, which is done using
     * blossoming or deCasteljau formula.
     */
    static tessBezier(bezcrv, tolerance) {
        if (bezcrv.isLine(tolerance)) {
            return [
                bezcrv.cpoints.getA(0).toArray(),
                bezcrv.cpoints.getA(bezcrv.cpoints.length - 1).toArray()
            ];
        }
        else {
            let left = bezcrv.clone();
            left.reparam(0, 0.5);
            let right = bezcrv.clone();
            right.reparam(0.5, 1);
            let tessLeft = BezierCurve.tessBezier(left, tolerance);
            let tessRight = BezierCurve.tessBezier(right, tolerance);
            // last point of tessLeft must be same as first point of tessRight
            tessLeft.pop();
            return tessLeft.concat(tessRight);
        }
    }
    /**
     * Tessellate bezier curve adaptively, within given tolerance of error
     */
    tessellateAdaptive(tolerance = common_1.EPSILON) {
        return new common_1.NDArray(BezierCurve.tessBezier(this, tolerance));
    }
    /**
     * Checks if this Bezier curve is approximately a straight line within
     * given tolerance.
     */
    isLine(tolerance = 1e-6) {
        if (this.dimension !== 2) {
            throw new Error("isFlat check only supported for 2D Bezier curves");
        }
        if (this.degree === 1) {
            return true;
        }
        return helper_1.arePointsColinear(this.cpoints, tolerance);
    }
    /**
     * Reparameterize the bezier curve within new parametric interval.
     * It uses the blossoming technique.
     */
    reparam(ua, ub) {
        let n = this.degree;
        let b = new common_1.NDArray({ shape: this.cpoints.shape });
        for (let i = 0; i < n + 1; i++) {
            let ts = [];
            for (let k = 0; k < n - i; k++) {
                ts.push(ua);
            }
            for (let k = 0; k < i; k++) {
                ts.push(ub);
            }
            b.set(i, helper_1.blossom(this.cpoints, n, ts));
        }
        this.cpoints = b;
    }
    aabb() {
        let aabb = new common_1.AABB(this.dimension);
        for (let i = 0; i < this.cpoints.length; i++) {
            let cpoint = this.cpoints.get(i);
            aabb.update(cpoint);
        }
        return aabb;
    }
    clone() {
        return new BezierCurve(this.degree, this.cpoints.clone(), this.weights ? this.weights.clone() : undefined);
    }
    /**
     * Split into two Bezier curves at given parametric value
     */
    split(uk) {
        let left = this.clone();
        let right = this.clone();
        left.reparam(0, uk);
        right.reparam(uk, 1);
        return [left, right];
    }
    toString() {
        let s = `Bezier(Deg ${this.degree} cpoints ${this.cpoints.toString()}`;
        if (this.weights) {
            s += ` weights ${this.weights.toString()}`;
        }
        s += ')';
        return s;
    }
}
exports.BezierCurve = BezierCurve;
/**
 * Rational BSpline Curve
 */
class BSplineCurve {
    constructor(degree, cpoints, knots, weights) {
        this.degree = degree;
        console.assert(cpoints.is2D());
        this.cpoints = cpoints;
        console.assert(knots.is1D());
        this.knots = knots;
        if (weights) {
            console.assert(knots.is1D());
        }
        this.weights = weights;
        /*
         The degree p, number of control points n+1, number of knots m+1
         are related by
         m = n + p + 1
         [The NURBS book, P3.1]
         */
        let p = degree;
        let m = knots.shape[0] - 1;
        let n = cpoints.shape[0] - 1;
        console.assert(m === n + p + 1);
    }
    /**
     * Determines how many dimension the curve occupies based on shape of
     * Control points array
     */
    get dimension() {
        return this.cpoints.shape[1];
    }
    /**
     * Convert 2D control points to 3D
     */
    to3D() {
        if (this.dimension === 3) {
            return;
        }
        console.assert(this.dimension === 2);
        let cpoints = this.cpoints.toArray();
        for (let i = 0; i < cpoints.length; i++) {
            cpoints[i].push(0);
        }
        this.cpoints = common_1.arr(cpoints);
    }
    /**
     * Split the curve at given parameter value and return two bspline
     * curves. The two curves put together will exactly represent the
     * original curve.
     */
    split(uk) {
        let r = this.degree;
        // Count number of times uk already occurs in the knot vector
        // We have to add uk until it occurs p-times in the knot vector,
        // where p is the degree of the curve
        // In case there are knots in the knot vector that are equal to uk,
        // within the error tolerance, then we replace those knots with uk
        // Such knot vector is named safeknots.
        let safeknots = [];
        for (let i = 0; i < this.knots.data.length; i++) {
            if (common_1.isequal(this.knots.getN(i), uk)) {
                safeknots.push(uk);
                r--;
            }
            else {
                safeknots.push(this.knots.getN(i));
            }
        }
        let addknots = [];
        for (let i = 0; i < r; i++) {
            addknots.push(uk);
        }
        let copy = this.clone();
        copy.setKnots(common_1.arr(safeknots));
        copy.refineKnots(addknots);
        // Find the index of the first uk knot in the new knot vector
        let ibreak = -1;
        for (let i = 0; i < copy.knots.data.length; i++) {
            if (common_1.isequal(copy.knots.getN(i), uk)) {
                ibreak = i;
                break;
            }
        }
        console.assert(ibreak >= 0);
        // The control point on the curve, where the split will happen is
        // at index ibreak-1 in the control points array (found by observation)
        // The left curve will have ibreak control points and
        // right curve will have N-ibreak+1 control points
        // (where N is number of control point in original curve)
        // The control point at ibreak-1 will be repeated in left and right curves
        // It will be the last control point of left and first control point of
        // right curve.
        let lcpoints = copy.cpoints.getA(':' + ibreak);
        let rcpoints = copy.cpoints.getA((ibreak - 1) + ':');
        let lknots = copy.knots.getA(':' + ibreak).toArray();
        // Scale the internal knot values, to fit into left curve 0-1 param range
        for (let i = copy.degree + 1; i < lknots.length; i++) {
            lknots[i] = lknots[i] / uk;
        }
        // Append clamped knots to the left curve at 1
        for (let i = 0; i <= copy.degree; i++) {
            lknots.push(1);
        }
        let rknots = copy.knots.getA((ibreak + copy.degree) + ':').toArray();
        // Scale the internal knot values, to fit into right curve 0-1 param range
        for (let i = 0; i < rknots.length - copy.degree; i++) {
            rknots[i] = (rknots[i] - uk) / (1 - uk);
        }
        // Prepend clamped knots to the right curve at 0
        for (let i = 0; i <= copy.degree; i++) {
            rknots.unshift(0);
        }
        // TODO : Rational
        let lcurve = new BSplineCurve(copy.degree, lcpoints, common_1.arr(lknots));
        let rcurve = new BSplineCurve(copy.degree, rcpoints, common_1.arr(rknots));
        return [lcurve, rcurve];
    }
    /**
     * Replace the knots of this BSplineCurve with new knots
     */
    setKnots(knots) {
        if (!this.knots.isShapeEqual(knots)) {
            throw new Error('Invalid knot vector length');
        }
        this.knots = knots;
    }
    /**
     * Set the knot at given index in the knot vector
     */
    setKnot(index, knot) {
        if (index >= this.knots.shape[0] || index < 0) {
            throw new Error('Invalid knot index');
        }
        if (knot < 0 || knot > 1) {
            throw new Error('Invalid knot value');
        }
        if (index < this.degree + 1) {
            if (knot !== 0) {
                throw new Error('Clamped knot has to be zero');
            }
        }
        if (index >= (this.knots.shape[0] - this.degree - 1)) {
            if (knot !== 1) {
                throw new Error('Clamped knot has to be one');
            }
        }
        this.knots.set(index, knot);
    }
    /**
     * Set the weight at given index
     */
    setWeight(index, weight) {
        if (!this.weights) {
            throw new Error('Not a Rational BSpline');
        }
        if (index < 0 || index >= this.weights.shape[0]) {
            throw new Error('Index out of bounds');
        }
        this.weights.set(index, weight);
    }
    /**
     * Is this Rational BSpline Curve. Determined based on whether weights
     * were specified while constructing this BSplineCurve
     */
    isRational() {
        return !!this.weights;
    }
    /**
     * Evaluate basis function derivatives upto n'th
     */
    evaluateBasisDerivatives(span, n, t) {
        return helper_1.getBasisFunctionDerivatives(this.degree, t, span, this.knots, n);
    }
    evaluateBasis(span, t) {
        return helper_1.getBasisFunction(this.degree, this.knots.data, span, t);
    }
    findSpan(t) {
        return helper_1.findSpan(this.degree, this.knots.data, t);
    }
    getTermDenominator(span, N) {
        let p = this.degree;
        let denominator;
        if (this.weights) {
            denominator = 0.0;
            for (let i = 0; i < N.length; i++) {
                denominator += N[i] * this.weights.get(span - p + i);
            }
        }
        else {
            denominator = 1.0;
        }
        return denominator;
    }
    /**
     * Tesselate basis functions uniformly at given resolution
     */
    tessellateBasis(resolution = 10) {
        let n = this.cpoints.shape[0] - 1;
        let p = this.degree;
        let Nip = common_1.zeros([n + 1, resolution + 1], 'f32');
        for (let i = 0; i < resolution + 1; i++) {
            let u = i / resolution;
            let span = this.findSpan(u);
            let N = this.evaluateBasis(span, u);
            for (let j = p; j >= 0; j--) {
                Nip.set(span - j, i, N[p - j]);
            }
        }
        return Nip;
    }
    static tessBSpline(bcrv, tolerance) {
        if (bcrv.isLine(tolerance)) {
            return [
                bcrv.cpoints.getA(0).toArray(),
                bcrv.cpoints.getA(bcrv.cpoints.length - 1).toArray()
            ];
        }
        else {
            let [left, right] = bcrv.split(0.5);
            let tessLeft = BSplineCurve.tessBSpline(left, tolerance);
            let tessRight = BSplineCurve.tessBSpline(right, tolerance);
            // last point of tessLeft must be same as first point of tessRight
            tessLeft.pop();
            return tessLeft.concat(tessRight);
        }
    }
    /**
     * Tessellate this BSplineCurve adaptively within given tolerance of error
     */
    tessellateAdaptive(tolerance = common_1.EPSILON) {
        return new common_1.NDArray(BSplineCurve.tessBSpline(this, tolerance));
    }
    /**
     * Checks if this Bezier curve is approximately a straight line within
     * given tolerance.
     */
    isLine(tolerance = 1e-6) {
        if (this.dimension !== 2) {
            throw new Error("isFlat check only supported for 2D Bezier curves");
        }
        if (this.degree === 1) {
            return true;
        }
        return helper_1.arePointsColinear(this.cpoints, tolerance);
    }
    /**
     * Inserts knot un in the knot vector r-times
     * Algorithm A5.1 from "The NURBS Book"
     */
    insertKnot(un, r) {
        let p = this.degree;
        let dim = this.dimension;
        let k = this.findSpan(un);
        let isRational = this.isRational();
        // If un already exists in the knot vector then s is it's multiplicity
        let s = 0;
        for (let i = 0; i < this.knots.shape[0]; i++) {
            if (this.knots.get(i) === un) {
                s++;
            }
        }
        if (r + s >= p) {
            throw new Error('Knot insertion exceeds knot multiplicity beyond degree');
        }
        let m = this.knots.shape[0] - 1;
        let n = m - p - 1;
        let P = this.cpoints;
        let Up = this.knots;
        let Q = new common_1.NDArray({ shape: [P.shape[0] + r, dim] });
        let Uq = new common_1.NDArray({ shape: [Up.shape[0] + r] });
        let Rtmp, Wtmp;
        Rtmp = new common_1.NDArray({ shape: [p + 1, dim] });
        let Wp, Wq;
        if (this.weights) {
            Wp = this.weights;
            Wq = new common_1.NDArray({ shape: [Wp.shape[0] + r] });
            Wtmp = new common_1.NDArray({ shape: [p + 1] });
        }
        // Load new knot vector
        for (let i = 0; i < k + 1; i++) {
            Uq.set(i, Up.get(i));
        }
        for (let i = 1; i < r + 1; i++) {
            Uq.set(k + i, un);
        }
        for (let i = k + 1; i < m + 1; i++) {
            Uq.set(i + r, Up.get(i));
        }
        // Save unaltered control points
        for (let i = 0; i < k - p + 1; i++) {
            for (let j = 0; j < dim; j++) {
                Q.set(i, j, P.get(i, j));
            }
            if (Wp && Wq) {
                Wq.set(i, Wp.get(i));
            }
        }
        for (let i = k - s; i < n + 1; i++) {
            for (let j = 0; j < dim; j++) {
                Q.set(i + r, j, P.get(i, j));
            }
            if (Wp && Wq) {
                Wq.set(i + r, Wp.get(i));
            }
        }
        for (let i = 0; i < p - s + 1; i++) {
            for (let j = 0; j < dim; j++) {
                Rtmp.set(i, j, P.get(k - p + i, j));
            }
        }
        let L = 0;
        for (let j = 1; j < r + 1; j++) {
            L = k - p + j;
            for (let i = 0; i < p - j - s + 1; i++) {
                let alpha = (un - Up.get(L + i)) / (Up.get(i + k + 1) - Up.get(L + i));
                for (let z = 0; z < dim; z++) {
                    Rtmp.set(i, z, alpha * Rtmp.get(i + 1, z) + (1 - alpha) * Rtmp.get(i, z));
                }
                if (Wtmp) {
                    Wtmp.set(i, alpha * Wtmp.get(i + 1) + (1 - alpha) * Wtmp.get(i));
                }
            }
            for (let z = 0; z < dim; z++) {
                Q.set(L, z, Rtmp.get(0, z));
                Q.set(k + r - j - s, z, Rtmp.get(p - j - s, z));
            }
            if (Wq && Wtmp) {
                Wq.set(L, Wtmp.get(0));
                Wq.set(k + r - j - s, Wtmp.get(p - j - s));
            }
        }
        for (let i = L + 1; i < k - s + 1; i++) {
            for (let z = 0; z < dim; z++) {
                Q.set(i, z, Rtmp.get(i - L, z));
            }
            if (Wq && Wtmp) {
                Wq.set(i, Wtmp.get(i - L));
            }
        }
        this.knots = Uq;
        this.cpoints = Q;
        if (isRational) {
            this.weights = Wq;
        }
    }
    /**
     * Inserts multiple knots into the knot vector at once
     * Algorithm A5.4 from "The NURBS Book"
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnots(ukList) {
        let m = this.knots.length - 1;
        let p = this.degree;
        let n = m - p - 1;
        let dim = this.dimension;
        let X = ukList;
        let r = ukList.length - 1;
        let P = this.cpoints;
        let Q = new common_1.NDArray({ shape: [P.length + r + 1, dim] });
        let U = this.knots;
        let Ubar = new common_1.NDArray({ shape: [U.length + r + 1] });
        let Wp, Wq;
        if (this.weights) {
            Wq = new common_1.NDArray({ shape: [P.length + r + 1] });
            Wp = this.weights;
        }
        let a = this.findSpan(X[0]);
        let b = this.findSpan(X[r]);
        b += 1;
        // Copy control points and weights for u < a and u > b
        for (let j = 0; j < a - p + 1; j++) {
            for (let k = 0; k < dim; k++) {
                Q.set(j, k, P.get(j, k));
            }
            if (Wp && Wq) {
                Wq.set(j, Wp.get(j));
            }
        }
        for (let j = b - 1; j < n + 1; j++) {
            for (let k = 0; k < dim; k++) {
                Q.set(j + r + 1, k, P.get(j, k));
            }
            if (Wp && Wq) {
                Wq.set(j + r + 1, Wp.get(j));
            }
        }
        // Copy knots for u < a and u > b
        for (let j = 0; j < a + 1; j++) {
            Ubar.set(j, U.get(j));
        }
        for (let j = b + p; j < m + 1; j++) {
            Ubar.set(j + r + 1, U.get(j));
        }
        // For values of u between a and b
        let i = b + p - 1;
        let k = b + p + r;
        for (let j = r; j >= 0; j--) {
            while (X[j] <= U.get(i) && i > a) {
                for (let z = 0; z < dim; z++) {
                    Q.set(k - p - 1, z, P.get(i - p - 1, z));
                }
                if (Wp && Wq) {
                    Wq.set(k - p - 1, Wp.get(i - p - 1));
                }
                Ubar.set(k, U.get(i));
                k -= 1;
                i -= 1;
            }
            for (let z = 0; z < dim; z++) {
                Q.set(k - p - 1, z, Q.get(k - p, z));
            }
            if (Wp && Wq) {
                Wq.set(k - p - 1, Wq.get(k - p));
            }
            for (let l = 1; l < p + 1; l++) {
                let ind = k - p + l;
                let alpha = Ubar.get(k + l) - X[j];
                if (Math.abs(alpha) === 0.0) {
                    for (let z = 0; z < dim; z++) {
                        Q.set(ind - 1, z, Q.get(ind, z));
                    }
                    if (Wp && Wq) {
                        Wq.set(ind - 1, Wq.get(ind));
                    }
                }
                else {
                    alpha = alpha / (Ubar.get(k + l) - U.get(i - p + l));
                    for (let z = 0; z < dim; z++) {
                        Q.set(ind - 1, z, alpha * Q.get(ind - 1, z) +
                            (1.0 - alpha) * Q.get(ind, z));
                    }
                    if (Wq) {
                        Wq.set(ind - 1, alpha * Wq.get(ind - 1) +
                            (1.0 - alpha) * Wq.get(ind));
                    }
                }
            }
            Ubar.set(k, X[j]);
            k -= 1;
        }
        this.knots = Ubar;
        this.cpoints = Q;
        if (this.weights) {
            this.weights = Wq;
        }
    }
    /**
     * Algorithm A5.6 from "The NURBS Book"
     * The total number of bezier segments required to decompose a
     * given bspline curve
     *  = Number of internal knots + 1
     *  = Length of knot vector - 2*(p+1) + 1
     *  = (m+1) - 2*(p+1) + 1
     *  = m - 2*p
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    decompose() {
        let p = this.degree;
        let U = this.knots;
        let m = U.length - 1;
        let P = this.cpoints;
        let dim = this.dimension;
        let alphas = new common_1.NDArray({ shape: [p] });
        let a = p;
        let b = p + 1;
        let total_bezier = m - 2 * p;
        let Q = new common_1.NDArray({ shape: [total_bezier, p + 1, dim] });
        let nb = 0; // Counter for Bezier segments
        for (let i = 0; i < p + 1; i++) {
            for (let z = 0; z < dim; z++) {
                Q.set(nb, i, z, P.get(i, z));
            }
        }
        let i;
        while (b < m) {
            i = b;
            while (b < m && U.get(b + 1) === U.get(b)) {
                b += 1;
            }
            let mult = b - i + 1;
            if (mult < p) {
                let numerator = U.get(b) - U.get(a);
                // Compute and store alphas
                for (let j = p; j > mult; j--) {
                    alphas.set(j - mult - 1, numerator / (U.get(a + j) - U.get(a)));
                }
                let r = p - mult; // Insert knot r times
                for (let j = 1; j < r + 1; j++) {
                    let save = r - j;
                    let s = mult + j; // This many new points
                    for (let k = p; k > s - 1; k--) {
                        let alpha = alphas.get(k - s);
                        for (let z = 0; z < dim; z++) {
                            Q.set(nb, k, z, alpha * Q.get(nb, k, z) +
                                (1.0 - alpha) * Q.get(nb, k - 1, z));
                        }
                    }
                    if (b < m) {
                        for (let z = 0; z < dim; z++) {
                            Q.set(nb + 1, save, z, Q.get(nb, p, z));
                        }
                    }
                }
            }
            nb += 1;
            if (b < m) {
                for (let i = p - mult; i < p + 1; i++) {
                    for (let z = 0; z < dim; z++) {
                        Q.set(nb, i, z, P.get(b - p + i, z));
                    }
                }
                a = b;
                b += 1;
            }
        }
        let bezlist = [];
        for (let i = 0; i < Q.length; i++) {
            bezlist.push(new BezierCurve(p, Q.get(i).reshape([p + 1, dim])));
        }
        return bezlist;
    }
    /**
     * Evaluate the BSplineCurve at given parameter value
     * If `tess` parameter is provided then the evaluated value is
     * placed in the `tess` array at index `tessidx`. Otherwise the single
     * euclidean point is returned.
     */
    evaluate(t, tess, tessidx) {
        let p = this.degree;
        let span = this.findSpan(t);
        let dim = this.dimension;
        let N = this.evaluateBasis(span, t);
        let denominator = this.getTermDenominator(span, N);
        if (tess) {
            tessidx = tessidx || 0;
            for (let i = 0; i < p + 1; i++) {
                let K;
                if (this.weights) {
                    K = N[i] * this.weights.get(span - p + i) / denominator;
                }
                else {
                    K = N[i] / denominator;
                }
                for (let z = 0; z < dim; z++) {
                    let c = this.cpoints.get(span - p + i, z);
                    tess.set(tessidx, z, tess.get(tessidx, z) + K * c);
                }
            }
            return null;
        }
        else {
            let point = new common_1.NDArray({ shape: [dim] });
            for (let i = 0; i < p + 1; i++) {
                let K;
                if (this.weights) {
                    K = N[i] * this.weights.get(span - p + i) / denominator;
                }
                else {
                    K = N[i] / denominator;
                }
                for (let z = 0; z < dim; z++) {
                    let c = this.cpoints.get(span - p + i, z);
                    point.set(z, point.get(z) + K * c);
                }
            }
            return point;
        }
    }
    /**
     * Evaluate the derivative of BSplineCurve at given parameter value
     * If `tess` parameter is provided then the evaluated value is
     * placed in the `tess` array at index `tessidx`. Otherwise the single
     * euclidean point is returned.
     */
    evaluateDerivative(t, d, tess, tessidx) {
        let p = this.degree;
        let P = this.cpoints;
        let du = Math.min(d, p);
        let ders = common_1.zeros([du + 1, 2]);
        let span = this.findSpan(t);
        let Nders = this.evaluateBasisDerivatives(span, du, t);
        for (let k = 0; k < du + 1; k++) {
            ders.set(k, common_1.zeros(2));
            for (let j = 0; j < p + 1; j++) {
                ders.set(k, common_1.add(ders.getA(k), common_1.mul(Nders.getN(k, j), P.getA(span - p + j))));
            }
        }
        if (tess && tessidx !== undefined) {
            for (let i = 0; i < du + 1; i++) {
                tess.set(tessidx, i, ders.getA(i));
            }
            return null;
        }
        else {
            throw new Error('Not implemented');
        }
    }
    /**
     * Tessellate the BSplineCurve uniformly at given resolution
     */
    tessellate(resolution = 10) {
        let tess = new common_1.NDArray({
            shape: [resolution + 1, this.dimension],
            datatype: 'f32'
        });
        for (let i = 0; i < resolution + 1; i++) {
            this.evaluate(i / resolution, tess, i);
        }
        return tess;
    }
    /**
     * Tessellate derivatives of BSplineCurve uniformly at given resolution
     */
    tessellateDerivatives(resolution = 10, d) {
        let tess = new common_1.NDArray({
            shape: [resolution + 1, d, this.dimension],
            datatype: 'f32'
        });
        for (let i = 0; i < resolution + 1; i++) {
            this.evaluateDerivative(i / resolution, d, tess, i);
        }
        return tess;
    }
    clone() {
        return new BSplineCurve(this.degree, this.cpoints.clone(), this.knots.clone(), this.weights ? this.weights.clone() : undefined);
    }
    aabb() {
        let aabb = new common_1.AABB(this.dimension);
        for (let i = 0; i < this.cpoints.length; i++) {
            let cpoint = this.cpoints.get(i);
            aabb.update(cpoint);
        }
        return aabb;
    }
    toString() {
        let s = `BSpline(Deg ${this.degree} cpoints ${this.cpoints.toString()})`;
        s += ` knots ${this.knots.toString()}`;
        if (this.weights) {
            s += ` weights ${this.weights.toString()}`;
        }
        return s;
    }
}
exports.BSplineCurve = BSplineCurve;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __webpack_require__(2);
const bcurve_1 = __webpack_require__(6);
const common_1 = __webpack_require__(0);
class LineSegment extends bcurve_1.BSplineCurve {
    constructor(from, to) {
        super(1, common_1.arr([from, to]), common_1.arr([0, 0, 1, 1]));
    }
}
exports.LineSegment = LineSegment;
class CircleArc extends bcurve_1.BSplineCurve {
    constructor(coordsys, radius, start, end) {
        let O = coordsys.origin;
        let X = coordsys.x;
        let Y = coordsys.y;
        if (end < start) {
            end = end + 2 * Math.PI;
        }
        let theta = end - start;
        let narcs;
        if (theta <= Math.PI / 2) {
            narcs = 1;
        }
        else if (theta <= Math.PI) {
            narcs = 2;
        }
        else if (theta <= 3 * Math.PI / 2) {
            narcs = 3;
        }
        else {
            narcs = 4;
        }
        let dtheta = theta / narcs;
        let n = 2 * narcs; // n+1 control points
        let p = 2; // Degree
        let m = n + p + 1;
        let U = new common_1.NDArray({ shape: [m + 1] });
        let P = new common_1.NDArray({ shape: [n + 1, 3] });
        let wt = new common_1.NDArray({ shape: [n + 1] });
        let w1 = Math.cos(dtheta / 2); // dtheta/2 is the base angle
        let P0 = common_1.add(O, common_1.add(common_1.mul(radius, Math.cos(start), X), common_1.mul(radius, Math.sin(start), Y)));
        let T0 = common_1.add(common_1.mul(-Math.sin(start), X), common_1.mul(Math.cos(start), Y));
        P.set(0, P0);
        wt.set(0, 1);
        let index = 0;
        let angle = start;
        for (let i = 1; i < narcs + 1; i++) {
            angle += dtheta;
            let P2 = common_1.add(O, common_1.mul(radius, Math.cos(angle), X), common_1.mul(radius, Math.sin(angle), Y));
            P.set(index + 2, P2);
            wt.set(index + 2, 1);
            let T2 = common_1.add(common_1.mul(-Math.sin(angle), X), common_1.mul(Math.cos(angle), Y));
            let isect = helper_1.intersectLineSegLineSeg3D(P0.toArray(), common_1.add(P0, T0).toArray(), P2.toArray(), common_1.add(P2, T2).toArray());
            if (!isect) {
                throw new Error('Intersection in 3D failed');
            }
            let pti = common_1.add(P0, common_1.mul(T0, isect[0]));
            P.set(index + 1, pti);
            wt.set(index + 1, w1);
            index += 2;
            if (i < narcs) {
                P0 = P2;
                T0 = T2;
            }
        }
        let j = 2 * narcs + 1;
        for (let i = 0; i < 3; i++) {
            U.set(i, 0.0);
            U.set(i + j, 1.0);
        }
        if (narcs === 1) {
        }
        else if (narcs === 2) {
            U.set(3, 0.5);
            U.set(4, 0.5);
        }
        else if (narcs === 3) {
            U.set(3, 1 / 3);
            U.set(4, 1 / 3);
            U.set(5, 2 / 3);
            U.set(6, 2 / 3);
        }
        else if (narcs === 4) {
            U.set(3, 0.25);
            U.set(4, 0.25);
            U.set(5, 0.5);
            U.set(6, 0.5);
            U.set(7, 0.75);
            U.set(8, 0.75);
        }
        super(p, P, U, wt);
    }
}
exports.CircleArc = CircleArc;
class Circle extends CircleArc {
    constructor(coord, radius) {
        super(coord, radius, 0, 2 * Math.PI);
    }
}
exports.Circle = Circle;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __webpack_require__(2);
const common_1 = __webpack_require__(0);
class BezierSurface {
    constructor(u_degree, v_degree, cpoints, weights) {
        this.u_degree = u_degree;
        this.v_degree = v_degree;
        this.cpoints = cpoints instanceof common_1.NDArray ? cpoints : new common_1.NDArray(cpoints);
        console.assert(this.cpoints.shape.length === 3);
        console.assert(this.cpoints.shape[2] === 2 || this.cpoints.shape[2] === 3);
        if (weights) {
            this.weights = weights instanceof common_1.NDArray ? weights : new common_1.NDArray(weights);
            console.assert(this.weights.shape.length === 2);
        }
    }
    get dimension() {
        return this.cpoints.shape[2];
    }
    isRational() {
        return !!this.weights;
    }
    evaluate(u, v, tess, uidx, vidx) {
        let Bu = helper_1.bernstein(this.u_degree, u);
        let Bv = helper_1.bernstein(this.v_degree, v);
        let denominator = 1;
        if (this.weights) {
            denominator = 0;
            for (let i = 0; i < this.u_degree + 1; i++) {
                for (let j = 0; j < this.v_degree + 1; j++) {
                    denominator += Bu[i] * Bv[j] * this.weights.get(i, j);
                }
            }
        }
        for (let i = 0; i < this.u_degree + 1; i++) {
            for (let j = 0; j < this.v_degree + 1; j++) {
                if (this.weights) {
                    tess.set(uidx, vidx, common_1.add(tess.get(uidx, vidx), common_1.mul(Bu[i], Bv[j], this.weights.get(i, j), this.cpoints.get(i, j))));
                }
                else {
                    tess.set(uidx, vidx, common_1.add(tess.get(uidx, vidx), common_1.mul(Bu[i], Bv[j], this.cpoints.get(i, j))));
                }
            }
        }
    }
    tessellatePoints(resolution = 10) {
        let tess = new common_1.NDArray({
            shape: [resolution + 1, resolution + 1, this.dimension],
            datatype: 'f32'
        });
        for (let i = 0; i < resolution + 1; i++) {
            for (let j = 0; j < resolution + 1; j++) {
                let u = i / resolution;
                let v = j / resolution;
                this.evaluate(u, v, tess, i, j);
            }
        }
        return tess;
    }
    tessellate(resolution = 10) {
        /*
               i  ---> m
    
               0             1             2             3
    
         j  0  +------------------------------------------
               |0          / |1          / |2          / |3
               |         /   |         /   |         /   |
         |     |       /     |       /     |       /     |
         |     |     /       |     /       |     /       |
         v     |   /         |   /         |   /         |
               | /           | /           | /           |
         n  1  +-----------------------------------------+
               |4          / |5          / |6          / |7
               |         /   |         /   |         /   |
               |       /     |       /     |       /     |
               |     /       |     /       |     /       |
               |   /         |   /         |   /         |
               | /           | /           | /           |
            2  +------------------------------------------
                8             9             10            11
    
                                 mj+i           mj+i+1
                                     +---------+
                                     |        /|
                                     | --->  / |
                                     | |    /  |
                                     | |   /   |
                                     |    /    |
                                     |   /   | |
                                     |  /    | |
                                     | /  <--- |
                                     |/        |
                                     ----------+
                            m(j+1)+i            m(j+1)+i+1
    
        */
        let tessPoints = this.tessellatePoints(resolution);
        let N = resolution + 1;
        let faces = [];
        for (let i = 0; i < N - 1; i++) {
            for (let j = 0; j < N - 1; j++) {
                faces = faces.concat(0, N * j + i, N * j + i + 1, N * (j + 1) + i, 0, N * j + i + 1, N * (j + 1) + i + 1, N * (j + 1) + i);
            }
        }
        tessPoints.reshape([N * N]);
        return { vertices: tessPoints.data, faces };
    }
    aabb() {
        let aabb = new common_1.AABB(this.dimension);
        for (let i = 0; i < this.cpoints.length; i++) {
            let cpoint = this.cpoints.get(i);
            aabb.update(cpoint);
        }
        return aabb;
    }
    clone() {
        return new BezierSurface(this.u_degree, this.v_degree, this.cpoints, this.weights);
    }
}
exports.BezierSurface = BezierSurface;
class BSplineSurface {
    constructor(u_degree, v_degree, u_knots, v_knots, cpoints, weights) {
        this.u_degree = u_degree;
        this.v_degree = v_degree;
        this.u_knots = u_knots instanceof common_1.NDArray ? u_knots : new common_1.NDArray(u_knots);
        this.v_knots = v_knots instanceof common_1.NDArray ? v_knots : new common_1.NDArray(v_knots);
        this.cpoints = cpoints instanceof common_1.NDArray ? cpoints : new common_1.NDArray(cpoints);
        if (weights) {
            this.weights = weights instanceof common_1.NDArray ? weights : new common_1.NDArray(weights);
        }
    }
    get dimension() {
        return this.cpoints.shape[2];
    }
    clone() {
        return new BSplineSurface(this.u_degree, this.v_degree, this.u_knots.clone(), this.v_knots.clone(), this.cpoints.clone(), this.weights ? this.weights.clone() : undefined);
    }
    aabb() {
        let aabb = new common_1.AABB(this.dimension);
        for (let i = 0; i < this.cpoints.length; i++) {
            let cpoint = this.cpoints.get(i);
            aabb.update(cpoint);
        }
        return aabb;
    }
    isRational() {
        return !!this.weights;
    }
    isFlat(tolerance = common_1.EPSILON) {
        let nU = this.cpoints.shape[0];
        let nV = this.cpoints.shape[1];
        let p00 = this.cpoints.getA(0, 0);
        let p01 = this.cpoints.getA(0, nU - 1);
        let p11 = this.cpoints.getA(nV - 1, nU - 1);
        let p10 = this.cpoints.getA(nV - 1, 0);
        let [a0, b0, c0, d0] = helper_1.planeFrom3Points(p00, p01, p11);
        let [a1, b1, c1, d1] = helper_1.planeFrom3Points(p00, p11, p10);
        // Mean plane is average of normals and offset of two planes
        let n0 = common_1.arr([a0, b0, c0]);
        let n1 = common_1.arr([a1, b1, c1]);
        let n = common_1.dir(common_1.add(n0, n1));
        let d = (d0 + d1) / 2;
        // We substitute every control point in this equation of mean plane
        // If the resulting value is within tolerance, then they are on
        // the plane for given tolerance. If all of them are on the plane
        // then the BSpline Surface could be considered flat for given tolerance
        for (let i = 0; i < nU; i++) {
            for (let j = 0; j < nV; j++) {
                let cpoint = this.cpoints.getA(i, j);
                let val = common_1.add(common_1.dot(n, cpoint), d);
                if (Math.abs(val) > tolerance) {
                    return false;
                }
            }
        }
        return true;
    }
    setUKnots(u_knots) {
        if (!this.u_knots.isShapeEqual(u_knots)) {
            throw new Error('Invalid U knot vector length');
        }
        this.u_knots = u_knots;
    }
    setVKnots(v_knots) {
        if (!this.v_knots.isShapeEqual(v_knots)) {
            throw new Error('Invalid V knot vector length');
        }
        this.v_knots = v_knots;
    }
    evaluate(u, v, tess, uidx, vidx) {
        let u_span = helper_1.findSpan(this.u_degree, this.u_knots.data, u);
        let v_span = helper_1.findSpan(this.v_degree, this.v_knots.data, v);
        let Nu = helper_1.getBasisFunction(this.u_degree, this.u_knots.data, u_span, u);
        let Nv = helper_1.getBasisFunction(this.v_degree, this.v_knots.data, v_span, v);
        let dim = this.dimension;
        let u_ind = u_span - this.u_degree;
        let temp;
        for (let l = 0; l < this.v_degree + 1; l++) {
            temp = common_1.zeros([dim]);
            let v_ind = v_span - this.v_degree + l;
            for (let k = 0; k < this.u_degree + 1; k++) {
                if (this.weights) {
                    temp = common_1.add(temp, common_1.mul(Nu[k], this.cpoints.get(u_ind + k, v_ind), this.weights.get(u_ind + k, v_ind)));
                }
                else {
                    temp = common_1.add(temp, common_1.mul(Nu[k], this.cpoints.get(u_ind + k, v_ind)));
                }
            }
            tess.set(uidx, vidx, common_1.add(tess.get(uidx, vidx), common_1.mul(Nv[l], temp)));
        }
    }
    tessellatePoints(resolution = 10) {
        let tess = new common_1.NDArray({
            shape: [resolution + 1, resolution + 1, this.dimension],
            datatype: 'f32'
        });
        for (let i = 0; i < resolution + 1; i++) {
            for (let j = 0; j < resolution + 1; j++) {
                let u = i / resolution;
                let v = j / resolution;
                this.evaluate(u, v, tess, i, j);
            }
        }
        return tess;
    }
    tessellate(resolution = 10) {
        let tessPoints = this.tessellatePoints(resolution);
        let N = resolution + 1;
        let faces = [];
        for (let i = 0; i < N - 1; i++) {
            for (let j = 0; j < N - 1; j++) {
                faces = faces.concat(0, N * j + i, N * j + i + 1, N * (j + 1) + i, 0, N * j + i + 1, N * (j + 1) + i + 1, N * (j + 1) + i);
            }
        }
        tessPoints.reshape([N * N]);
        return { vertices: tessPoints.data, faces };
    }
    static tessellateRecursive(bsrf, tolerance = common_1.EPSILON) {
        let tessArr = [];
        if (bsrf.isFlat(tolerance)) {
            tessArr.push(bsrf.tessellate(10));
        }
        else {
            for (let surf of bsrf.splitUV(0.5, 0.5)) {
                tessArr = tessArr.concat(BSplineSurface.tessellateRecursive(surf, tolerance));
            }
        }
        return tessArr;
    }
    tessellateAdaptive(tolerance = common_1.EPSILON) {
        return BSplineSurface.tessellateRecursive(this, tolerance);
    }
    /**
     * Split this BSplineSurface into two at uk, by refining u-knots
     */
    splitU(uk) {
        let r = this.u_degree;
        // Count number of times uk already occurs in the u-knot vector
        // We have to add uk until it occurs r-times in the u-knot vector,
        // where r is the u-degree of the curve
        // In case there are knots in the u-knot vector that are equal to uk
        // within the error tolerance, then we replace them with uk
        // Such u-knot vector is named safe_uknots.
        let safe_uknots = [];
        for (let i = 0; i < this.u_knots.data.length; i++) {
            if (common_1.isequal(this.u_knots.getN(i), uk)) {
                safe_uknots.push(uk);
                r--;
            }
            else {
                safe_uknots.push(this.u_knots.getN(i));
            }
        }
        let add_uknots = [];
        for (let i = 0; i < r; i++) {
            add_uknots.push(uk);
        }
        let copy = this.clone();
        copy.setUKnots(common_1.arr(safe_uknots));
        copy.refineKnotsU(add_uknots);
        // Find the index of the first uk knot in the new knot vector
        let ibreak = -1;
        for (let i = 0; i < copy.u_knots.data.length; i++) {
            if (common_1.isequal(copy.u_knots.getN(i), uk)) {
                ibreak = i;
                break;
            }
        }
        console.assert(ibreak >= 0);
        // The U-control points of the surface where the split will happen are
        // at the index *ibreak-1* in the U-direction of control points array
        // The left surface will have *ibreak* u-control point rows
        // The right surface will have *N-ibreak+1* u-control point rows
        // (where N is the number of control points rows in U direction
        // in the original surface)
        // The control point at *ibreak-1* will be repeated in left and right
        // surfaces. It will be the last u-control point of the left surface
        // and first u-control point of the right surface
        let lcpoints = copy.cpoints.getA(':' + ibreak, ':');
        let rcpoints = copy.cpoints.getA((ibreak - 1) + ':', ':');
        let l_uknots = copy.u_knots.getA(':' + ibreak).toArray();
        // Scale the internal u knots values, to fit into the left surface's
        // 0-1 u parameter range
        for (let i = copy.u_degree + 1; i < l_uknots.length; i++) {
            l_uknots[i] = l_uknots[i] / uk;
        }
        // Append clamped knots to the left curve at 1
        for (let i = 0; i <= copy.u_degree; i++) {
            l_uknots.push(1);
        }
        let r_uknots = copy.u_knots.getA((ibreak + copy.u_degree) + ':').toArray();
        // Scale the internal knot values, to fit into the right surface's
        // 0-1 u parameter range
        for (let i = 0; i < r_uknots.length - copy.u_degree; i++) {
            r_uknots[i] = (r_uknots[i] - uk) / (1 - uk);
        }
        // Prepend clamped knots to the right curve at 0
        for (let i = 0; i <= copy.u_degree; i++) {
            r_uknots.unshift(0);
        }
        // TODO : Rational
        let lsurf = new BSplineSurface(copy.u_degree, copy.v_degree, l_uknots, copy.v_knots, lcpoints);
        let rsurf = new BSplineSurface(copy.u_degree, copy.v_degree, r_uknots, copy.v_knots, rcpoints);
        return [lsurf, rsurf];
    }
    /**
     * Split this BSplineSurface into two at vk, by refining v-knots
     */
    splitV(vk) {
        let r = this.v_degree;
        // Count number of times vk already occurs in the v-knot vector
        // We have to add vk until it occurs r-times in the v-knot vector,
        // where r is the v-degree of the curve
        // In case there are knots in the v-knot vector that are equal to vk
        // within the error tolerance, then we replace them with vk
        // Such v-knot vector is named safe_vknots
        let safe_vknots = [];
        for (let i = 0; i < this.v_knots.data.length; i++) {
            if (common_1.isequal(this.v_knots.getN(i), vk)) {
                safe_vknots.push(vk);
                r--;
            }
            else {
                safe_vknots.push(this.v_knots.getN(i));
            }
        }
        let add_vknots = [];
        for (let i = 0; i < r; i++) {
            add_vknots.push(vk);
        }
        let copy = this.clone();
        copy.setVKnots(common_1.arr(safe_vknots));
        copy.refineKnotsV(add_vknots);
        // Find the index of the first vk knot in the new knot vector
        let ibreak = -1;
        for (let i = 0; i < copy.v_knots.data.length; i++) {
            if (common_1.isequal(copy.v_knots.getN(i), vk)) {
                ibreak = i;
                break;
            }
        }
        console.assert(ibreak >= 0);
        // The V-control points of the surface where the split will happen are
        // at the index *ibreak-1* in the V-direction of control points array
        // The left surface will have *ibreak* v-control point columns
        // The right surface will have *N-ibreak+1* v-control point columns 
        // (where N is the number of control points rows in V direction
        // in the original surface)
        // The control point at *ibreak-1* will be repeated in left and right
        // surfaces. It will be the last v-control point of the left surface
        // and first v-control point of the right surface
        let lcpoints = copy.cpoints.getA(':', ':' + ibreak);
        let rcpoints = copy.cpoints.getA(':', (ibreak - 1) + ':');
        let l_vknots = copy.v_knots.getA(':' + ibreak).toArray();
        // Scale the internal v knot values to fit into the left surface's 0-1
        // v parameter range
        for (let i = copy.v_degree + 1; i < l_vknots.length; i++) {
            l_vknots[i] = l_vknots[i] / vk;
        }
        // Append clamped knots to the left curve at 1
        for (let i = 0; i <= copy.v_degree; i++) {
            l_vknots.push(1);
        }
        let r_vknots = copy.v_knots.getA((ibreak + copy.v_degree) + ':').toArray();
        // Scale the internal knot values to fit into the right surface's
        // 0-1 v parameter range
        for (let i = 0; i < r_vknots.length - copy.v_degree; i++) {
            r_vknots[i] = (r_vknots[i] - vk) / (1 - vk);
        }
        // Prepend clamped knots to the right curve at 0
        for (let i = 0; i <= copy.v_degree; i++) {
            r_vknots.unshift(0);
        }
        // TODO : Rational
        let lsurf = new BSplineSurface(copy.u_degree, copy.v_degree, copy.u_knots, l_vknots, lcpoints);
        let rsurf = new BSplineSurface(copy.u_degree, copy.v_degree, copy.u_knots, r_vknots, rcpoints);
        return [lsurf, rsurf];
    }
    /**
     * Split this BSplineSurface into four
     */
    splitUV(uk, vk) {
        let [ul_surf, ur_surf] = this.splitU(uk);
        return [
            ...ul_surf.splitV(vk),
            ...ur_surf.splitV(vk)
        ];
    }
    /**
     * Inserts knot un in the U knot vector r-times
     * Ref: Algorithm A5.3 "The NURBS book"
     * @param un Knot to be inserted
     * @param r Number of times to insert the knot
     */
    insertKnotU(un, r) {
        let p = this.u_degree;
        // Knot will be inserted between [k, k+1)
        let k = helper_1.findSpan(p, this.u_knots.data, un);
        // If un already exists in the knot vector, s is its multiplicity
        let s = common_1.count(this.u_knots, un, 0);
        if (r + s > p) {
            throw new Error('Knot insertion exceeds knot multiplicity beyond degree');
        }
        let mU = this.u_knots.length - 1;
        let nU = mU - this.u_degree - 1;
        let mV = this.v_knots.length - 1;
        let nV = mV - this.v_degree - 1;
        let P = this.cpoints;
        let Q = common_1.empty([nU + 1 + r, nV + 1, this.dimension]);
        let UP = this.u_knots;
        let UQ = common_1.empty([UP.length + r]);
        let VP = this.v_knots;
        let VQ = common_1.empty([VP.length]);
        // Load u-vector
        for (let i = 0; i < k + 1; i++) {
            UQ.set(i, UP.get(i));
        }
        for (let i = 1; i < r + 1; i++) {
            UQ.set(k + i, un);
        }
        for (let i = k + 1; i < mU + 1; i++) {
            UQ.set(i + r, UP.get(i));
        }
        // Copy v-vector
        VQ.copyfrom(VP);
        let alpha = common_1.empty([p + 1, r + 1]);
        let R = common_1.empty([p + 1, this.dimension]);
        let L = 0;
        // Pre-calculate alphas
        for (let j = 1; j < r + 1; j++) {
            L = k - p + j;
            for (let i = 0; i < p - j - s + 1; i++) {
                alpha.set(i, j, (un - UP.get(L + i)) / (UP.get(i + k + 1) - UP.get(L + i)));
            }
        }
        for (let row = 0; row < nV + 1; row++) {
            // Save unaltered control points
            for (let i = 0; i < k - p + 1; i++) {
                Q.set(i, row, P.get(i, row));
            }
            for (let i = k - s; i < nU + 1; i++) {
                Q.set(i + r, row, P.get(i, row));
            }
            // Load auxiliary control points
            for (let i = 0; i < p - s + 1; i++) {
                R.set(i, P.get(k - p + i, row));
            }
            for (let j = 1; j < r + 1; j++) {
                L = k - p + j;
                for (let i = 0; i < p - j - s + 1; i++) {
                    R.set(i, common_1.add(common_1.mul(alpha.get(i, j), R.get(i + 1)), common_1.mul(1.0 - alpha.get(i, j), R.get(i))));
                }
                Q.set(L, row, R.get(0));
                Q.set(k + r - j - s, row, R.get(p - j - s));
            }
            // Load the remaining control points
            for (let i = L + 1; i < k - s; i++) {
                Q.set(i, row, R.get(i - L));
            }
        }
        this.cpoints = Q;
        this.v_knots = VQ;
    }
    /**
     * Inserts knot vn in the V knot vector r-times
     * Ref: Algorithm A5.3 "The NURBS book"
     * @param vn Knot to be inserted
     * @param r Number of times to insert the knot
     */
    insertKnotV(vn, r) {
        let q = this.v_degree;
        // Knot will be inserted between [k,k+1)
        let k = helper_1.findSpan(this.v_degree, this.v_knots.data, vn);
        // If v already exists in knot vector, s is its multiplicity
        let s = common_1.count(this.v_knots, vn, 0);
        if (r + s > q) {
            throw new Error('Knot insertion exceeds knot multiplicity beyond degree');
        }
        let mU = this.u_knots.length - 1;
        let nU = mU - this.u_degree - 1;
        let mV = this.v_knots.length - 1;
        let nV = mV - this.v_degree - 1;
        let P = this.cpoints;
        let Q = common_1.empty([nU + 1, nV + r + 1, this.dimension]);
        let UP = this.u_knots;
        let UQ = common_1.empty([UP.length]);
        let VP = this.v_knots;
        let VQ = common_1.empty([VP.length + r]);
        // Copy u knot vector
        UQ.copyfrom(UP);
        // Load v knot vector
        for (let i = 0; i < k + 1; i++) {
            VQ.set(i, VP.get(i));
        }
        for (let i = 1; i < r + 1; i++) {
            VQ.set(k + i, vn);
        }
        for (let i = k + 1; i < mV + 1; i++) {
            VQ.set(i + r, VP.get(i));
        }
        let alpha = common_1.empty([q + 1, r + 1]);
        let R = common_1.empty([q + 1, this.dimension]);
        let L = 0;
        // Pre-calculate alphas
        for (let j = 1; j < r + 1; j++) {
            L = k - q + j;
            for (let i = 0; i < q - j - s + 1; i++) {
                alpha.set(i, j, (vn - VP.get(L + i)) / (VP.get(i + k + 1) - VP.get(L + i)));
            }
        }
        for (let col = 0; col < nU + 1; col++) {
            // Save unaltered control points
            for (let i = 0; i < k - q + 1; i++) {
                Q.set(col, i, P.get(col, i));
            }
            for (let i = k - s; i < nV + 1; i++) {
                Q.set(col, i + r, P.get(col, i));
            }
            // Load auxiliary control points
            for (let i = 0; i < q - s + 1; i++) {
                R.set(i, P.get(col, k - q + i));
            }
            for (let j = 1; j < r + 1; j++) {
                L = k - q + j;
                for (let i = 0; i < q - j - s + 1; i++) {
                    R.set(i, common_1.add(common_1.mul(alpha.get(i, j), R.get(i + 1)), common_1.mul((1.0 - alpha.get(i, j)), R.get(i))));
                }
                Q.set(col, L, R.get(0));
                Q.set(col, k + r - j - s, R.get(q - j - s));
            }
            // Load remaining control points
            for (let i = L + 1; i < k - s; i++) {
                Q.set(col, i, R.get(i - L));
            }
        }
        this.cpoints = Q;
        this.v_knots = VQ;
    }
    /**
     * Insert knots in U and V knot vectors
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    insertKnotUV(un, vn, ur, vr) {
        this.insertKnotU(un, ur);
        this.insertKnotV(vn, vr);
    }
    /**
     * Inserts multiple knots into the U knot vector at once
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnotsU(uklist) {
        let mU = this.u_knots.length - 1;
        let mV = this.v_knots.length - 1;
        let p = this.u_degree;
        let q = this.v_degree;
        let nU = mU - p - 1;
        let nV = mV - q - 1;
        let X = uklist;
        let r = uklist.length - 1;
        let U = this.u_knots;
        let V = this.v_knots;
        let Ubar = common_1.empty(U.length + r + 1);
        let Vbar = common_1.empty(V.length);
        let P = this.cpoints;
        let Q = common_1.empty([nU + 1 + r + 1, nV + 1, this.dimension]);
        let a = helper_1.findSpan(p, U.data, X[0]);
        let b = helper_1.findSpan(p, U.data, X[r]);
        b += 1;
        // Initialize Ubar (for u<a and u>b)
        for (let j = 0; j < a + 1; j++) {
            Ubar.set(j, U.get(j));
        }
        for (let j = b + p; j < mU + 1; j++) {
            Ubar.set(j + r + 1, U.get(j));
        }
        // Copy V into Vbar as is
        Vbar.copyfrom(V);
        // Copy unaltered control points (corresponding to u<a and u>b)
        for (let row = 0; row < nV + 1; row++) {
            for (let k = 0; k < a - p + 1; k++) {
                Q.set(k, row, P.get(k, row));
            }
            for (let k = b - 1; k < nU + 1; k++) {
                Q.set(k + r + 1, row, P.get(k, row));
            }
        }
        let i = b + p - 1;
        let k = b + p + r;
        for (let j = r; j >= 0; j--) {
            while (X[j] <= U.get(i) && i > a) {
                Ubar.set(k, U.get(i));
                for (let row = 0; row < nV + 1; row++) {
                    Q.set(k - p - 1, row, P.get(i - p - 1, row));
                }
                k -= 1;
                i -= 1;
            }
            for (let row = 0; row < nV + 1; row++) {
                Q.set(k - p - 1, row, Q.get(k - p, row));
            }
            for (let l = 1; l < p + 1; l++) {
                let ind = k - p + l;
                let alpha = Ubar.get(k + l) - X[j];
                if (common_1.iszero(alpha)) {
                    for (let row = 0; row < nV + 1; row++) {
                        Q.set(ind - 1, row, Q.get(ind, row));
                    }
                }
                else {
                    alpha = alpha / (Ubar.get(k + l) - U.get(i - p + l));
                    for (let row = 0; row < nV + 1; row++) {
                        Q.set(ind - 1, row, common_1.add(common_1.mul(alpha, Q.get(ind - 1, row)), common_1.mul((1.0 - alpha), Q.get(ind, row))));
                    }
                }
            }
            Ubar.set(k, X[j]);
            k -= 1;
        }
        this.u_knots = Ubar;
        this.cpoints = Q;
    }
    /**
     * Inserts multiple knots into the V knot vector at once
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnotsV(vklist) {
        let mU = this.u_knots.length - 1;
        let mV = this.v_knots.length - 1;
        let p = this.u_degree;
        let q = this.v_degree;
        let nU = mU - p - 1;
        let nV = mV - q - 1;
        let X = vklist;
        let r = vklist.length - 1;
        let U = this.u_knots;
        let V = this.v_knots;
        let Ubar = common_1.empty(U.length);
        let Vbar = common_1.empty(V.length + r + 1);
        let P = this.cpoints;
        let Q = common_1.empty([nU + 1, nU + 1 + r + 1, this.dimension]);
        let a = helper_1.findSpan(q, V.data, X[0]);
        let b = helper_1.findSpan(q, V.data, X[r]);
        b += 1;
        // Initialize Vbar (for u<a and u>b)
        for (let j = 0; j < a + 1; j++) {
            Vbar.set(j, V.get(j));
        }
        for (let j = b + q; j < mV + 1; j++) {
            Vbar.set(j + r + 1, V.get(j));
        }
        // Copy U into Ubar as-is
        Ubar.copyfrom(U);
        // Copy unaltered control points (corresponding to u<a and u>b)
        for (let col = 0; col < nU + 1; col++) {
            for (let k = 0; k < a - q + 1; k++) {
                Q.set(col, k, P.get(col, k));
            }
            for (let k = b - 1; k < nV + 1; k++) {
                Q.set(col, k + r + 1, P.get(col, k));
            }
        }
        let i = b + q - 1;
        let k = b + q + r;
        for (let j = r; j >= 0; j--) {
            while (X[j] <= V.get(i) && i > a) {
                Vbar.set(k, V.get(i));
                for (let col = 0; col < nU + 1; col++) {
                    Q.set(col, k - q - 1, P.get(col, i - q - 1));
                }
                k -= 1;
                i -= 1;
            }
            for (let col = 0; col < nU + 1; col++) {
                Q.set(col, k - q - 1, Q.get(col, k - q));
            }
            for (let l = 1; l < q + 1; l++) {
                let ind = k - q + l;
                let alpha = Vbar.get(k + l) - X[j];
                if (common_1.iszero(alpha)) {
                    for (let col = 0; col < nU + 1; col++) {
                        Q.set(col, ind - 1, Q.get(col, ind));
                    }
                }
                else {
                    alpha = alpha / (Vbar.getN(k + l) - V.getN(i - q + l));
                    for (let col = 0; col < nU + 1; col++) {
                        Q.set(col, ind - 1, common_1.add(common_1.mul(alpha, Q.get(col, ind - 1)), common_1.mul((1.0 - alpha), Q.get(col, ind))));
                    }
                }
            }
            Vbar.set(k, X[j]);
            k -= 1;
        }
        this.v_knots = Vbar;
        this.cpoints = Q;
    }
    /**
     * Inserts multiple knots into the U and V knot vectors at once
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnotsUV(uklist, vklist) {
        this.refineKnotsU(uklist);
        this.refineKnotsV(vklist);
    }
    decomposeU() {
        let p = this.u_degree;
        let q = this.v_degree;
        let U = this.u_knots;
        let V = this.v_knots;
        let mU = U.length - 1;
        let mV = V.length - 1;
        let nV = mV - q - 1;
        let P = this.cpoints;
        let alphas = common_1.empty(p);
        let a = p;
        let b = p + 1;
        let total_bezier = mU - 2 * p;
        let Q = common_1.empty([total_bezier, p + 1, nV + 1, this.dimension]);
        let nb = 0; // Counter of Bezier strips along u
        for (let i = 0; i < p + 1; i++) {
            for (let row = 0; row < nV + 1; row++) {
                Q.set(nb, i, row, P.get(i, row));
            }
        }
        while (b < mU) {
            let i = b;
            while (b < mU && common_1.isequal(U.getN(b + 1), U.getN(b))) {
                b += 1;
            }
            let mult = b - i + 1;
            if (mult < p) {
                let numerator = U.getN(b) - U.getN(a); // Numerator of alpha
                // Compute and store alphas
                for (let j = p; j > mult; j--) {
                    alphas.set(j - mult - 1, numerator / (U.getN(a + j) - U.getN(a)));
                }
                let r = p - mult; // Insert knot r times
                for (let j = 1; j < r + 1; j++) {
                    let save = r - j;
                    let s = mult + j;
                    for (let k = p; k > s - 1; k--) {
                        let alpha = alphas.getN(k - s);
                        for (let row = 0; row < nV + 1; row++) {
                            Q.set(nb, k, row, common_1.add(common_1.mul(alpha, Q.get(nb, k, row)), common_1.mul((1.0 - alpha), Q.get(nb, k - 1, row))));
                        }
                    }
                    if (b < mU) {
                        for (let row = 0; row < nV + 1; row++) {
                            Q.set(nb + 1, save, row, Q.get(nb, p, row));
                        }
                    }
                }
            }
            nb += 1;
            if (b < mU) {
                for (let i = p - mult; i < p + 1; i++) {
                    for (let row = 0; row < nV + 1; row++) {
                        Q.set(nb, i, row, P.get(b - p + i, row));
                    }
                }
                a = b;
                b += 1;
            }
        }
        return Q;
    }
    decomposeV() {
        let p = this.u_degree;
        let q = this.v_degree;
        let U = this.u_knots;
        let V = this.v_knots;
        let mU = U.length - 1;
        let mV = V.length - 1;
        let nU = mU - p - 1;
        let P = this.cpoints;
        let alphas = common_1.empty(q);
        let a = q;
        let b = q + 1;
        let total_bezier = mV - 2 * q;
        let Q = common_1.empty([total_bezier, nU + 1, q + 1, this.dimension]);
        let nb = 0; // Counter of Bezier strips along v
        for (let i = 0; i < q + 1; i++) {
            for (let col = 0; col < nU + 1; col++) {
                Q.set(nb, col, i, P.get(col, i));
            }
        }
        while (b < mV) {
            let i = b;
            while (b < mV && common_1.isequal(V.getN(b + 1), V.getN(b))) {
                b += 1;
            }
            let mult = b - i + 1;
            if (mult < q) {
                let numerator = V.getN(b) - V.getN(a); // Numerator of alpha
                // Compute and store alphas
                for (let j = q; j > mult; j--) {
                    alphas.set(j - mult - 1, numerator / (V.getN(a + j) - V.getN(a)));
                }
                let r = q - mult; // Insert knot r times
                for (let j = 1; j < r + 1; j++) {
                    let save = r - j;
                    let s = mult + j;
                    for (let k = q; k > s - 1; k--) {
                        let alpha = alphas.getN(k - s);
                        for (let col = 0; col < nU + 1; col++) {
                            Q.set(nb, col, k, common_1.add(common_1.mul(alpha, Q.get(nb, col, k)), common_1.mul((1.0 - alpha), Q.get(nb, col, k - 1))));
                        }
                    }
                    if (b < mV) {
                        for (let col = 0; col < nU + 1; col++) {
                            Q.set(nb + 1, col, save, Q.get(nb, col, q));
                        }
                    }
                }
            }
            nb += 1;
            if (b < mV) {
                for (let i = q - mult; i < q + 1; i++) {
                    for (let col = 0; col < nU + 1; col++) {
                        Q.set(nb, col, i, P.get(col, b - q + i));
                    }
                }
                a = b;
                b += 1;
            }
        }
        return Q;
    }
    /**
     * Creates grid of Bezier surfaces that represent this BSpline surface.
     * The routine first computes bezier strips along u (i.e. BSpline surfaces that
     * are Bezier in one direction and BSpline in other). Subsequently
     * decompose it called on each of these strips in the v direction
     * Algorithm A5.7 from "The NURBS Book"
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    decompose() {
        let Q = this.decomposeU();
        // Using Q, create Bezier strip surfaces. These are individual BSurf objects
        // Their u curve will be bezier, but will still be expressed as BSpline
        // Their v curve will still be bspline
        let L = 2 * (this.u_degree + 1);
        let u_bez_knots = common_1.empty(L);
        for (let i = 0; i < this.u_degree + 1; i++) {
            u_bez_knots.set(i, 0);
            u_bez_knots.set(L - i - 1, 1);
        }
        let bezStrips = [];
        for (let numUBez = 0; numUBez < Q.length; numUBez++) {
            let cpoints = Q.getA(numUBez);
            bezStrips.push(new BSplineSurface(this.u_degree, this.v_degree, u_bez_knots, this.v_knots, cpoints));
        }
        let bezSurfs = [];
        // Decompose each bezier strip along v
        for (let bezStrip of bezStrips) {
            let Q = bezStrip.decomposeV();
            for (let numUBez = 0; numUBez < Q.length; numUBez++) {
                let cpoints = Q.getA(numUBez);
                bezSurfs.push(new BezierSurface(this.u_degree, this.v_degree, cpoints));
            }
        }
        return bezSurfs;
    }
    toString() {
        let s = `BSplineSurf [udeg ${this.u_degree} vdeg ${this.v_degree} \n` +
            `cpoints ${this.cpoints.toString()} \n` +
            `uknots ${this.u_knots.toString()} \n` +
            `vknots ${this.v_knots.toString()} \n`;
        if (this.weights) {
            s += `weights ${this.weights.toString()}\n`;
        }
        s += ']';
        return s;
    }
}
exports.BSplineSurface = BSplineSurface;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const nurbs_1 = __webpack_require__(10);
window.onload = () => {
    let qunitDiv = document.createElement('div');
    qunitDiv.setAttribute('id', 'qunit');
    document.body.appendChild(qunitDiv);
    let qunitFixtureDiv = document.createElement('div');
    qunitFixtureDiv.setAttribute('id', 'qunit-fixture');
    document.body.appendChild(qunitFixtureDiv);
    nurbs_1.default();
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
const common_1 = __webpack_require__(0);
const nurbs_1 = __webpack_require__(12);
const helper_1 = __webpack_require__(2);
function testNURBS() {
    QUnit.module('Helper', () => {
        QUnit.module('planeFrom3Points', () => {
            QUnit.test('XY plane', assert => {
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 0]), common_1.arr([5, 0, 0]), common_1.arr([0, 5, 0])), [0, 0, 1, 0]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 0]), common_1.arr([0, 5, 0]), common_1.arr([5, 0, 0])), [0, 0, -1, 0]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 3]), common_1.arr([0, 5, 3]), common_1.arr([5, 0, 3])), [0, 0, -1, 3]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 3]), common_1.arr([5, 0, 3]), common_1.arr([0, 5, 3])), [0, 0, 1, -3]);
            });
            QUnit.test('XZ plane', assert => {
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 0]), common_1.arr([5, 0, 0]), common_1.arr([0, 0, 5])), [0, -1, 0, 0]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 0]), common_1.arr([0, 0, 5]), common_1.arr([5, 0, 0])), [0, 1, 0, 0]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 2, 0]), common_1.arr([0, 2, 5]), common_1.arr([5, 2, 0])), [0, 1, 0, -2]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 2, 0]), common_1.arr([5, 2, 0]), common_1.arr([0, 2, 5])), [0, -1, 0, 2]);
            });
            QUnit.test('YZ plane', assert => {
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 0]), common_1.arr([0, 5, 0]), common_1.arr([0, 0, 5])), [1, 0, 0, 0]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([0, 0, 0]), common_1.arr([0, 0, 5]), common_1.arr([0, 5, 0])), [-1, 0, 0, 0]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([2, 0, 0]), common_1.arr([2, 0, 5]), common_1.arr([2, 5, 0])), [-1, 0, 0, 2]);
                assert.deepEqual(helper_1.planeFrom3Points(common_1.arr([2, 0, 0]), common_1.arr([2, 5, 0]), common_1.arr([2, 0, 5])), [1, 0, 0, -2]);
            });
            QUnit.test('Oblique plane', assert => {
                {
                    let [a, b, c] = helper_1.planeFrom3Points(common_1.arr([1, 0, 0]), common_1.arr([0, 1, 0]), common_1.arr([0, 0, 1]));
                    assert.ok(a > 0 && b > 0 && c > 0);
                }
                {
                    let [a, b, c] = helper_1.planeFrom3Points(common_1.arr([0, 1, 0]), common_1.arr([1, 0, 0]), common_1.arr([0, 0, 1]));
                    assert.ok(a < 0 && b < 0 && c < 0);
                }
            });
        });
        QUnit.module('intersectLineSegLineSeg3D', () => {
            QUnit.test('_', assert => {
                let result;
                result = helper_1.intersectLineSegLineSeg3D([0, 0, 0], [1, 0, 0], [0, 0, 0], [0, 1, 0]);
                assert.deepEqual(result, [0, 0]);
                result = helper_1.intersectLineSegLineSeg3D([0, 0, 0], [1, 1, 0], [0, 1, 0], [1, 0, 0]);
                assert.deepEqual(result, [0.5, 0.5]);
                result = helper_1.intersectLineSegLineSeg3D([0, 0, 0], [1, 1, 0], [0, 1, 1], [1, 0, 1]);
                assert.equal(result, null);
                result = helper_1.intersectLineSegLineSeg3D([0, 0, 0], [1, 1, 1], [0, 1, 0], [1, 0, 1]);
                assert.deepEqual(result, [0.5, 0.5]);
                result = helper_1.intersectLineSegLineSeg3D([0, 0, 0], [1, 1, 1], [1, 0, 0], [2, 1, 1]);
                assert.equal(result, null);
                result = helper_1.intersectLineSegLineSeg3D([0, 0, 0], [1, 1, 1], [1, 1, 0], [2, 0, 1]);
                assert.equal(result, null);
            });
        });
    });
    QUnit.module('NURBS', () => {
        QUnit.module('Bezier2D', () => {
            QUnit.test('construction', assert => {
                let bezcrv = new nurbs_1.BezierCurve(3, common_1.arr([
                    [0, 0], [1, 3], [2, -3], [3, 1]
                ]));
                assert.ok(!!bezcrv);
            });
            QUnit.test('isStraight', assert => {
                let bezcrv = new nurbs_1.BezierCurve(3, common_1.arr([
                    [0, 0], [1, 3], [2, -3], [3, 1]
                ]));
                assert.ok(!bezcrv.isLine());
                bezcrv = new nurbs_1.BezierCurve(3, common_1.arr([
                    [0, 0], [1, 1], [2, 2], [5, 5]
                ]));
                assert.ok(bezcrv.isLine());
                bezcrv = new nurbs_1.BezierCurve(1, common_1.arr([
                    [0, 0], [5, 5]
                ]));
                assert.ok(bezcrv.isLine());
                bezcrv = new nurbs_1.BezierCurve(2, common_1.arr([
                    [0, 0], [5, 1e-3], [10, 0]
                ]));
                assert.ok(!bezcrv.isLine());
                assert.ok(bezcrv.isLine(1e-2));
            });
            QUnit.skip('computeZeroCurvatureLocations', assert => {
                let bezcrv = new nurbs_1.BezierCurve(3, common_1.arr([
                    [0, 0], [3, 3], [6, 3], [9, 0]
                ]));
                console.log(bezcrv.computeZeroCurvatureLocations());
                assert.ok(true);
            });
        });
        QUnit.module('BSplineCurve2D', () => {
            QUnit.test('construction', assert => {
                let bcrv = new nurbs_1.BSplineCurve(1, new common_1.NDArray([[0, 0], [10, 10]]), new common_1.NDArray([0, 0, 1, 1]));
                assert.ok(!!bcrv);
                assert.equal(bcrv.degree, 1);
                assert.equal(bcrv.cpoints.shape[0], 2);
                assert.equal(bcrv.knots.shape[0], 4);
            });
        });
        QUnit.module('BSpline Surf 3D', () => {
            QUnit.test('isFlat', assert => {
                let bsrf = new nurbs_1.BSplineSurface(2, 2, [0, 0, 0, 1, 1, 1], [0, 0, 0, 1, 1, 1], [
                    [[-1, -1, 0], [0, -1, 0], [1, -1, 0]],
                    [[-1, 0, 1], [0, 0, 2], [1, 0, -1]],
                    [[-1, 1, 0], [0, 1, 0], [1, 1, 0]]
                ]);
                assert.ok(!bsrf.isFlat(1));
                assert.ok(bsrf.isFlat(3));
                bsrf = new nurbs_1.BSplineSurface(1, 1, [0, 0, 1, 1], [0, 0, 1, 1], [
                    [[-1, -1, 0], [0, -1, 0]],
                    [[-1, 0, 0], [0, 0, 0]],
                ]);
                assert.ok(bsrf.isFlat(0));
            });
        });
    });
}
exports.default = testNURBS;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/
Object.defineProperty(exports, "__esModule", { value: true });
var ndarray_1 = __webpack_require__(4);
var AABB = /** @class */ (function () {
    function AABB(arg0, arg1) {
        var dim = 0;
        if (Array.isArray(arg0) || ArrayBuffer.isView(arg0)) {
            this._min = new ndarray_1.NDArray(arg0);
        }
        else {
            dim = arg0;
            this._min = new ndarray_1.NDArray({ shape: [dim] });
            this._min.fill(Infinity);
        }
        if (arg1 && (Array.isArray(arg1) || ArrayBuffer.isView(arg1))) {
            this._max = new ndarray_1.NDArray(arg1);
        }
        else {
            this._max = new ndarray_1.NDArray({ shape: [dim] });
            this._max.fill(-Infinity);
        }
    }
    Object.defineProperty(AABB.prototype, "min", {
        get: function () {
            return this._min;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AABB.prototype, "max", {
        get: function () {
            return this._max;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Update this AABB to include given coordinate
     */
    AABB.prototype.update = function (coord) {
        if (coord instanceof ndarray_1.NDArray) {
            for (var i = 0; i < this._min.length; i++) {
                this._min.set(i, Math.min(this._min.get(i), coord.get(i)));
            }
            for (var i = 0; i < this._max.length; i++) {
                this._max.set(i, Math.max(this._max.get(i), coord.get(i)));
            }
        }
        else {
            for (var i = 0; i < this._min.length; i++) {
                this._min.set(i, Math.min(this._min.get(i), coord[i]));
            }
            for (var i = 0; i < this._max.length; i++) {
                this._max.set(i, Math.max(this._max.get(i), coord[i]));
            }
        }
    };
    AABB.prototype.merge = function (other) {
        for (var i = 0; i < this.min.length; i++) {
            this.min.set(i, Math.min(this.min.get(i), other.min.get(i)));
        }
        for (var i = 0; i < this.max.length; i++) {
            this.max.set(i, Math.max(this.max.get(i), other.max.get(i)));
        }
    };
    return AABB;
}());
exports.AABB = AABB;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const bcurve_1 = __webpack_require__(6);
exports.BezierCurve = bcurve_1.BezierCurve;
exports.BSplineCurve = bcurve_1.BSplineCurve;
const curve_1 = __webpack_require__(7);
exports.LineSegment = curve_1.LineSegment;
exports.CircleArc = curve_1.CircleArc;
exports.Circle = curve_1.Circle;
const bsurf_1 = __webpack_require__(8);
exports.BezierSurface = bsurf_1.BezierSurface;
exports.BSplineSurface = bsurf_1.BSplineSurface;
const surf_1 = __webpack_require__(13);
exports.BilinearSurface = surf_1.BilinearSurface;
exports.GeneralCylinder = surf_1.GeneralCylinder;
exports.RevolutionSurface = surf_1.RevolutionSurface;
exports.RuledSurface = surf_1.RuledSurface;
exports.Cylinder = surf_1.Cylinder;
exports.Sphere = surf_1.Sphere;
exports.Cone = surf_1.Cone;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*

Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

This file is part of bluemath.

bluemath is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

bluemath is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/
Object.defineProperty(exports, "__esModule", { value: true });
const bsurf_1 = __webpack_require__(8);
const curve_1 = __webpack_require__(7);
const common_1 = __webpack_require__(0);
class BilinearSurface extends bsurf_1.BSplineSurface {
    constructor(p00, p01, p10, p11) {
        super(1, 1, common_1.arr([0, 0, 1, 1]), common_1.arr([0, 0, 1, 1]), common_1.arr([[p00, p01], [p10, p11]]));
    }
}
exports.BilinearSurface = BilinearSurface;
class GeneralCylinder extends bsurf_1.BSplineSurface {
    constructor(curve, direction, height) {
        let dir = direction instanceof common_1.NDArray ? direction : common_1.arr(direction);
        let cpoints0 = curve.cpoints.toArray();
        let cpoints1 = cpoints0.map((cpoint) => {
            let cp1 = common_1.add(common_1.arr(cpoint), common_1.mul(dir, height));
            return cp1.toArray();
        });
        let cpoints = [];
        let weights = [];
        for (let i = 0; i < cpoints0.length; i++) {
            cpoints.push([cpoints0[i], cpoints1[i]]);
            if (curve.weights) {
                weights.push([curve.weights.getN(i), curve.weights.getN(i)]);
            }
        }
        super(curve.degree, 1, curve.knots, common_1.arr([0, 0, 1, 1]), cpoints, curve.weights ? common_1.arr(weights) : undefined);
    }
}
exports.GeneralCylinder = GeneralCylinder;
class Cylinder extends GeneralCylinder {
    constructor(coordsys, radius, height) {
        let circle = new curve_1.Circle(coordsys, radius);
        super(circle, coordsys.z, height);
    }
}
exports.Cylinder = Cylinder;
class RuledSurface extends bsurf_1.BSplineSurface {
}
exports.RuledSurface = RuledSurface;
class RevolutionSurface extends bsurf_1.BSplineSurface {
}
exports.RevolutionSurface = RevolutionSurface;
class Cone extends RevolutionSurface {
}
exports.Cone = Cone;
class Sphere extends RevolutionSurface {
}
exports.Sphere = Sphere;
class Torus extends RevolutionSurface {
}
exports.Torus = Torus;


/***/ })
/******/ ]);
//# sourceMappingURL=bluemath-geom-test.js.map