function parseGeminiResponse(text) {
  text = text.replace(/```json/g, "");
  text = text.replace(/```/g, "");
  text = text.trim();

  console.log("Cleaned Gemini Response:");
  console.log(text);

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("JSON Parse Error:", e);

    // Show the area around the error position
    const pos = Number(e.message.match(/position (\d+)/)?.[1]);

    if (!isNaN(pos)) {
      console.log(
        "Around error:",
        text.substring(Math.max(0, pos - 100), pos + 100)
      );
    }

    throw e;
  }
}