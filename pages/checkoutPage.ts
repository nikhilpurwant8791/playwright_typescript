import { Page, expect } from '@playwright/test';
import { BasePage } from './basePage';

export interface CheckoutFormData {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardholderName: string;
  cardNumber: string;
  cvv: string;
}

export class CheckoutPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goToCheckout() {
    await this.page.getByRole('link', { name: 'Checkout' }).click();
  }

  async fillEmail(email: string) {
    await this.page.getByRole('textbox', { name: 'Email Account Information' }).click();
    await this.page.getByRole('textbox', { name: 'Email Account Information' }).fill(email);
  }

  async fillPhone(phone: string) {
    await this.page.getByRole('textbox', { name: 'Phone Number Account' }).click();
    await this.page.getByRole('textbox', { name: 'Phone Number Account' }).fill(phone);
  }

  async fillAddress(address: string) {
    await this.page.getByRole('textbox', { name: 'Address Shipping Address' }).click();
    await this.page.getByRole('textbox', { name: 'Address Shipping Address' }).fill(address);
  }

  async fillCity(city: string) {
    await this.page.getByRole('textbox', { name: 'City Shipping Address' }).click();
    await this.page.getByRole('textbox', { name: 'City Shipping Address' }).fill(city);
  }

  async fillState(state: string) {
    await this.page.getByRole('textbox', { name: 'State/Province Shipping' }).click();
    await this.page.getByRole('textbox', { name: 'State/Province Shipping' }).fill(state);
  }

  async fillZipCode(zipCode: string) {
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code Shipping' }).click();
    await this.page.getByRole('textbox', { name: 'Zip/Postal Code Shipping' }).fill(zipCode);
  }

  async fillCardholderName(name: string) {
    await this.page.getByRole('textbox', { name: 'Cardholder Name' }).click();
    await this.page.getByRole('textbox', { name: 'Cardholder Name' }).fill(name);
  }

  async fillCardNumber(cardNumber: string) {
    await this.page.getByRole('textbox', { name: 'Card Number' }).click();
    await this.page.getByRole('textbox', { name: 'Card Number' }).fill(cardNumber);
  }

  async fillCVV(cvv: string) {
    await this.page.getByRole('textbox', { name: 'CVV' }).click();
    await this.page.getByRole('textbox', { name: 'CVV' }).fill(cvv);
  }

  async fillCheckoutForm(data: CheckoutFormData) {
    await this.fillEmail(data.email);
    await this.fillPhone(data.phone);
    await this.fillAddress(data.address);
    await this.fillCity(data.city);
    await this.fillState(data.state);
    await this.fillZipCode(data.zipCode);
    await this.fillCardholderName(data.cardholderName);
    await this.fillCardNumber(data.cardNumber);
    await this.fillCVV(data.cvv);
  }

  async placeOrder() {
    await this.page.getByRole('button', { name: 'Place Order' }).click();
  }

  async verifyErrorMessage(errorMessage: string) {
    await expect(this.page.locator(`[error-message="${errorMessage}"]`).first()).toBeVisible();
  }

  async verifyAllErrorMessages(errorMessages: string[]) {
    for (const errorMsg of errorMessages) {
      await this.verifyErrorMessage(errorMsg);
    }
  }

  async verifyOrderSuccess() {
    await expect(this.page.getByRole('paragraph')).toContainText('Demo checkout process complete.');
    await expect(this.page.locator('#pages')).toContainText('Finish');
    await expect(this.page).toHaveURL('https://shop.polymer-project.org/checkout/success');
  }

  async clickFinish() {
    await this.page.getByRole('link', { name: 'Finish' }).click();
  }

  async verifyReturnedToHome() {
    await expect(this.page).toHaveURL('https://shop.polymer-project.org/');
  }
}
