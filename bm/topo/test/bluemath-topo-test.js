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
class IDManager {
    static init() {
        let labels = ['B', 'V', 'E', 'F', 'L', 'HE'];
        IDManager.idmap = {};
        for (let label of labels) {
            IDManager.idmap[label] = -1;
        }
    }
    static genId(label) {
        console.assert(IDManager.idmap[label] !== undefined);
        IDManager.idmap[label] += 1;
        return IDManager.idmap[label];
    }
}
exports.IDManager = IDManager;


/***/ }),
/* 1 */
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
const idman_1 = __webpack_require__(0);
class HalfEdge {
    constructor(origin, pair, next, loop) {
        this.vertex = origin;
        this.prev = pair;
        this.next = next;
        this.loop = loop;
        this.id = 'HE' + idman_1.IDManager.genId('HE');
    }
    mate() {
        console.assert(this.edge);
        if (this.edge.hePlus === this) {
            console.assert(this.edge.heMinus);
            return this.edge.heMinus;
        }
        else {
            console.assert(this.edge.hePlus);
            return this.edge.hePlus;
        }
    }
    unlink() {
    }
    isSolitary() {
        return !this.edge;
    }
    prevInLoop() {
        let cursor = this.next;
        console.assert(cursor);
        while (cursor.next !== this) {
            cursor = cursor.next;
        }
        return cursor;
    }
    static walk(heStart, callback) {
        let cursor = heStart;
        let count = 0;
        do {
            callback(cursor, count);
            console.assert(cursor.next);
            cursor = cursor.next;
            count++;
        } while (cursor !== heStart);
    }
}
exports.HalfEdge = HalfEdge;


