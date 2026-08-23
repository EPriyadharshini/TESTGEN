# TestGen — AI-Powered LeetCode Test Case Generator

TestGen is an AI-powered Chrome extension that automatically analyzes LeetCode problems and generates high-quality test cases using Google Gemini.

The goal is to help developers and students test their solutions with boundary cases, edge cases, and different input scenarios without manually creating every test case.

---

## Problem

When solving a LeetCode problem, developers usually need to:

1. Read and understand the problem.
2. Write the solution.
3. Think about possible edge cases.
4. Manually create test inputs.
5. Enter the inputs into LeetCode.
6. Run and verify the solution.

Creating good test cases manually can be time-consuming, and important edge cases can easily be missed.

---

##  Solution

TestGen automates the test-case generation process.

```text
Open LeetCode Problem
        ↓
TestGen reads the problem
        ↓
Extracts description, constraints & examples
        ↓
Builds an AI prompt
        ↓
Google Gemini analyzes the problem
        ↓
Generates test cases
        ↓
Displays test cases in the extension
        ↓
Insert into LeetCode
```

---

##  Features

###  AI Test Case Generation

Uses Google Gemini to analyze LeetCode problems and generate multiple test cases.

### 📖 Problem Extraction

Automatically extracts:

* Problem title
* Problem description
* Constraints
* Examples
* Function signature

###  Constraint Analysis

Parses constraints and identifies boundary values that can be useful for testing.

###  Edge Case Generation

Generates different categories of test cases such as:

* Boundary cases
* Basic cases
* Edge cases
* Carry/overlap cases
* Large input cases
* Complex scenarios

###  Chrome Extension

Runs directly as a Chrome extension while solving problems on LeetCode.

### API Key Storage

The Gemini API key can be entered and stored through the extension settings using Chrome Storage.

### 🧩 Modular Architecture

The project separates extraction, parsing, caching, AI communication, rendering, and insertion into different modules.

---

##  Architecture

```text
                    ┌───────────────┐
                    │    LeetCode   │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ Content Script │
                    └───────┬───────┘
                            │
                ┌───────────┼───────────┐
                ▼           ▼           ▼
          extractor.js  parser.js   cache.js
                │           │           │
                └───────────┴───────────┘
                            │
                            ▼
                       popup.js
                            │
                            ▼
                    promptBuilder.js
                            │
                            ▼
                       Gemini API
                            │
                            ▼
                     JSON Response
                            │
                            ▼
                     jsonParser.js
                            │
                            ▼
                       render.js
                            │
                            ▼
                      Test Cases
                            │
                            ▼
                       inserter.js
                            │
                            ▼
                    LeetCode Editor
```

---

##  Project Structure

```text
TestGen/
│
├── manifest.json
│
├── popup/
│   ├── popup.html
│   ├── popup.js
│   ├── popup.css
│   ├── render.js
│   └── promptBuilder.js
│
├── content/
│   ├── extractor.js
│   ├── parser.js
│   ├── cache.js
│   ├── inserter.js
│   └── content.js
│
├── ai/
│   └── gemini.js
│
├── settings/
│   ├── settings.html
│   └── settings.js
│
└── utils/
    └── jsonParser.js
```

> `promptBuilder.js` can be placed under `popup/` as currently referenced by `popup.html`.

---

## 🔧 Technologies Used

* **JavaScript**
* **HTML5**
* **CSS3**
* **Chrome Extension Manifest V3**
* **Google Gemini API**
* **Chrome Storage API**
* **Chrome Tabs API**
* **DOM Manipulation**
* **JSON**
* **REST API**

---

##  Module Responsibilities

| Module             | Responsibility                             |
| ------------------ | ------------------------------------------ |
| `manifest.json`    | Chrome extension configuration             |
| `popup.js`         | Controls the main extension workflow       |
| `popup.html`       | Popup interface                            |
| `extractor.js`     | Extracts problem information from LeetCode |
| `parser.js`        | Parses constraints and function parameters |
| `cache.js`         | Stores extracted problem data              |
| `content.js`       | Handles communication with the popup       |
| `promptBuilder.js` | Builds the Gemini prompt                   |
| `gemini.js`        | Communicates with Gemini API               |
| `jsonParser.js`    | Converts Gemini response into JSON         |
| `render.js`        | Displays generated test cases              |
| `inserter.js`      | Inserts test cases into LeetCode           |
| `settings.js`      | Saves Gemini API key                       |

---

## ⚙️ How It Works

### 1. Open a LeetCode Problem

Open a problem such as:

```text
Two Sum
```

or

```text
Remove Covered Intervals
```

### 2. Open TestGen

The extension reads the problem from the current LeetCode page.

### 3. Extract Problem Data

TestGen collects:

```text
Title
Description
Constraints
Examples
Function Signature
```

### 4. Build AI Prompt

The collected information is converted into a structured prompt.

### 5. Gemini Generates Test Cases

Gemini analyzes the problem and generates test cases in JSON format.

Example:

```json
{
  "testcases": [
    {
      "name": "Single interval",
      "category": "Boundary",
      "values": {
        "intervals": [[1, 4]]
      }
    }
  ]
}
```

### 6. Display Results

The generated test cases are displayed inside the extension popup.

### 7. Insert Into LeetCode

The planned final workflow allows the user to select a generated test case and automatically insert it into the LeetCode custom testcase input.

---

## Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Open Chrome Extensions

Go to:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Turn on:

```text
Developer mode
```

### 4. Load the Extension

Select:

```text
Load unpacked
```

and choose the project folder.

### 5. Configure Gemini API Key

Open the TestGen extension settings and enter your Gemini API key.

The key is stored using Chrome Storage.

> Never commit your API key to GitHub.

---

##  Usage

1. Open a supported LeetCode problem.
2. Open the TestGen extension.
3. Click **Generate AI Testcases**.
4. Wait for Gemini to generate the test cases.
5. Review the generated cases.
6. Select a testcase.
7. Insert it into LeetCode.
8. Run your solution.

---

##  Current Status

### Completed

      Chrome Extension setup
      LeetCode problem extraction
      Constraint parsing
      Boundary case generation
      Problem caching
      Gemini API integration
      AI prompt generation
      JSON response parsing
      AI testcase generation
      Testcase rendering
      API key settings
---

## 🎓 What I Learned

This project helped me understand:

* Chrome Extension development
* Manifest V3
* JavaScript DOM manipulation
* Content scripts
* Popup and content-script communication
* Chrome Storage
* API integration
* Gemini API
* Prompt engineering
* JSON parsing
* Asynchronous JavaScript
* Modular software architecture
* Caching
* Debugging
* Browser automation concepts

---

## Future Improvements

* Support multiple programming languages.
* Improve testcase validation.
* Allow users to regenerate test cases.
* Add custom testcase categories.
* Add expected output generation.
* Improve LeetCode editor detection.
* Add testcase history.
* Improve UI/UX.
* Support more coding platforms in the future.

---

## Project

**Project Name:** TestGen

**Type:** AI-powered Chrome Extension

**Purpose:** Automated LeetCode test case generation

**AI:** Google Gemini

**Platform:** Google Chrome
