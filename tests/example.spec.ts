import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/Login';


test.beforeEach(async ({ context  }) => {

  await context.addCookies([
    { name: 'interview', value: '7lBPV9iik6r9MNE5dKw9nzF9CstdlEJl', path: '/', domain: '.tractive.com' }
]);

});


test('Successful Registration', async ({ page }) => {
  await page.goto('/');
  const login = new LoginPage(page)
  await login.successFullLoginForm('emaddeym1@gmail.com','Emad@40304030')
  await login.signInButton()

});


test('Invalid Email', async ({ page }) => {
  await page.goto('/');
  const login = new LoginPage(page)
  await login.successFullLoginForm('test','test')
  await login.signInButton()

});
