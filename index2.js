//Simplified Numerical Methods Showcase whic are not in library directly:

const array = require('@stdlib/array');
const linspace = require('@stdlib/array-linspace');
const zeros = require('@stdlib/array-zeros');
const fs = require('fs');

// Numerical Differentiation Methods:

//  Forward difference method
function forwardDifference(fn, x, h = 0.001) {
  return (fn(x + h) - fn(x)) / h;
}

//  Backward difference method
function backwardDifference(fn, x, h = 0.001) {
  return (fn(x) - fn(x - h)) / h;
}

// Numerical Integration Methods:

// Trapezoidal rule
function trapezoidalRule(fn, a, b, n = 100) {
  const h = (b - a) / n;
  let sum = fn(a) / 2 + fn(b) / 2;
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    sum += fn(x);
  }
  return h * sum;
}

// Simpson's rule
function simpsonsRule(fn, a, b, n = 100) {
  if (n % 2 !== 0) n += 1;
  
  const h = (b - a) / n;
  let sum = fn(a) + fn(b);
  
  for (let i = 1; i < n; i++) {
    const x = a + i * h;
    const coefficient = (i % 2 === 0) ? 2 : 4;
    sum += coefficient * fn(x);
  }
  return (h / 3) * sum;
}

//Test functions and their exact derivatives/integrals:
const testFunctions = {
  polynomial: {
    fn: (x) => x*x*x - 2*x*x + 3*x - 5,
    derivative: (x) => 3*x*x - 4*x + 3,
    integral: (a, b) => {
      const F = (x) => (x*x*x*x/4) - (2*x*x*x/3) + (3*x*x/2) - 5*x;
      return F(b) - F(a);
    },
    name: 'f(x) = x³ - 2x² + 3x - 5'
  },
  trigonometric: {
    fn: (x) => Math.sin(x),
    derivative: (x) => Math.cos(x),
    integral: (a, b) => Math.cos(a) - Math.cos(b),
    name: 'f(x) = sin(x)'
  }
};

// Visualization and Analysis:
function evaluateDerivativeMethods(testFunction, xStart, xEnd, numPoints = 100) {
  const x = linspace(xStart, xEnd, numPoints);
  const exactDerivative = zeros(numPoints);
  const forwardResults = zeros(numPoints);
  const backwardResults = zeros(numPoints);
  const errors = {
    forward: zeros(numPoints),
    backward: zeros(numPoints)
  };
  
  for (let i = 0; i < numPoints; i++) {
    const xi = x[i];
    exactDerivative[i] = testFunction.derivative(xi);
    forwardResults[i] = forwardDifference(testFunction.fn, xi);
    backwardResults[i] = backwardDifference(testFunction.fn, xi);
    
    errors.forward[i] = Math.abs(forwardResults[i] - exactDerivative[i]);
    errors.backward[i] = Math.abs(backwardResults[i] - exactDerivative[i]);
  }
  return { x, exactDerivative, forwardResults, backwardResults, errors };
}

function evaluateIntegrationMethods(testFunction, intervals) {
  const results = [];
  
  intervals.forEach(interval => {
    const a = interval[0];
    const b = interval[1];
    const exactValue = testFunction.integral(a, b);
    
    const trapezoidalResult = trapezoidalRule(testFunction.fn, a, b);
    const simpsonsResult = simpsonsRule(testFunction.fn, a, b);
    
    results.push({
      interval: [a, b],
      exact: exactValue,
      trapezoidal: {
        value: trapezoidalResult,
        error: Math.abs(trapezoidalResult - exactValue),
        relError: Math.abs((trapezoidalResult - exactValue) / exactValue) * 100
      },
      simpsons: {
        value: simpsonsResult,
        error: Math.abs(simpsonsResult - exactValue),
        relError: Math.abs((simpsonsResult - exactValue) / exactValue) * 100
      }
    });
  });
  return results;
}

function visualizeResults(testFunction, diffResults) {
  console.log(`\nResults for ${testFunction.name}:`);
  console.log('x\tExact\tForward\tBackward\tForward Err\tBackward Err');
  
  const sampleIndices = [0, 10, 20, 30, 40];
  for (const idx of sampleIndices) {
    const x = diffResults.x[idx];
    const exact = diffResults.exactDerivative[idx];
    const forward = diffResults.forwardResults[idx];
    const backward = diffResults.backwardResults[idx];
    const fwdErr = diffResults.errors.forward[idx];
    const bwdErr = diffResults.errors.backward[idx];
    
    console.log(`${x.toFixed(2)}\t${exact.toFixed(4)}\t${forward.toFixed(4)}\t${backward.toFixed(4)}\t${fwdErr.toExponential(2)}\t${bwdErr.toExponential(2)}`);
  }
  
  const avgForwardError = diffResults.errors.forward.reduce((sum, val) => sum + val, 0) / diffResults.errors.forward.length;
  const avgBackwardError = diffResults.errors.backward.reduce((sum, val) => sum + val, 0) / diffResults.errors.backward.length;
  
  console.log('\nAverage Errors:');
  console.log(`Forward Difference: ${avgForwardError.toExponential(4)}`);
  console.log(`Backward Difference: ${avgBackwardError.toExponential(4)}`);
  
  return {
    avgForwardError,
    avgBackwardError
  };
}

// Run analysis and display results:
function runAnalysis() {
  console.log('=== NUMERICAL DIFFERENTIATION AND INTEGRATION SHOWCASE ===\n');
  
  for (const [key, func] of Object.entries(testFunctions)) {
    console.log(`\n----- Analyzing ${func.name} -----\n`);
    
    console.log('* DIFFERENTIATION ANALYSIS *');
    const diffResults = evaluateDerivativeMethods(func, -2, 2);
    const errorStats = visualizeResults(func, diffResults);
    
    console.log('\n* INTEGRATION ANALYSIS *');
    const intervals = [[-1, 1], [0, 2]];
    const intResults = evaluateIntegrationMethods(func, intervals);
    
    console.log(`Integration results for ${func.name}:`);
    intResults.forEach(result => {
      console.log(`\nInterval: ${result.interval}`);
      console.log(`Exact value: ${result.exact.toFixed(8)}`);
      console.log(`Trapezoidal method: ${result.trapezoidal.value.toFixed(8)} (error: ${result.trapezoidal.error.toExponential(4)}, rel. error: ${result.trapezoidal.relError.toFixed(4)}%)`);
      console.log(`Simpson's method: ${result.simpsons.value.toFixed(8)} (error: ${result.simpsons.error.toExponential(4)}, rel. error: ${result.simpsons.relError.toFixed(4)}%)`);
    });
    
    console.log('\n* CONVERGENCE ANALYSIS *');
    const a = 0;
    const b = 1;
    const exactIntegral = func.integral(a, b);
    const nValues = [10, 20, 40, 80, 160];
    
    console.log(`\nConvergence analysis for interval [${a}, ${b}], exact value: ${exactIntegral.toFixed(8)}`);
    console.log('n\tTrapezoidal\tSimpson');
    
    nValues.forEach(n => {
      const trap = trapezoidalRule(func.fn, a, b, n);
      const simp = simpsonsRule(func.fn, a, b, n);
      
      const trapErr = Math.abs(trap - exactIntegral);
      const simpErr = Math.abs(simp - exactIntegral);
      
      console.log(`${n}\t${trapErr.toExponential(4)}\t${simpErr.toExponential(4)}`);
    });
  }
  console.log('\n=== ANALYSIS COMPLETE ===');
}

// Run the showcase
runAnalysis();