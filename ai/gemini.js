async function generateWithGemini(apiKey, prompt) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const json = await response.json();

  console.log("Gemini API Response:", json);

  if (!response.ok) {
    throw new Error(json.error?.message || "Gemini API Error");
  }

  if (!json.candidates?.length) {
    throw new Error("No response from Gemini");
  }

  return json.candidates[0].content.parts[0].text;
}