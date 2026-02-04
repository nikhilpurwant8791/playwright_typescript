import { CheckoutFormData } from '../pages/checkoutPage';

export const checkoutDataFixtures: CheckoutFormData[] = [
  {
    email: 'abc@gmail.com',
    phone: '1234567891',
    address: 'xyz road, testing',
    city: 'Test1',
    state: 'Test2',
    zipCode: '450560',
    cardholderName: 'tester1',
    cardNumber: '1234567891234567',
    cvv: '789'
  },
  {
    email: 'john.doe@example.com',
    phone: '9876543210',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    cardholderName: 'John Doe',
    cardNumber: '4111111111111111',
    cvv: '123'
  },
  {
    email: 'sarah.smith@test.com',
    phone: '5551234567',
    address: '456 Oak Avenue, Suite 200',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    cardholderName: 'Sarah Smith',
    cardNumber: '5555555555554444',
    cvv: '456'
  }
];

// Get specific fixture by index
export const getCheckoutData = (): CheckoutFormData => {
  return checkoutDataFixtures[0];
};
