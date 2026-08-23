function buildPrompt(problemData) {
  return `
You are an expert competitive programmer.

Analyze this LeetCode problem.

TITLE:
${problemData.title}

DESCRIPTION:
${problemData.description}

FUNCTION:

${
problemData.functionSignature
  ? `${problemData.functionSignature.returnType}
${problemData.functionSignature.functionName}
(
${problemData.parameters
  .map((p) => `${p.type} ${p.name}`)
  .join(",\n")}
)`
  : "Function signature not available."
}

CONSTRAINTS:

${problemData.parsedConstraints
  .map((c) => `${c.variable}: ${c.min} to ${c.max}`)
  .join("\n")}

EXAMPLES:

${problemData.examples.join("\n\n")}

Generate exactly 10 high-quality testcases.

Return ONLY JSON.

{
  "testcases":[
    {
      "name":"Boundary 1",
      "category":"Boundary",
      "values":{
      }
    }
  ]
}

NO markdown.

NO explanation.

ONLY JSON.
`;
}

window.buildPrompt = buildPrompt;
