/**
 * Turing Machines
 * 
 * A Turing machine is a mathematical model of computation that defines a type of machine
 * capable of simulating any other machine or algorithm. It was first described by Alan Turing
 * in 1936, and is considered a theoretical construct that serves as a foundation for the
 * theory of computation. The machine consists of a tape with symbols on it, and a read-
 * write head that can move along the tape and change the symbols. The machine is capable
 * of performing a set of instructions, based on the current symbol and its current state, 
 * which can be used to solve mathematical problems or simulate other machines.
 */

/**
 * Lambda Calculus
 * 
 * Lambda calculus is a formal system in mathematical logic for expressing computation
 * based on function abstraction and application. It was introduced by Alonzo Church in the
 * 1930s as a way to investigate the foundations of mathematics. The lambda calculus
 * consists of a set of rules for declaring and manipulating functions, represented by the
 * Greek letter lambda, without the need for explicit variables. It forms the foundation for the
 * theory of programming languages, and has been used in the development of functional
 * programming languages, as well as in the study of the foundations of mathematics and
 * logic, and in the theory of computation.
 */

/**
 * The Church-Turing thesis is a principle stating that any algorithm that can be expressed in
 * a mathematical model of computation, such as a Turing machine, can be expressed in the 
 * lambda calculus. It asserts that any computable function that can be described "in real 
 * life" can be computed by a Turing machine. It forms the foundation of the theory of 
 * computation and is considered a fundamental principle of computability.
 */

/**
 * λ-calculus is the smallest universal programming language.
 * It consists of:
 * 
 * - A single rule called β-conversion
 * - A single function definition
 * 
 * Its grammar is defined as follow
 * 
 *  <name> => [any single letter (a,b,c)]
 *  <expression> => <name>|<function>|<application>
 *  <function> => λ<name>.<expression>
 *  <application> => <expression><expression>
 * 
 * --------
 * Application and β-conversion
 * 
 * Consider this function:
 * - λx.x
 * It recieves x, and returns x
 * 
 * We can apply this function to y
 * 
 * (λx.x)y -> [y/x]x -> y
 * Lets break it dow.
 * 
 * Here we are applying y to the function
 * - (λx.x)y
 * Here we are expressing that the x symbol is being replaced by y
 * - [y/x]x
 * Here we are writing the resulting expression, "y" that is the result of the function
 * - y
 * 
 * We call this function (λx.x) the Identity Function
 * 
 * --------
 * From math defining language to language defining math
 * 
 * Here we are going to use js to build some λ-calculus functions.
 * To do that, we need to translate the grammar of λ-calculus to javascript.
 * 
 * We are going to use arrow function expressions to define λ-calculus functions.
 * 
 * Arrow functions as λ functions:
 * Arrow functions can be defined as folows:
 * 
 * - const NAME = PARAM => RETURN
 * and invoked
 * - NAME(X)
 */

/**
 * Identity Function
 * λx.x
 */
const ID = x => x;

// Boolean Logic

/**
 * TRUE and FALSE
 * TRUE = λx.λy.x
 * FALSE = λx.λy.y
 */
const TRUE = x => y => x;
const FALSE = x => y => y;

/**
 * Logical NOT
 * NOT = λx.x FALSE TRUE
 */
const NOT = x => x(FALSE)(TRUE);

/**
 * Logical AND
 * AND = λx.λy.x y FALSE
 */
const AND = x => y => x(y)(FALSE);

/**
 * Logical OR
 * OR = λx.λy.x TRUE y
 */
const OR = x => y => x(TRUE)(y);

// Numbers (Church Numerals)

/**
 * ZERO to FOUR using Church Numerals
 * ZERO = λf.λx.x
 * SUCC = λn.λf.λx.f (n f x)
 */
const ZERO = f => x => x;
const ONE = f => x => f(x);
const TWO = f => x => f(f(x));
const THREE = f => x => f(f(f(x)));
const FOUR = f => x => f(f(f(f(x))));

/**
 * Successor Function
 * SUCC = λn.λf.λx.f (n f x)
 */
const SUCC = n => f => x => f(n(f)(x));

/**
 * Addition
 * ADD = λn.λk.λf.λx.n f (k f x)
 */
const ADD = n => k => f => x => n(f)(k(f)(x));

/**
 * Multiplication
 * MULT = λn.λk.λf.λx.n (k f) x
 */
const MULT = n => k => f => x => n(k(f))(x);

/**
 * Exponentiation
 * EXP = λn.λk.k n
 */
const EXP = n => k => k(n);

/**
 * Predecessor Function
 * PRED = λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)
 */
const PRED = n => f => x => n(g => h => h(g(f)))(u => x)(u => u);

/**
 * Subtraction
 * SUB = λn.λk.k PRED n
 */
const SUB = n => k => k(PRED)(n);

/**
 * Is Zero
 * ISZERO = λn.n (λx.FALSE) TRUE
 */
const ISZERO = n => n(_ => FALSE)(TRUE);

/**
 * Less Than or Equal
 * LEQ = λn.λk.ISZERO (SUB n k)
 */
const LEQ = n => k => ISZERO(SUB(n)(k));

/**
 * Equal
 * EQ = λn.λk.AND (LEQ n k) (LEQ k n)
 */
const EQ = n => k => AND(LEQ(n)(k))(LEQ(k)(n));

/**
 * Modulo using the Z combinator
 * MOD = Z (λf.λm.λn.IF (LEQ n m) (λx.f (SUB m n) n x) m)
 */
const Z = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));

const MOD = Z(f => m => n =>
  LEQ(n)(m)
    (x => f(SUB(m)(n))(n)(x))
    (m)
);

