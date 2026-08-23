function insertTestCase(testCaseText) {
  const editor = document.querySelector(
    '[data-e2e-locator="console-testcase-input"]',
  );

  if (!editor) {
    console.log("Testcase editor not found");
    return false;
  }

  editor.focus();

  editor.textContent = "";

  document.execCommand("insertText", false, testCaseText);

  editor.dispatchEvent(
    new Event("input", {
      bubbles: true,
    }),
  );

  console.log("Testcase inserted");

  return true;
}
