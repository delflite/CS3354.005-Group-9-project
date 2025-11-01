const { validateEmail, validatePassword } = require('../lib/validation');

describe('Register Account Validation', () => {
  
  // Test Case 1: Valid email and password - should redirect to profile page
  test('Test Case 1: "BillyBob@gmail.com" + "Password1!" should pass validation', () => {
    const email = 'BillyBob@gmail.com';
    const password = 'Password1!';

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    expect(emailValidation.isValid).toBe(true);
    expect(emailValidation.error).toBeNull();
    expect(passwordValidation.isValid).toBe(true);
    expect(passwordValidation.error).toBeNull();
    // If both validations pass, the user would be redirected to profile page
  });

  // Test Case 2: Email with space and short password - should show error message
  test('Test Case 2: "BillyBob @gmail.com" + "pass" should show error message', () => {
    const email = 'BillyBob @gmail.com';
    const password = 'pass';

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Email has a space, so it should fail
    expect(emailValidation.isValid).toBe(false);
    expect(emailValidation.error).toBe('Email cannot contain spaces');

    // Password is too short (less than 8 characters), so it should also fail
    expect(passwordValidation.isValid).toBe(false);
    expect(passwordValidation.error).toBe('Password must be at least 8 characters long');
    
    // At least one error should be shown
    expect(emailValidation.isValid === false || passwordValidation.isValid === false).toBe(true);
  });

  // Test Case 3: Email with space and empty/space password - should show error message
  test('Test Case 3: "BillyBob @gmail.com" + " " should show error message', () => {
    const email = 'BillyBob @gmail.com';
    const password = ' ';

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Email has a space, so it should fail
    expect(emailValidation.isValid).toBe(false);
    expect(emailValidation.error).toBe('Email cannot contain spaces');

    // Password is empty/whitespace, so it should fail
    expect(passwordValidation.isValid).toBe(false);
    expect(passwordValidation.error).toBe('Password is required');
    
    // At least one error should be shown
    expect(emailValidation.isValid === false || passwordValidation.isValid === false).toBe(true);
  });

  // Test Case 4: Email without @ symbol and valid password - should show error message
  test('Test Case 4: "Bobby" + "Password1!" should show error message', () => {
    const email = 'Bobby';
    const password = 'Password1!';

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Email is missing @ symbol, so it should fail
    expect(emailValidation.isValid).toBe(false);
    expect(emailValidation.error).toBe('Email must contain "@" symbol');

    // Password is valid
    expect(passwordValidation.isValid).toBe(true);
    expect(passwordValidation.error).toBeNull();
    
    // Error should be shown because email is invalid
    expect(emailValidation.isValid).toBe(false);
  });

  // Test Case 5: Empty/space email and valid password - should show error message
  test('Test Case 5: " " + "Password1!" should show error message', () => {
    const email = ' ';
    const password = 'Password1!';

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    // Email is empty/whitespace, so it should fail
    expect(emailValidation.isValid).toBe(false);
    expect(emailValidation.error).toBe('Email is required');

    // Password is valid
    expect(passwordValidation.isValid).toBe(true);
    expect(passwordValidation.error).toBeNull();
    
    // Error should be shown because email is invalid
    expect(emailValidation.isValid).toBe(false);
  });

});
