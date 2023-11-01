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

// Define Lambda Calculus (λ-calculus)
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

// Lets define the Identity Function λx.x in JS
const ID = x => x
// Here we defined a funcion ID(x) => x
// It recieves x and returns it.
// We can say that it replaces x by whathever is given as parameter.
// That is β-conversion
console.log('(λx.x)true ->', ID(true))

// but 'true' is not valid λ-calculus.
// Lets define TRUE
// λxy.x
// TRUE recieves 2 parameters and returns the first one
const TRUE = x => y => x
// lets replicate the last function call
console.log('(λx.x)λxy.x ->', ID(TRUE));

// lets define FALSE as being a function that recieves 2 parameters and
// returns the seccond one
const FALSE = x => y => y
console.log('ID(FALSE) ->', ID(FALSE)) // FALSE

// With that, we can define NOT
const NOT = x => x(FALSE)(TRUE)
// NOT recieves TRUE or FALSE in x
// if NOT recieves TRUE, then:
// TRUE(FALSE)(TRUE) = FALSE
// if NOT reciefes FALSE, then:
// FALSE(FALSE)(TRUE) = TRUE
console.log('NOT(TRUE)', NOT(TRUE)) // FALSE
console.log('NOT(FALSE)', NOT(FALSE)) // TRUE

// Lets define AND and OR
const AND = x => y => x(y)(FALSE)
const OR = x => y => x(TRUE)(y)

console.log('AND(TRUE)(TRUE)', AND(TRUE)(TRUE))
console.log('AND(TRUE)(FALSE)', AND(TRUE)(FALSE))
console.log('OR(TRUE)(FALSE)', OR(TRUE)(FALSE))
console.log('OR(FALSE)(FALSE)', OR(FALSE)(FALSE))


// NUMBERS
// HELPERS for visualization
const toNumber = (n) => n((x) => x + 1)(0)

const SUCC = x => y => z => y(x(y)(z))
const ZERO = FALSE
const ONE = SUCC(ZERO)
const TWO = SUCC(ONE)
const TREE = SUCC(TWO)
const FOUR = SUCC(TREE)
const PRED = u => v => w => u(x => y => y(x(v)))(v => w)(v => v)

const ISZERO = x => x(y => FALSE)(TRUE)
const SUM = x => y => x(SUCC)(y)
const SUB = x => y => y(PRED)(x)
const MULT = x => y => z => x(y(z))
const LEQ = x => y => ISZERO(SUB(x)(y))
const MEQ = x => y => ISZERO(SUB(y)(x))
const EQ = x => y => AND(LEQ(x)(y))(LEQ(x)(y))

console.log('1 + 4 =', toNumber(SUM(ONE)(FOUR)));
console.log('4 - 2 =', toNumber(SUB(FOUR)(TWO)));
console.log('4 * 3 =', toNumber(MULT(FOUR)(TREE)));

console.log('4 >= 3 =', MEQ(FOUR)(TREE));
console.log('4 <= 3 =', LEQ(FOUR)(TREE));
console.log('4 = 4 =', EQ(FOUR)(FOUR));


// Y combinator
const Z = f => (x => f(v => x(x)(v)))(x => f(v => x(x)(v)));

// Division implementation, tricky, could not fully test due to stack overflow...
const DIV = Z(
  g => n => m => f => x => 
      (d => 
          ISZERO(d)
              (ZERO(f)(x)) 
              (f(g(SUB(n)(m))(m)(f)(x)))
      )(SUB(n)(m))
);

// console.log('4 / 2 =', toNumber(DIV(FOUR)(TWO)));

const EXP = x => y => y(MULT(x))(ONE);
console.log('2 ^ 3 =', toNumber(EXP(TWO)(TREE))); // 8

const MOD = Z(
    f => x => y => 
        LEQ(y)(x)
            (v => f(SUB(x)(y))(y)(v))
            (x)
);
console.log('4 mod 3 =', toNumber(MOD(FOUR)(TREE))); // 1

const FACTORIAL = Z(
    f => n => 
        ISZERO(n)
            (ONE)
            (MULT(n)(f(PRED(n))))
);
// Stack Overflow...
// console.log('4! =', toNumber(FACTORIAL(FOUR))); // 24

const FIB = Z(
    f => n => 
        ISZERO(n)
            (ZERO)
            (ISZERO(PRED(n))
                (ONE)
                (SUM(f(SUB(n)(ONE)))(f(SUB(n)(TWO)))))
);
// Stack Overflow...
// console.log('Fib(4) =', toNumber(FIB(FOUR))); // 3

const CONS = x => y => f => f(x)(y);
const HEAD = x => x(TRUE);
const TAIL = x => x(FALSE);

const myList = CONS(ONE)(CONS(TWO)(CONS(TREE)(CONS(FOUR)(FALSE))));
console.log('Head:', toNumber(HEAD(myList))); // 1
console.log('Tail Head:', toNumber(HEAD(TAIL(myList)))); // 2

// Could not fuly test due to Stack overflows
const MAP = Z(
    f => lst => func => 
        ISZERO(HEAD(lst))
            (FALSE)
            (CONS(func(HEAD(lst)))(f(TAIL(lst))(func)))
);

const FILTER = Z(
    f => lst => pred => 
        ISZERO(HEAD(lst))
            (FALSE)
            (pred(HEAD(lst))
                (CONS(HEAD(lst))(f(TAIL(lst))(pred)))
                (f(TAIL(lst))(pred)))
);

const REDUCE = Z(
    f => lst => func => acc => 
        ISZERO(HEAD(lst))
            (acc)
            (f(TAIL(lst))(func)(func(acc)(HEAD(lst))))
);

