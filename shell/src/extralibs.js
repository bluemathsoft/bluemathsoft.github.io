
var EXTRA_LIBS = `
declare namespace bluemath {

  const version = "0.4.3";

  namespace common {

    type NumberType = 'i8' | 'ui8' | 'i16' | 'ui16' | 'i32' | 'ui32' | 'f32' | 'f64';
    type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

    class AABB {
      private _min;
      private _max;
      constructor(arg0: number | number[] | TypedArray, arg1?: number[] | TypedArray);
      readonly min: NDArray;
      readonly max: NDArray;
      /**
       * Update this AABB to include given coordinate
       */
      update(coord: number[] | NDArray): void;
      merge(other: AABB): void;
    }

    class Complex {
      real: number;
      imag: number;
      constructor(real?: number, imag?: number);
      clone(): Complex;
      inverse(): Complex;
      isEqual(other: Complex, tolerance?: number): boolean;
      toString(precision?: number): string;
    }

    const EPSILON = 0.000001;

    interface NDArrayOptions {
      shape?: number[];
      datatype?: NumberType;
      fill?: number;
      idata?: number[];
    }

    class NDArray {
      /**
       * Array of array dimensions. First being the outermost dimension.
       */
      private _shape;
      /**
       * Size of the data (i.e. number of real/complex numbers stored
       * in this array)
       */
      private _size;
      /**
       * Data type of each number, specified by a string code
       */
      private _datatype;
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
      readonly shape: number[];
      readonly size: number;
      is1D(): boolean;
      is2D(): boolean;
      /**
       * Number of elements in outermost (i.e. 0th) dimension
       */
      readonly length: number;
      readonly data: TypedArray;
      readonly datatype: NumberType;
      /**
       * Set new shape for the data stored in the array
       * The old data remains intact. If the total size with the new shape
       * is larger than the old size, then excess elements of the data are
       * fill with zero.
       * @param shape New shape
       */
      reshape(shape: number[]): this;
      /**
       * Create deep copy of the array
       */
      clone(): NDArray;
      private _calcSize();
      private _alloc(size, data?, datatype?);
      _indexToAddress(...indices: number[]): number;
      /**
       * @hidden
       */
      private static mapAddressToIndex(addr, shape);
      /**
       * @hidden
       */
      _addressToIndex(addr: number): any[];
      /**
       * Create nested array
       */
      toArray(): any;
      /**
       * Set all members of this array to given value
       */
      fill(value: number): void;
      private isSliceIndex(index);
      /**
       * Set member at given index
       * All but the last argument should specify the index.
       * The last argument is the value to set.
       */
      set(...args: (number | Complex | string | undefined | null | NDArray)[]): void;
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
       * @hidden
       */
      private static areShapesEqual(shape1, shape2);
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
      private createSliceRecipe(slices);
      private computeSliceShapeAndSize(slice_recipe);
      /**
       * Shorthand for get(...) method to avoid casting to <number>
       */
      getN(...slices: (string | number | undefined | null)[]): number;
      /**
       * Shorthand for get(...) method to avoid casting to <NDArray>
       */
      getA(...slices: (string | number | undefined | null)[]): NDArray;
      /**
       * Shorthand for get(...) method to avoid casting to <Complex>
       */
      getC(...slices: (string | number | undefined | null)[]): Complex;
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
       * * No support for \`<start>:<stop>:<step>\` format yet
       */
      get(...slices: (string | number | undefined | null)[]): NDArray | number | Complex;
      /**
       * @hidden
       */
      take(indices: number[], axis: number): NDArray;
      /**
       * @hidden
       */
      max(axis?: number | number[]): number | NDArray;
      /**
       * @hidden
       */
      min(): void;
      /**
       * @hidden
       */
      mean(): void;
      /**
       * @hidden
       */
      all(): void;
      /**
       * @hidden
       */
      any(): void;
      /**
       * @hidden
       */
      sort(): void;
      /**
       * @hidden
       */
      argsort(): void;
      copyfrom(other: NDArray): void;
      copyto(other: NDArray): void;
      toString(precision?: number): any;
      toHTML(precision?: number): any;
    }

    /**
     * Convert angle to degrees
     */
    function todeg(angleInRadians: number): number;
    /**
     * Convert angle to radians
     */
    function torad(angleInDegrees: number): number;
    /**
     * Check if input equals zero within given tolerance
     */
    function iszero(x: number, tolerance?: number): boolean;
    /**
     * Check if two input numbers are equal within given tolerance
     */
    function isequal(a: number, b: number, tolerance?: number): boolean;
    /**
     * Find cube root of given number. Math.pow return NaN while taking
     * cube root of negative number, because some of the results might
     * be complex numbers. This function only return the real cubeRoot
     * of given number
     */
    function cuberoot(x: number): number;
    /**
     * Generate array of integers within given range.
     * If both a and b are specified then return [a,b)
     * if only a is specifed then return [0,a)
     */
    function range(a: number, b?: number): NDArray;
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
    function eye(arg0: number | number[], datatype?: NumberType): NDArray;
    function count(arr: NDArray, item: number, tolerance?: number): number;
    /**
     * Creates NDArray filled with zeros
     *
     * \`\`\`
     * zeros(2) // Creates array of zeros of length 2
     * zeros([2,2,2]) // Create 2x2x2 matrix of zeros
     * zeros(2,'i16') // Creates array of 2 16-bit integers filled with zeros
     * \`\`\`
     */
    function zeros(arg0: number | number[], datatype?: NumberType): NDArray;
    /**
     * Creates empty NDArray of given shape or of given length if argument is
     * a number
     */
    function empty(arg0: number | number[], datatype?: NumberType): NDArray;
    /**
     * Shorthand method to create new NDArray object from Javascript Array
     */
    function arr(arg: any[]): NDArray;
    /**
     * Compute dot product of A and B, where both of them are 1D vectors of
     * same length
     */
    function dot(A: NDArray, B: NDArray): number;
    /**
     * Computes cross product of A and B
     * Only defined for A and B to 1D vectors of length at least 3
     * Only first 3 elements of A and B are used
     */
    function cross(A: NDArray, B: NDArray): NDArray;
    /**
     * Computes length or magnitude of A, where A is a 1D vector
     */
    function length(A: NDArray): number;
    /**
     * Computes direction vector of A, where A is a 1D vector
     */
    function dir(A: NDArray): NDArray;
    /**
     * Add all arguments in accordance to their types
     * The arguments could be NDArray or numbers (real/complex).
     * If some of them are NDArray's, then their shapes have to match,
     * otherwise exception is thrown
     * The order of addition starts from left to right
     */
    function add(...args: (NDArray | number | Complex)[]): number | Complex | NDArray;
    /**
     * Multiply all arguments in accordance with their data types
     * Each argument can be a number (real or complex) or NDArray.
     * If some of the arguments are NDArrays, then their shapes should
     * be compatible with the other operand of multiplication operation,
     * otherwise an exception is thrown
     * The order of multiplication starts from left to right
     */
    function mul(...args: (NDArray | number | Complex)[]): number | Complex | NDArray;
    /**
     * Subtract second argument from first
     * The arguments could be a number (real or complex) or NDArray.
     * If some of the arguments are NDArrays, then their shapes should
     * be compatible with the other operand of subtraction operation,
     * otherwise an exception is thrown
     */
    function sub(a: number | Complex | NDArray, b: number | Complex | NDArray): number | Complex | NDArray;
    /**
     * Divide first argument by second
     * The first argument can be a number (real or complex) or NDArray.
     * The second argument can be a number (real or complex)
     */
    function div(a: number | Complex | NDArray, b: number | Complex): number | Complex | NDArray;

  }

  namespace linalg {

    /**
     * Matrix multiplication
     *
     * At least one of the arguments has to be 2D matrix (i.e. shape mxn).
     * The other argument could be a 1D vector. It will be implicitly used
     * as 1xn matrix
     */
    function matmul(A: bluemath.common.NDArray, B: bluemath.common.NDArray): bluemath.common.NDArray;
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
    function norm(A: bluemath.common.NDArray, p?: number | 'fro'): number;
    /**
     * @hidden
     * Perform LU decomposition
     *
     * $$ A = P L U $$
     */
    function lu_custom(A: bluemath.common.NDArray): bluemath.common.NDArray;
    /**
     * Solves a system of linear scalar equations,
     * Ax = B
     * It computes the 'exact' solution for x. A is supposed to be well-
     * determined, i.e. full rank.
     * (Uses LAPACK routine \`gesv\`)
     * @param A Coefficient matrix (gets modified)
     * @param B RHS (populated with solution x upon return)
     */
    function solve(A: bluemath.common.NDArray, B: bluemath.common.NDArray): void;
    /**
     * Computes inner product of two 1D vectors (same as dot product).
     * Both inputs are supposed to be 1 dimensional arrays of same length.
     * If they are not same length, A.data.length must be <= B.data.length
     * Only first A.data.length elements of array B are used in case it's
     * longer than A
     * @param A 1D Vector
     * @param B 1D Vector
     */
    function inner(A: bluemath.common.NDArray, B: bluemath.common.NDArray): number;
    /**
     * Compute outer product of two vectors
     * @param A Vector of shape [m] or [m,1]
     * @param B Vector of shape [n] or [1,n]
     * @returns NDArray Matrix of dimension [m,n]
     */
    function outer(A: bluemath.common.NDArray, B: bluemath.common.NDArray): bluemath.common.NDArray;
    /**
     * Perform Cholesky decomposition on given Matrix
     */
    function cholesky(A: bluemath.common.NDArray): bluemath.common.NDArray;
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
    function svd(A: bluemath.common.NDArray, full_matrices?: boolean, compute_uv?: boolean): bluemath.common.NDArray[];
    /**
     * Rank of a matrix is defined by number of singular values of the matrix that
     * are non-zero (within given tolerance)
     * @param A Matrix to determine rank of
     * @param tol Tolerance for zero-check of singular values
     */
    function rank(A: bluemath.common.NDArray, tol?: number): number;

    interface lstsq_return {
      /**
       * Least-squares solution. If \`b\` is two-dimensional,
       * the solutions are in the \`K\` columns of \`x\`.
       */
      x: bluemath.common.NDArray;
      /**
       * Sums of residuals; squared Euclidean 2-norm for each column in
       * \`\`b - a*x\`\`.
       * If the rank of \`a\` is < N or m <= n, this is an empty array.
       * If \`b\` is 1-dimensional, this is a (1,) shape array.
       * Otherwise the shape is (k,).
       * TODO: WIP
       */
      residuals: bluemath.common.NDArray;
      /**
       * Rank of coefficient matrix A
       */
      rank: number;
      /**
       * Singular values of coefficient matrix A
       */
      singulars: bluemath.common.NDArray;
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
    function lstsq(A: bluemath.common.NDArray, B: bluemath.common.NDArray, rcond?: number): lstsq_return;
    /**
     * Compute sign and natural logarithm of the determinant of given Matrix
     * If an array has a very small or very large determinant, then a call to
     * \`det\` may overflow or underflow. This routine is more robust against such
     * issues, because it computes the logarithm of the determinant rather than
     * the determinant itself.
     * @param A Square matrix to compute sign and log-determinant of
     */
    function slogdet(A: bluemath.common.NDArray): number[];
    /**
     * Compute determinant of a matrix
     * @param A Square matrix to compute determinant
     */
    function det(A: bluemath.common.NDArray): number;
    /**
     * Compute (multiplicative) inverse of given matrix
     * @param A Square matrix whose inverse is to be found
     */
    function inv(A: bluemath.common.NDArray): bluemath.common.NDArray;
    /**
     * Create Lower triangular matrix from given matrix
     */
    function tril(A: bluemath.common.NDArray, k?: number): bluemath.common.NDArray;
    /**
     * Return Upper triangular matrix from given matrix
     */
    function triu(A: bluemath.common.NDArray, k?: number): bluemath.common.NDArray;
    /**
     * Compute QR decomposition of given Matrix
     */
    function qr(A: bluemath.common.NDArray): bluemath.common.NDArray[];
    /**
     * Compute Eigen values and left, right eigen vectors of given Matrix
     */
    function eig(A: bluemath.common.NDArray): bluemath.common.NDArray[];

  }

  namespace geom {
    class Axis {
        origin: bluemath.common.NDArray;
        z: bluemath.common.NDArray;
    }
    class CoordSystem {
        origin: bluemath.common.NDArray;
        z: bluemath.common.NDArray;
        x: bluemath.common.NDArray;
        y: bluemath.common.NDArray;
        constructor(origin: bluemath.common.NDArray | number[], x: bluemath.common.NDArray | number[], z: bluemath.common.NDArray | number[]);
    }

    namespace nurbs {

      /**
       * Rational or polynomial bezier curve
       * If the weights are specified it's a rational Bezier curve
       */
      class BezierCurve {
        degree: number;
        cpoints: bluemath.common.NDArray;
        weights?: bluemath.common.NDArray;
        constructor(degree: number, cpoints: bluemath.common.NDArray, weights?: bluemath.common.NDArray);
        /**
         * Dimension of the curve. Typically 2D or 3D
         */
        readonly dimension: number;
        /**
         * If the control points are defined in 2D plane, then add z=0 to each
         * of them to define them in 3D space
         */
        to3D(): void;
        /**
         * Is this Rational Bezier Curve
         */
        isRational(): boolean;
        /**
         * Evaluate the Bezier curve at given parameter value
         * Place the evaluated point in the \`tess\` array at \`tessidx\`
         */
        evaluate(u: number, tess?: bluemath.common.NDArray, tessidx?: number): null;
        /**
         * Tessellate the Bezier curve uniformly at given resolution
         */
        tessellate(resolution?: number): bluemath.common.NDArray;
        /**
         * The curve is subdivided into two curves at the mipoint of parameter
         * range. This is done recursively until the curve becomes a straight line
         * within given tolerance.
         * The subdivision involves reparameterizing the curve, which is done using
         * blossoming or deCasteljau formula.
         */
        private static tessBezier(bezcrv, tolerance);
        /**
         * Tessellate bezier curve adaptively, within given tolerance of error
         */
        tessellateAdaptive(tolerance?: number): bluemath.common.NDArray;
        /**
         * Checks if this Bezier curve is approximately a straight line within
         * given tolerance.
         */
        isLine(tolerance?: number): boolean;
        /**
         * Reparameterize the bezier curve within new parametric interval.
         * It uses the blossoming technique.
         */
        reparam(ua: number, ub: number): void;
        aabb(): bluemath.common.AABB;
        clone(): BezierCurve;
        /**
         * Split into two Bezier curves at given parametric value
         */
        split(uk: number): BezierCurve[];
        toString(): string;
      }
      /**
       * Rational BSpline Curve
       */
      class BSplineCurve {
        degree: number;
        cpoints: bluemath.common.NDArray;
        knots: bluemath.common.NDArray;
        weights?: bluemath.common.NDArray;
        constructor(degree: number, cpoints: bluemath.common.NDArray, knots: bluemath.common.NDArray, weights?: bluemath.common.NDArray);
        /**
         * Determines how many dimension the curve occupies based on shape of
         * Control points array
         */
        readonly dimension: number;
        /**
         * Convert 2D control points to 3D
         */
        to3D(): void;
        /**
         * Split the curve at given parameter value and return two bspline
         * curves. The two curves put together will exactly represent the
         * original curve.
         */
        split(uk: number): BSplineCurve[];
        /**
         * Replace the knots of this BSplineCurve with new knots
         */
        setKnots(knots: bluemath.common.NDArray): void;
        /**
         * Set the knot at given index in the knot vector
         */
        setKnot(index: number, knot: number): void;
        /**
         * Set the weight at given index
         */
        setWeight(index: number, weight: number): void;
        /**
         * Is this Rational BSpline Curve. Determined based on whether weights
         * were specified while constructing this BSplineCurve
         */
        isRational(): boolean;
        /**
         * Evaluate basis function derivatives upto n'th
         */
        private evaluateBasisDerivatives(span, n, t);
        private evaluateBasis(span, t);
        private findSpan(t);
        private getTermDenominator(span, N);
        /**
         * Tesselate basis functions uniformly at given resolution
         */
        tessellateBasis(resolution?: number): bluemath.common.NDArray;
        private static tessBSpline(bcrv, tolerance);
        /**
         * Tessellate this BSplineCurve adaptively within given tolerance of error
         */
        tessellateAdaptive(tolerance?: number): bluemath.common.NDArray;
        /**
         * Checks if this Bezier curve is approximately a straight line within
         * given tolerance.
         */
        isLine(tolerance?: number): boolean;
        /**
         * Inserts knot un in the knot vector r-times
         * Algorithm A5.1 from "The NURBS Book"
         */
        insertKnot(un: number, r: number): void;
        /**
         * Inserts multiple knots into the knot vector at once
         * Algorithm A5.4 from "The NURBS Book"
         * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
         */
        refineKnots(ukList: number[]): void;
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
        decompose(): BezierCurve[];
        /**
         * Evaluate the BSplineCurve at given parameter value
         * If \`tess\` parameter is provided then the evaluated value is
         * placed in the \`tess\` array at index \`tessidx\`. Otherwise the single
         * euclidean point is returned.
         */
        evaluate(t: number, tess?: bluemath.common.NDArray, tessidx?: number): bluemath.common.NDArray | null;
        /**
         * Evaluate the derivative of BSplineCurve at given parameter value
         * If \`tess\` parameter is provided then the evaluated value is
         * placed in the \`tess\` array at index \`tessidx\`. Otherwise the single
         * euclidean point is returned.
         */
        evaluateDerivative(t: number, d: number, tess?: bluemath.common.NDArray, tessidx?: number): bluemath.common.NDArray | null;
        /**
         * Tessellate the BSplineCurve uniformly at given resolution
         */
        tessellate(resolution?: number): bluemath.common.NDArray;
        /**
         * Tessellate derivatives of BSplineCurve uniformly at given resolution
         */
        tessellateDerivatives(resolution: number | undefined, d: number): bluemath.common.NDArray;
        clone(): BSplineCurve;
        aabb(): bluemath.common.AABB;
        toString(): string;
      }

class BezierSurface {
  u_degree: number;
  v_degree: number;
  cpoints: bluemath.common.NDArray;
  weights?: bluemath.common.NDArray;
  constructor(u_degree: number, v_degree: number, cpoints: bluemath.common.NDArray | number[][][], weights?: bluemath.common.NDArray | number[][]);
  readonly dimension: number;
  isRational(): boolean;
  evaluate(u: number, v: number, tess: bluemath.common.NDArray, uidx: number, vidx: number): void;
  tessellatePoints(resolution?: number): bluemath.common.NDArray;
  tessellate(resolution?: number): {
      vertices: bluemath.common.TypedArray;
      faces: number[];
  };
  aabb(): bluemath.common.AABB;
  clone(): BezierSurface;
}
class BSplineSurface {
    u_degree: number;
    v_degree: number;
    /**
     * cpoints is a two dimensional grid of coordinates.
     * The outermost index is along U, the next inner index is along V
     *
     *          V-->
     *      [
     *  U     [ [xa,ya,za], [xb,yb,zb], ...]
     *  |     [ [xl,yl,zl], [xm,ym,zm], ...]
     *  |     .
     *  v     .
     *      ]
     */
    cpoints: bluemath.common.NDArray;
    u_knots: bluemath.common.NDArray;
    v_knots: bluemath.common.NDArray;
    weights?: bluemath.common.NDArray;
    constructor(u_degree: number, v_degree: number, u_knots: bluemath.common.NDArray | number[], v_knots: bluemath.common.NDArray | number[], cpoints: bluemath.common.NDArray | number[][][], weights?: bluemath.common.NDArray | number[][]);
    readonly dimension: number;
    clone(): BSplineSurface;
    aabb(): bluemath.common.AABB;
    isRational(): boolean;
    isFlat(tolerance?: number): boolean;
    setUKnots(u_knots: bluemath.common.NDArray): void;
    setVKnots(v_knots: bluemath.common.NDArray): void;
    evaluate(u: number, v: number, tess: bluemath.common.NDArray, uidx: number, vidx: number): void;
    tessellatePoints(resolution?: number): bluemath.common.NDArray;
    tessellate(resolution?: number): {
        vertices: bluemath.common.TypedArray;
        faces: number[];
    };
    static tessellateRecursive(bsrf: BSplineSurface, tolerance?: number): {
        vertices: bluemath.common.TypedArray;
        faces: number[];
    }[];
    tessellateAdaptive(tolerance?: number): {
        vertices: bluemath.common.TypedArray;
        faces: number[];
    }[];
    /**
     * Split this BSplineSurface into two at uk, by refining u-knots
     */
    splitU(uk: number): BSplineSurface[];
    /**
     * Split this BSplineSurface into two at vk, by refining v-knots
     */
    splitV(vk: number): BSplineSurface[];
    /**
     * Split this BSplineSurface into four
     */
    splitUV(uk: number, vk: number): BSplineSurface[];
    /**
     * Inserts knot un in the U knot vector r-times
     * Ref: Algorithm A5.3 "The NURBS book"
     * @param un Knot to be inserted
     * @param r Number of times to insert the knot
     */
    insertKnotU(un: number, r: number): void;
    /**
     * Inserts knot vn in the V knot vector r-times
     * Ref: Algorithm A5.3 "The NURBS book"
     * @param vn Knot to be inserted
     * @param r Number of times to insert the knot
     */
    insertKnotV(vn: number, r: number): void;
    /**
     * Insert knots in U and V knot vectors
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    insertKnotUV(un: number, vn: number, ur: number, vr: number): void;
    /**
     * Inserts multiple knots into the U knot vector at once
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnotsU(uklist: number[]): void;
    /**
     * Inserts multiple knots into the V knot vector at once
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnotsV(vklist: number[]): void;
    /**
     * Inserts multiple knots into the U and V knot vectors at once
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    refineKnotsUV(uklist: number[], vklist: number[]): void;
    decomposeU(): bluemath.common.NDArray;
    decomposeV(): bluemath.common.NDArray;
    /**
     * Creates grid of Bezier surfaces that represent this BSpline surface.
     * The routine first computes bezier strips along u (i.e. BSpline surfaces that
     * are Bezier in one direction and BSpline in other). Subsequently
     * decompose it called on each of these strips in the v direction
     * Algorithm A5.7 from "The NURBS Book"
     * See http://www.bluemathsoftware.com/pages/nurbs/funalgo
     */
    decompose(): BezierSurface[];
    toString(): string;
}
class LineSegment extends BSplineCurve {
    constructor(from: number[], to: number[]);
}
class CircleArc extends BSplineCurve {
    constructor(coordsys: CoordSystem, radius: number, start: number, end: number);
}
class Circle extends CircleArc {
    constructor(coord: CoordSystem, radius: number);
}
class BilinearSurface extends BSplineSurface {
    constructor(p00: number[], p01: number[], p10: number[], p11: number[]);
}
class GeneralCylinder extends BSplineSurface {
    constructor(curve: BSplineCurve, direction: bluemath.common.NDArray | number[], height: number);
}
class Cylinder extends GeneralCylinder {
    constructor(coordsys: CoordSystem, radius: number, height: number);
}
class RuledSurface extends BSplineSurface {
}
class RevolutionSurface extends BSplineSurface {
}
class Cone extends RevolutionSurface {
}
class Sphere extends RevolutionSurface {
}
class Torus extends RevolutionSurface {
}

function bernstein(n: number, u: number): Array<number>;
/**
 * @hidden
 * Find the index of the knot span in which \`u\` lies
 * @param {number} p Degree
 * @param {Array.<number>} U Knot vector
 * @param {number} u Parameter
 * @returns {number}
 */
function findSpan(p: number, U: Array<number> | bluemath.common.TypedArray, u: number): number;
/**
 * @hidden
 * Evaluate basis function values
 * @param {number} p Degree
 * @param {Array.<number>} U Knot vector
 * @param {number} i Knot span index
 * @param {number} u Parameter
 * @returns {Array} Basis function values at i,u
 */
function getBasisFunction(p: number, U: Array<number> | bluemath.common.TypedArray, i: number, u: number): Array<number>;
/**
 * @hidden
 * The NURBS book Algo A2.3
 * Compute non-zero basis functions and their derivatives, upto and including
 * n'th derivative (n <= p). Output is 2-dimensional array \`ders\`
 * @param {number} p Degree
 * @param {number} u Parameter
 * @param {number} i Knot span
 * @param {NDArray} knots Knot vector
 * @param {number} n nth derivative
 * @returns {NDArray} ders ders[k][j] is k'th derivative of
 *            basic function N(i-p+j,p), where 0<=k<=n and 0<=j<=p
 */
function getBasisFunctionDerivatives(p: number, u: number, ki: number, knots: bluemath.common.NDArray, n: number): bluemath.common.NDArray;
function blossom(cpoints: bluemath.common.NDArray, n: number, ts: number[]): bluemath.common.NDArray;
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
function planeFrom3Points(A: bluemath.common.NDArray, B: bluemath.common.NDArray, C: bluemath.common.NDArray): number[];
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
function intersectLineSegLineSeg3D(p1: number[], p2: number[], p3: number[], p4: number[]): null | number[];
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
function arePointsColinear(points: bluemath.common.NDArray, tolerance: number): boolean;


    }
  }
}
`;