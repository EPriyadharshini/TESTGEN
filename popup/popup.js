const container = document.getElementById("content");
const generateBtn = document.getElementById("generateBtn");

// ----------------------------
// Load Problem Information
// ----------------------------

async function loadProblemData() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "GET_PROBLEM_DATA",
    });

    if (!response || !response.success) {
      container.innerHTML = "Could not fetch problem data.";
      return;
    }

    let html = `
      <h3>${response.title}</h3>

      <div class="card">
        <strong>Description</strong>
        <br><br>
        ${response.description.substring(0, 300)}...
      </div>

      <p>
        Constraints Found:
        ${response.parsedConstraints.length}
      </p>
    `;

    response.boundaryCases.forEach((item) => {
      html += `
        <div class="card">
          <strong>${item.variable}</strong>
          <br><br>
          ${item.cases.join(", ")}
        </div>
      `;
    });

    html += `<h3>Examples</h3>`;

    response.examples.forEach((example, index) => {
      html += `
        <div class="card">
          <strong>Example ${index + 1}</strong>
          <pre>${example}</pre>
        </div>
      `;
    });

    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.innerHTML = "Error loading problem.";
  }
}

loadProblemData();

// ----------------------------
// Generate AI Testcases
// ----------------------------

generateBtn.addEventListener("click", async () => {
  try {
    container.innerHTML = "Generating AI Testcases...";

    // Active Tab
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // Get Problem Data
    const problemData = await chrome.tabs.sendMessage(tab.id, {
      action: "GET_PROBLEM_DATA",
    });

    if (!problemData || !problemData.success) {
      container.innerHTML = "Unable to fetch problem.";
      return;
    }

    console.log("Problem Data:");
    console.log(problemData);

    // Get API Key
    const result = await chrome.storage.local.get(["geminiApiKey"]);
    const geminiApiKey = result.geminiApiKey;

    if (!geminiApiKey) {
      container.innerHTML = "Please add your Gemini API Key in Settings.";
      return;
    }

    // Build Prompt
    const prompt = buildPrompt(problemData);

    console.log("Prompt:");
    console.log(prompt);

    // Gemini Call
    const aiText = await generateWithGemini(
      geminiApiKey,
      prompt
    );

    console.log("Gemini Raw Response:");
    console.log(aiText);

    // Parse JSON
    const json = parseGeminiResponse(aiText);

    console.log("Parsed JSON:");
    console.log(json);

    if (!json.testcases) {
      container.innerHTML = "No testcases returned.";
      return;
    }

    // Render Cards
    renderTestcases(json.testcases);

  } catch (err) {
    console.error(err);
    container.innerHTML = `
      <div style="color:red">
        ${err.message}
      </div>
    `;
  }
});