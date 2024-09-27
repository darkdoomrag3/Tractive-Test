import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../Pages/Registration";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ context, page }) => {
  await context.addCookies([
    {
      name: "interview",
      value: "7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl",
      path: "/",
      domain: ".tractive.com",
    },
  ]);

  await page.goto("#/signup");
});

test("Successful Data Driven Registration", {tag: '@smoke'},async ({ page }) => {
  const registration = new RegistrationPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  // Generate email with custom domain
  const email = `${faker.internet.userName()}@domain.com`;
  const password = faker.internet.password(10) + "A@";

  await registration.fillCreateAccountForm(
    firstName,
    lastName,
    email,
    password
  );
  await registration.createAccountButton();
});

test("Successful Static and duplicate Data Registration", {tag: '@smoke'}, async ({ page }) => {
  const registration = new RegistrationPage(page);

  await registration.fillCreateAccountForm(
    "test123",
    "this is test",
    "user!@domain.com",
    "test@12334567asd"
  );
  await registration.createAccountButton();
});

test("Invalid Registration(wrong Email)", {tag: '@negative'},async ({ page }) => {
  const registration = new RegistrationPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const invalidEmail = faker.internet.email().replace("@", "!{}{@!$#@"); // Create an invalid email
  const password = faker.internet.password(10) + "A@";

  await registration.fillCreateAccountForm(
    firstName,
    lastName,
    invalidEmail,
    password
  );
  await registration.validateErrorMessage("The email address is invalid.");
  await registration.createAccountButtonValidation();
});

test("Invalid Registration(short Password)", {tag: '@negative'},async ({ page }) => {
  const registration = new RegistrationPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = `${faker.internet.userName()}@domain.com`;
  const shortPassword = faker.string.alphanumeric(4) + "A@";

  await registration.fillCreateAccountForm(
    firstName,
    lastName,
    email,
    shortPassword
  );
  await registration.validateErrorMessage("Minimum length is 8 characters.");
  await registration.createAccountButtonValidation();

});

test("Max Length validation for Password",{tag: '@negative'}, async ({ page }) => {
  const registration = new RegistrationPage(page);

  const longtPassword = faker.string.alphanumeric(70) + "A@";

  await registration.fillCreateAccountForm("", "", "", longtPassword);
  await registration.validateErrorMessage("This field is required.");
  await registration.createAccountButtonValidation();
});

test("Empty Fields Validation", {tag: '@negative'},async ({ page }) => {
  const registration = new RegistrationPage(page);

  await registration.fillCreateAccountForm("", "", "", "");
  await registration.validateErrorMessage("This field is required.");
});

test("Newsletter Checkbox", {tag: '@smoke'},async ({ page }) => {
  const registration = new RegistrationPage(page);
  await registration.newsLetterCheckbox();
});