/***/ }),
/* 2 */
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
var constants_1 = __webpack_require__(2);
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
var constants_1 = __webpack_require__(2);
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
var NDArray = (function () {
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
var Vec2 = (function (_super) {
    __extends(Vec2, _super);
    function Vec2(x, y) {
        return _super.call(this, [x, y]) || this;
    }
    return Vec2;
}(NDArray));
exports.Vec2 = Vec2;
var Vec3 = (function (_super) {
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
var constants_1 = __webpack_require__(2);
var ops_1 = __webpack_require__(3);
var Complex = (function () {
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
const idman_1 = __webpack_require__(0);
class Vertex {
    constructor(coord, halfedge) {
        this.coord = coord;
        this.halfedge = halfedge;
        this.id = 'V' + idman_1.IDManager.genId('V');
    }
    walk(heStart, callback) {
        console.assert(heStart.vertex === this);
        let count = 0;
        let heCursor = heStart;
        do {
            callback(heCursor, count);
            console.assert(heCursor.mate().next);
            heCursor = heCursor.mate().next;
            count++;
        } while (heCursor !== heStart);
    }
    degree() {
        let he = this.halfedge;
        console.assert(he);
        if (he.isSolitary()) {
            return 0;
        }
        let i = 0;
        do {
            i++;
            he = he.mate().next;
        } while (he !== this.halfedge);
        return i;
    }
    unlink() {
        this.halfedge = undefined;
    }
}
exports.Vertex = Vertex;


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
const idman_1 = __webpack_require__(0);
class Edge {
    constructor() {
        this.id = 'E' + idman_1.IDManager.genId('E');
    }
    startVertex() {
        console.assert(this.hePlus);
        console.assert(this.hePlus.vertex);
        return this.hePlus.vertex;
    }
    endVertex() {
        console.assert(this.heMinus);
        console.assert(this.heMinus.vertex);
        return this.heMinus.vertex;
    }
    unlink() {
    }
}
exports.Edge = Edge;


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
const idman_1 = __webpack_require__(0);
class Face {
    constructor(body) {
        this.body = body;
        this.iloops = [];
        this.id = 'F' + idman_1.IDManager.genId('F');
    }
    addLoop(loop) {
        this.iloops.push(loop);
    }
    removeLoop(loop) {
        let idx = this.iloops.indexOf(loop);
        console.assert(idx >= 0);
        this.iloops.splice(idx, 1);
    }
    setOuterloop(loop) {
        this.oloop = loop;
    }
    unlink() {
    }
    findHalfEdge(vtxFrom, vtxTo) {
        for (let i = 0; i < this.iloops.length; i++) {
            let loop = this.iloops[i];
            let he = loop.halfedge;
            console.assert(he);
            do {
                if (he.vertex === vtxFrom) {
                    if (vtxTo) {
                        console.assert(he.next);
                        if (he.next.vertex === vtxTo) {
                            return he;
                        }
                    }
                    else {
                        return he;
                    }
                }
                he = he.next;
            } while (he !== loop.halfedge);
        }
        return undefined;
    }
}
exports.Face = Face;


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
const eulerops_1 = __webpack_require__(10);
window.onload = () => {
    let qunitDiv = document.createElement('div');
    qunitDiv.setAttribute('id', 'qunit');
    document.body.appendChild(qunitDiv);
    let qunitFixtureDiv = document.createElement('div');
    qunitFixtureDiv.setAttribute('id', 'qunit-fixture');
    document.body.appendChild(qunitFixtureDiv);
    eulerops_1.default();
};


/***/ }),
/* 10 */
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
const topo = __webpack_require__(11);
const common_1 = __webpack_require__(15);
function testEulerOps() {
    let p0 = common_1.arr([100, 100]);
    let p1 = common_1.arr([200, 100]);
    let p2 = common_1.arr([200, 200]);
    let p3 = common_1.arr([100, 200]);
    let p4 = common_1.arr([0, 0]);
    let p5 = common_1.arr([300, 0]);
    let p6 = common_1.arr([300, 300]);
    let p7 = common_1.arr([0, 300]);
    QUnit.module('Euler Ops', () => {
        QUnit.test('MVFS-KVFS', assert => {
            topo.IDManager.init();
            let result = topo.EulerOps.MVFS(p0);
            assert.ok(result.body !== null);
            assert.equal(result.body.faces.length, 1);
            assert.equal(result.body.vertices.length, 1);
            assert.equal(result.body.halfedges.length, 1);
            assert.equal(result.body.edges.length, 0);
            assert.equal(result.vertex.degree(), 0);
            assert.equal(result.face.iloops.length, 1);
            topo.EulerOps.KVFS(result.body);
        });
        /*
          v0  -- e0 --  v1
        */
        QUnit.module('MEV-KEV', () => {
            QUnit.test('1', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p0);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 1);
                assert.equal(f0.iloops[0].length, 2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
              v0  -- e0 --  v1
                            |
                            |
                            e1
                            |
                            |
                            v2
            */
            QUnit.test('2', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 1);
                assert.equal(f0.iloops[0].length, 4);
                topo.EulerOps.KEV(e1, v2);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 1);
                assert.equal(f0.iloops[0].length, 2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
              v0  -- e0 -- v1
                        /   |
                      /     |
                   e2      e1
                  /         |
                /           |
              v3           v2
            */
            QUnit.test('3 branch', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v1, p3);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 3);
                assert.equal(v2.degree(), 1);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                topo.EulerOps.KEV(e2, v3);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 1);
                assert.equal(f0.iloops[0].length, 4);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
        });
        QUnit.module('MEF-KEF', () => {
            /*
              v0  -- e0 --  v1
                \           |
                  \         |
                    e2      e1
                       \    |
                         \  |
                            v2
            */
            QUnit.test('3-Edge face', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { edge: e2, face: f1 } = topo.EulerOps.MEF(f0, v2, v1, v0, v1);
                assert.equal(v0.degree(), 2);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(f0.iloops[0].length, 3);
                assert.equal(f1.iloops[0].length, 3);
                topo.EulerOps.KEF(e2, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 1);
                assert.equal(f0.iloops[0].length, 4);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
              v0  -- e0 --  v1
                \           |
                  \         |
                    e2      e1
                       \    |
                         \  |
                            v2
            */
            QUnit.test('3-Edge face (shorthand)', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { edge: e2, face: f1 } = topo.EulerOps.MEF(f0, v2, undefined, v0, undefined);
                assert.equal(v0.degree(), 2);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(f0.iloops[0].length, 3);
                assert.equal(f1.iloops[0].length, 3);
                topo.EulerOps.KEF(e2, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 1);
                assert.equal(f0.iloops[0].length, 4);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
              v0  -- e0 --  v1
              |             |
              |             |
              e3            e1
              |             |
              |             |
              v3  -- e2 --  v2
            */
            QUnit.test('Rectangular face', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                let { edge: e3, face: f1 } = topo.EulerOps.MEF(f0, v0, v1, v3, v2);
                assert.equal(v0.degree(), 2);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(f0.iloops[0].length, 4);
                assert.equal(f1.iloops[0].length, 4);
                topo.EulerOps.KEF(e3, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
              v0  -- e0 --  v1
                          / |
                        /   |
                    e3      e1
                  /         |
                /           |
              v3  -- e2 --  v2
            */
            QUnit.test('Topo 4V4E2F', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                let { edge: e3, face: f1 } = topo.EulerOps.MEF(f0, v1, v2, v3, v2);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 3);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(f0.iloops[0].length, 3);
                assert.equal(f1.iloops[0].length, 5);
                topo.EulerOps.KEF(e3, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
              v0  -- e0 --  v1
                          / |
                        /   |
                    e3      e1
                  /         |
                /           |
              v3  -- e2 --  v2
            */
            QUnit.test('Topo 4V4E2F otherdir', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                let { edge: e3, face: f1 } = topo.EulerOps.MEF(f0, v3, v2, v1, v2);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 3);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(f0.iloops[0].length, 3);
                assert.equal(f1.iloops[0].length, 5);
                topo.EulerOps.KEF(e3, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 1);
                assert.equal(f0.iloops[0].length, 6);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
             v4
      
                \       v0  -- e0 --  v1
                 \                  / |
                  e3              /   |
                    \         e4      e1
                     \      /         |
                          /           |
                        v3  -- e2 --  v2
            */
            QUnit.test('Topo 5V5E2F', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                let { vertex: v4, edge: e3 } = topo.EulerOps.MEV(f0, v3, p4);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 1);
                assert.equal(f0.iloops[0].length, 8);
                let { edge: e4, face: f1 } = topo.EulerOps.MEF(f0, v1, v2, v3, v2);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 3);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 3);
                assert.equal(v4.degree(), 1);
                assert.equal(f0.iloops[0].length, 3);
                assert.equal(f1.iloops[0].length, 7);
                topo.EulerOps.KEF(e4, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 1);
                assert.equal(f0.iloops[0].length, 8);
                topo.EulerOps.KEV(e3, v4);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
             v4
      
                \       v0  -- e0 --  v1
                 \                  / |
                  e3              /   |
                    \         e4      e1
                     \      /         |
                          /           |
                        v3  -- e2 --  v2
            */
            QUnit.test('Topo 5V5E2F otherdir', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                let { vertex: v4, edge: e3 } = topo.EulerOps.MEV(f0, v3, p4);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 1);
                assert.equal(f0.iloops[0].length, 8);
                let { edge: e4, face: f1 } = topo.EulerOps.MEF(f0, v3, v2, v1, v2);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 3);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 3);
                assert.equal(v4.degree(), 1);
                assert.equal(f0.iloops[0].length, 3);
                assert.equal(f1.iloops[0].length, 7);
                topo.EulerOps.KEF(e4, f1);
                assert.equal(v0.degree(), 1);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 1);
                assert.equal(f0.iloops[0].length, 8);
                topo.EulerOps.KEV(e3, v4);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
            /*
             v4             -- e5 --              v5
                \
                  \
                    e4
                      \
                        \
                        v0  -- e0 --  v1
             |          |             |            |
             |          |             |            |
             e8         e3            e1           e6
             |          |             |            |
             |          |             |            |
                        v3  -- e2 --  v2
      
      
      
             v7             -- e7 --               v6
             
            */
            QUnit.test('Topo 8V8E3F', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                let { edge: e3, face: f1 } = topo.EulerOps.MEF(f0, v0, v1, v3, v2);
                let { vertex: v4, edge: e4 } = topo.EulerOps.MEV(f1, v0, p4);
                assert.equal(v0.degree(), 3);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 1);
                let { vertex: v5, edge: e5 } = topo.EulerOps.MEV(f1, v4, p5);
                let { vertex: v6, edge: e6 } = topo.EulerOps.MEV(f1, v5, p6);
                let { vertex: v7, edge: e7 } = topo.EulerOps.MEV(f1, v6, p7);
                assert.equal(v0.degree(), 3);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 2);
                assert.equal(v5.degree(), 2);
                assert.equal(v6.degree(), 2);
                assert.equal(v7.degree(), 1);
                let { edge: e8, face: f2 } = topo.EulerOps.MEF(f1, v7, v6, v4, v5);
                assert.equal(v0.degree(), 3);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 3);
                assert.equal(v5.degree(), 2);
                assert.equal(v6.degree(), 2);
                assert.equal(v7.degree(), 2);
                topo.EulerOps.KEF(e8, f2);
                assert.equal(v0.degree(), 3);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 2);
                assert.equal(v5.degree(), 2);
                assert.equal(v6.degree(), 2);
                assert.equal(v7.degree(), 1);
                topo.EulerOps.KEV(e7, v7);
                topo.EulerOps.KEV(e6, v6);
                topo.EulerOps.KEV(e5, v5);
                topo.EulerOps.KEV(e4, v4);
                topo.EulerOps.KEF(e3, f1);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
            });
        });
        QUnit.module('MEKR-KEMR', () => {
            /*
             v4             -- e5 --              v5
                
                  
                                          
                                          
                                        
                        v0  -- e0 --  v1
             |          |             |            |
             |          |             |            |
             e8         e3            e1           e6
             |          |             |            |
             |          |             |            |
                        v3  -- e2 --  v2
      
      
      
             v7             -- e7 --               v6
             
            */
            QUnit.test('Topo 8V8E3F', assert => {
                topo.IDManager.init();
                let { vertex: v0, face: f0, body } = topo.EulerOps.MVFS(p0);
                let { vertex: v1, edge: e0 } = topo.EulerOps.MEV(f0, v0, p1);
                let { vertex: v2, edge: e1 } = topo.EulerOps.MEV(f0, v1, p2);
                let { vertex: v3, edge: e2 } = topo.EulerOps.MEV(f0, v2, p3);
                let { edge: e3, face: f1 } = topo.EulerOps.MEF(f0, v0, v1, v3, v2);
                let { vertex: v4 } = topo.EulerOps.MEV(f1, v0, p4);
                let { vertex: v5, edge: e5 } = topo.EulerOps.MEV(f1, v4, p5);
                let { vertex: v6, edge: e6 } = topo.EulerOps.MEV(f1, v5, p6);
                let { vertex: v7, edge: e7 } = topo.EulerOps.MEV(f1, v6, p7);
                let { edge: e8, face: f2 } = topo.EulerOps.MEF(f1, v7, v6, v4, v5);
                assert.equal(f2.iloops.length, 1);
                assert.equal(f2.iloops[0].length, 10);
                assert.equal(v0.degree(), 3);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 3);
                assert.equal(v5.degree(), 2);
                assert.equal(v6.degree(), 2);
                assert.equal(v7.degree(), 2);
                topo.EulerOps.KEMR(f2, v0, v4);
                assert.equal(f2.iloops.length, 2);
                assert.equal(f2.iloops[0].length, 4);
                assert.equal(f2.iloops[1].length, 4);
                assert.equal(v0.degree(), 2);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 2);
                assert.equal(v5.degree(), 2);
                assert.equal(v6.degree(), 2);
                assert.equal(v7.degree(), 2);
                let oldEdge = topo.EulerOps.MEKR(f2, v3, v0, f2, v4, v7);
                assert.equal(f2.iloops.length, 1);
                assert.equal(f2.iloops[0].length, 10);
                assert.equal(v0.degree(), 3);
                assert.equal(v1.degree(), 2);
                assert.equal(v2.degree(), 2);
                assert.equal(v3.degree(), 2);
                assert.equal(v4.degree(), 3);
                assert.equal(v5.degree(), 2);
                assert.equal(v6.degree(), 2);
                assert.equal(v7.degree(), 2);
                topo.EulerOps.KEF(e8, f2);
                topo.EulerOps.KEV(e7, v7);
                topo.EulerOps.KEV(e6, v6);
                topo.EulerOps.KEV(e5, v5);
                topo.EulerOps.KEV(oldEdge, v4);
                topo.EulerOps.KEF(e3, f1);
                topo.EulerOps.KEV(e2, v3);
                topo.EulerOps.KEV(e1, v2);
                topo.EulerOps.KEV(e0, v1);
                topo.EulerOps.KVFS(body);
                assert.ok(true);
            });
        });
    });
}
exports.default = testEulerOps;


