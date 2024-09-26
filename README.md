# Tractive staging WebAPP E2E Test

Welcome to the Tractive E2E Test project! This repository is dedicated to end-to-end (E2E) tests implemented using Playwright. Our goal is to ensure the quality and reliability of the application by automating user interactions across various browsers.

## Project Description
Tractive E2E Test suite is designed to simulate user actions and validate the behavior of the Login and Registration of Tractive web application. By covering critical user flows, we aim to catch regressions and ensure that new features work as expected before they reach production.



## Getting Started

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/darkdoomrag3/Tractive-Test.git
    
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Run Tests in Headless Mode:**
    ```bash
    npx playwright test
    ```

4. **Run Tests in Headed Mode:**
    ```bash
    npx playwright test --headed
    ```

5. **Code Generation Mode with Emulated Viewport Size:**
    ```bash
    npx playwright codegen --viewport-size=800,600 playwright.dev
    ```

6. **Debug Tests in UI Mode:**
    ```bash
    npx playwright test --ui
    ```

## Contributing

To contribute to the project, follow these steps:

1. **Create your own branch** from the main branch using the following command:
   ```bash
   git checkout -b your-branch-name
   ```

2. **Make your changes and commit them to your branch. Remember to write meaningful commit messages**.

```bash
git add .
```
```bash
 git commit -m "Your commit message"
```
3. **Push your code to the remote repository on your branch**

```bash
git push origin your-branch-name

```

4. **Compare your branch with the main branch by creating a merge request in GitLab. Ensure to**:

1. Set the target branch to ‘main’.
2. Request reviews from members of the affected teams for shared components or utilities.
3. Describe your changes clearly in the merge request description.

## Reporter

since for this project we are using allure-reporter for test results, in order to generate reports follow these steps:

1. **Generate Allure Report:
   ```bash
   allure generate ./allure-results -o ./allure-report
   ```
2. **Open Allure Report**.

```bash
allure open ./allure-report
```

Happy testing in Tractive! 🚀

Please communicate with other teams to ensure compatibility for changes that affect shared components or utilities. For shared changes, create a merge request and request reviews from members of the affected teams.
