/**
 * Closure Tricky Problems - Most commonly asked
 * Most asked at: All companies (95% frequency)
 * 
 * These are the classic closure problems that trip up many candidates
 */

// Problem 1: setTimeout in for loop (Classic!)
console.log('=== Problem 1: setTimeout in for loop ===');

// ❌ Wrong - prints 3, 3, 3
console.log('Wrong approach:');
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log('Wrong:', i), 100);
}

// ✅ Solution 1: Use let instead of var
console.log('Solution 1 - let:');
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log('Let:', i), 200);
}

// ✅ Solution 2: IIFE (Immediately Invoked Function Expression)
console.log('Solution 2 - IIFE:');
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(() => console.log('IIFE:', j), 300);
    })(i);
}

// ✅ Solution 3: bind
console.log('Solution 3 - bind:');
for (var i = 0; i < 3; i++) {
    setTimeout(console.log.bind(null, 'Bind:', i), 400);
}

// ✅ Solution 4: Arrow function with parameter
console.log('Solution 4 - Arrow with param:');
for (var i = 0; i < 3; i++) {
    setTimeout((j => () => console.log('Arrow:', j))(i), 500);
}

// Problem 2: Function returning functions
console.log('\n=== Problem 2: Function factories ===');

function createMultiplier(multiplier) {
    return function(x) {
        return x * multiplier;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Problem 3: Counter with private variables
console.log('\n=== Problem 3: Private counter ===');

function createCounter() {
    let count = 0;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        get: () => count,
        reset: () => count = 0
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.get()); // 2
console.log(counter.reset()); // 0

// Problem 4: Module pattern
console.log('\n=== Problem 4: Module pattern ===');

const Calculator = (function() {
    let result = 0;
    
    return {
        add: (x) => result += x,
        subtract: (x) => result -= x,
        multiply: (x) => result *= x,
        divide: (x) => result /= x,
        getResult: () => result,
        clear: () => result = 0
    };
})();

Calculator.add(10);
Calculator.multiply(2);
console.log(Calculator.getResult()); // 20

// Problem 5: Event handlers with closures
console.log('\n=== Problem 5: Event handlers ===');

function setupButtons() {
    const buttons = ['Button 1', 'Button 2', 'Button 3'];
    const handlers = [];
    
    // ❌ Wrong way
    for (var i = 0; i < buttons.length; i++) {
        handlers.push(() => console.log('Wrong button:', buttons[i])); // undefined
    }
    
    // ✅ Correct way
    const correctHandlers = [];
    for (let i = 0; i < buttons.length; i++) {
        correctHandlers.push(() => console.log('Correct button:', buttons[i]));
    }
    
    return { handlers, correctHandlers };
}

const { handlers, correctHandlers } = setupButtons();
handlers[0](); // Wrong button: undefined
correctHandlers[0](); // Correct button: Button 1

// Problem 6: Currying with closures
console.log('\n=== Problem 6: Currying ===');

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...nextArgs) {
            return curried.apply(this, args.concat(nextArgs));
        };
    };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Problem 7: Memoization with closures
console.log('\n=== Problem 7: Memoization ===');

function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit for:', key);
            return cache.get(key);
        }
        
        console.log('Computing for:', key);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const fibonacci = memoize(function(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(10)); // Computes and caches
console.log(fibonacci(10)); // Cache hit

// Problem 8: Debounce with closures
console.log('\n=== Problem 8: Debounce ===');

function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedLog = debounce((msg) => console.log('Debounced:', msg), 300);
debouncedLog('First');
debouncedLog('Second');
debouncedLog('Third'); // Only this will execute after 300ms

// Problem 9: Once function
console.log('\n=== Problem 9: Once function ===');

function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

const expensiveOperation = once(() => {
    console.log('Expensive operation executed');
    return 'Result';
});

console.log(expensiveOperation()); // Executes and logs
console.log(expensiveOperation()); // Returns cached result

// Problem 10: Partial application
console.log('\n=== Problem 10: Partial application ===');

function partial(fn, ...presetArgs) {
    return function(...laterArgs) {
        return fn(...presetArgs, ...laterArgs);
    };
}

const multiply = (a, b, c) => a * b * c;
const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiply, 2, 3);

console.log(multiplyBy2(3, 4)); // 2 * 3 * 4 = 24
console.log(multiplyBy2And3(4)); // 2 * 3 * 4 = 24

// Problem 11: Function composition
console.log('\n=== Problem 11: Function composition ===');

function compose(...fns) {
    return function(value) {
        return fns.reduceRight((acc, fn) => fn(acc), value);
    };
}

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const composedFn = compose(square, double, addOne);
console.log(composedFn(3)); // ((3 + 1) * 2)^2 = 64

// Problem 12: Private methods with closures
console.log('\n=== Problem 12: Private methods ===');

function createBankAccount(initialBalance) {
    let balance = initialBalance;
    
    function validateAmount(amount) {
        return typeof amount === 'number' && amount > 0;
    }
    
    function updateBalance(amount, operation) {
        if (!validateAmount(Math.abs(amount))) {
            throw new Error('Invalid amount');
        }
        
        if (operation === 'withdraw' && balance < amount) {
            throw new Error('Insufficient funds');
        }
        
        balance += operation === 'deposit' ? amount : -amount;
        return balance;
    }
    
    return {
        deposit: (amount) => updateBalance(amount, 'deposit'),
        withdraw: (amount) => updateBalance(amount, 'withdraw'),
        getBalance: () => balance,
        // Private methods are not exposed
    };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120

export {
    createMultiplier,
    createCounter,
    curry,
    memoize,
    debounce,
    once,
    partial,
    compose,
    createBankAccount
};