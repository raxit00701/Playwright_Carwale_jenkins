CarWale – End-to-End Test Automation with Playwright (JavaScript)

A complete UI + API automation framework built using Playwright JS, designed to test core user journeys of:
👉 https://carwale.onrender.com/
WATCH HERE: https://drive.google.com/file/d/1PON_isG0Ve8WtdrQufHI2S9fqsWevQT4/view?usp=sharing


This repository showcases advanced QA automation capabilities including:

UI Automation

API Testing

CI/CD Integration (Jenkins)

Multi-browser Cross Testing

Network Interception

Page Object Model (POM)

Data-Driven Testing

Allure Reporting with Screenshots, Videos & Logs

🚀 Project Highlights

allure report: https://drive.google.com/file/d/1nLmTGdXBifKDfgx7KaVIYmT1frG_15tI/view?usp=sharing
test cases status: https://drive.google.com/file/d/1q8dwBvUqJjS8PDPgWMNwJTHncgDrwfwx/view?usp=sharing

🔹 1. Comprehensive Automated UI Test Scenarios
| Feature             | Description                                                    |
| ------------------- | -------------------------------------------------------------- |
| **Signup**          | New user registration flow                                     |
| **Login**           | Data-driven login validation using JSON                        |
| **Create Order**    | Order flow automated using **network interception (mock API)** |
| **Search Item**     | Search tests driven through JSON test data                     |
| **Filter Cars**     | Validates car filter behavior                                  |
| **Car Detail Page** | UI + functional checks                                         |
| **Go to Cart**      | API + UI hybrid validation                                     |


🔹 2. API Testing (Integrated with UI Tests)
Created API automation for:

Login API

Go To Cart API

API login token is reused inside UI test scripts, replacing UI login →
✔ Faster execution
✔ Less flakiness
✔ More stable CI pipeline

🔹 3. Network Interception & Mocking

Using page.route() to:

Generate fake order creation

Mock backend responses

Validate UI behavior without depending on server state

🔹 4. Page Object Model (POM) Implementation

Reusable & scalable POM structure:

loginPage.js

carsResultPage.js

Used in:
✔ UI tests
✔ API-integrated tests
✔ Interception scripts

🔹 5. Data-Driven Testing

Using JSON files for test inputs:

loginTestData.json

searchItemData.json

Benefits:
✔ Easy test data expansion
✔ Clean script logic
✔ No code modification required


🏗 Project Structure

project-folder/
│── tests/
│   ├── signup.spec.js
│   ├── login.spec.js
│   ├── create-order.spec.js
│   ├── search-item.spec.js
│   ├── filter.spec.js
│   ├── car-detail.spec.js
│   ├── utils/
│   │    ├── login-api.spec.js
│   │    ├── cart-api.spec.js
│── pages/
│   ├── loginPage.js
│   ├── carsResultPage.js
│   ├── data/
│   │    ├── loginTestData.json
│   │    ├── searchItemData.json
│── reports/
│   ├── allure-results/
│   ├── allure-report/
│── playwright.config.js
│── package.json
│── README.md

Gdrive link for stucture: https://drive.google.com/file/d/1JVsisPMjPnrMV2YykYsmZfUK0yal5FTz/view?usp=sharing

⚙️ Jenkins CI/CD Integration

This framework is fully integrated with Jenkins, supporting:
✔ Automatic build trigger
✔ Cross-browser execution
✔ Allure Reports generation
✔ Screenshots, videos & logs on failure

✔ Multi-Browser Parametrized Execution

Jenkins pipeline runs tests through 4 browsers:

| Browser     | Status      |
| ----------- | ----------- |
| **Chrome**  | ✔ Supported |
| **Firefox** | ✔ Supported |
| **Edge**    | ✔ Supported |
| **WebKit**  | ✔ Supported |


✔ Automatic Allure Report on Jenkins

On every Jenkins execution:

Allure results are generated

Screenshots for failed tests

Video recordings

Console logs

Attachments for debugging

Allure report archive

📊 Allure Reporting (With Enhanced Debugging)
Allure Includes:

✔ Test summary

✔ Step-level tracing

✔ Screenshots on failure

✔ Video on failure

✔ Execution logs

✔ Network logs


🛠 Tech Stack

| Tool                                   | Purpose                                   |
| -------------------------------------- | ----------------------------------------- |
| **Playwright JavaScript**              | UI Automation                             |
| **Jenkins CI/CD**                      | Scheduled + Parametrized execution        |
| **API Testing via Playwright request** | Backend validation                        |
| **Allure Reports**                     | Reporting with screenshots, videos & logs |
| **Page Object Model (POM)**            | Scalable test architecture                |
| **JSON**                               | Data-driven testing                       |
| **Network Interception**               | Mocking APIs                              |


🏆 Key Strengths of This Framework

✔ UI + API + Mocking = Complete E2E coverage
✔ Reusable POM-based architecture
✔ Fully automated Jenkins pipeline
✔ Multi-browser cross-platform testing
✔ Robust debugging using screenshots/videos/logs
✔ Easy to extend and maintain



