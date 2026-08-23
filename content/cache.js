let cachedProblemData = null;

function refreshProblemData() {
  const problemData = getProblemData();

  const parsedConstraints = problemData.constraints
    .map(parseConstraint)
    .filter((x) => x !== null);

  const boundaryCases = parsedConstraints.map((c) => ({
    variable: c.variable,
    cases: generateBoundaryCases(c),
  }));

  const signature = getFunctionSignature();

  const parameters = signature ? parseParameters(signature.parameters) : [];

  cachedProblemData = {
    title: problemData.title,
    description: getDescription(),
    parsedConstraints,
    boundaryCases,
    examples: getExamples(),
    functionSignature: signature,
    parameters: parameters,
  };

  
  console.log(cachedProblemData);

  console.log("Cache Updated");
}

window.refreshProblemData = refreshProblemData;
window.getCachedProblemData = () => cachedProblemData;