/***/ }),
/* 11 */
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
const vertex_1 = __webpack_require__(6);
exports.Vertex = vertex_1.Vertex;
const edge_1 = __webpack_require__(7);
exports.Edge = edge_1.Edge;
const face_1 = __webpack_require__(8);
exports.Face = face_1.Face;
const halfedge_1 = __webpack_require__(1);
exports.HalfEdge = halfedge_1.HalfEdge;
const eulerops_1 = __webpack_require__(12);
exports.EulerOps = eulerops_1.EulerOps;
const idman_1 = __webpack_require__(0);
exports.IDManager = idman_1.IDManager;


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
const halfedge_1 = __webpack_require__(1);
const body_1 = __webpack_require__(13);
const loop_1 = __webpack_require__(14);
class EulerOps {
    /**
     * Make Vertex Face Solid
     * (Solid = Body in this library)
     */
    static MVFS(coord) {
        let body = new body_1.Body();
        let vertex = body.newVertex(coord);
        let face = body.newFace();
        let loop = new loop_1.Loop(face);
        face.addLoop(loop);
        let he = body.newHalfEdge();
        he.next = he;
        he.prev = he;
        he.loop = loop;
        he.vertex = vertex;
        loop.halfedge = he;
        vertex.halfedge = he;
        return { body, vertex, face };
    }
    /**
     * Kill Vertex Face Solid
     * (Solid = Body in this library)
     */
    static KVFS(body) {
        body.unlink();
    }
    /**
     * Low level MEV (Make Edge Vertex)
     */
    static LMEV(he0, he1, coord) {
        console.assert(he0.loop);
        let body = he0.loop.face.body;
        let vertex = body.newVertex(coord);
        let edge = body.newEdge();
        if (he0 === he1) {
            let he2 = body.newHalfEdge();
            he2.loop = he0.loop;
            he2.vertex = vertex;
            he0.loop.insertHalfEdgeAfter(he2, he0);
            vertex.halfedge = he2;
            edge.hePlus = he0;
            edge.heMinus = he2;
            he0.edge = edge;
            he2.edge = edge;
        }
        else {
            let he2 = body.newHalfEdge();
            let he3 = body.newHalfEdge();
            he2.loop = he0.loop;
            he3.loop = he0.loop;
            he2.vertex = he0.vertex;
            he3.vertex = vertex;
            he0.loop.insertHalfEdgeAfter(he2, he1);
            he0.loop.insertHalfEdgeAfter(he3, he2);
            vertex.halfedge = he3;
            edge.hePlus = he3;
            edge.heMinus = he2;
            he3.edge = edge;
            he2.edge = edge;
        }
        return { vertex, edge };
    }
    /**
     * Make Edge Vertex
     */
    static MEV(face, vertex, coord) {
        let he0 = face.findHalfEdge(vertex);
        console.assert(he0);
        let he1 = he0.isSolitary() ? he0 : he0.prevInLoop();
        console.assert(he1);
        return EulerOps.LMEV(he0, he1, coord);
    }
    /**
     * Kill Edge Vertex
     */
    static KEV(edge, vertex) {
        console.assert(edge.hePlus);
        let loop = edge.hePlus.loop;
        console.assert(loop);
        let face = loop.face;
        console.assert(face);
        let body = face.body;
        console.assert(edge.hePlus);
        console.assert(edge.heMinus);
        if (edge.hePlus.next === edge.heMinus) {
            // KEV should remove only the MINUS halfedge
            // The PLUS halfedge will remain behind as solitary
            // - Remove MINUS halfedge
            let heToRemove = edge.heMinus;
            let heToSurvive = edge.hePlus;
            heToRemove.next = undefined; // TODO - can this be done in unlink of HE?
            heToRemove.prev = undefined;
            heToRemove.edge = undefined;
            heToRemove.loop = undefined;
            heToRemove.vertex = undefined;
            // - Make PLUS solitary halfedge
            edge.hePlus.next = edge.hePlus;
            edge.hePlus.prev = edge.hePlus;
            edge.hePlus.edge = undefined;
            if (loop.halfedge === heToRemove) {
                loop.halfedge = heToSurvive;
            }
            edge.unlink();
            body.removeEdge(edge);
            vertex.unlink();
            body.removeVertex(vertex);
            body.removeHalfEdge(heToRemove);
        }
        else {
            // KEV should remove both of its halfedges
            if (loop.halfedge === edge.hePlus) {
                loop.halfedge = edge.hePlus.next;
            }
            loop.removeHalfEdge(edge.hePlus);
            if (loop.halfedge === edge.heMinus) {
                loop.halfedge = edge.heMinus.next;
            }
            loop.removeHalfEdge(edge.heMinus);
            edge.hePlus.unlink();
            edge.heMinus.unlink();
            body.removeHalfEdge(edge.heMinus);
            body.removeHalfEdge(edge.hePlus);
            edge.unlink();
            vertex.unlink();
            body.removeEdge(edge);
            body.removeVertex(vertex);
        }
    }
    /**
     * Make Edge Face
     */
    static MEF(face, fromHEV0, fromHEV1, toHEV0, toHEV1) {
        let heFrom = face.findHalfEdge(fromHEV0, fromHEV1);
        let heTo = face.findHalfEdge(toHEV0, toHEV1);
        console.assert(heFrom);
        console.assert(heTo);
        let vFrom = fromHEV0;
        let vTo = toHEV0;
        let body = face.body;
        // heFrom and heTo are halfedges emanating from the vertices between which
        // we want to place the new edge. These vertices will be vFrom, vTo resp.
        let newEdge = body.newEdge();
        let newFace = body.newFace();
        let newLoop = new loop_1.Loop(newFace);
        newFace.addLoop(newLoop);
        let hePlus = body.newHalfEdge();
        let heMinus = body.newHalfEdge();
        newEdge.hePlus = hePlus;
        newEdge.heMinus = heMinus;
        hePlus.edge = heMinus.edge = newEdge;
        hePlus.vertex = vFrom;
        heMinus.vertex = vTo;
        // TODO : is this criteria of oldLoop always correct?
        console.assert(vFrom.halfedge);
        let oldLoop = vFrom.halfedge.loop;
        console.assert(oldLoop);
        // Conventions
        // -----------
        // hePlus goes from vFrom to vTo
        // heMinus goes from vTo to vFrom
        // hePlus will be part of the new loop
        // heMinus will be part of the old loop
        // hePlus->mNext = heTo; // ?
        // heFrom->mate()->mNext = hePlus;
        // heMinus->mNext = heFrom; // ?
        // heTo->mate()->mNext = heMinus;
        // How to assign next pointers of hePlus and heMinus to place them in 
        // newLoop and oldLoop resp.
        //
        // First we will fit heMinus in oldLoop. We start walking the oldLoop.
        // A walk will visit each vertex twice (right?)
        // We walk until we visit vTo. At vTo, we remember the halfEdge reaching
        // to vTo along oldLoop (heMinusPrev).
        // We continue to walk. If we visit vTo again, before visiting vFrom we
        // update the heMinusPrev to the halfedge that brought us to vTo this time.
        // We continue the walk until we visit vFrom.
        // We call the halfedge leaving vFrom along oldLoop heMinusNext.
        //
        // In summary, we are walking the oldloop and find two nearest halfedges
        // in that loop between which we can fit heMinus.
        // Now we assign hePrev->next = heMinus and heMinus->next = heNext
        //
        // Later we are going to short-circuit the old loop between these two
        // half edges.
        let heCursor = oldLoop.halfedge;
        console.assert(heCursor);
        let heMinusPrev = null;
        let heMinusNext = null;
        do {
            if (!heMinusNext) {
                console.assert(heCursor.next);
                if (heCursor.next.vertex === vTo) {
                    heMinusPrev = heCursor;
                }
            }
            if (heMinusPrev) {
                if (heCursor.vertex === vFrom) {
                    heMinusNext = heCursor;
                    break;
                }
            }
            heCursor = heCursor.next;
            console.assert(heCursor);
        } while (heCursor !== hePlus);
        console.assert(heMinusNext);
        console.assert(heMinusPrev);
        let shortCircuitFrom = heMinusNext.prev;
        let shortCircuitTo = undefined; // = heMinusPrev.mate()
        let refHE = heMinusPrev.mate();
        console.assert(refHE.vertex);
        refHE.vertex.walk(refHE, he => {
            if (he.loop === oldLoop) {
                shortCircuitTo = he;
            }
        });
        console.assert(shortCircuitFrom);
        console.assert(shortCircuitTo);
        heMinus.next = heMinusNext;
        heMinusNext.prev = heMinus;
        heMinusPrev.next = heMinus;
        heMinus.prev = heMinusPrev;
        // Short circuit the old loop between two halfedges between which we
        // are inserting the new edge (and its new loop and face)
        shortCircuitFrom.next = hePlus;
        shortCircuitTo.prev = hePlus;
        // As for hePlus's prev and next halfedges, we call derive them from
        // heFrom and heTo as follows
        // hePlus.next = heTo;
        // heFrom.mate().next = hePlus;
        // hePlus.prev = heFrom.mate();
        // heTo.prev = hePlus;
        hePlus.next = shortCircuitTo;
        hePlus.prev = shortCircuitFrom;
        heMinus.loop = newLoop;
        hePlus.loop = oldLoop;
        // Start traversing half-edges from heMinus and assign them to newLoop
        let hePtr = heMinus;
        do {
            hePtr.loop = newLoop;
            hePtr = hePtr.next;
            console.assert(hePtr);
        } while (hePtr !== heMinus);
        newLoop.halfedge = heMinus;
        oldLoop.halfedge = hePlus;
        return { edge: newEdge, face: newFace };
    }
    /**
     * Kill Edge Face
     */
    static KEF(edge, face) {
        console.assert(face.iloops.length === 1);
        let loopToKill = face.iloops[0];
        console.assert(loopToKill);
        let loopToSurvive;
        console.assert(edge.hePlus && edge.heMinus);
        if (edge.hePlus.loop === loopToKill) {
            loopToSurvive = edge.heMinus.loop;
        }
        else {
            loopToSurvive = edge.hePlus.loop;
        }
        console.assert(loopToSurvive);
        console.assert(loopToSurvive.halfedge);
        loopToSurvive.halfedge = loopToSurvive.halfedge.next;
        console.assert(loopToKill.halfedge);
        halfedge_1.HalfEdge.walk(loopToKill.halfedge, he => {
            he.loop = loopToSurvive;
        });
        console.assert(edge.hePlus.prev && edge.heMinus.prev &&
            edge.hePlus.next && edge.heMinus.next);
        edge.hePlus.prev.next = edge.heMinus.next;
        edge.heMinus.prev.next = edge.hePlus.next;
        edge.hePlus.next.prev = edge.heMinus.prev;
        edge.heMinus.next.prev = edge.hePlus.prev;
        edge.hePlus.unlink();
        edge.heMinus.unlink();
        edge.hePlus.next = undefined;
        edge.hePlus.prev = undefined;
        edge.heMinus.next = undefined;
        edge.heMinus.prev = undefined;
        let body = face.body;
        body.removeHalfEdge(edge.hePlus);
        body.removeHalfEdge(edge.heMinus);
        edge.unlink();
        body.removeEdge(edge);
        body.removeFace(face);
        face.unlink();
    }
    /**
     * Kill Edge Make Ring
     * (Ring = Loop in this library)
     */
    static KEMR(face, v1, v2) {
        let hePos = face.findHalfEdge(v1, v2);
        console.assert(hePos);
        let heNeg = hePos.mate();
        let edgeToKill = hePos.edge;
        console.assert(edgeToKill);
        let oldLoop = hePos.loop;
        console.assert(oldLoop);
        let heNextInNewLoop = hePos.next;
        let hePrevInOldLoop = hePos.prevInLoop();
        let heNextInOldLoop = hePos.mate().next;
        let hePrevInNewLoop = hePos.mate().prevInLoop();
        console.assert(heNextInNewLoop);
        console.assert(hePrevInNewLoop);
        console.assert(heNextInOldLoop);
        console.assert(hePrevInOldLoop);
        hePrevInNewLoop.next = heNextInNewLoop;
        hePrevInOldLoop.next = heNextInOldLoop;
        heNextInNewLoop.prev = hePrevInNewLoop;
        heNextInOldLoop.prev = hePrevInOldLoop;
        let ring = new loop_1.Loop(face);
        face.addLoop(ring);
        // Old loop becomes the outer loop of face (needs reconsideration later)
        face.setOuterloop(oldLoop);
        let heCursor = hePos.next;
        do {
            heCursor.loop = ring;
            heCursor = heCursor.next;
        } while (heCursor !== hePos.next);
        ring.halfedge = hePos.next;
        console.assert(hePos.vertex);
        if (hePos.vertex.halfedge === hePos) {
            hePos.vertex.halfedge = hePrevInOldLoop.mate();
        }
        console.assert(heNeg.vertex);
        if (heNeg.vertex.halfedge == heNeg) {
            heNeg.vertex.halfedge = heNextInNewLoop;
        }
        oldLoop.halfedge = hePrevInOldLoop;
        hePos.next = undefined;
        hePos.prev = undefined;
        heNeg.next = undefined;
        hePos.prev = undefined;
        heNeg.unlink();
        hePos.unlink();
        edgeToKill.unlink();
        face.body.removeEdge(edgeToKill);
        face.body.removeHalfEdge(hePos);
        face.body.removeHalfEdge(heNeg);
        return ring;
    }
    /**
     * Make Edge Kill Ring
     * (Ring = Loop in this library)
     */
    static MEKR(faceFrom, fromHEV0, fromHEV1, faceTo, toHEV0, toHEV1) {
        let heFrom = faceFrom.findHalfEdge(fromHEV0, fromHEV1);
        let heTo = faceTo.findHalfEdge(toHEV0, toHEV1);
        let body = faceFrom.body;
        console.assert(heFrom);
        console.assert(heTo);
        let heFromNextInOuterLoop = heFrom.next;
        console.assert(heFromNextInOuterLoop);
        let heToPrevInRing = heTo.prevInLoop();
        console.assert(heToPrevInRing);
        let outerLoop = heFrom.loop;
        let ringToKill = heTo.loop;
        console.assert(ringToKill);
        let heCursor = heTo;
        do {
            heCursor.loop = outerLoop;
            heCursor = heCursor.next;
            console.assert(heCursor);
        } while (heCursor !== heTo);
        let hePos = body.newHalfEdge();
        let heNeg = body.newHalfEdge();
        let edge = body.newEdge();
        edge.hePlus = hePos;
        edge.heMinus = heNeg;
        hePos.edge = edge;
        heNeg.edge = edge;
        heFrom.next = heNeg;
        heNeg.next = heTo;
        heToPrevInRing.next = hePos;
        hePos.next = heFromNextInOuterLoop;
        heNeg.prev = heFrom;
        heTo.prev = heNeg;
        hePos.prev = heToPrevInRing;
        heFromNextInOuterLoop.prev = hePos;
        hePos.loop = outerLoop;
        heNeg.loop = outerLoop;
        hePos.vertex = toHEV0;
        heNeg.vertex = fromHEV1;
        ringToKill.face.removeLoop(ringToKill);
        ringToKill.unlink();
        return edge;
    }
}
exports.EulerOps = EulerOps;


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
const vertex_1 = __webpack_require__(6);
const edge_1 = __webpack_require__(7);
const halfedge_1 = __webpack_require__(1);
const face_1 = __webpack_require__(8);
const idman_1 = __webpack_require__(0);
class Body {
    constructor() {
        this.vertices = [];
        this.halfedges = [];
        this.edges = [];
        this.faces = [];
        this.id = 'B' + idman_1.IDManager.genId('B');
    }
    newFace() {
        let face = new face_1.Face(this);
        this.faces.push(face);
        return face;
    }
    newVertex(coord) {
        let vertex = new vertex_1.Vertex(coord);
        this.vertices.push(vertex);
        return vertex;
    }
    newHalfEdge() {
        let he = new halfedge_1.HalfEdge();
        this.halfedges.push(he);
        return he;
    }
    newEdge() {
        let e = new edge_1.Edge();
        this.edges.push(e);
        return e;
    }
    removeEdge(edge) {
        let idx = this.edges.indexOf(edge);
        console.assert(idx >= 0);
        this.edges.splice(idx, 1);
    }
    removeVertex(vertex) {
        let idx = this.vertices.indexOf(vertex);
        console.assert(idx >= 0);
        this.vertices.splice(idx, 1);
    }
    removeHalfEdge(halfEdge) {
        let idx = this.halfedges.indexOf(halfEdge);
        console.assert(idx >= 0);
        this.halfedges.splice(idx, 1);
    }
    removeFace(face) {
        let idx = this.faces.indexOf(face);
        console.assert(idx >= 0);
        this.faces.splice(idx, 1);
    }
    unlink() {
        this.faces.forEach(f => f.unlink());
        this.vertices.forEach(v => v.unlink());
        this.edges.forEach(e => e.unlink());
        this.halfedges.forEach(he => he.unlink());
        this.faces.splice(0);
        this.vertices.splice(0);
        this.edges.splice(0);
        this.halfedges.splice(0);
    }
    toDOT() {
        let s = '';
        s += 'digraph Body {\n';
        s += '  ranksep=.5;ratio=compress;\n';
        s += '  {\n';
        s += '    node[shape=plaintext];\n';
        s += '    Faces->Loops->Vertices;\n';
        s += '  }\n';
        s += '  {\n';
        s += '    rank=same; Vertices;';
        for (let vertex of this.vertices) {
            s += vertex.id + ';';
        }
        s += '  }\n';
        // s += '  {\n';
        // s += '    rank=same; Edges;';
        // for(let edge of this.edges) {
        //   s += edge.id+';';
        // }
        // s += '  }\n';
        let lps = '{ rank=same; Loops;';
        s += '  {\n';
        s += '    rank=same; Faces;';
        for (let face of this.faces) {
            s += face.id + ';';
            for (let loop of face.iloops) {
                lps += loop.id + ';';
            }
            if (face.oloop) {
                lps += face.oloop.id + ';';
            }
        }
        s += '\n';
        s += '  }\n';
        lps += ' }';
        s += lps + '\n';
        for (let vertex of this.vertices) {
            console.assert(vertex.halfedge);
            s += vertex.id + '->' + vertex.halfedge.id + ';';
        }
        for (let face of this.faces) {
            for (let loop of face.iloops) {
                s += face.id + '->' + loop.id + ';';
            }
            if (face.oloop) {
                s += face.id + '->' + face.oloop.id + '[label=OL];';
            }
        }
        for (let halfedge of this.halfedges) {
            if (halfedge.next) {
                s += halfedge.id + '->' + halfedge.next.id + '[label=N,color=blue];';
            }
            if (halfedge.prev) {
                s += halfedge.id + '->' + halfedge.prev.id + '[label=P,color=red];';
            }
            if (halfedge.vertex) {
                s += halfedge.id + '->' + halfedge.vertex.id + '[color=brown];';
            }
            if (halfedge.loop) {
                s += halfedge.id + '->' + halfedge.loop.id + '[color=gray];';
            }
        }
        s += '}';
        return s;
    }
    toSVG(width = 600, height = 600) {
        const VTX_RADIUS = 3;
        const VTX_STYLE = 'fill:#f88';
        let vtxmarkup = `<g>`;
        for (let i = 0; i < this.vertices.length; i++) {
            let x = this.vertices[i].coord.getN(0);
            let y = this.vertices[i].coord.getN(1);
            vtxmarkup += `<circle cx=${x} cy=${height - y} ` +
                `r=${VTX_RADIUS} style="${VTX_STYLE}"></circle>\n`;
        }
        vtxmarkup += `</g>`;
        return `<svg width=${width} height=${height}>\n` +
            vtxmarkup + '\n' +
            `</svg>`;
    }
}
exports.Body = Body;


