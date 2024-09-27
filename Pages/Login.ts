import { expect, type Locator, type Page, type BrowserContext } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly context?: BrowserContext;
  readonly emailInput: Locator;
  readonly passwordlInput: Locator;
  readonly singInButton: Locator;
  readonly signOutButton: Locator;
  readonly signOutInDialogButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signInWithAppleLocator: Locator;
  readonly signInWithGoogleLocator: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page, context?: BrowserContext) {
    this.page = page;
    this.context = context;
    this.emailInput = page.locator('input[type="email"]');
    this.passwordlInput = page.locator('input[type="password"]');
    this.singInButton = page.locator('button[type="submit"]', { hasText: "Sign In" });
    this.signOutButton = page.getByText("Sign Out").nth(1);
    this.signOutInDialogButton = page.getByRole("button", { name: "Sign Out" });
    this.forgotPasswordLink = page.getByText('Forgot password?');
    this.createAccountLink = page.getByText('Create Account');
    this.signInWithAppleLocator = page.getByRole('button', { name: 'Sign in with Apple' });
    this.signInWithGoogleLocator = page.frameLocator('iframe[title="Sign in with Google Button"]').getByLabel('Sign in with Google')
  }

  async successFullLoginForm(email: string, password: string) {
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordlInput).toBeVisible();
    await this.emailInput.fill(email);
    await this.passwordlInput.fill(password);
  }

  async signIn() {
    await expect(this.singInButton).toBeVisible();
    await expect(this.singInButton).toBeEnabled();
    await this.singInButton.click();
  }

  
  async signOut() {
    await this.signOutButton.click();
    await this.signOutInDialogButton.click();
  }

  async assertToastMessage(expectedMessage: string) {
    await this.page.waitForSelector("div.toast.toast-error", { state: "visible" });
    const toastMessage = this.page.locator("div.toast.toast-error .toast-message", { hasText: expectedMessage });
    await expect(toastMessage).toBeVisible();
    await expect(toastMessage).toContainText(expectedMessage);
  }

  async forgetPassword() {
    await this.forgotPasswordLink.click();
    await this.emailInput.isVisible();
    await expect(this.page).toHaveURL(/\/forgot/);
  }

  async createAccount() {
    await this.createAccountLink.click();
    await expect(this.page).toHaveURL(/\/signup/);
  }

  async ngInvalidDivAssertion() {
    const redLine = this.page.locator(
      ".tcommon-form-field__container input.ng-touched.ng-invalid + .tcommon-form-field__line"
    );
    await expect(redLine).toBeVisible();
    await expect(redLine).toHaveCSS("background-color", "rgb(203, 63, 55)");
  }

  async signInWithApple() {
    if (!this.context) {
      throw new Error('Browser context is required for this operation.');
    }
     // Wait for the new page (popup) after clicking "Sign in with Apple"
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),  
      this.signInWithAppleLocator.click(), 
    ]);

    await newPage.waitForLoadState('load');
    await expect(newPage).toHaveURL(/https:\/\/appleid\.apple\.com\/auth\/authorize/);
    await newPage.close();
  }

  async signInWithGoogle() {
   
    await expect(this.signInWithGoogleLocator).toBeVisible({ timeout: 30000 });

    if (!this.context) {
      throw new Error('Browser context is required for this operation.');
    }
  
    // Wait for the new page (popup) after clicking "Sign in with Google"
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      this.signInWithGoogleLocator.click(),
    ]);

    await newPage.waitForLoadState('load');
    await expect(newPage).toHaveURL(/https:\/\/accounts\.google\.com/);
    await newPage.close();
  }
  


}
