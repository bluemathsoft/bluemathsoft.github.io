
window.EXTRA_LIBS = [

{
  source : `

/**
 * @hidden
 */
interface BandMatrixDef {
    rows: number;
    cols: number;
    lowerbandwidth: number;
    upperbandwidth: number;
    data: TypedArray;
}
declare{ BandMatrixDef };
/**
 * @hidden
 */
declare class BandMatrix extends Matrix {
    private _def;
    constructor(def: BandMatrixDef);
    /**
     *
     * @example
     * For the rectangular matrix
     *    -                         -
     *    | a11 a12 a13   0   0   0 |
     *    | a21 a22 a23 a24   0   0 |
     *    |   0 a32 a33 a34 a35   0 |
     *    |   0   0 a43 a44 a45   0 |
     *    |   0   0   0 a54 a55 a56 |
     *    |   0   0   0   0 a65 a66 |
     *    -                         -
     *
     * Band matrix is given by
     *    lower bandwidth p = 1
     *    upper bandwidth q = 2
     *    -                         -
     *    |   *   * a13 a24 a35 a46 |
     *    |   * a12 a23 a34 a45 a56 |
     *    | a11 a22 a33 a44 a55 a66 |
     *    | a21 a32 a43 a54 a65   * |
     *    -                         -
     */
    toRectangularMatrix(): Matrix;
}
`,
  fpath : "bluemath/lib/basic/bmatrix.d.ts"
}
,
{
  source : `declare class Complex {
    real: number;
    imag: number;
    constructor(real?: number, imag?: number);
    clone(): Complex;
    inverse(): Complex;
    isEqual(other: Complex, tolerance?: number): boolean;
    toString(precision?: number): string;
}
`,
  fpath : "bluemath/lib/basic/complex.d.ts"
}
,
{
  source : `







declare{ NDArray, Matrix, Vector, Vector2, Vector3, Complex, PermutationVector, BandMatrix };
`,
  fpath : "bluemath/lib/basic/index.d.ts"
}
,
{
  source : `

/**
 * @hidden
 */
declare class Matrix {
    private _data;
    private datatype;
    private _rows;
    private _cols;
    /**
     * If arg0 is 2D array, all its rows should be the same length.
     * Let length of first row is assumed to be the number of columns.
     * \`data\` is assigned to the internal _data variable by reference,
     * i.e. it's not deep copied
     */
    constructor(arg0: number[][] | {
        rows: number;
        cols: number;
        data?: TypedArray;
    }, datatype?: NumberType);
    readonly rows: number;
    readonly cols: number;
    readonly size: number;
    readonly data: TypedArray;
    static identity(size: number, datatype?: NumberType): Matrix;
    private _alloc(data?);
    swaprows(i: number, j: number): void;
    clone(): Matrix;
    /**
     * Assign value to all items in the matrix
     */
    fill(value: number): void;
    private _getAddress(row, col);
    get(row: number, col: number): number;
    row(idx: number): Vector;
    col(idx: number): Vector;
    set(row: number, col: number, value: number): void;
    scale(k: number): void;
    mul(other: Matrix | Vector): Matrix | number;
    /**
     * This matrix remains unchanged
     */
    transpose(): Matrix;
    isEqual(other: Matrix, tolerance?: number): boolean;
    toArray(): number[][];
    toString(): string;
    solveByForwardSubstitution(x: Vector): void;
    solveByBackwardSubstitution(x: Vector): void;
    /**
     * Algo 3.2.1 Golub and Loan
     */
    LUDecompose(): void;
}
`,
  fpath : "bluemath/lib/basic/matrix.d.ts"
}
,
{
  source : `

declareinterface NDArrayOptions {
    shape?: number[];
    datatype?: NumberType;
    fill?: number;
    idata?: number[];
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
 * \`\`\`javascript
 * // 3-dimensional array with 32-bit integer storage
 * new NDArray({shape:[3,4,3],datatype:'i32'});
 * \`\`\`
 *
 * * Initializing it with array data
 * \`\`\`javascript
 * // 2x3 Matrix with 64-bit floating point (double) storage
 * new NDArray([[1,1,1],[4,4,4]],{datatype:'f64'});
 * \`\`\`
 *
 * * Using standard functions
 * \`\`\`javascript
 * zeros([2,2,2]); // Returns 2x2x2 NDArray of zeros
 * eye([4,4]); // Creates 4x4 Identity matrix
 * \`\`\`
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
declare class NDArray {
    /**
     * Array of array dimensions. First being the outermost dimension.
     */
    shape: number[];
    /**
     * Size of the data (i.e. number of real/complex numbers stored
     * in this array)
     */
    size: number;
    /**
     * Data type of each number, specified by a string code
     */
    datatype: NumberType;
    /**
     * Real part of number elements is stored in this array
     */
    private _data;
    /**
     * If any number element of this array is Complex then its
     * imaginary part is stored in _idata sparse array object
     * indexed against its address.
     * Note that _idata is not a TypedArray as _data. This way
     * the storage is optimized for the use cases where real number
     * data is common, but in some fringe cases the number could be
     * complex.
     */
    private _idata;
    constructor(arg0: TypedArray | Array<any> | NDArrayOptions, arg1?: NDArrayOptions);
    readonly data: TypedArray;
    /**
     * Set new shape for the data stored in the array
     * The old data remains intact. If the total size with the new shape
     * is larger than the old size, then excess elements of the data are
     * fill with zero.
     * @param shape New shape
     */
    reshape(shape: number[]): void;
    /**
     * Create deep copy of the array
     */
    clone(): NDArray;
    private _calcSize();
    private _alloc(size, data?, datatype?);
    private _indexToAddress(...indices);
    /**
     * @hidden
     */
    _addressToIndex(di: number): any[];
    /**
     * Create nested array
     */
    toArray(): any;
    /**
     * Set all members of this array to given value
     */
    fill(value: number): void;
    /**
     * Access member at given index
     */
    get(...index: number[]): number | Complex;
    /**
     * Set member at given index
     * All but the last argument should specify the index.
     * The last argument is the value to set.
     */
    set(...args: (number | Complex)[]): void;
    /**
     * Swaps matrix rows (this must be a 2D array)
     */
    swaprows(i: number, j: number): void;
    /**
     * @hidden
     */
    datacompare(otherdata: TypedArray, otheridata: number[], tolerance?: number): boolean;
    /**
     * Iterate over each element, invoke a callback with each index and value
     */
    forEach(callback: (value: number | Complex, ...index: number[]) => void): void;
    /**
     * Checks if the shape of this ndarray matches the shape of other
     */
    isShapeEqual(other: NDArray): boolean;
    /**
     * Does equality test for each element of the array as well as the
     * shape of the arrays
     * @param other Other NDArray to compare with
     * @param tolerance
     */
    isEqual(other: NDArray, tolerance?: number): boolean;
    /**
     * Return 1D copy of this array
     */
    flatten(): NDArray;
    /**
     * Change between Row-major and Column-major layout
     */
    swapOrder(): void;
    /**
     * Bluemath supports extracting of NDArray slices using a syntax similar
     * to numpy. Slicing is supported by NDArray.slice function.
     *
     * The function accepts number of arguments not greater than the dimensions
     * of the NDArray.
     * Each argument could be a \`number\`, a \`string\` in format \`<start>:<stop>\`
     * or \`undefined\` or \`null\`.
     *
     * If the argument is a number then it represents a single slice,
     * i.e. all the elements in the lower dimension
     * are returned for this index in given dimension.
     * \`\`\`javascript
     * let A = new NDArray([
     *   [2,4,6],
     *   [1,0,9],
     *   [0,2,3]
     * ]);
     * A.slice(0); // [[2,4,6]]
     * \`\`\`
     *
     * If the argument is \`undefined\` or \`null\`, then that's interpreted as
     * all items in the given dimension.
     * \`\`\`javascript
     * A.slice(null); // [[2,4,6],[1,0,9],[0,2,3]]
     * A.slice(1,null); // [[1,0,9]]
     * \`\`\`
     *
     * A string argument of format \`<start>:<stop>\` is used to specify range of
     * slices in the given dimension.
     * Both \`<start>\` and \`<stop>\` are optional.
     * \`\`\`javascript
     * A.slice('1:2'); // [[1,0,9]]
     * A.slice(':1'); // [[2,4,6]]
     * A.slice(':'); // [[2,4,6],[1,0,9],[0,2,3]]
     * A.slice(':',2); // [[6],[9],[3]]
     * \`\`\`
     *
     * The argument order is interpreted as going from outermost dimension to
     * innermost.
     *
     * Caveats
     * ---
     * * Negative indices not supported yet
     * * No support for \`<start>:<stop>:<step>\` format yet
     */
    slice(...slices: (string | number | undefined | null)[]): NDArray;
    take(indices: number[], axis: number): NDArray;
    max(): void;
    min(): void;
    mean(): void;
    all(): void;
    any(): void;
    sort(): void;
    argsort(): void;
    toString(precision?: number): any;
    toHTML(precision?: number): any;
}
`,
  fpath : "bluemath/lib/basic/ndarray.d.ts"
}
,
{
  source : `


/**
 * @hidden
 */
declare class PermutationVector extends Vector {
    constructor(arg0: number[] | number, datatype?: NumberType);
    toMatrix(): Matrix;
}
`,
  fpath : "bluemath/lib/basic/pvector.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
declare class Vector {
    protected _data: TypedArray | number[];
    datatype: NumberType;
    constructor(data: TypedArray | number[] | number, datatype?: NumberType);
    get(i: number): number;
    set(i: number, value: number): void;
    size(): number;
    clone(): Vector;
    /**
     * Add other vector to this
     */
    add(other: Vector): Vector;
    /**
     * Subtract other vector from this
     */
    sub(other: Vector): Vector;
    /**
     * Multiply by a constant
     */
    mul(k: number): Vector;
    /**
     * Square length of this vector
     */
    lenSq(): number;
    /**
     * Length of this vector
     */
    len(): number;
    /**
     * Unit vector of this vector
     */
    unit(): Vector;
    /**
     * Is this vector non-zero within given tolerance
     * (i.e. either of its members are greater than tolerance in magnitude)
     */
    isNonZero(tolerance?: number): boolean;
    /**
     * Is this vector zero within given tolerance
     * (i.e. All members are less than tolerance in magnitude)
     */
    isZero(tolerance?: number): boolean;
    /**
     * Square distance to other vector
     */
    distSq(other: Vector): number;
    /**
     * Distance to other vector
     */
    dist(other: Vector): number;
    /**
     * Dot product with other vector
     */
    dot(other: Vector): number;
    /**
     * Round to nearest integer, same rules as Math.round
     */
    round(): Vector;
    /**
     * Is equal to other vector, within given tolerance
     */
    isEqual(other: Vector, tolerance?: number): boolean;
    swap(i: number, j: number): void;
    /**
     * A[i] <- A[permutation[i]]
     */
    permute(permutation: Vector): void;
    /**
     */
    permuteInverse(permutation: Vector): void;
    /**
     * Return the min values for variable number of input point vectors
     * All points should be vectors of same size
     */
    static low(points: Array<Vector>): Vector;
    /**
     * Return the max values for variable number of input point vectors
     * All points should be vectors of same size
     */
    static high(points: Array<Vector>): Vector;
    /**
     * String representation
     */
    toString(precision?: number): string;
    toArray(): Array<number>;
}
`,
  fpath : "bluemath/lib/basic/vector.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
declare class Vector2 extends Vector {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    /**
     * Cross product with other vector
     */
    cross(other: Vector2): number;
    /**
     * Vector orthogonal to this vector
     */
    orthogonal(): Vector2;
}
`,
  fpath : "bluemath/lib/basic/vector2.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
declare class Vector3 extends Vector {
    x: number;
    y: number;
    z: number;
    constructor(x?: number, y?: number, z?: number);
}
`,
  fpath : "bluemath/lib/basic/vector3.d.ts"
}
,
{
  source : `declare const EPSILON = 0.000001;
declare{ EPSILON };
`,
  fpath : "bluemath/lib/constants.d.ts"
}
,
{
  source : `
declare{ nurbs };
`,
  fpath : "bluemath/lib/geom/index.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
declare class BSplineCurve {
    degree: number;
    cpoints: Array<Vector>;
    knots: Array<number>;
    weights?: Array<number>;
    constructor(degree: number, cpoints: Array<Vector>, knots: Array<number>, weights?: Array<number>);
    /**
     * Is this Rational BSpline Curve
     */
    isRational(): boolean;
    /**
     * Evaluate basis function derivatives upto n'th
     */
    evaluateBasisDerivatives(span: number, n: number, t: number): number[][];
    evaluateBasis(span: number, t: number): number[];
    findSpan(t: number): number;
    protected getTermDenominator(span: number, N: number[]): number;
}
/**
 * @hidden
 */
declare class BSplineCurve2D extends BSplineCurve {
    constructor(degree: number, cpoints: Array<Vector2>, knots: Array<number>, weights?: Array<number>);
    evaluate(t: number): Vector2;
}
/**
 * @hidden
 */
declare class BSplineCurve3D extends BSplineCurve {
    constructor(degree: number, cpoints: Array<Vector3>, knots: Array<number>, weights?: Array<number>);
    evaluate(t: number): Vector3;
}
declare{ BSplineCurve, BSplineCurve2D, BSplineCurve3D };
`,
  fpath : "bluemath/lib/geom/nurbs/bcurve.d.ts"
}
,
{
  source : `/**
 * @hidden
 * Compute all n'th degree bernstein polynomials at given parameter value
 */
declare function bernstein(n: number, u: number): Array<number>;
/**
 * @hidden
 * Find the index of the knot span in which \`u\` lies
 * @param {number} p Degree
 * @param {Array.<number>} U Knot vector
 * @param {number} u Parameter
 * @returns {number}
 */
declare function findSpan(p: number, U: Array<number>, u: number): number;
/**
 * @hidden
 * Evaluate basis function values
 * @param {number} p Degree
 * @param {Array.<number>} U Knot vector
 * @param {number} i Knot span index
 * @param {number} u Parameter
 * @returns {Array} Basis function values at i,u
 */
declare function getBasisFunction(p: number, U: Array<number>, i: number, u: number): Array<number>;
/**
 * @hidden
 * Compute non-zero basis functions and their derivatives, upto and including
 * n'th derivative (n <= p). Output is 2-dimensional array \`ders\`
 * @param {number} p Degree
 * @param {number} u Parameter
 * @param {number} i Knot span
 * @param {Array.<number>} U Knot vector
 * @param {number} n nth derivative
 * @returns {Array.<Array<number>>} ders ders[k][j] is k'th derivative of
 *            basic function N(i-p+j,p), where 0<=k<=n and 0<=j<=p
 */
declare function getBasisFunctionDerivatives(p: number, u: number, i: number, U: Array<number>, n: number): Array<Array<number>>;
declare{ bernstein, findSpan, getBasisFunction, getBasisFunctionDerivatives };
`,
  fpath : "bluemath/lib/geom/nurbs/helper.d.ts"
}
,
{
  source : `
declare{ BSplineCurve, BSplineCurve2D, BSplineCurve3D };
`,
  fpath : "bluemath/lib/geom/nurbs/index.d.ts"
}
,
{
  source : `



export declare type NumberType = 'i8' | 'ui8' | 'i16' | 'ui16' | 'i32' | 'ui32' | 'f32' | 'f64';
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export declare const version = "0.2.11";
declare{ linalg, EPSILON, NDArray, Matrix, Vector, Vector2, Vector3, Complex, PermutationVector, BandMatrix, eye, zeros, iszero, isequal, torad, todeg, add, mul, sub, div };
`,
  fpath : "bluemath/lib/index.d.ts"
}
,
{
  source : `
declare{ asum, axpy };
`,
  fpath : "bluemath/lib/linalg/blas/index.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function asum(X: TypedArray): number;
/**
 * @hidden
 */
export declare function axpy(X: TypedArray, a: number, Y: TypedArray): void;
`,
  fpath : "bluemath/lib/linalg/blas/l1.d.ts"
}
,
{
  source : `

/**
 * Creates m-by-n Identity matrix
 *
 * \`\`\`
 * eye(2) // Creates 2x2 Identity matrix
 * eye([2,2]) // Creates 2x2 Identity matrix
 * eye([2,3]) // Create 2x3 Identity matrix with main diagonal set to 1
 * eye(2,'i32') // Creates 2x2 Identity matrix of 32-bit integers
 * \`\`\`
 */
export declare function eye(arg0: number | number[], datatype?: NumberType): NDArray;
/**
 * Creates NDArray filled with zeros
 *
 * \`\`\`
 * zeros(2) // Creates 2x2 matrix of zeros
 * zeros([2,2,2]) // Create 2x2x2 matrix of zeros
 * zeros(2,'i16') // Creates 2x2 matrix of 16-bit integers filled with zeros
 * \`\`\`
 */
export declare function zeros(arg0: number | number[], datatype?: NumberType): NDArray;
`,
  fpath : "bluemath/lib/linalg/construction.d.ts"
}
,
{
  source : `

declare{ inner, outer, matmul, triu, tril, cholesky, svd, norm, solve, rank, lstsq, lu_custom, slogdet, det, inv, qr, eig, lapack };
`,
  fpath : "bluemath/lib/linalg/index.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function dot(vx: TypedArray, vy: TypedArray): any;
`,
  fpath : "bluemath/lib/linalg/lapack/blasl1/dot.d.ts"
}
,
{
  source : `export declare function asum(): void;
export declare function dot(): any;
`,
  fpath : "bluemath/lib/linalg/lapack/blasl1.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function gemv(alpha: number, mA: TypedArray, m: number, n: number, vx: TypedArray, vy: TypedArray, beta: number): void;
`,
  fpath : "bluemath/lib/linalg/lapack/blasl2/gemv.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function gemm(mA: TypedArray, mB: TypedArray, mC: TypedArray, m: number, n: number, k: number, alpha: number, beta: number): void;
`,
  fpath : "bluemath/lib/linalg/lapack/blasl3/gemm.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare const SIZE_CHAR = 1;
/**
 * @hidden
 */
export declare const SIZE_INT = 4;
/**
 * @hidden
 */
export declare const SIZE_DOUBLE = 8;
/**
 * @hidden
 */
export declare const SIZE_SINGLE = 4;
/**
 * @hidden
 */
export declare const spotrf_wrap: any;
/**
 * @hidden
 */
export declare const dpotrf_wrap: any;
/**
 * @hidden
 */
export declare const sgesv_wrap: any;
/**
 * @hidden
 */
export declare const dgesv_wrap: any;
/**
 * @hidden
 */
export declare const sgemm_wrap: any;
/**
 * @hidden
 */
export declare const dgemm_wrap: any;
/**
 * @hidden
 */
export declare const dgemv_wrap: any;
/**
 * @hidden
 */
export declare const sgemv_wrap: any;
/**
 * @hidden
 */
export declare const sdot_wrap: any;
/**
 * @hidden
 */
export declare const ddot_wrap: any;
/**
 * @hidden
 */
export declare const dgesdd_wrap: any;
/**
 * @hidden
 */
export declare const sgesdd_wrap: any;
/**
 * @hidden
 */
export declare const sgeqrf_wrap: any;
/**
 * @hidden
 */
export declare const dgeqrf_wrap: any;
/**
 * @hidden
 */
export declare const sorgqr_wrap: any;
/**
 * @hidden
 */
export declare const dorgqr_wrap: any;
/**
 * @hidden
 */
export declare const dgelsd_wrap: any;
/**
 * @hidden
 */
export declare const sgetrf_wrap: any;
/**
 * @hidden
 */
export declare const dgetrf_wrap: any;
/**
 * @hidden
 */
export declare const sgeev_wrap: any;
/**
 * @hidden
 */
export declare const dgeev_wrap: any;
/**
 * @hidden
 */
export declare function defineEmVariable(type: 'i8' | 'i32' | 'f32' | 'f64', init?: number): number;
/**
 * @hidden
 */
export declare function defineEmArrayVariable(type: 'i8' | 'i32' | 'f32' | 'f64', len: number, init?: TypedArray): [number, TypedArray];
`,
  fpath : "bluemath/lib/linalg/lapack/common.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function geev(A: TypedArray, n: number, compleft: boolean, compright: boolean): Int8Array[];
`,
  fpath : "bluemath/lib/linalg/lapack/geev.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function gelsd(mA: TypedArray, m: number, n: number, nrhs: number, rcond: number, mB: TypedArray, mS: TypedArray): number;
`,
  fpath : "bluemath/lib/linalg/lapack/gelsd.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function geqrf(mA: TypedArray, m: number, n: number, mTau: TypedArray): void;
`,
  fpath : "bluemath/lib/linalg/lapack/geqrf.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function gesdd(mA: TypedArray, m: number, n: number, mU: TypedArray, mS: TypedArray, mVT: TypedArray, job: 'A' | 'N' | 'S'): void;
`,
  fpath : "bluemath/lib/linalg/lapack/gesdd.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function gesv(mA: TypedArray, mB: TypedArray, n: number, nrhs: number): TypedArray;
`,
  fpath : "bluemath/lib/linalg/lapack/gesv.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function getrf(mA: TypedArray, m: number, n: number, mipiv: TypedArray): void;
`,
  fpath : "bluemath/lib/linalg/lapack/getrf.d.ts"
}
,
{
  source : `










declare{ dot, gemv, gemm, gesv, geev, gesdd, gelsd, getrf, geqrf, orgqr, potrf };
`,
  fpath : "bluemath/lib/linalg/lapack/index.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function orgqr(mA: TypedArray, m: number, n: number, k: number, mtau: TypedArray): void;
`,
  fpath : "bluemath/lib/linalg/lapack/orgqr.d.ts"
}
,
{
  source : `
/**
 * @hidden
 */
export declare function potrf(mA: TypedArray, n: number): void;
`,
  fpath : "bluemath/lib/linalg/lapack/potrf.d.ts"
}
,
{
  source : `
/**
 * Matrix multiplication
 *
 * At least one of the arguments has to be 2D matrix (i.e. shape mxn).
 * The other argument could be a 1D vector. It will be implicitly used
 * as 1xn matrix
 */
export declare function matmul(A: NDArray, B: NDArray): NDArray;
/**
 * Computes p-norm of given Matrix or Vector
 * \`A\` must be a Vector (1D) or Matrix (2D)
 * Norm is defined for certain values of \`p\`
 *
 * If \`A\` is a Vector
 *
 * $$ \left\Vert A \right\Vert = \max_{0 \leq i < n}  \lvert a_i \rvert, p = \infty  $$
 *
 * $$ \left\Vert A \right\Vert = \min_{0 \leq i < n}  \lvert a_i \rvert, p = -\infty  $$
 *
 * $$ \left\Vert A \right\Vert = \( \lvert a_0 \rvert^p + \ldots + \lvert a_n \rvert^p \)^{1/p}, p>=1 $$
 *
 * If \`A\` is a Matrix
 *
 * p = 'fro' will return Frobenius norm
 *
 * $$ \left\Vert A \right\Vert\_F = \sqrt { \sum\_{i=0}^m \sum\_{j=0}^n \lvert a\_{ij} \rvert ^2 } $$
 *
 */
export declare function norm(A: NDArray, p?: number | 'fro'): number;
/**
 * @hidden
 * Perform LU decomposition
 *
 * $$ A = P L U $$
 */
export declare function lu_custom(A: NDArray): NDArray;
/**
 * @hidden
 * Ref: Golub-Loan 3.1.1
 * System of equations that forms lower triangular system can be solved by
 * forward substitution.
 *   [ l00  0  ] [x0]  = [b0]
 *   [ l10 l11 ] [x1]    [b1]
 * Caller must ensure this matrix is Lower triangular before calling this
 * routine. Otherwise, undefined behavior
 */
/**
 * @hidden
 * System of equations that forms upper triangular system can be solved by
 * backward substitution.
 *   [ u00 u01 ] [x0]  = [b0]
 *   [ 0   u11 ] [x1]    [b1]
 * Caller must ensure this matrix is Upper triangular before calling this
 * routine. Otherwise, undefined behavior
 */
/**
 * @hidden
 * Apply permutation to vector
 * @param V Vector to undergo permutation (changed in place)
 * @param p Permutation vector
 */
/**
 * @hidden
 * Apply inverse permutation to vector
 * @param V Vector to undergo inverse permutation (changed in place)
 * @param p Permutation vector
 */
/**
 * Solves a system of linear scalar equations,
 * Ax = B
 * It computes the 'exact' solution for x. A is supposed to be well-
 * determined, i.e. full rank.
 * (Uses LAPACK routine \`gesv\`)
 * @param A Coefficient matrix (gets modified)
 * @param B RHS (populated with solution x upon return)
 */
export declare function solve(A: NDArray, B: NDArray): void;
/**
 * Computes inner product of two 1D vectors (same as dot product).
 * Both inputs are supposed to be 1 dimensional arrays of same length.
 * If they are not same length, A.data.length must be <= B.data.length
 * Only first A.data.length elements of array B are used in case it's
 * longer than A
 * @param A 1D Vector
 * @param B 1D Vector
 */
export declare function inner(A: NDArray, B: NDArray): number;
/**
 * Compute outer product of two vectors
 * @param A Vector of shape [m] or [m,1]
 * @param B Vector of shape [n] or [1,n]
 * @returns NDArray Matrix of dimension [m,n]
 */
export declare function outer(A: NDArray, B: NDArray): NDArray;
/**
 * Perform Cholesky decomposition on given Matrix
 */
export declare function cholesky(A: NDArray): NDArray;
/**
 * Singular Value Decomposition
 * Factors the given matrix A, into U,S,VT such that
 * A = U * diag(S) * VT
 * U and VT are Unitary matrices, S is 1D array of singular values of A
 * @param A Matrix to decompose Shape (m,n)
 * @param full_matrices If true, U and VT have shapes (m,m) and (n,n) resp.
 *  Otherwise the shapes are (m,k) and (k,n), resp. where k = min(m,n)
 * @param compute_uv Whether or not to compute U,VT in addition to S
 * @return [NDArray] [U,S,VT] if compute_uv = true, [S] otherwise
 */
export declare function svd(A: NDArray, full_matrices?: boolean, compute_uv?: boolean): NDArray[];
/**
 * Rank of a matrix is defined by number of singular values of the matrix that
 * are non-zero (within given tolerance)
 * @param A Matrix to determine rank of
 * @param tol Tolerance for zero-check of singular values
 */
export declare function rank(A: NDArray, tol?: number): number;
declareinterface lstsq_return {
    /**
     * Least-squares solution. If \`b\` is two-dimensional,
     * the solutions are in the \`K\` columns of \`x\`.
     */
    x: NDArray;
    /**
     * Sums of residuals; squared Euclidean 2-norm for each column in
     * \`\`b - a*x\`\`.
     * If the rank of \`a\` is < N or m <= n, this is an empty array.
     * If \`b\` is 1-dimensional, this is a (1,) shape array.
     * Otherwise the shape is (k,).
     * TODO: WIP
     */
    residuals: NDArray;
    /**
     * Rank of coefficient matrix A
     */
    rank: number;
    /**
     * Singular values of coefficient matrix A
     */
    singulars: NDArray;
}
/**
 * Return the least-squares solution to a linear matrix equation.
 *
 * Solves the equation \`a x = b\` by computing a vector \`x\` that
 * minimizes the Euclidean 2-norm \`|| b - a x ||^2\`.  The equation may
 * be under-, well-, or over- determined (i.e., the number of
 * linearly independent rows of \`a\` can be less than, equal to, or
 * greater than its number of linearly independent columns).  If \`a\`
 * is square and of full rank, then \`x\` (but for round-off error) is
 * the "exact" solution of the equation.
 *
 * @param A Coefficient matrix (m-by-n)
 * @param B Values on RHS of equation system. Could be array of length
 *          m or it could be 2D with dimensions m-by-k
 * @param rcond Cut-off ratio for small singular values of \`a\`
 */
export declare function lstsq(A: NDArray, B: NDArray, rcond?: number): lstsq_return;
/**
 * Compute sign and natural logarithm of the determinant of given Matrix
 * If an array has a very small or very large determinant, then a call to
 * \`det\` may overflow or underflow. This routine is more robust against such
 * issues, because it computes the logarithm of the determinant rather than
 * the determinant itself.
 * @param A Square matrix to compute sign and log-determinant of
 */
export declare function slogdet(A: NDArray): number[];
/**
 * Compute determinant of a matrix
 * @param A Square matrix to compute determinant
 */
export declare function det(A: NDArray): number;
/**
 * Compute (multiplicative) inverse of given matrix
 * @param A Square matrix whose inverse is to be found
 */
export declare function inv(A: NDArray): NDArray;
/**
 * Create Lower triangular matrix from given matrix
 */
export declare function tril(A: NDArray, k?: number): NDArray;
/**
 * Return Upper triangular matrix from given matrix
 */
export declare function triu(A: NDArray, k?: number): NDArray;
/**
 * Compute QR decomposition of given Matrix
 */
export declare function qr(A: NDArray): NDArray[];
/**
 * Compute Eigen values and left, right eigen vectors of given Matrix
 */
export declare function eig(A: NDArray): NDArray[];
`,
  fpath : "bluemath/lib/linalg/operations.d.ts"
}
,
{
  source : `
/**
 * Matrix multiplication
 *
 * At least one of the arguments has to be 2D matrix (i.e. shape mxn).
 * The other argument could be a 1D vector. It will be implicitly used
 * as 1xn matrix
 */
export declare function matmul(A: NDArray, B: NDArray): NDArray;
/**
 * Computes p-norm of given Matrix or Vector
 * \`A\` must be a Vector (1D) or Matrix (2D)
 * Norm is defined for certain values of \`p\`
 *
 * If \`A\` is a Vector
 *
 * $$ \left\Vert A \right\Vert = \max_{0 \leq i < n}  \lvert a_i \rvert, p = \infty  $$
 *
 * $$ \left\Vert A \right\Vert = \min_{0 \leq i < n}  \lvert a_i \rvert, p = -\infty  $$
 *
 * $$ \left\Vert A \right\Vert = \( \lvert a_0 \rvert^p + \ldots + \lvert a_n \rvert^p \)^{1/p}, p>=1 $$
 *
 * If \`A\` is a Matrix
 *
 * p = 'fro' will return Frobenius norm
 *
 * $$ \left\Vert A \right\Vert\_F = \sqrt { \sum\_{i=0}^m \sum\_{j=0}^n \lvert a\_{ij} \rvert ^2 } $$
 *
 */
export declare function norm(A: NDArray, p?: number | 'fro'): number;
/**
 * @hidden
 * Perform LU decomposition
 *
 * $$ A = P L U $$
 */
export declare function lu_custom(A: NDArray): NDArray;
/**
 * @hidden
 * Ref: Golub-Loan 3.1.1
 * System of equations that forms lower triangular system can be solved by
 * forward substitution.
 *   [ l00  0  ] [x0]  = [b0]
 *   [ l10 l11 ] [x1]    [b1]
 * Caller must ensure this matrix is Lower triangular before calling this
 * routine. Otherwise, undefined behavior
 */
/**
 * @hidden
 * System of equations that forms upper triangular system can be solved by
 * backward substitution.
 *   [ u00 u01 ] [x0]  = [b0]
 *   [ 0   u11 ] [x1]    [b1]
 * Caller must ensure this matrix is Upper triangular before calling this
 * routine. Otherwise, undefined behavior
 */
/**
 * @hidden
 * Apply permutation to vector
 * @param V Vector to undergo permutation (changed in place)
 * @param p Permutation vector
 */
/**
 * @hidden
 * Apply inverse permutation to vector
 * @param V Vector to undergo inverse permutation (changed in place)
 * @param p Permutation vector
 */
/**
 * Solves a system of linear scalar equations,
 * Ax = B
 * It computes the 'exact' solution for x. A is supposed to be well-
 * determined, i.e. full rank.
 * (Uses LAPACK routine \`gesv\`)
 * @param A Coefficient matrix (gets modified)
 * @param B RHS (populated with solution x upon return)
 */
export declare function solve(A: NDArray, B: NDArray): void;
/**
 * Computes inner product of two 1D vectors (same as dot product).
 * Both inputs are supposed to be 1 dimensional arrays of same length.
 * If they are not same length, A.data.length must be <= B.data.length
 * Only first A.data.length elements of array B are used in case it's
 * longer than A
 * @param A 1D Vector
 * @param B 1D Vector
 */
export declare function inner(A: NDArray, B: NDArray): number;
/**
 * Compute outer product of two vectors
 * @param A Vector of shape [m] or [m,1]
 * @param B Vector of shape [n] or [1,n]
 * @returns NDArray Matrix of dimension [m,n]
 */
export declare function outer(A: NDArray, B: NDArray): NDArray;
/**
 * Perform Cholesky decomposition on given Matrix
 */
export declare function cholesky(A: NDArray): NDArray;
/**
 * Singular Value Decomposition
 * Factors the given matrix A, into U,S,VT such that
 * A = U * diag(S) * VT
 * U and VT are Unitary matrices, S is 1D array of singular values of A
 * @param A Matrix to decompose Shape (m,n)
 * @param full_matrices If true, U and VT have shapes (m,m) and (n,n) resp.
 *  Otherwise the shapes are (m,k) and (k,n), resp. where k = min(m,n)
 * @param compute_uv Whether or not to compute U,VT in addition to S
 * @return [NDArray] [U,S,VT] if compute_uv = true, [S] otherwise
 */
export declare function svd(A: NDArray, full_matrices?: boolean, compute_uv?: boolean): NDArray[];
/**
 * Rank of a matrix is defined by number of singular values of the matrix that
 * are non-zero (within given tolerance)
 * @param A Matrix to determine rank of
 * @param tol Tolerance for zero-check of singular values
 */
export declare function rank(A: NDArray, tol?: number): number;
declareinterface lstsq_return {
    /**
     * Least-squares solution. If \`b\` is two-dimensional,
     * the solutions are in the \`K\` columns of \`x\`.
     */
    x: NDArray;
    /**
     * Sums of residuals; squared Euclidean 2-norm for each column in
     * \`\`b - a*x\`\`.
     * If the rank of \`a\` is < N or m <= n, this is an empty array.
     * If \`b\` is 1-dimensional, this is a (1,) shape array.
     * Otherwise the shape is (k,).
     * TODO: WIP
     */
    residuals: NDArray;
    /**
     * Rank of coefficient matrix A
     */
    rank: number;
    /**
     * Singular values of coefficient matrix A
     */
    singulars: NDArray;
}
/**
 * Return the least-squares solution to a linear matrix equation.
 *
 * Solves the equation \`a x = b\` by computing a vector \`x\` that
 * minimizes the Euclidean 2-norm \`|| b - a x ||^2\`.  The equation may
 * be under-, well-, or over- determined (i.e., the number of
 * linearly independent rows of \`a\` can be less than, equal to, or
 * greater than its number of linearly independent columns).  If \`a\`
 * is square and of full rank, then \`x\` (but for round-off error) is
 * the "exact" solution of the equation.
 *
 * @param A Coefficient matrix (m-by-n)
 * @param B Values on RHS of equation system. Could be array of length
 *          m or it could be 2D with dimensions m-by-k
 * @param rcond Cut-off ratio for small singular values of \`a\`
 */
export declare function lstsq(A: NDArray, B: NDArray, rcond?: number): lstsq_return;
/**
 * Compute sign and natural logarithm of the determinant of given Matrix
 * If an array has a very small or very large determinant, then a call to
 * \`det\` may overflow or underflow. This routine is more robust against such
 * issues, because it computes the logarithm of the determinant rather than
 * the determinant itself.
 * @param A Square matrix to compute sign and log-determinant of
 */
export declare function slogdet(A: NDArray): number[];
/**
 * Compute determinant of a matrix
 * @param A Square matrix to compute determinant
 */
export declare function det(A: NDArray): number;
/**
 * Compute (multiplicative) inverse of given matrix
 * @param A Square matrix whose inverse is to be found
 */
export declare function inv(A: NDArray): NDArray;
/**
 * Create Lower triangular matrix from given matrix
 */
export declare function tril(A: NDArray, k?: number): NDArray;
/**
 * Return Upper triangular matrix from given matrix
 */
export declare function triu(A: NDArray, k?: number): NDArray;
/**
 * Compute QR decomposition of given Matrix
 */
export declare function qr(A: NDArray): NDArray[];
/**
 * Compute Eigen values and left, right eigen vectors of given Matrix
 */
export declare function eig(A: NDArray): NDArray[];
`,
  fpath : "bluemath/lib/linalg/ops.d.ts"
}
,
{
  source : `
/**
 * Convert angle to degrees
 */
export declare function todeg(angleInRadians: number): number;
/**
 * Convert angle to radians
 */
export declare function torad(angleInDegrees: number): number;
/**
 * Check if input equals zero within given tolerance
 */
export declare function iszero(x: number, tolerance?: number): boolean;
/**
 * Check if two input numbers are equal within given tolerance
 */
export declare function isequal(a: number, b: number, tolerance?: number): boolean;
/**
 * Find cube root of given number. Math.pow return NaN while taking
 * cube root of negative number, because some of the results might
 * be complex numbers. This function only return the real cubeRoot
 * of given number
 */
export declare function cuberoot(x: number): number;
/**
 * Generate array of integers within given range.
 * If both a and b are specified then return [a,b)
 * if only a is specifed then return [0,a)
 */
export declare function range(a: number, b?: number): number[];
/**
 * Creates m-by-n Identity matrix
 *
 * \`\`\`
 * eye(2) // Creates 2x2 Identity matrix
 * eye([2,2]) // Creates 2x2 Identity matrix
 * eye([2,3]) // Create 2x3 Identity matrix with main diagonal set to 1
 * eye(2,'i32') // Creates 2x2 Identity matrix of 32-bit integers
 * \`\`\`
 */
export declare function eye(arg0: number | number[], datatype?: NumberType): NDArray;
/**
 * Creates NDArray filled with zeros
 *
 * \`\`\`
 * zeros(2) // Creates 2x2 matrix of zeros
 * zeros([2,2,2]) // Create 2x2x2 matrix of zeros
 * zeros(2,'i16') // Creates 2x2 matrix of 16-bit integers filled with zeros
 * \`\`\`
 */
export declare function zeros(arg0: number | number[], datatype?: NumberType): NDArray;
/**
 * Add all arguments in accordance to their types
 * The arguments could be NDArray or numbers (real/complex).
 * If some of them are NDArray's, then their shapes have to match,
 * otherwise exception is thrown
 * The order of addition starts from left to right
 */
export declare function add(...args: (NDArray | number | Complex)[]): number | NDArray | Complex;
/**
 * Multiply all arguments in accordance with their data types
 * Each argument can be a number (real or complex) or NDArray.
 * If some of the arguments are NDArrays, then their shapes should
 * be compatible with the other operand of multiplication operation,
 * otherwise an exception is thrown
 * The order of multiplication starts from left to right
 */
export declare function mul(...args: (NDArray | number | Complex)[]): number | NDArray | Complex;
/**
 * Subtract second argument from first
 * The arguments could be a number (real or complex) or NDArray.
 * If some of the arguments are NDArrays, then their shapes should
 * be compatible with the other operand of subtraction operation,
 * otherwise an exception is thrown
 */
export declare function sub(a: number | Complex | NDArray, b: number | Complex | NDArray): number | NDArray | Complex;
/**
 * Divide first argument by second
 * The first argument can be a number (real or complex) or NDArray.
 * The second argument can be a number (real or complex)
 */
export declare function div(a: number | Complex | NDArray, b: number | Complex): number | NDArray | Complex;
`,
  fpath : "bluemath/lib/ops.d.ts"
}
,
{
  source : `
declare{ minimize };
`,
  fpath : "bluemath/lib/optimize/index.d.ts"
}
,
{
  source : `export declare function minimize(): void;
`,
  fpath : "bluemath/lib/optimize/minimize.d.ts"
}
,
{
  source : `/**
 * @hidden
 * Convert angle to degrees
 */
export declare function toDeg(angleInRadians: number): number;
/**
 * @hidden
 * Convert angle to radians
 */
export declare function toRad(angleInDegrees: number): number;
/**
 * Check if input equals zero within given tolerance
 */
export declare function iszero(x: number, tolerance?: number): boolean;
/**
 * Check if two input numbers are equal within given tolerance
 */
export declare function isequal(a: number, b: number, tolerance?: number): boolean;
/**
 * @hidden
 * Find cube root of given number. Math.pow return NaN while taking
 * cube root of negative number, because some of the results might
 * be complex numbers. This function only return the real cubeRoot
 * of given number
 */
export declare function cuberoot(x: number): number;
`,
  fpath : "bluemath/lib/utils.d.ts"
}

]
