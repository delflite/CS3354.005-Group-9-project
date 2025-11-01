const { validateSkillProof, validateSkillName } = require('../lib/validation');

describe('Create Skill Validation', () => {
  
  // Test Case 1: Valid file and valid skill name - should redirect to dashboard
  test('Test Case 1: "Proof.png" + "Java" should redirect to dashboard', () => {
    const file = {
      name: 'Proof.png',
      type: 'image/png',
      size: 1024 * 1024 // 1MB, under 5MB limit
    };
    const skillName = 'Java';

    const fileValidation = validateSkillProof(file);
    const skillValidation = validateSkillName(skillName);

    expect(fileValidation.isValid).toBe(true);
    expect(fileValidation.error).toBeNull();
    expect(skillValidation.isValid).toBe(true);
    expect(skillValidation.error).toBeNull();
    // If both validations pass, the skill should be added and redirect to dashboard
  });

  // Test Case 2: Valid file and invalid skill name (has number) - should show error message
  test('Test Case 2: "Proof.png" + "J3VA" should show error message', () => {
    const file = {
      name: 'Proof.png',
      type: 'image/png',
      size: 1024 * 1024 // 1MB
    };
    const skillName = 'J3VA';

    const fileValidation = validateSkillProof(file);
    const skillValidation = validateSkillName(skillName);

    // File is valid
    expect(fileValidation.isValid).toBe(true);
    expect(fileValidation.error).toBeNull();

    // Skill name is invalid (contains number)
    expect(skillValidation.isValid).toBe(false);
    expect(skillValidation.error).toBe('Skill name can only contain letters and spaces');
    
    // At least one error should be shown
    expect(fileValidation.isValid === false || skillValidation.isValid === false).toBe(true);
  });

  // Test Case 3: Valid file and empty/whitespace skill name - should show error message
  test('Test Case 3: "Proof.png" + " " should show error message', () => {
    const file = {
      name: 'Proof.png',
      type: 'image/png',
      size: 1024 * 1024 // 1MB
    };
    const skillName = ' ';

    const fileValidation = validateSkillProof(file);
    const skillValidation = validateSkillName(skillName);

    // File is valid
    expect(fileValidation.isValid).toBe(true);
    expect(fileValidation.error).toBeNull();

    // Skill name is invalid (empty/whitespace)
    expect(skillValidation.isValid).toBe(false);
    expect(skillValidation.error).toBe('Skill name is required');
    
    // At least one error should be shown
    expect(fileValidation.isValid === false || skillValidation.isValid === false).toBe(true);
  });

  // Test Case 4: Invalid file format (wrong extension) and valid skill name - should show error message
  test('Test Case 4: "Proof.txt" + "Java" should show error message', () => {
    const file = {
      name: 'Proof.txt',
      type: 'text/plain',
      size: 1024 * 1024 // 1MB
    };
    const skillName = 'Java';

    const fileValidation = validateSkillProof(file);
    const skillValidation = validateSkillName(skillName);

    // File is invalid (wrong format)
    expect(fileValidation.isValid).toBe(false);
    expect(fileValidation.error).toBe('File format must be .png, .jpeg, or .jpg');

    // Skill name is valid
    expect(skillValidation.isValid).toBe(true);
    expect(skillValidation.error).toBeNull();
    
    // Error should be shown because file is invalid
    expect(fileValidation.isValid).toBe(false);
  });

  // Test Case 5: Empty/no file and valid skill name - should show error message
  test('Test Case 5: " " (no file) + "Java" should show error message', () => {
    const file = null; // No file selected
    const skillName = 'Java';

    const fileValidation = validateSkillProof(file);
    const skillValidation = validateSkillName(skillName);

    // File is invalid (not provided)
    expect(fileValidation.isValid).toBe(false);
    expect(fileValidation.error).toBe('Skill proof file is required');

    // Skill name is valid
    expect(skillValidation.isValid).toBe(true);
    expect(skillValidation.error).toBeNull();
    
    // Error should be shown because file is missing
    expect(fileValidation.isValid).toBe(false);
  });

});

