const test1 = {
  keys: { n: 4, k: 3 },
  "1": { base: "10", value: "4" },
  "2": { base: "2", value: "111" },
  "3": { base: "10", value: "12" },
  "6": { base: "4", value: "213" }
};

const test2 = {
  keys: { n: 10, k: 7 },
  "1": { base: "6", value: "13444211440455345511" },
  "2": { base: "15", value: "aed7015a346d635" },
  "3": { base: "15", value: "6aeeb69631c227c" },
  "4": { base: "16", value: "e1b5e05623d881f" },
  "5": { base: "8", value: "316034514573652620673" },
  "6": { base: "3", value: "2122212201122002221120200210011020220200" },
  "7": { base: "3", value: "20120221122211000100210021102001201112121" },
  "8": { base: "6", value: "20220554335330240002224253" },
  "9": { base: "12", value: "45153788322a1255483" },
  "10": { base: "7", value: "1101613130313526312514143" }
};

function convertToBigInt(value, base) {
  let result = 0n;
  for (const char of value.toLowerCase()) {
    const digit =
      char >= "0" && char <= "9"
        ? BigInt(char.charCodeAt(0) - 48)
        : BigInt(char.charCodeAt(0) - 87);
    result = result * BigInt(base) + digit;
  }
  return result;
}

function multiplyPolynomial(coeffs, root) {
  const newCoeffs = Array(coeffs.length + 1).fill(0n);
  for (let i = 0; i < coeffs.length; i++) {
    newCoeffs[i] += coeffs[i];
    newCoeffs[i + 1] -= coeffs[i] * root;
  }
  return newCoeffs;
}

function solveTest(data, label) {
  const { n, k } = data.keys;

  const roots = [];
  for (const key of Object.keys(data)) {
    if (key === "keys") continue;
    const { base, value } = data[key];
    roots.push(convertToBigInt(value, parseInt(base)));
  }

  const chosenRoots = roots.slice(0, k);

  let coefficients = [1n];
  for (const root of chosenRoots) {
    coefficients = multiplyPolynomial(coefficients, root);
  }

  console.log("Polynomial Coefficients:");
  console.log(coefficients.map(String));
}

solveTest(test1, "Test Case 1");
solveTest(test2, "Test Case 2");
