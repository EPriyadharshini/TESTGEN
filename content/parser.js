function parseNumber(str) {
  if (str.includes("^")) {
    let sign = 1;

    if (str.startsWith("-")) {
      sign = -1;
      str = str.substring(1);
    }

    const power = Number(str.split("^")[1]);

    return sign * Math.pow(10, power);
  }

  return Number(str);
}

function parseConstraint(constraint) {
  const pattern =
    /^(-?10\^\d+|-?\d+)\s*<=\s*([\w.\[\]]+)\s*<=\s*(-?10\^\d+|-?\d+)$/;

  const match = constraint.match(pattern);

  if (!match) return null;

  return {
    variable: match[2],
    min: parseNumber(match[1]),
    max: parseNumber(match[3]),
  };
}

function generateBoundaryCases(parsed) {
  return [parsed.min, parsed.min + 1, parsed.max - 1, parsed.max];
}







function getFunctionSignature() {
  const lines = [...document.querySelectorAll(".view-line")]
    .map((line) => line.innerText)
    .join(" ");

  const match = lines.match(/public\s+([\w<>\[\]]+)\s+(\w+)\s*\((.*?)\)/);

  if (!match) return null;

  return {
    returnType: match[1],
    functionName: match[2],
    parameters: match[3],
  };
}

function parseParameters(parameterString) {
  if (!parameterString.trim()) return [];

  return parameterString.split(",").map((param) => {
    const parts = param.trim().split(/\s+/);

    return {
      type: parts[0],
      name: parts[1],
    };
  });
}