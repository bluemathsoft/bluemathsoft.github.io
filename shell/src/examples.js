
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
let D = bm.mul(B,C);
bmlog('B*C',D);
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

let BMSHELL_EXAMPLES = {
  'Simple' : simple,
  'Identity and Multiplication' : identity_and_multiplication,
  'Determinant' : determinant,
  'Triangular Matrices' : triangular_matrices
};