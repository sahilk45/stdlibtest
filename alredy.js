//  Examples using existing stdlib functions i.e, which already exits:

const gamma = require('@stdlib/math-base-special-gamma');
const beta = require('@stdlib/math-base-special-beta');
const besselj0 = require('@stdlib/math-base-special-besselj0');
const erf = require('@stdlib/math-base-special-erf');
const linspace = require('@stdlib/array-base-linspace');

console.log('=== STDLIB FUNCTIONS SHOWCASE ===\n');

// Create test data
const x = linspace(-5, 5, 100);

// Example 1: Using special functions
console.log('* SPECIAL FUNCTIONS *');
console.log('Using stdlib\'s built-in special functions:');
console.log(`gamma(5) = ${gamma(5)}`);
console.log(`beta(2, 3) = ${beta(2, 3)}`);
console.log(`bessel J0(1) = ${besselj0(1)}`);
console.log(`erf(1) = ${erf(1)}`);

// Example 2: Working with arrays
console.log('\n* ARRAY OPERATIONS *');
const y1 = new Array(x.length).fill(0);
const y2 = new Array(x.length).fill(0);

for (let i = 0; i < x.length; i++) {
  y1[i] = Math.sin(x[i]);
  y2[i] = Math.cos(x[i]);
}

// Calculate summation (relevant for integration)
const sum = y1.reduce((acc, val) => acc + val, 0);
console.log(`Sum of sin(x) values: ${sum}`);

// Example 3: Calculate differences (relevant for differentiation)
console.log('\n* DIFFERENCES *');
const diff = new Array(y1.length - 1).fill(0);
for (let i = 0; i < y1.length - 1; i++) {
  diff[i] = y1[i+1] - y1[i];
}

// Calculate mean manually instead of using stdlib's mean function
const diffSum = diff.reduce((acc, val) => acc + val, 0);
const meanDiff = diffSum / diff.length;
console.log(`Mean difference: ${meanDiff}`);

// Example 4: Use statistics functions
console.log('\n* STATISTICS *');
// Calculate statistics manually
const meanY1 = y1.reduce((acc, val) => acc + val, 0) / y1.length;
console.log(`Mean of sin(x): ${meanY1}`);

// Standard deviation calculation
const variance = y1.reduce((acc, val) => acc + Math.pow(val - meanY1, 2), 0) / y1.length;
const stdDev = Math.sqrt(variance);
console.log(`Standard deviation of sin(x): ${stdDev}`);

// Min and max
const minY1 = Math.min(...y1);
const maxY1 = Math.max(...y1);
console.log(`Min of sin(x): ${minY1}`);
console.log(`Max of sin(x): ${maxY1}`);

// Example 5: Integration approximation
console.log('\n* INTEGRATION APPROXIMATION *');

// Define the function to integrate
function f(x) {
  return Math.sin(x);
}

// Define integration interval
const a = 0;
const b = Math.PI;
const n = 1000;

// Create evenly spaced points for the integration
const points = linspace(a, b, n);
const h = (b - a) / (n - 1);

// Evaluate function at each point
const values = new Array(n).fill(0);
for (let i = 0; i < n; i++) {
  values[i] = f(points[i]);
}

// Trapezoidal rule
const trapSum = values[0]/2 + values[n-1]/2 + values.slice(1, n-1).reduce((acc, val) => acc + val, 0);
const trapResult = h * trapSum;

// Exact result for comparison
const exactResult = -Math.cos(Math.PI) + Math.cos(0); // = 2

console.log(`Integrating sin(x) from 0 to π`);
console.log(`Approximate result using trapezoidal rule: ${trapResult}`);
console.log(`Exact result: ${exactResult}`);
console.log(`Absolute error: ${Math.abs(trapResult - exactResult)}`);

// Example 6: Numerical differentiation
console.log('\n* DIFFERENTIATION APPROXIMATION *');

// Points where we want to calculate the derivative
const diffPoints = [-2, -1, 0, 1, 2];
console.log('Calculating derivative of sin(x) at various points:');
console.log('x\tApprox\tExact\tError');

diffPoints.forEach(x => {
  // Small step size
  const h = 0.0001;
  
  // Forward difference
  const fwd = (Math.sin(x + h) - Math.sin(x)) / h;
  
  // Exact derivative
  const exact = Math.cos(x);
  
  // Error
  const error = Math.abs(fwd - exact);
  
  console.log(`${x}\t${fwd.toFixed(6)}\t${exact.toFixed(6)}\t${error.toExponential(4)}`);
});

console.log('\n=== STDLIB FUNCTIONS SHOWCASE COMPLETE ===');