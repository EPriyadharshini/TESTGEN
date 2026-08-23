function renderTestcases(testcases) {
    const container = document.getElementById("content");
    container.innerHTML = "";

    testcases.forEach((testcase) => {

        const card = document.createElement("div");
        card.className = "card testcase";

        card.innerHTML = `
            <h4>${testcase.name}</h4>
            <small>${testcase.category}</small>

            <p><strong>Input:</strong></p>
            <pre>${JSON.stringify(testcase.values, null, 2)}</pre>

            <p><strong>Expected Output:</strong></p>
            <pre>${testcase.expected}</pre>
        `;

        container.appendChild(card);
    });
}