/***/ }),
/* 14 */
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
const halfedge_1 = __webpack_require__(1);
const idman_1 = __webpack_require__(0);
class Loop {
    constructor(face) {
        this.face = face;
        this.id = 'L' + idman_1.IDManager.genId('L');
    }
    insertHalfEdgeAfter(heNew, heExisting) {
        let next = heExisting.next;
        heExisting.next = heNew;
        heNew.prev = heExisting;
        heNew.next = next;
        next.prev = heNew;
    }
    removeHalfEdge(he) {
        // Note:
        // We are not going to make any checks if the input halfedge actually
        // belongs to this loop or not
        console.assert(he.prev);
        console.assert(he.next);
        he.prev.next = he.next;
        he.next.prev = he.prev;
        he.next = undefined;
        he.prev = undefined;
    }
    get length() {
        let n = 0;
        halfedge_1.HalfEdge.walk(this.halfedge, () => { n++; });
        return n;
    }
    unlink() {
    }
    toString() {
        let s = this.id + ': ';
        halfedge_1.HalfEdge.walk(this.halfedge, he => { s += he.id + ' '; });
        return s;
    }
}
exports.Loop = Loop;


/***/ }),
/* 15 */
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
var constants_1 = __webpack_require__(2);
exports.EPSILON = constants_1.EPSILON;
var ndarray_1 = __webpack_require__(4);
exports.NDArray = ndarray_1.NDArray;
var complex_1 = __webpack_require__(5);
exports.Complex = complex_1.Complex;
var aabb_1 = __webpack_require__(16);
exports.AABB = aabb_1.AABB;


/***/ }),
/* 16 */
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
var AABB = (function () {
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


/***/ })
/******/ ]);
//# sourceMappingURL=bluemath-topo-test.js.map