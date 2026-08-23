console.log("TestGen content script loaded");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PROBLEM_DATA") {
    const data = getCachedProblemData();
    if (data) {
      sendResponse({
        success: true,
        ...data,
      });
    } else {
      sendResponse({
        success: false,
      });
    }

    return true;
  }
  if (request.action === "INSERT_TESTCASE") {
    const success = insertTestCase(request.testcase);

    sendResponse({
      success,
    });

    return true;
  }
});





const signature = getFunctionSignature();

console.log("Function Signature:");
console.log(signature);

if (signature) {
  console.log("Parsed Parameters:");
  console.log(parseParameters(signature.parameters));
}


setTimeout(() => {
  refreshProblemData();
}, 5000);

let currentUrl = location.href;

const observer = new MutationObserver(() => {
  if (location.href !== currentUrl) {
    currentUrl = location.href;

    console.log("Problem changed:");

    setTimeout(() => {
      refreshProblemData();
    }, 3000);
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});