// Factorial Function
const FACTORIAL = Z(f => n =>
  ISZERO(n)
    (ONE)
    (MULT(n)(f(PRED(n))))
);

// Fibonacci Function
const FIB = Z(f => n =>
  LEQ(n)(ONE)
    (n)
    (ADD(f(PRED(n)))(f(SUB(n)(TWO))))
);

// Convert Church numeral to JavaScript number
const toNumber = n => n(x => x + 1)(0);

// Convert JavaScript number to Church numeral
const fromNumber = n => n === 0 ? ZERO : SUCC(fromNumber(n - 1));

// Testing the functions
console.log('ID(5) =', ID(5)); // 5

// Logical Operations
console.log('NOT(TRUE) =', NOT(TRUE) === FALSE); // true
console.log('NOT(FALSE) =', NOT(FALSE) === TRUE); // true
console.log('AND(TRUE)(FALSE) =', AND(TRUE)(FALSE) === FALSE); // true
console.log('OR(TRUE)(FALSE) =', OR(TRUE)(FALSE) === TRUE); // true

// Arithmetic Operations
console.log('toNumber(ZERO) =', toNumber(ZERO)); // 0
console.log('toNumber(ONE) =', toNumber(ONE)); // 1
console.log('toNumber(TWO) =', toNumber(TWO)); // 2
console.log('toNumber(THREE) =', toNumber(THREE)); // 3
console.log('toNumber(FOUR) =', toNumber(FOUR)); // 4

console.log('1 + 4 =', toNumber(ADD(ONE)(FOUR))); // 5
console.log('4 - 2 =', toNumber(SUB(FOUR)(TWO))); // 2
console.log('4 * 3 =', toNumber(MULT(FOUR)(THREE))); // 12
console.log('2 ^ 3 =', toNumber(EXP(TWO)(THREE))); // 8

// Comparison Operations
console.log('4 <= 3 =', LEQ(FOUR)(THREE) === TRUE); // false
console.log('3 <= 4 =', LEQ(THREE)(FOUR) === TRUE); // true
console.log('4 == 4 =', EQ(FOUR)(FOUR) === TRUE); // true

// Modulo Operation
console.log('4 mod 3 =', toNumber(MOD(FOUR)(THREE))); // 1

// Factorial
console.log('4! =', toNumber(FACTORIAL(FOUR))); // 24

// Fibonacci
console.log('Fib(4) =', toNumber(FIB(FOUR))); // 3

// Lists

/**
 * Empty List
 * NIL = λx.TRUE
 */
const NIL = x => TRUE;

/**
 * Cons Cell
 * CONS = λh.λt.λf.f h t
 */
const CONS = h => t => f => f(h)(t);

/**
 * Head
 * HEAD = λl.l (λh.λt.h)
 */
const HEAD = l => l(h => t => h);

/**
 * Tail
 * TAIL = λl.l (λh.λt.t)
 */
const TAIL = l => l(h => t => t);

/**
 * Is Empty
 * ISNIL = λl.l (λh.λt.FALSE) TRUE
 */
const ISNIL = l => l(h => t => FALSE)(TRUE);

/**
 * Map Function
 * MAP = Z (λf.λl.λm.IF (ISNIL l) NIL (CONS (m (HEAD l)) (f (TAIL l) m)))
 */
const MAP = Z(f => l => m =>
  ISNIL(l)
    (NIL)
    (CONS(m(HEAD(l)))(f(TAIL(l))(m)))
);

/**
 * Filter Function
 * FILTER = Z (λf.λl.λp.IF (ISNIL l) NIL (IF (p (HEAD l)) (CONS (HEAD l) (f (TAIL l) p)) (f (TAIL l) p)))
 */
const FILTER = Z(f => l => p =>
  ISNIL(l)
    (NIL)
    (p(HEAD(l))
      (CONS(HEAD(l))(f(TAIL(l))(p)))
      (f(TAIL(l))(p))
    )
);

/**
 * Reduce Function
 * REDUCE = Z (λf.λl.λm.λacc.IF (ISNIL l) acc (f (TAIL l) m (m acc (HEAD l))))
 */
const REDUCE = Z(f => l => m => acc =>
  ISNIL(l)
    (acc)
    (f(TAIL(l))(m)(m(acc)(HEAD(l))))
);

// Creating a list: [1, 2, 3, 4]
const myList = CONS(ONE)(CONS(TWO)(CONS(THREE)(CONS(FOUR)(NIL))));

// Testing List Functions
console.log('Head:', toNumber(HEAD(myList))); // 1
console.log('Second Element:', toNumber(HEAD(TAIL(myList)))); // 2
console.log('Is NIL:', ISNIL(NIL) === TRUE); // true
console.log('Is myList NIL:', ISNIL(myList) === TRUE); // false

// Map: Increment each element
const increment = n => SUCC(n);
const incrementedList = MAP(myList)(increment);
console.log('Incremented Head:', toNumber(HEAD(incrementedList))); // 2

// Filter: Keep even numbers
const isEven = n => ISZERO(MOD(n)(TWO));
const evenList = FILTER(myList)(isEven);
console.log('First Even:', ISNIL(evenList) === TRUE ? 'None' : toNumber(HEAD(evenList))); // 2

// Reduce: Sum of the list
const sum = a => b => ADD(a)(b);
const total = REDUCE(myList)(sum)(ZERO);
console.log('Sum of List:', toNumber(total)); // 10

// Note: Be cautious with recursion depth in JavaScript
// Large computations may cause stack overflow due to recursion limitations


