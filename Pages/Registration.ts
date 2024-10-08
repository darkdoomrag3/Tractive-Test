import { expect, type Locator, type Page } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNamelInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly createAccountLocator: Locator;
  readonly invalidEmailLocator: Locator;
  readonly newsLetterCheckboxLocator: Locator;


  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[name="firstName"]');
    this.lastNamelInput = page.locator('[name="lastName"]');
    this.emailInput = page.locator('[name="email"]');
    this.passwordInput = page.locator('[name="password"]');
    this.createAccountLocator = page.locator('button[type="submit"]', { hasText: 'Create Account' });
    this.invalidEmailLocator = page.getByText('The email address is invalid.');
    this.newsLetterCheckboxLocator = page.locator('tcommon-check div')
  
  }

  async fillCreateAccountForm(firstName: string,lastName:string,email:string,password:string) {
    await this.assertInputVisibility(); // Ensure inputs are visible
    await this.firstNameInput.fill(firstName);
    await this.lastNamelInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }


  async assertInputVisibility() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.firstNameInput).toBeEnabled();

    await expect(this.lastNamelInput).toBeVisible();
    await expect(this.lastNamelInput).toBeEnabled();

    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toBeEnabled();

    await expect(this.passwordInput).toBeVisible();
    await expect(this.passwordInput).toBeEnabled();
  }

  
  async createAccountButton() {
    await expect(this.createAccountLocator).toBeVisible();
    await this.createAccountLocator.click();
 
  }


async createAccountButtonValidation(){
  await expect(this.createAccountLocator).toBeDisabled()
}

async validateErrorMessage(expectedText: string) {

  const validationMessages = this.page.getByText(expectedText);
  // Count the number of matching elements for multiple input error validation
  const count = await validationMessages.count();


  // If one or more elements are found, assert their visibility
  for (let i = 0; i < count; i++) {
    await expect(validationMessages.nth(i)).toBeVisible();
  }
}

async newsLetterCheckbox(){
  await expect(this.newsLetterCheckboxLocator).toBeVisible();
  await this.newsLetterCheckboxLocator.click();
}


}