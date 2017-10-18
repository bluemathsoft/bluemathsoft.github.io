
const simple =
`
console.log('BlueMath version:',bluemath.version);
let A = new bluemath.NDArray([
  [2,0],
  [5,1]
]);
bmlog('A',A.toString());
`;

const identity_and_multiplication =
`
const bm = bluemath;

let A = bm.eye(3,'i32');
bmlog('Identity',A);
let B = bm.mul(A,5);
let C = bm.mul(A,2);
bmlog('B',B);
bmlog('C',C);
`;

const determinant = 
`
const {NDArray,linalg} = bluemath;

let A = new NDArray([
    [3,4,5],
    [0,3,4],
    [1,3,5]
]);

bmlog('A',A);
bmlog('Determinant = ',linalg.det(A));
let [sign,logdet] = linalg.slogdet(A);
bmlog('Signed Log of Determinant = ',sign*logdet);
`;

const triangular_matrices = 
`
const bm = bluemath;

let A = new bm.NDArray([
    [4,5,6,7],
    [2,3,4,5],
    [0,2,3,4],
    [1,2,4,5]
],{datatype:'i32'});

bmlog('A',A);
bmlog('Upper Triangular',bm.linalg.triu(A));
bmlog('Lower Triangular',bm.linalg.tril(A));
`

const ndarray_arithmatic =
`
const bm = bluemath;

let A = new bm.NDArray([
    [2,3],
    [1,9]
],{datatype:'i32'});
let B = bm.eye(2,'i32');
bmlog('A',A);
bmlog('B',B);
bmlog('A+B',bm.add(A,B));
bmlog('A-B',bm.sub(A,B));
bmlog('3*A',bm.mul(3,A));
bmlog('A/2',bm.div(A,2));
`

const ndarray_slicing =
`
const bm = bluemath;

let A = new bm.NDArray([
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
],{datatype:'i32'});
bmlog('A',A);
bmlog('A[:,1] = ',A.get(':',1));
bmlog('A[1,:] = ',A.get(1,':'));
bmlog('A[null,2] = ',A.get(null,2));
bmlog('A[:2,1:3] = ',A.get(':2','1:3'));
`

let BMSHELL_EXAMPLES = {
  'Simple' : simple,
  'NDArray Arithmatic' : ndarray_arithmatic,
  'NDArray Slicing' : ndarray_slicing,
  'Identity and Multiplication' : identity_and_multiplication,
  'Matrix Determinant' : determinant,
  'Triangular Matrices' : triangular_matrices
};