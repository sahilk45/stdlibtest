# Numerical Methods Extension for stdlib

This project extends the @stdlib library with additional numerical methods for differentiation and integration, along with visual demonstrations of their performance.

## Project Overview

This repository demonstrates both existing stdlib functions and new numerical methods implementations for:
* Numerical differentiation (forward and backward difference methods)
* Numerical integration (trapezoidal rule and Simpson's rule)
* Analysis and comparison of these methods with exact solutions

## Repository Structure

* `already.js` - Demonstrates existing stdlib functions and capabilities
* `index2.js` - Contains implementations of numerical methods not directly available in the stdlib library
* `index.html` - Web visualization interface for demonstrating the performance of the numerical methods

## Setup Instructions

### Prerequisites
* Node.js and npm installed
* Git installed

### Steps to Run the Project

1. **Clone the repository**

```git clone https://github.com/your-username/stdlib-numerical-methods.git```

```cd stdlib-numerical-methods```

2. **Install dependencies**

```npm install```

3. **Run the demonstrations**

To see existing stdlib functions in action
```node already.js```

To run the numerical methods showcase
```node index2.js```

4. **View the visualization**

Option 1: Open index.html directly in a browser

Option 2: Use a local server




Option 3: Use VS Code's Live Server extension

## Features Demonstrated
### Existing stdlib Functions (already.js)

* Special mathematical functions (gamma, beta, Bessel, error function)
* Array operations
* Basic statistics
* Simple integration and differentiation approximations

### New Numerical Methods (index2.js)

Differentiation Methods

* Forward difference method
* Backward difference method


Integration Methods

* Trapezoidal rule
* Simpson's rule


Analysis Tools

* Error comparison with exact solutions
* Convergence testing
* Performance visualization



### Web Visualization (index.html)

* Interactive comparison of numerical methods
* Error analysis charts
* Convergence visualization
* Performance metrics tables

### Contributing

* Fork the repository
* Create a feature branch (git checkout -b feature/amazing-feature)
* Commit your changes (git commit -m 'Add some amazing feature')
* Push to the branch (git push origin feature/amazing-feature)
* Open a Pull Request
 
## Acknowledgments

* Based on the @stdlib project
* Inspired by classical numerical analysis techniques
