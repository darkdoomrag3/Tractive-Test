import { test, expect } from "@playwright/test";
import { LoginPage } from "../Pages/Login";
import { faker } from "@faker-js/faker";

test.describe("Login Tests", () => {

  test.beforeEach(async ({ context, page }) => {
    await context.addCookies([
      {
        name: "interview",
        value: "7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl",
        path: "/",
        domain: ".tractive.com",
      },
    ]);
    await page.goto("/");
  });

  test('Successful Login',{tag: '@smoke'}, async ({ page }) => {

    const login = new LoginPage(page);
    await login.successFullLoginForm("emaddeym@gmail.com", "Emad@40304030");
    await login.signIn();
    await login.signOut();
  });

  test("Invalid Login (Incorrect Password)",{tag: '@negative'}, async ({ page }) => {

    const login = new LoginPage(page);

    const randomEmail = faker.internet.email(); // Generate random email
    const incorrectPassword = faker.internet.password(8); // Generate random password

    await login.successFullLoginForm(randomEmail, incorrectPassword);
    await login.signIn();
    await login.assertToastMessage(
      "Looks like you entered a wrong email or password."
    );
  });

  test("Invalid Login (Invalid Email Format)",{tag: '@negative'}, async ({ page }) => {

    const login = new LoginPage(page);

    const invalidEmail = faker.internet.email().replace("@", "!{}{@"); // Create an invalid email
    const randomPassword = faker.internet.password(10); // Generate random password

    await login.successFullLoginForm(invalidEmail, randomPassword);
    await login.signIn();
    await login.assertToastMessage(
      "Looks like you entered a wrong email or password."
    );
  });

  test("Invalid Login (Invalid Email Format and Type)",{tag: '@negative'}, async ({ page }) => {

    const login = new LoginPage(page);
    const email = faker.internet.email();
    const password = faker.internet.password(10, true, /[A-Z]/, "Test@");

    await login.successFullLoginForm(email, password);
    await login.signIn();
    await login.assertToastMessage(
      "Looks like you entered a wrong email or password. Signed up with Google or Apple? Log in using one of the buttons."
    );
  });

  test("Invalid Login (Wrong Email Format)",{tag: '@negative'}, async ({ page }) => {

    const login = new LoginPage(page);

    const wrongEmail = "user @email.com";
    const randomPassword = faker.internet.password(10);

    await login.successFullLoginForm(wrongEmail, randomPassword);
    await login.ngInvalidDivAssertion();
  });

  test("Empty Fields Validation",{tag: '@negative'}, async ({ page }) => {

    const login = new LoginPage(page);
    await login.successFullLoginForm("", "");
    const signInButton = page.locator('button[type="submit"]', {
      hasText: "Sign In",
    });

    await expect(signInButton).toBeDisabled();
  });

  test("Forgot Password Link",{tag: '@smoke'}, async ({ page }) => {

    const login = new LoginPage(page);
    await login.forgetPassword();
  });

  test("Sign In with Apple" ,{tag: '@smoke'},async ({ page, context }) => {
   
    const login = new LoginPage(page, context);
    await login.signInWithApple();
  });

  test("Sign In with Google", {tag: '@smoke'},async ({ page, context }) => {

    const login = new LoginPage(page, context);
    await login.signInWithGoogle();
  });

  test("Create Account Link", {tag: '@smoke'},async ({ page }) => {

    const login = new LoginPage(page);
    await login.createAccount();
  });
});
