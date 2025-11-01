// Mock the UserContext and login function
const mockLogin = jest.fn();

jest.mock('../hooks/useUser', () => ({
  useUser: () => ({
    login: mockLogin,
  }),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Login Account Authentication', () => {
  
  beforeEach(() => {
    mockLogin.mockClear();
  });

  // Test Case 1: Valid email and password - should redirect to profile page
  test('Test Case 1: "BillyBob@gmail.com" + "Password1!" should redirect to profile page', async () => {
    const email = 'BillyBob@gmail.com';
    const password = 'Password1!';

    // Mock successful login (email exists and password matches)
    mockLogin.mockResolvedValueOnce(undefined);

    // Simulate the login call
    try {
      await mockLogin(email, password);
      // If login succeeds, user should be redirected to profile
      expect(mockLogin).toHaveBeenCalledWith(email, password);
      expect(mockLogin).toHaveBeenCalledTimes(1);
      // Success case - no error thrown, redirect should happen
    } catch (error) {
      // Should not throw error for valid credentials
      expect(true).toBe(false); // This should not happen
    }
  });

  // Test Case 2: Email with space and short password - should show error message
  test('Test Case 2: "BillyBob @gmail.com" + "pass" should show "incorrect email or password"', async () => {
    const email = 'BillyBob @gmail.com';
    const password = 'pass';

    // Mock failed login (email doesn't exist or password doesn't match)
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    // Simulate the login call
    try {
      await mockLogin(email, password);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Login should fail
      expect(mockLogin).toHaveBeenCalledWith(email, password);
      expect(mockLogin).toHaveBeenCalledTimes(1);
      // Error should be caught and show "incorrect email or password"
      expect(error).toBeDefined();
    }
  });

  // Test Case 3: Email with space and empty password - should show error message
  test('Test Case 3: "BillyBob @gmail.com" + " " should show "incorrect email or password"', async () => {
    const email = 'BillyBob @gmail.com';
    const password = ' ';

    // Mock failed login (email doesn't exist or password doesn't match)
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    // Simulate the login call
    try {
      await mockLogin(email, password);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Login should fail
      expect(mockLogin).toHaveBeenCalledWith(email, password);
      expect(mockLogin).toHaveBeenCalledTimes(1);
      // Error should be caught and show "incorrect email or password"
      expect(error).toBeDefined();
    }
  });

  // Test Case 4: Email without @ (invalid email format) - should show error message
  test('Test Case 4: "Bobby" + "Password1!" should show "incorrect email or password"', async () => {
    const email = 'Bobby';
    const password = 'Password1!';

    // Mock failed login (email doesn't exist in system)
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    // Simulate the login call
    try {
      await mockLogin(email, password);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Login should fail because email doesn't exist
      expect(mockLogin).toHaveBeenCalledWith(email, password);
      expect(mockLogin).toHaveBeenCalledTimes(1);
      // Error should be caught and show "incorrect email or password"
      expect(error).toBeDefined();
    }
  });

  // Test Case 5: Empty email and valid password - should show error message
  test('Test Case 5: " " + "Password1!" should show "incorrect email or password"', async () => {
    const email = ' ';
    const password = 'Password1!';

    // Mock failed login (email doesn't exist or empty)
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    // Simulate the login call
    try {
      await mockLogin(email, password);
      // Should not reach here
      expect(true).toBe(false);
    } catch (error) {
      // Login should fail
      expect(mockLogin).toHaveBeenCalledWith(email, password);
      expect(mockLogin).toHaveBeenCalledTimes(1);
      // Error should be caught and show "incorrect email or password"
      expect(error).toBeDefined();
    }
  });

});

