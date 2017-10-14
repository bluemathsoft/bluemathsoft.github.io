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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
const ops_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(3);
const complex_1 = __webpack_require__(2);
/**
 * @hidden
 */
function deduceShape(data) {
    let dim = 0;
    let d = data;
    let shape = [data.length];
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
        let len = 0;
        for (let i = 0; i < arr.length; i++) {
            let l = populateFromArray(data, idx + len, arr[i]);
            len += l;
        }
        return len;
    }
    else {
        for (let i = 0; i < arr.length; i++) {
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
class NDArray {
    constructor(arg0, arg1) {
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
            let options = arg0;
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
    get shape() {
        return this._shape;
    }
    get size() {
        return this._size;
    }
    is1D() {
        return this._shape.length === 1;
    }
    is2D() {
        return this._shape.length === 2;
    }
    /**
     * Number of elements in outermost (i.e. 0th) dimension
     */
    get length() {
        return this._shape[0];
    }
    get data() {
        return this._data;
    }
    get datatype() {
        return this._datatype;
    }
    /**
     * Set new shape for the data stored in the array
     * The old data remains intact. If the total size with the new shape
     * is larger than the old size, then excess elements of the data are
     * fill with zero.
     * @param shape New shape
     */
    reshape(shape) {
        this._shape = shape;
        let oldsize = this._size;
        this._calcSize();
        if (this._size > oldsize) {
            // Rellocate a buffer of bigger size, copy old data to it
            this._alloc(this._size, this._data, this._datatype);
            // Fill the excess elements in new buffer with 0
            this._data.fill(0, oldsize);
        }
        return this;
    }
    /**
     * Create deep copy of the array
     */
    clone() {
        let dataArrayType = getDataArrayType(this._datatype);
        let data = new dataArrayType(this._data);
        return new NDArray(data, { shape: this._shape.slice(), idata: this._idata.slice() });
    }
    _calcSize() {
        this._size = this._shape.reduce((prev, cur) => prev * cur, 1);
    }
    _alloc(size, data, datatype) {
        let dataArrayType = getDataArrayType(datatype);
        this._data = new dataArrayType(size);
        if (Array.isArray(data)) {
            populateFromArray(this._data, 0, data);
        }
        else if (ArrayBuffer.isView(data)) {
            this._data.set(data);
        }
    }
    _indexToAddress(...indices) {
        if (indices.length !== this._shape.length) {
            throw new Error('Mismatched number of dimensions');
        }
        let addr = 0;
        let acc = 0;
        for (let i = this._shape.length - 1; i >= 0; i--) {
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
    }
    /**
     * @hidden
     */
    static mapAddressToIndex(addr, shape) {
        let index = new Array(shape.length);
        for (let i = shape.length - 1; i >= 0; i--) {
            let d = shape[i];
            index[i] = addr % d;
            addr = Math.floor(addr / d);
        }
        return index;
    }
    /**
     * @hidden
     */
    _addressToIndex(addr) {
        if (addr >= this._size) {
            throw new Error("Data index out of range");
        }
        return NDArray.mapAddressToIndex(addr, this._shape);
    }
    /**
     * Create nested array
     */
    toArray() {
        if (this._shape.length <= 0) {
            throw new Error('Zero shape');
        }
        let aarr = [];
        let step = 1;
        // iterate over dimensions from innermost to outermost
        for (let i = this._shape.length - 1; i >= 0; i--) {
            // Step size in i'th dimension
            let d = this._shape[i];
            step = step * d;
            // number of elements in i'th dimension
            let nelem = this._size / step;
            if (i === this._shape.length - 1) {
                // innermost dimension, create array from all elements
                for (let j = 0; j < nelem; j++) {
                    let arr = new Array(step);
                    for (let k = 0; k < d; k++) {
                        let index = j * step + k;
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
                let darr = new Array(nelem);
                for (let j = 0; j < nelem; j++) {
                    darr[j] = aarr.slice(j * d, (j + 1) * d);
                }
                aarr = darr;
            }
        }
        return aarr[0];
    }
    /**
     * Set all members of this array to given value
     */
    fill(value) {
        this._data.fill(value);
    }
    isSliceIndex(index) {
        if (index.length < this._shape.length) {
            return true;
        }
        for (let i = 0; i < index.length; i++) {
            let item = index[i];
            if (item === undefined ||
                item === null ||
                typeof item === 'string') {
                return true;
            }
        }
        return false;
    }
    /**
     * Set member at given index
     * All but the last argument should specify the index.
     * The last argument is the value to set.
     */
    set(...args) {
        let nargs = args.length;
        let index = (args.slice(0, nargs - 1));
        let val = args[nargs - 1];
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
            let valslice = val;
            let slice_recipe = this.createSliceRecipe(index);
            let { shape: sliceshape, size: slicesize } = this.computeSliceShapeAndSize(slice_recipe);
            if (!NDArray.areShapesEqual(sliceshape, valslice._shape)) {
                throw new Error("Input value has incompatible shape");
            }
            for (let i = 0; i < slicesize; i++) {
                // Convert each address of slice array to index
                let sliceidx = NDArray.mapAddressToIndex(i, sliceshape);
                // Find index into the original array (oldidx) that corresponds
                // to the newidx
                let targetidx = [];
                let rangecount = 0;
                for (let i = slice_recipe.length - 1; i >= 0; i--) {
                    if (Array.isArray(slice_recipe[i])) {
                        // Every element of the new index corresponds to a range element
                        // in the slice recipe. To map the new index to old index, we
                        // have to take the lower end of the range in slice recipe and
                        // add it to the element in new index
                        let range = slice_recipe[i];
                        let low = range[0];
                        let idxelem = sliceidx[sliceidx.length - 1 - rangecount];
                        targetidx.unshift(idxelem + low);
                        rangecount++;
                    }
                    else {
                        // Copy the constant recipe element as-is into index
                        targetidx.unshift(slice_recipe[i]);
                    }
                }
                this.set(...targetidx, val.get(...sliceidx));
            }
        }
        else {
            // Assignment of single item
            let addr = this._indexToAddress(...index);
            if (val instanceof complex_1.Complex) {
                this._data[addr] = val.real;
                this._idata[addr] = val.imag;
            }
            else {
                this._data[addr] = val;
            }
        }
    }
    /**
     * Swaps matrix rows (this must be a 2D array)
     */
    swaprows(i, j) {
        if (this._shape.length !== 2) {
            throw new Error('This NDArray is not a Matrix (2D)');
        }
        if (i === j) {
            return; // No need to swap
        }
        let nrows = this._shape[0];
        let ncols = this._shape[1];
        if (i >= nrows || j >= nrows) {
            throw new Error("Index out of range");
        }
        for (let k = 0; k < ncols; k++) {
            let tmp = this.get(i, k);
            this.set(i, k, this.get(j, k));
            this.set(j, k, tmp);
        }
    }
    /**
     * @hidden
     */
    datacompare(otherdata, otheridata, tolerance = constants_1.EPSILON) {
        for (let i = 0; i < this._data.length; i++) {
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
                let thisC = new complex_1.Complex(this._data[i], this._idata[i]);
                let otherC = new complex_1.Complex(otherdata[i], otheridata[i]);
                return thisC.isEqual(otherC);
            }
        }
        return true;
    }
    /**
     * Iterate over each element, invoke a callback with each index and value
     */
    forEach(callback) {
        for (let i = 0; i < this._size; i++) {
            let index = this._addressToIndex(i);
            if (this._idata[i] === undefined) {
                callback(this._data[i], ...index);
            }
            else {
                callback(new complex_1.Complex(this._data[i], this._idata[i]), ...index);
            }
        }
    }
    /**
     * @hidden
     */
    static areShapesEqual(shape1, shape2) {
        if (shape1.length !== shape2.length) {
            return false;
        }
        for (let i = 0; i < shape1.length; i++) {
            if (shape1[i] !== shape2[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Checks if the shape of this ndarray matches the shape of other
     */
    isShapeEqual(other) {
        return NDArray.areShapesEqual(this._shape, other._shape);
    }
    /**
     * Does equality test for each element of the array as well as the
     * shape of the arrays
     * @param other Other NDArray to compare with
     * @param tolerance
     */
    isEqual(other, tolerance = constants_1.EPSILON) {
        let shapeequal = this.isShapeEqual(other);
        return shapeequal && other.datacompare(this._data, this._idata, tolerance);
    }
    /**
     * Return 1D copy of this array
     */
    flatten() {
        let copy = this.clone();
        copy.reshape([this._size]);
        return copy;
    }
    /**
     * Change between Row-major and Column-major layout
     */
    swapOrder() {
        if (this._shape.length !== 2) {
            throw new Error('swapOrder is not defined for ndarrays other than dim 2');
        }
        let clone = this.clone();
        let I = this._shape[0];
        let J = this._shape[1];
        this.reshape([J, I]);
        for (let i = 0; i < J; i++) {
            for (let j = 0; j < I; j++) {
                this.set(i, j, clone.get(j, i));
            }
        }
    }
    createSliceRecipe(slices) {
        if (slices.length > this._shape.length) {
            throw new Error('Excess number of dimensions specified');
        }
        let slice_recipe = [];
        // Each slice specifies the index-range in that dimension to return
        for (let i = 0; i < slices.length; i++) {
            let slice = slices[i];
            let max = this._shape[i];
            if (slice === undefined || slice === null || slice === ':') {
                // gather all indices in this dimension
                slice_recipe.push([0, max]);
            }
            else if (typeof slice === 'string') {
                // assume the slice format to be [<from_index>:<to_index>]
                // if from_index or to_index is missing then they are replaced
                // by 0 or max respectively
                let match = /([-\d]*)\:([-\d]*)/.exec(slice);
                let from = 0;
                let to = max;
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
        for (let i = slice_recipe.length; i < this._shape.length; i++) {
            slice_recipe.push([0, this._shape[i]]);
        }
        return slice_recipe;
    }
    computeSliceShapeAndSize(slice_recipe) {
        // The number of dimensions of the resulting slice equals the
        // number of slice recipies that are ranges
        let shape = [];
        let size = 1;
        for (let i = slice_recipe.length - 1; i >= 0; i--) {
            if (Array.isArray(slice_recipe[i])) {
                let recipe = slice_recipe[i];
                let dim = recipe[1] - recipe[0];
                shape.unshift(dim); // Prepend
                size *= dim;
            }
        }
        return { shape, size };
    }
    /**
     * Shorthand for get(...) method to avoid casting to <number>
     */
    getN(...slices) {
        return this.get(...slices);
    }
    /**
     * Shorthand for get(...) method to avoid casting to <NDArray>
     */
    getA(...slices) {
        return this.get(...slices);
    }
    /**
     * Shorthand for get(...) method to avoid casting to <Complex>
     */
    getC(...slices) {
        return this.get(...slices);
    }
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
    get(...slices) {
        let slice_recipe = this.createSliceRecipe(slices);
        console.assert(slice_recipe.length === this._shape.length);
        // Count elements of slice recipe that are ranges
        let nranges = 0;
        for (let i = 0; i < slice_recipe.length; i++) {
            if (Array.isArray(slice_recipe[i])) {
                nranges++;
            }
        }
        // If the slice recipe doesn't contain any ranges, then the
        // result is a single element of the array
        if (nranges === 0) {
            let idx = slice_recipe;
            let addr = this._indexToAddress(...idx);
            if (this._idata[addr] === undefined) {
                return this._data[addr];
            }
            else {
                return new complex_1.Complex(this._data[addr], this._idata[addr]);
            }
        }
        let { shape: sliceshape, size: slicesize } = this.computeSliceShapeAndSize(slice_recipe);
        let slicearr = new NDArray({ shape: sliceshape, datatype: this._datatype });
        for (let i = 0; i < slicesize; i++) {
            // Convert each address of slice array to index
            let newidx = slicearr._addressToIndex(i);
            // Find index into the original array (oldidx) that corresponds
            // to the newidx
            let oldidx = [];
            let rangecount = 0;
            for (let i = slice_recipe.length - 1; i >= 0; i--) {
                if (Array.isArray(slice_recipe[i])) {
                    // Every element of the new index corresponds to a range element
                    // in the slice recipe. To map the new index to old index, we
                    // have to take the lower end of the range in slice recipe and
                    // add it to the element in new index
                    let range = slice_recipe[i];
                    let low = range[0];
                    let idxelem = newidx[newidx.length - 1 - rangecount];
                    oldidx.unshift(idxelem + low);
                    rangecount++;
                }
                else {
                    // Copy the constant recipe element as-is into index
                    oldidx.unshift(slice_recipe[i]);
                }
            }
            slicearr.set(...newidx, this.get(...oldidx));
        }
        return slicearr;
    }
    /**
     * @hidden
     */
    take(indices, axis) {
        !indices;
        !axis;
        throw new Error('TODO');
    }
    /**
     * @hidden
     */
    max(axis) {
        if (axis !== undefined && axis !== null) {
            if (typeof axis === 'number') {
                if (axis >= this._shape.length) {
                    throw new Error('axis is out of range');
                }
                let maxshape = this._shape.slice();
                maxshape.splice(axis, 1);
                let maxsize = maxshape.reduce((a, b) => a * b, 1);
                let maxarr = new NDArray({ datatype: this._datatype, shape: maxshape });
                for (let i = 0; i < maxsize; i++) {
                    let maxindex = maxarr._addressToIndex(i);
                    let sliceindex = maxindex.slice();
                    sliceindex.splice(axis, 0, ':');
                    let slice = this.get(...sliceindex);
                    maxarr.set(...maxindex, slice.max());
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
    }
    /**
     * @hidden
     */
    min() {
        throw new Error('TODO');
    }
    /**
     * @hidden
     */
    mean() {
        throw new Error('TODO');
    }
    /**
     * @hidden
     */
    all() {
        throw new Error('TODO');
    }
    /**
     * @hidden
     */
    any() {
        throw new Error('TODO');
    }
    /**
     * @hidden
     */
    sort() {
        throw new Error('TODO');
    }
    /**
     * @hidden
     */
    argsort() {
        throw new Error('TODO');
    }
    copyfrom(other) {
        if (!this.isShapeEqual(other)) {
            throw new Error('Shape mismatch');
        }
        this._data.set(other.data);
    }
    copyto(other) {
        other.copyfrom(this);
    }
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
    toString(precision = 4) {
        if (['i8', 'ui8', 'i16', 'ui16', 'i32', 'ui32'].indexOf(this._datatype) >= 0) {
            precision = 0;
        }
        function whitespace(length = 0) {
            let s = '';
            for (let i = 0; i < length; i++) {
                s += ' ';
            }
            return s;
        }
        if (this._shape.length <= 0) {
            return '[]';
        }
        let sarr = [];
        let step = 1;
        // iterate over dimensions from innermost to outermost
        for (let i = this._shape.length - 1; i >= 0; i--) {
            // Step size in i'th dimension
            let d = this._shape[i];
            step = step * d;
            // number of elements in i'th dimension
            let nelem = this._size / step;
            if (i === this._shape.length - 1) {
                // innermost dimension, create array from all elements
                for (let j = 0; j < nelem; j++) {
                    let str = whitespace(i + 1) + '[';
                    for (let k = 0; k < d; k++) {
                        let index = j * step + k;
                        if (this._idata[index] === undefined) {
                            str += this._data[index].toFixed(precision);
                        }
                        else {
                            str += new complex_1.Complex(this._data[index], this._idata[index])
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
                let sdarr = new Array(nelem);
                for (let j = 0; j < nelem; j++) {
                    sdarr[j] =
                        whitespace(i + 1) + '[\n' +
                            sarr.slice(j * d, (j + 1) * d).map(s => whitespace(i + 1) + s).join(',\n') + '\n' +
                            whitespace(i + 1) + ']';
                }
                sarr = sdarr;
            }
        }
        return sarr[0];
    }
    toHTML(precision = 4) {
        if (['i8', 'ui8', 'i16', 'ui16', 'i32', 'ui32'].indexOf(this._datatype) >= 0) {
            precision = 0;
        }
        let tagnames = ['table', 'tr', 'td'];
        if (this._shape.length <= 0) {
            return '<table></table>';
        }
        let sarr = [];
        let step = 1;
        // iterate over dimensions from innermost to outermost
        for (let i = this._shape.length - 1; i >= 0; i--) {
            // Step size in i'th dimension
            let d = this._shape[i];
            step = step * d;
            let tag = tagnames[(i + 1) % 3];
            let outertag = tagnames[(3 + i) % 3]; // adding 3 wraps around the mod range
            // number of elements in i'th dimension
            let nelem = this._size / step;
            if (i === this._shape.length - 1) {
                // innermost dimension, create array from all elements
                for (let j = 0; j < nelem; j++) {
                    let str = `<${outertag}>`;
                    for (let k = 0; k < d; k++) {
                        let index = j * step + k;
                        str += `<${tag}>`;
                        if (this._idata[index] === undefined) {
                            str += this._data[index].toFixed(precision);
                        }
                        else {
                            str += new complex_1.Complex(this._data[index], this._idata[index])
                                .toString(precision);
                        }
                        str += `</${tag}>`;
                    }
                    str += `</${outertag}>`;
                    sarr.push(str);
                }
            }
            else {
                // outer dimensions, create array from inner dimension's arrays
                let sdarr = new Array(nelem);
                for (let j = 0; j < nelem; j++) {
                    sdarr[j] = `<${outertag}>` +
                        sarr.slice(j * d, (j + 1) * d).join('') +
                        `</${outertag}>`;
                }
                sarr = sdarr;
            }
        }
        return sarr[0];
        //return '<table>'+sarr[0]+'</table>';
    }
}
exports.NDArray = NDArray;
class Vec2 extends NDArray {
    constructor(x, y) {
        super([x, y]);
    }
}
exports.Vec2 = Vec2;
class Vec3 extends NDArray {
    constructor(x, y, z) {
        super([x, y, z]);
    }
}
exports.Vec3 = Vec3;


/***/ }),
/* 1 */
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
const constants_1 = __webpack_require__(3);
const ndarray_1 = __webpack_require__(0);
const complex_1 = __webpack_require__(2);
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
function iszero(x, tolerance = constants_1.EPSILON) {
    // the 'less-than-equal' comparision is necessary for correct result
    // when tolerance = 0
    return Math.abs(x) <= tolerance;
}
exports.iszero = iszero;
/**
 * Check if two input numbers are equal within given tolerance
 */
function isequal(a, b, tolerance = constants_1.EPSILON) {
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
    let arr = [];
    for (let i = a; i < b; i++) {
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
    let n, m;
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
    let A = new ndarray_1.NDArray({ shape: [n, m], datatype: datatype, fill: 0 });
    let ndiag = Math.min(n, m);
    for (let i = 0; i < ndiag; i++) {
        A.set(i, i, 1);
    }
    return A;
}
exports.eye = eye;
function count(arr, item, tolerance = constants_1.EPSILON) {
    let n = 0;
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
    let A;
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
    let A;
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
    let dot = 0.0;
    for (let i = 0; i < A.data.length; i++) {
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
    let a1 = A.getN(0);
    let a2 = A.getN(1);
    let a3 = A.getN(2);
    let b1 = B.getN(0);
    let b2 = B.getN(1);
    let b3 = B.getN(2);
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
            let answer = b.clone();
            answer.real += a;
            return answer;
        }
    }
    else if (a instanceof complex_1.Complex) {
        if (typeof b === 'number') {
            let answer = a.clone();
            answer.real += b;
            return answer;
        }
        else if (b instanceof complex_1.Complex) {
            let answer = a.clone();
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
    let answer = a.clone();
    a.forEach((value, ...index) => {
        let aval = value;
        let bval = b.get(...index);
        let ansval = _add_numbers(aval, bval);
        answer.set(...index, ansval);
    });
    return answer;
}
/**
 * @hidden
 */
function _add_ndarray_and_number(a, b) {
    let answer = a.clone();
    a.forEach((value, ...index) => {
        let aval = value;
        let ansval = _add_numbers(aval, b);
        answer.set(...index, ansval);
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
function add(...args) {
    let acc = args[0];
    for (let i = 1; i < args.length; i++) {
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
            let answer = b.clone();
            answer.real *= a;
            answer.imag *= a;
            return answer;
        }
    }
    else if (a instanceof complex_1.Complex) {
        if (typeof b === 'number') {
            let answer = a.clone();
            answer.real *= b;
            answer.imag *= b;
            return answer;
        }
        else if (b instanceof complex_1.Complex) {
            let answer = new complex_1.Complex();
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
            let answer = b.clone();
            answer.forEach((value, ...index) => {
                answer.set(...index, _mul_numbers(a, value));
            });
            return answer;
        }
    }
    else if (a instanceof ndarray_1.NDArray) {
        if (typeof b === 'number' || b instanceof complex_1.Complex) {
            let answer = a.clone();
            answer.forEach((value, ...index) => {
                answer.set(...index, _mul_numbers(b, value));
            });
            return answer;
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
function mul(...args) {
    let acc = args[0];
    for (let i = 1; i < args.length; i++) {
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
/* 2 */
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
const constants_1 = __webpack_require__(3);
const ops_1 = __webpack_require__(1);
class Complex {
    constructor(real, imag) {
        this.real = real || 0;
        this.imag = imag || 0;
    }
    clone() {
        return new Complex(this.real, this.imag);
    }
    inverse() {
        // 1/Complex number is converted to a usable complex number by
        // multiplying both numerator and denominator by complex conjugate
        // of the original number (rationalizing the denominator)
        let r = this.real;
        let i = this.imag;
        let den = r * r + i * i;
        return new Complex(r / den, -i / den);
    }
    isEqual(other, tolerance = constants_1.EPSILON) {
        return ops_1.isequal(this.real, other.real, tolerance) &&
            ops_1.isequal(this.imag, other.imag, tolerance);
    }
    toString(precision = 4) {
        let sign = (this.imag >= 0) ? '+' : '-';
        return `(${this.real.toFixed(precision)}` +
            `${sign}${Math.abs(this.imag).toFixed(precision)}i)`;
    }
}
exports.Complex = Complex;


/***/ }),
/* 3 */
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
const EPSILON = 1e-6;
exports.EPSILON = EPSILON;


/***/ }),
/* 4 */
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
const ndarray_1 = __webpack_require__(5);
const ops_1 = __webpack_require__(6);
const aabb_1 = __webpack_require__(7);
window.onload = () => {
    let qunitDiv = document.createElement('div');
    qunitDiv.setAttribute('id', 'qunit');
    document.body.appendChild(qunitDiv);
    let qunitFixtureDiv = document.createElement('div');
    qunitFixtureDiv.setAttribute('id', 'qunit-fixture');
    document.body.appendChild(qunitFixtureDiv);
    ndarray_1.default();
    ops_1.default();
    aabb_1.default();
};


/***/ }),
/* 5 */
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
const ndarray_1 = __webpack_require__(0);
const complex_1 = __webpack_require__(2);
const ops_1 = __webpack_require__(1);
/// <reference path="qunit/index.d.ts" />
function testNDArray() {
    QUnit.module('NDArray', () => {
        QUnit.module('construction', () => {
            QUnit.module('From Array', () => {
                QUnit.module('deduceShape and size', () => {
                    QUnit.test('3x3', assert => {
                        let A = new ndarray_1.NDArray([
                            [2, 4, 6],
                            [3, 5, 2],
                            [1, 6, 5]
                        ]);
                        assert.deepEqual(A.shape, [3, 3]);
                        assert.equal(A.size, 9);
                    });
                    QUnit.test('1x3', assert => {
                        let A = new ndarray_1.NDArray([
                            [2, 4, 6]
                        ]);
                        assert.deepEqual(A.shape, [1, 3]);
                        assert.equal(A.size, 3);
                    });
                    QUnit.test('3x1', assert => {
                        let A = new ndarray_1.NDArray([
                            [2], [4], [6]
                        ]);
                        assert.deepEqual(A.shape, [3, 1]);
                        assert.equal(A.size, 3);
                    });
                    QUnit.test('1x1', assert => {
                        let A = new ndarray_1.NDArray([
                            [2]
                        ]);
                        assert.deepEqual(A.shape, [1, 1]);
                        assert.equal(A.size, 1);
                    });
                    QUnit.test('5', assert => {
                        let A = new ndarray_1.NDArray([
                            2, 3, 4, 5, 6
                        ]);
                        assert.deepEqual(A.shape, [5]);
                        assert.equal(A.size, 5);
                    });
                    QUnit.test("2x2x2", assert => {
                        let A = new ndarray_1.NDArray([
                            [
                                [1, 0],
                                [2, 1]
                            ],
                            [
                                [2, 3],
                                [5, 4]
                            ]
                        ], { datatype: 'i16' });
                        assert.deepEqual(A.shape, [2, 2, 2]);
                        assert.equal(A.size, 8);
                    });
                });
                QUnit.test('to float32 default', assert => {
                    let A = new ndarray_1.NDArray([
                        2, 3, 4, 5, 6
                    ]);
                    assert.equal(A.datatype, 'f32');
                    assert.equal(A.get(0), 2);
                });
                QUnit.test('to float64 default', assert => {
                    let A = new ndarray_1.NDArray([
                        2, 3, 4, 5, 6
                    ], { datatype: 'f64' });
                    assert.equal(A.datatype, 'f64');
                    assert.equal(A.get(1), 3);
                });
                QUnit.test('to int16 default', assert => {
                    let A = new ndarray_1.NDArray([
                        2, 3, -4, 5, 6
                    ], { datatype: 'i16' });
                    assert.equal(A.datatype, 'i16');
                    assert.equal(A.get(2), -4);
                });
                QUnit.test('to uint16 default', assert => {
                    let A = new ndarray_1.NDArray([
                        2, 3, -4, 5, 6
                    ], { datatype: 'ui16' });
                    assert.equal(A.datatype, 'ui16');
                    assert.notEqual(A.get(2), -4);
                });
            });
            QUnit.module('From Raw Data', () => {
                QUnit.module('shape', () => {
                    QUnit.test('default flat', assert => {
                        let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]));
                        assert.deepEqual(A.shape, [4]);
                    });
                    QUnit.test('2x2', assert => {
                        let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [2, 2] });
                        assert.deepEqual(A.shape, [2, 2]);
                        assert.equal(A.get(0, 1), 7);
                        assert.equal(A.get(1, 1), 6);
                    });
                    QUnit.test('1x4', assert => {
                        let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [1, 4] });
                        assert.deepEqual(A.shape, [1, 4]);
                        assert.equal(A.get(0, 1), 7);
                        assert.equal(A.get(0, 3), 6);
                    });
                    QUnit.test('4x1', assert => {
                        let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [4, 1] });
                        assert.deepEqual(A.shape, [4, 1]);
                        assert.equal(A.get(1, 0), 7);
                        assert.equal(A.get(3, 0), 6);
                    });
                });
            });
            QUnit.module('No Data', () => {
                QUnit.test('fill with 0', assert => {
                    let A = new ndarray_1.NDArray({ shape: [2, 2], fill: 0 });
                    assert.equal(A.size, 4);
                    assert.equal(A.get(0, 0), 0);
                    assert.equal(A.get(0, 1), 0);
                    assert.equal(A.get(1, 0), 0);
                    assert.equal(A.get(1, 1), 0);
                });
                QUnit.test('fill with 5', assert => {
                    let A = new ndarray_1.NDArray({ shape: [2, 2], fill: 5 });
                    assert.equal(A.size, 4);
                    assert.equal(A.get(0, 0), 5);
                    assert.equal(A.get(0, 1), 5);
                    assert.equal(A.get(1, 0), 5);
                    assert.equal(A.get(1, 1), 5);
                });
            });
        });
        QUnit.module('Equality', () => {
            QUnit.test('2x2 equal', assert => {
                let A = new ndarray_1.NDArray([[4, 7], [3, 4]]);
                let B = new ndarray_1.NDArray([[4, 7], [3, 4]]);
                assert.ok(A.isEqual(B));
            });
            QUnit.test('2x2 not equal', assert => {
                let A = new ndarray_1.NDArray([[4, 7], [3, 4]]);
                let B = new ndarray_1.NDArray([[4, 9], [3, 4]]);
                assert.notOk(A.isEqual(B));
            });
            QUnit.test('2x2 and 3x3', assert => {
                let A = new ndarray_1.NDArray([[4, 7], [3, 4]]);
                let B = new ndarray_1.NDArray([[4, 7, 3], [3, 4, 3], [3, 2, 2]]);
                assert.notOk(A.isEqual(B));
            });
            QUnit.test('2x2 and 1', assert => {
                let A = new ndarray_1.NDArray([[4, 7], [3, 4]]);
                let B = new ndarray_1.NDArray([34]);
                assert.notOk(A.isEqual(B));
            });
            QUnit.test('2x2 int32 vs float32 equal', assert => {
                let A = new ndarray_1.NDArray([[4, 7], [3, 4]], { datatype: 'i32' });
                let B = new ndarray_1.NDArray([[4, 9], [3, 4]], { datatype: 'f32' });
                assert.notOk(A.isEqual(B));
            });
        });
        QUnit.test("swaprows", assert => {
            let A = new ndarray_1.NDArray([[1, 0], [2, 1], [6, 9]], { datatype: 'i16' });
            let B = new ndarray_1.NDArray([[2, 1], [1, 0], [6, 9]], { datatype: 'i16' });
            A.swaprows(0, 1);
            assert.ok(A.isEqual(B));
        });
        QUnit.module('max', () => {
            QUnit.test("No axis", assert => {
                assert.equal((new ndarray_1.NDArray([3, 4, 5, 8]).max()), 8);
                assert.equal((new ndarray_1.NDArray([[3, 4], [5, 8]]).max()), 8);
                assert.equal((new ndarray_1.NDArray([[3, 4], [23, -99], [5, 8]]).max()), 23);
            });
            QUnit.test("1 Axis of 2x2", assert => {
                let A = new ndarray_1.NDArray([[1, 2], [3, 4]], { datatype: 'i32' });
                assert.ok(new ndarray_1.NDArray([3, 4]).isEqual(A.max(0)));
                assert.ok(new ndarray_1.NDArray([2, 4]).isEqual(A.max(1)));
            });
            QUnit.test("1 Axis of 3x3", assert => {
                let A = new ndarray_1.NDArray([[1, 2, 3], [4, 5, 6], [7, 8, 9]], { datatype: 'i32' });
                assert.ok(new ndarray_1.NDArray([7, 8, 9]).isEqual(A.max(0)));
                assert.ok(new ndarray_1.NDArray([3, 6, 9]).isEqual(A.max(1)));
            });
            QUnit.skip("1 Axis of 3x3x3", assert => {
                let A = ops_1.range(27);
                A.reshape([3, 3, 3]);
                console.log(A.toString());
                console.log(A.max(2).toString());
                assert.ok(new ndarray_1.NDArray([
                    [2, 5, 8],
                    [11, 14, 17],
                    [20, 23, 26]
                ]).isEqual(A.max(2)));
            });
        });
        QUnit.module("toArray", () => {
            QUnit.test("4", assert => {
                let arr = [5, 6, 7, 8];
                let A = new ndarray_1.NDArray(arr, { datatype: 'i16' });
                assert.deepEqual(arr, A.toArray());
            });
            QUnit.test("3x2", assert => {
                let arr = [[1, 0], [2, 1], [6, 9]];
                let A = new ndarray_1.NDArray(arr, { datatype: 'i16' });
                assert.deepEqual(arr, A.toArray());
            });
            QUnit.test("2x2x2", assert => {
                let arr = [
                    [
                        [1, 0],
                        [2, 1]
                    ],
                    [
                        [2, 3],
                        [5, 4]
                    ]
                ];
                let A = new ndarray_1.NDArray(arr, { datatype: 'i16' });
                assert.deepEqual(arr, A.toArray());
            });
            QUnit.test("2x3x1", assert => {
                let arr = [
                    [
                        [3],
                        [6],
                        [89]
                    ],
                    [
                        [2],
                        [-8],
                        [10]
                    ]
                ];
                let A = new ndarray_1.NDArray(arr, { datatype: 'i16' });
                assert.deepEqual(arr, A.toArray());
            });
            QUnit.test("1x4x3x2", assert => {
                let arr = [
                    [
                        [
                            [3, 5], [2, 1], [3, 5]
                        ],
                        [
                            [4, 1], [9, 8], [3, 5]
                        ],
                        [
                            [2, 7], [3, 5], [6, 1]
                        ],
                        [
                            [10, 8], [6, 2], [2, 5]
                        ]
                    ]
                ];
                let A = new ndarray_1.NDArray(arr, { datatype: 'i16' });
                assert.deepEqual(arr, A.toArray());
            });
        });
        QUnit.module('Indexing', () => {
            QUnit.module('Invalid Access', () => {
                QUnit.test('Wrong num of dim', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]));
                    assert.throws(() => {
                        A.get(0, 0);
                    });
                });
                QUnit.test('Invalid dim-0', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]));
                    assert.throws(() => {
                        A.get(5);
                    });
                });
                QUnit.test('Invalid dim-1', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [2, 2] });
                    assert.throws(() => {
                        A.get(0, 3);
                    });
                });
                QUnit.test('Negative dim-1', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [2, 2] });
                    assert.throws(() => {
                        A.get(0, -1);
                    });
                });
            });
            QUnit.module('Data index to index', () => {
                QUnit.test('3x3x3 addressToIndex', assert => {
                    let A = new ndarray_1.NDArray({ shape: [3, 3, 3] });
                    assert.deepEqual(A._addressToIndex(10), [1, 0, 1]);
                    assert.deepEqual(A._addressToIndex(11), [1, 0, 2]);
                    assert.deepEqual(A._addressToIndex(13), [1, 1, 1]);
                    assert.deepEqual(A._addressToIndex(14), [1, 1, 2]);
                });
                QUnit.test('3x3x3 indexToAddress', assert => {
                    let A = new ndarray_1.NDArray({ shape: [3, 3, 3] });
                    assert.equal(A._indexToAddress(1, 0, 1), 10);
                    assert.equal(A._indexToAddress(1, 0, 2), 11);
                    assert.equal(A._indexToAddress(1, 1, 1), 13);
                    assert.equal(A._indexToAddress(1, 1, 2), 14);
                });
                QUnit.test('1x6', assert => {
                    let A = new ndarray_1.NDArray({ shape: [1, 6] });
                    assert.deepEqual(A._addressToIndex(3), [0, 3]);
                });
            });
            QUnit.module('Set', () => {
                QUnit.test('flat', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [4] });
                    assert.equal(A.get(1), 7);
                    A.set(1, 589);
                    assert.equal(A.get(1), 589);
                });
                QUnit.test('2x2', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [2, 2] });
                    assert.equal(A.get(1, 1), 6);
                    A.set(1, 1, 589);
                    assert.equal(A.get(1, 1), 589);
                });
                QUnit.test('4x1', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [4, 1] });
                    assert.equal(A.get(2, 0), 5);
                    A.set(2, 0, 589);
                    assert.equal(A.get(2, 0), 589);
                });
                QUnit.test('1x4', assert => {
                    let A = new ndarray_1.NDArray(new Float32Array([3, 7, 5, 6]), { shape: [1, 4] });
                    assert.equal(A.get(0, 2), 5);
                    A.set(0, 2, 589);
                    assert.equal(A.get(0, 2), 589);
                });
                QUnit.test('Slice Assignment', assert => {
                    let A = ops_1.range(9);
                    A.reshape([3, 3]);
                    A.set(0, new ndarray_1.NDArray([-1, -1, -1]));
                    assert.ok(A.isEqual(new ndarray_1.NDArray([
                        [-1, -1, -1],
                        [3, 4, 5],
                        [6, 7, 8]
                    ])));
                    A.set(0, ':', new ndarray_1.NDArray([-2, -2, -2]));
                    assert.ok(A.isEqual(new ndarray_1.NDArray([
                        [-2, -2, -2],
                        [3, 4, 5],
                        [6, 7, 8]
                    ])));
                    A.set(':', 0, new ndarray_1.NDArray([-3, -3, -3]));
                    assert.ok(A.isEqual(new ndarray_1.NDArray([
                        [-3, -2, -2],
                        [-3, 4, 5],
                        [-3, 7, 8]
                    ])));
                    A.set(':1', 1, new ndarray_1.NDArray([-4]));
                    assert.ok(A.isEqual(new ndarray_1.NDArray([
                        [-3, -4, -2],
                        [-3, 4, 5],
                        [-3, 7, 8]
                    ])));
                    A.set(':2', ':2', new ndarray_1.NDArray([[-5, -5], [-5, -5]]));
                    assert.ok(A.isEqual(new ndarray_1.NDArray([
                        [-5, -5, -2],
                        [-5, -5, 5],
                        [-3, 7, 8]
                    ])));
                    A.set(2, ':', new ndarray_1.NDArray([0, 0, 0]));
                    assert.ok(A.isEqual(new ndarray_1.NDArray([
                        [-5, -5, -2],
                        [-5, -5, 5],
                        [0, 0, 0]
                    ])));
                });
            });
        });
        QUnit.module('Reshape', () => {
            QUnit.test('6 to 2x3', assert => {
                let A = new ndarray_1.NDArray([3, 5, 7, 4, 5, 6]);
                assert.equal(A.get(2), 7);
                assert.throws(() => {
                    A.get(0, 2);
                });
                assert.equal(A.size, 6);
                A.reshape([2, 3]);
                assert.equal(A.get(0, 2), 7);
                assert.equal(A.size, 6);
            });
            QUnit.test('2x3 to 6', assert => {
                let A = new ndarray_1.NDArray([
                    [3, 5, 7],
                    [4, 5, 6]
                ]);
                assert.equal(A.get(0, 2), 7);
                assert.equal(A.size, 6);
                A.reshape([6]);
                assert.equal(A.get(2), 7);
                assert.equal(A.size, 6);
            });
            QUnit.test('6 to 4x2', assert => {
                let A = new ndarray_1.NDArray([3, 5, 7, 4, 5, 6]);
                assert.equal(A.size, 6);
                assert.equal(A.get(2), 7);
                A.reshape([4, 2]);
                assert.equal(A.size, 8);
                assert.equal(A.get(1, 0), 7);
                assert.equal(A.get(2, 1), 6);
                assert.equal(A.get(3, 0), 0);
                assert.equal(A.get(3, 1), 0);
            });
        });
        QUnit.module('flatten', () => {
            QUnit.test('2x2', assert => {
                let A = new ndarray_1.NDArray([[2, 7], [9, 5]]);
                assert.ok(new ndarray_1.NDArray([2, 7, 9, 5]).isEqual(A.flatten()));
            });
            QUnit.test('3x3', assert => {
                let A = new ndarray_1.NDArray([[2, 7, 8], [9, 5, 8], [0, 3, 4]]);
                assert.ok(new ndarray_1.NDArray([2, 7, 8, 9, 5, 8, 0, 3, 4]).isEqual(A.flatten()));
            });
            QUnit.test('5', assert => {
                let A = new ndarray_1.NDArray([2, 7, 8, 9, 5]);
                assert.ok(new ndarray_1.NDArray([2, 7, 8, 9, 5]).isEqual(A.flatten()));
            });
        });
        QUnit.module('clone', () => {
            QUnit.test('3x3', assert => {
                let A = new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                    [0, 2, 3]
                ], { datatype: 'f64' });
                assert.equal(A.get(1, 2), 9);
                let B = A.clone();
                assert.equal(B.get(1, 2), 9);
                assert.deepEqual(A.shape, B.shape);
                assert.equal(A.datatype, B.datatype);
                B.set(1, 2, 45);
                assert.equal(B.get(1, 2), 45);
                assert.equal(A.get(1, 2), 9);
                A.set(1, 2, 186);
                assert.equal(A.get(1, 2), 186);
                assert.equal(B.get(1, 2), 45);
            });
            QUnit.test('complex', assert => {
                let A = new ndarray_1.NDArray({ shape: [2] });
                A.set(0, new complex_1.Complex(3, 5));
                A.set(1, 32);
                let copyA = A.clone();
                assert.ok(new complex_1.Complex(3, 5).isEqual(copyA.get(0)));
                assert.equal(32, copyA.get(1));
            });
        });
        QUnit.module('copy', () => {
            QUnit.test('from', assert => {
                let A = ops_1.range(9);
                A.reshape([3, 3]);
                let B = ops_1.empty([3, 3]);
                assert.ok(!B.isEqual(A));
                B.copyfrom(A);
                assert.ok(B.isEqual(A));
            });
            QUnit.test('to', assert => {
                let A = ops_1.range(9);
                A.reshape([3, 3]);
                let B = ops_1.empty([3, 3]);
                assert.ok(!B.isEqual(A));
                A.copyto(B);
                assert.ok(B.isEqual(A));
            });
        });
        QUnit.module('slice', () => {
            QUnit.test('3x3', assert => {
                let A = new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                    [0, 2, 3]
                ], { datatype: 'f64' });
                // 1
                assert.ok(A.get(':1', ':2').isEqual(new ndarray_1.NDArray([
                    [2, 4],
                ])));
                // 2
                assert.ok(A.get(0, ':2').isEqual(new ndarray_1.NDArray([
                    2, 4
                ])));
                // 3
                assert.ok(A.get(null).isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                    [0, 2, 3]
                ])));
                // 4
                assert.ok(A.get(1, null).isEqual(new ndarray_1.NDArray([
                    1, 0, 9
                ])));
                // 5
                assert.ok(A.get(0).isEqual(new ndarray_1.NDArray([
                    2, 4, 6
                ])));
                // 6
                assert.ok(A.get(1).isEqual(new ndarray_1.NDArray([
                    1, 0, 9
                ])));
                // 7
                assert.ok(A.get('1:2').isEqual(new ndarray_1.NDArray([
                    [1, 0, 9]
                ])));
                // 8
                assert.ok(A.get('1:2', 2).isEqual(new ndarray_1.NDArray([
                    9
                ])));
                // 9
                assert.ok(A.get(':1', ':3').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                ])));
                // 10
                assert.ok(A.get(':1', ':4').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                ])));
                // 11
                assert.ok(A.get(':1', ':').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                ])));
                // 12
                assert.ok(A.get(':1').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                ])));
                // 13
                assert.ok(A.get(':', ':1').isEqual(new ndarray_1.NDArray([
                    [2],
                    [1],
                    [0]
                ])));
                // 14
                assert.ok(A.get(':', 0).isEqual(new ndarray_1.NDArray([
                    2, 1, 0
                ])));
                // 15
                assert.ok(A.get(':', 2).isEqual(new ndarray_1.NDArray([
                    6, 9, 3
                ])));
                // 16
                assert.ok(A.get(':2', ':3').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                ])));
                // 17
                assert.ok(A.get(':', ':').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                    [0, 2, 3]
                ])));
                // 18
                assert.ok(A.get(':').isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                    [0, 2, 3]
                ])));
                // 19
                assert.ok(A.get().isEqual(new ndarray_1.NDArray([
                    [2, 4, 6],
                    [1, 0, 9],
                    [0, 2, 3]
                ])));
            });
            QUnit.test('3x3x3', assert => {
                let A = ops_1.range(27);
                A.reshape([3, 3, 3]);
                assert.equal(A.get(0, 0, 0), 0);
                assert.equal(A.get(0, 1, 0), 3);
                assert.equal(A.get(1, 1, 0), 12);
                assert.ok(A.get(0, 0, ':').isEqual(new ndarray_1.NDArray([
                    0, 1, 2
                ])));
                assert.ok(A.get(0, ':1', ':').isEqual(new ndarray_1.NDArray([
                    [0, 1, 2]
                ])));
                assert.ok(A.get(0, ':2', ':').isEqual(new ndarray_1.NDArray([
                    [0, 1, 2],
                    [3, 4, 5]
                ])));
                assert.ok(A.get(0).isEqual(new ndarray_1.NDArray([
                    [0, 1, 2],
                    [3, 4, 5],
                    [6, 7, 8]
                ])));
                assert.ok(A.get(0, null, 2).isEqual(new ndarray_1.NDArray([
                    2, 5, 8
                ])));
                assert.ok(A.get(0, 1).isEqual(new ndarray_1.NDArray([
                    3, 4, 5
                ])));
                assert.ok(A.get().isEqual(A));
                assert.ok(A.get(null, null).isEqual(A));
            });
        });
    });
    QUnit.module('Vec2', () => {
        QUnit.test('_', assert => {
            let va = new ndarray_1.Vec2(3, 3);
            assert.deepEqual(va.shape, [2]);
        });
    });
    QUnit.module('Vec3', () => {
        QUnit.test('_', assert => {
            let va = new ndarray_1.Vec3(3, 3, 7);
            assert.deepEqual(va.shape, [3]);
        });
    });
}
exports.default = testNDArray;


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
const ndarray_1 = __webpack_require__(0);
const complex_1 = __webpack_require__(2);
const ops_1 = __webpack_require__(1);
function testOps() {
    QUnit.module('Ops', () => {
        QUnit.module('eye', () => {
            QUnit.test('Square 2x2', assert => {
                let I = ops_1.eye(2);
                assert.equal(I.get(0, 0), 1);
                assert.equal(I.get(0, 1), 0);
                assert.equal(I.get(1, 0), 0);
                assert.equal(I.get(1, 1), 1);
            });
            QUnit.test('Rectangular 2x3', assert => {
                let I = ops_1.eye([2, 3]);
                assert.equal(I.get(0, 0), 1);
                assert.equal(I.get(0, 1), 0);
                assert.equal(I.get(1, 0), 0);
                assert.equal(I.get(1, 1), 1);
                assert.equal(I.get(0, 2), 0);
                assert.equal(I.get(1, 2), 0);
            });
            QUnit.test('Rectangular 3x2', assert => {
                let I = ops_1.eye([3, 2]);
                assert.equal(I.get(0, 0), 1);
                assert.equal(I.get(0, 1), 0);
                assert.equal(I.get(1, 0), 0);
                assert.equal(I.get(1, 1), 1);
                assert.equal(I.get(2, 0), 0);
                assert.equal(I.get(2, 1), 0);
            });
        });
        QUnit.module('empty', () => {
            QUnit.test('_', assert => {
                let E = ops_1.empty(2);
                assert.deepEqual(E.shape, [2]);
                E = ops_1.empty([4, 5]);
                assert.equal(E.size, 20);
                assert.deepEqual(E.shape, [4, 5]);
            });
        });
        QUnit.module('arr', () => {
            QUnit.test('_', assert => {
                let A = ops_1.arr([[4, 5], [8, 9]]);
                assert.deepEqual(A.shape, [2, 2]);
            });
        });
        QUnit.module('dot', () => {
            QUnit.test('_', assert => {
                let A = ops_1.arr([4, 5, 6]);
                let B = ops_1.arr([2, 2, 2]);
                assert.equal(ops_1.dot(A, B), 30);
            });
        });
        QUnit.module('cross', () => {
            QUnit.test('_', assert => {
                let A = ops_1.arr([2, 3, 4]);
                let B = ops_1.arr([5, 6, 7]);
                assert.ok(ops_1.cross(A, B).isEqual(ops_1.arr([-3, 6, -3])));
            });
        });
        QUnit.module('length', () => {
            QUnit.test('_', assert => {
                let B = ops_1.arr([2, 2, 2]);
                assert.ok(ops_1.isequal(ops_1.length(B), Math.sqrt(12)));
            });
        });
        QUnit.module('dir', () => {
            QUnit.test('_', assert => {
                let B = ops_1.arr([2, 0, 0]);
                assert.ok(ops_1.dir(B).isEqual(ops_1.arr([1, 0, 0])));
            });
        });
        QUnit.module('zeros', () => {
            QUnit.test('Rectangular 2x2', assert => {
                let Z = ops_1.zeros(2);
                assert.equal(Z.length, 2);
                assert.equal(Z.get(0), 0);
                assert.equal(Z.get(1), 0);
            });
            QUnit.test('Rectangular 2x2 ui32', assert => {
                let Z = ops_1.zeros([2, 2], 'ui32');
                assert.equal(Z.datatype, 'ui32');
            });
        });
        QUnit.module('count', () => {
            QUnit.test('exact', assert => {
                assert.equal(ops_1.count(new ndarray_1.NDArray([
                    4, 5, 6, 8, 8, 8, 9
                ]), 8, 0), 3);
                assert.equal(ops_1.count(new ndarray_1.NDArray([
                    [4, 5, 6], [8, 8, 8]
                ]), 8, 0), 3);
            });
            QUnit.test('approximate', assert => {
                assert.equal(ops_1.count(new ndarray_1.NDArray([
                    3.4, 5.7, 9, 0, 8
                ]), 5.7), 1);
            });
        });
        QUnit.module('range', () => {
            QUnit.test('range(4)', assert => {
                assert.ok(new ndarray_1.NDArray([0, 1, 2, 3]).isEqual(ops_1.range(4)));
            });
            QUnit.test('range(0,4)', assert => {
                assert.ok(new ndarray_1.NDArray([0, 1, 2, 3]).isEqual(ops_1.range(0, 4)));
            });
            QUnit.test('range(2,4)', assert => {
                assert.ok(new ndarray_1.NDArray([2, 3]).isEqual(ops_1.range(2, 4)));
            });
        });
        QUnit.module('add', () => {
            QUnit.test('Real numbers', assert => {
                assert.equal(ops_1.add(4, 5), 9);
                assert.equal(ops_1.add(4, 5, 10), 19);
            });
            QUnit.test('Real and Complex numbers', assert => {
                assert.ok(new complex_1.Complex(9, 5).isEqual(ops_1.add(4, new complex_1.Complex(5, 5))));
                assert.ok(new complex_1.Complex(9, 5).isEqual(ops_1.add(new complex_1.Complex(5, 5), 4)));
                assert.ok(new complex_1.Complex(19, 5).isEqual(ops_1.add(4, new complex_1.Complex(5, 5), 10)));
                assert.ok(new complex_1.Complex(9, 15).isEqual(ops_1.add(4, new complex_1.Complex(5, 5), new complex_1.Complex(0, 10))));
            });
            QUnit.test('Real numbers and NDArray', assert => {
                assert.ok(new ndarray_1.NDArray([4, 4, 4]).isEqual(ops_1.add(new ndarray_1.NDArray([1, 1, 1]), 3)));
                assert.ok(new ndarray_1.NDArray([4, 4, 4]).isEqual(ops_1.add(3, new ndarray_1.NDArray([1, 1, 1]))));
                assert.ok(new ndarray_1.NDArray([4, 4, 4]).isEqual(ops_1.add(1, 2, new ndarray_1.NDArray([1, 1, 1]))));
                assert.ok(new ndarray_1.NDArray([4, 4, 4]).isEqual(ops_1.add(1, new ndarray_1.NDArray([1, 1, 1]), 2)));
                assert.ok(new ndarray_1.NDArray([[4, 4], [4, 4]]).isEqual(ops_1.add(new ndarray_1.NDArray([[1, 1], [1, 1]]), 3)));
            });
            QUnit.test('Complex numbers and NDArray', assert => {
                let sarr = new ndarray_1.NDArray({ shape: [3] });
                sarr.set(0, new complex_1.Complex(1, 1));
                sarr.set(1, new complex_1.Complex(1, 2));
                sarr.set(2, new complex_1.Complex(2, 1));
                let tarr = sarr.clone();
                tarr.set(0, new complex_1.Complex(2, 2));
                tarr.set(1, new complex_1.Complex(2, 3));
                tarr.set(2, new complex_1.Complex(3, 2));
                assert.ok(tarr.isEqual(ops_1.add(sarr, new complex_1.Complex(1, 1))));
                assert.ok(tarr.isEqual(ops_1.add(new complex_1.Complex(1, 1), sarr)));
                assert.ok(tarr.isEqual(ops_1.add(new complex_1.Complex(0, 1), sarr, new complex_1.Complex(1, 0))));
                sarr = new ndarray_1.NDArray({ shape: [2, 2] });
                sarr.set(0, 0, new complex_1.Complex(3, 3));
                sarr.set(0, 1, new complex_1.Complex(3, 3));
                sarr.set(1, 0, new complex_1.Complex(5, 5));
                sarr.set(1, 1, new complex_1.Complex(5, 5));
                tarr = sarr.clone();
                tarr.set(0, 0, new complex_1.Complex(4, 4));
                tarr.set(0, 1, new complex_1.Complex(4, 4));
                tarr.set(1, 0, new complex_1.Complex(6, 6));
                tarr.set(1, 1, new complex_1.Complex(6, 6));
                assert.ok(tarr.isEqual(ops_1.add(sarr, new complex_1.Complex(1, 1))));
                assert.ok(tarr.isEqual(ops_1.add(1, sarr, new complex_1.Complex(0, 1))));
                sarr = new ndarray_1.NDArray({ shape: [2, 2] });
                sarr.set(0, 0, new complex_1.Complex(3, 3));
                sarr.set(0, 1, 3);
                sarr.set(1, 0, new complex_1.Complex(5, 5));
                sarr.set(1, 1, 5);
                tarr = sarr.clone();
                tarr.set(0, 0, new complex_1.Complex(4, 4));
                tarr.set(0, 1, new complex_1.Complex(3, 1));
                tarr.set(1, 0, new complex_1.Complex(6, 6));
                tarr.set(1, 1, new complex_1.Complex(6, 1));
                assert.ok(tarr.isEqual(ops_1.add(sarr, new complex_1.Complex(1, 1))));
            });
            QUnit.test('NDArrays', assert => {
                let arrA = new ndarray_1.NDArray([1, 1, 1]);
                let arrB = new ndarray_1.NDArray([1, 1, 1]);
                assert.ok(new ndarray_1.NDArray([2, 2, 2]).isEqual(ops_1.add(arrA, arrB)));
                assert.ok(new ndarray_1.NDArray([3, 3, 3]).isEqual(ops_1.add(arrA, arrB, arrA)));
                assert.ok(new ndarray_1.NDArray([4, 4, 4]).isEqual(ops_1.add(arrA, arrB, 1, arrA)));
                assert.throws(() => {
                    ops_1.add(arrA, new ndarray_1.NDArray([[1, 2], [4, 4]]));
                });
                assert.throws(() => {
                    ops_1.add(arrA, new ndarray_1.NDArray([1, 1]));
                });
                let sarr1 = new ndarray_1.NDArray({ shape: [2] });
                sarr1.set(0, new complex_1.Complex(1, 1));
                sarr1.set(1, new complex_1.Complex(2, 0));
                let sarr2 = new ndarray_1.NDArray({ shape: [2] });
                sarr2.set(0, 1);
                sarr2.set(1, new complex_1.Complex(0, 1));
                let tarr = new ndarray_1.NDArray({ shape: [2] });
                tarr.set(0, new complex_1.Complex(2, 1));
                tarr.set(1, new complex_1.Complex(2, 1));
                assert.ok(tarr.isEqual(ops_1.add(sarr1, sarr2)));
            });
        });
        QUnit.module('mul', () => {
            QUnit.test("Real and Complex numbers", assert => {
                assert.equal(ops_1.mul(2, 5), 10);
                assert.equal(ops_1.mul(2, 5, 3), 30);
                assert.ok(new complex_1.Complex(4, 6).isEqual(ops_1.mul(2, new complex_1.Complex(2, 3))));
                assert.ok(new complex_1.Complex(4, 6).isEqual(ops_1.mul(new complex_1.Complex(2, 3), 2)));
                assert.ok(new complex_1.Complex(12, 18).isEqual(ops_1.mul(new complex_1.Complex(2, 3), 2, 3)));
                assert.ok(new complex_1.Complex(-6, 10).isEqual(ops_1.mul(new complex_1.Complex(1, 4), new complex_1.Complex(2, 2))));
                assert.ok(new complex_1.Complex(-28, 24).isEqual(ops_1.mul(new complex_1.Complex(1, 4), new complex_1.Complex(2, 2), new complex_1.Complex(3, 1))));
            });
            QUnit.test('Numbers and NDArray', assert => {
                assert.ok(new ndarray_1.NDArray([4, 4]).isEqual(ops_1.mul(2, new ndarray_1.NDArray([2, 2]))));
                assert.ok(new ndarray_1.NDArray([4, 4]).isEqual(ops_1.mul(new ndarray_1.NDArray([2, 2]), 2)));
                assert.ok(new ndarray_1.NDArray([8, 8]).isEqual(ops_1.mul(new ndarray_1.NDArray([2, 2]), 2, 2)));
                let sarr = new ndarray_1.NDArray({ shape: [2] });
                sarr.set(0, new complex_1.Complex(2, 2));
                sarr.set(1, 2);
                let tarr = sarr.clone();
                tarr.set(0, new complex_1.Complex(6, 6));
                tarr.set(1, 6);
                assert.ok(tarr.isEqual(ops_1.mul(sarr, 3)));
            });
            QUnit.test('NDArrays', assert => {
                let A = new ndarray_1.NDArray([[2, 2, 2], [2, 2, 2], [2, 2, 2]], { datatype: 'i16' });
                let B = new ndarray_1.NDArray([[5, 5, 5], [5, 5, 5], [5, 5, 5]], { datatype: 'i16' });
                assert.throws(() => {
                    ops_1.mul(A, B);
                });
            });
        });
        QUnit.module('sub', () => {
            QUnit.test('Real and complex numbers', assert => {
                assert.equal(ops_1.sub(3, 4), -1);
                assert.ok(new complex_1.Complex(0, -3).isEqual(ops_1.sub(3, new complex_1.Complex(3, 3))));
                assert.ok(new complex_1.Complex(2, 3).isEqual(ops_1.sub(new complex_1.Complex(3, 3), 1)));
                assert.ok(new complex_1.Complex(2, 2).isEqual(ops_1.sub(new complex_1.Complex(3, 3), new complex_1.Complex(1, 1))));
            });
            QUnit.test('Numbers and NDArrays', assert => {
                let A = new ndarray_1.NDArray([
                    [4, 5],
                    [2, 7]
                ]);
                assert.ok(new ndarray_1.NDArray([
                    [3, 4],
                    [1, 6]
                ]).isEqual(ops_1.sub(A, 1)));
                assert.ok(new ndarray_1.NDArray([
                    [-3, -4],
                    [-1, -6]
                ]).isEqual(ops_1.sub(1, A)));
                let sarr = new ndarray_1.NDArray({ shape: [2] });
                sarr.set(0, 3);
                sarr.set(1, new complex_1.Complex(4, 5));
                let tarr = sarr.clone();
                tarr.set(0, 2);
                tarr.set(1, new complex_1.Complex(3, 5));
                assert.ok(tarr.isEqual(ops_1.sub(sarr, 1)));
                tarr = sarr.clone();
                tarr.set(0, -2);
                tarr.set(1, new complex_1.Complex(-3, -5));
                assert.ok(tarr.isEqual(ops_1.sub(1, sarr)));
                tarr = sarr.clone();
                tarr.set(0, new complex_1.Complex(-2, 1));
                tarr.set(1, new complex_1.Complex(-3, -4));
                assert.ok(tarr.isEqual(ops_1.sub(new complex_1.Complex(1, 1), sarr)));
                tarr = sarr.clone();
                tarr.set(0, new complex_1.Complex(2, -1));
                tarr.set(1, new complex_1.Complex(3, 4));
                assert.ok(tarr.isEqual(ops_1.sub(sarr, new complex_1.Complex(1, 1))));
            });
            QUnit.test('NDArrays', assert => {
                let A = new ndarray_1.NDArray([
                    [4, 5],
                    [2, 7]
                ]);
                let B = new ndarray_1.NDArray([
                    [1, 4],
                    [5, 2]
                ]);
                assert.ok(new ndarray_1.NDArray([
                    [3, 1],
                    [-3, 5]
                ]).isEqual(ops_1.sub(A, B)));
                let sarr1 = new ndarray_1.NDArray({ shape: [2] });
                sarr1.set(0, 3);
                sarr1.set(1, new complex_1.Complex(4, 5));
                let sarr2 = new ndarray_1.NDArray([3, 3]);
                let tarr = sarr1.clone();
                tarr.set(0, 0);
                tarr.set(1, new complex_1.Complex(1, 5));
                assert.ok(tarr.isEqual(ops_1.sub(sarr1, sarr2)));
            });
        });
        QUnit.module('div', () => {
            QUnit.test('Real and complex numbers', assert => {
                assert.equal(ops_1.div(10, 5), 2);
                assert.ok(new complex_1.Complex(6, 8).isEqual(ops_1.div(new complex_1.Complex(12, 16), 2)));
                assert.ok(new complex_1.Complex(0.8, -1.6).isEqual(ops_1.div(4, new complex_1.Complex(1, 2))));
            });
            QUnit.test('Numbers and NDArray', assert => {
                let A = new ndarray_1.NDArray([4, 6, 8]);
                assert.ok(new ndarray_1.NDArray([2, 3, 4]).isEqual(ops_1.div(A, 2)));
                let sarr = new ndarray_1.NDArray({ shape: [2] });
                sarr.set(0, 4);
                sarr.set(1, new complex_1.Complex(4, 4));
                let tarr = new ndarray_1.NDArray({ shape: [2] });
                tarr.set(0, 2);
                tarr.set(1, new complex_1.Complex(2, 2));
                assert.ok(tarr.isEqual(ops_1.div(sarr, 2)));
            });
        });
    });
}
exports.default = testOps;


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
const aabb_1 = __webpack_require__(8);
/// <reference path="qunit/index.d.ts" />
function testAABB() {
    QUnit.module('AABB', () => {
        QUnit.test('construction default', assert => {
            let aabb = new aabb_1.AABB(2);
            let aabb1 = new aabb_1.AABB([0, 0], [10, 10]);
            aabb.merge(aabb1);
            assert.equal(aabb.min.get(0), 0);
            assert.equal(aabb.min.get(1), 0);
            assert.equal(aabb.max.get(0), 10);
            assert.equal(aabb.max.get(1), 10);
        });
        QUnit.test('construction', assert => {
            let aabb = new aabb_1.AABB([0, 0], [10, 10]);
            assert.equal(aabb.min.get(0), 0);
            assert.equal(aabb.min.get(1), 0);
            assert.equal(aabb.max.get(0), 10);
            assert.equal(aabb.max.get(1), 10);
        });
        QUnit.test('update', assert => {
            let aabb = new aabb_1.AABB(2);
            aabb.update([3, 4]);
            assert.equal(aabb.min.get(0), 3);
            assert.equal(aabb.min.get(1), 4);
            assert.equal(aabb.max.get(0), 3);
            assert.equal(aabb.max.get(1), 4);
            aabb.update([7, 8]);
            assert.equal(aabb.min.get(0), 3);
            assert.equal(aabb.min.get(1), 4);
            assert.equal(aabb.max.get(0), 7);
            assert.equal(aabb.max.get(1), 8);
            aabb.update([-7, 8]);
            assert.equal(aabb.min.get(0), -7);
            assert.equal(aabb.min.get(1), 4);
            assert.equal(aabb.max.get(0), 7);
            assert.equal(aabb.max.get(1), 8);
            aabb.update([1, 0]);
            assert.equal(aabb.min.get(0), -7);
            assert.equal(aabb.min.get(1), 0);
            assert.equal(aabb.max.get(0), 7);
            assert.equal(aabb.max.get(1), 8);
        });
        QUnit.test('merge', assert => {
            let aabb1 = new aabb_1.AABB([0, 0], [10, 10]);
            let aabb2 = new aabb_1.AABB([5, 5], [15, 15]);
            aabb1.merge(aabb2);
            assert.equal(aabb1.min.get(0), 0);
            assert.equal(aabb1.min.get(1), 0);
            assert.equal(aabb1.max.get(0), 15);
            assert.equal(aabb1.max.get(1), 15);
            aabb1 = new aabb_1.AABB([0, 0], [10, 10]);
            aabb2 = new aabb_1.AABB([-5, -5], [1, 1]);
            aabb1.merge(aabb2);
            assert.equal(aabb1.min.get(0), -5);
            assert.equal(aabb1.min.get(1), -5);
            assert.equal(aabb1.max.get(0), 10);
            assert.equal(aabb1.max.get(1), 10);
        });
    });
}
exports.default = testAABB;


