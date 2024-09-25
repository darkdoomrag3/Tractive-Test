import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordlInput: Locator;
  readonly singInButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordlInput = page.locator('input[type="password"]');
    this.singInButton = page.locator('button[type="submit"]', { hasText: 'Sign In' });

  }

  async successFullLoginForm(email:string,password:string) {
   
    await this.emailInput.fill(email);
    await this.passwordlInput.fill(password);
  }

  async signInButton() {
    await this.singInButton.click();
 
  }


}