/***/ }),
/* 8 */
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
const ndarray_1 = __webpack_require__(0);
class AABB {
    constructor(arg0, arg1) {
        let dim = 0;
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
    get min() {
        return this._min;
    }
    get max() {
        return this._max;
    }
    /**
     * Update this AABB to include given coordinate
     */
    update(coord) {
        if (coord instanceof ndarray_1.NDArray) {
            for (let i = 0; i < this._min.length; i++) {
                this._min.set(i, Math.min(this._min.get(i), coord.get(i)));
            }
            for (let i = 0; i < this._max.length; i++) {
                this._max.set(i, Math.max(this._max.get(i), coord.get(i)));
            }
        }
        else {
            for (let i = 0; i < this._min.length; i++) {
                this._min.set(i, Math.min(this._min.get(i), coord[i]));
            }
            for (let i = 0; i < this._max.length; i++) {
                this._max.set(i, Math.max(this._max.get(i), coord[i]));
            }
        }
    }
    merge(other) {
        for (let i = 0; i < this.min.length; i++) {
            this.min.set(i, Math.min(this.min.get(i), other.min.get(i)));
        }
        for (let i = 0; i < this.max.length; i++) {
            this.max.set(i, Math.max(this.max.get(i), other.max.get(i)));
        }
    }
}
exports.AABB = AABB;


/***/ })
/******/ ]);
//# sourceMappingURL=bluemath-common-test.js.map