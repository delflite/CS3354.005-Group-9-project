/**
 * Validates email format
 * @param {string} email - The email to validate
 * @returns {{isValid: boolean, error: string|null}} Validation result
 */
function validateEmail(email) {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email is required' };
  }

  // Check for @ symbol
  if (!email.includes('@')) {
    return { isValid: false, error: 'Email must contain "@" symbol' };
  }

  // Check for spaces
  if (email.includes(' ')) {
    return { isValid: false, error: 'Email cannot contain spaces' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates password format
 * @param {string} password - The password to validate
 * @returns {{isValid: boolean, error: string|null}} Validation result
 */
function validatePassword(password) {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }

  // Check length (8-20 characters)
  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long' };
  }

  if (password.length > 20) {
    return { isValid: false, error: 'Password must be at most 20 characters long' };
  }

  // Check for at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one uppercase letter' };
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one number' };
  }

  // Check for at least one special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one special character' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates skill proof file (image file)
 * @param {object} file - The file object to validate (should have type/name and size)
 * @returns {{isValid: boolean, error: string|null}} Validation result
 */
function validateSkillProof(file) {
  if (!file) {
    return { isValid: false, error: 'Skill proof file is required' };
  }

  // Check file format (.png, .jpeg, or .jpg)
  const fileName = file.name || file.filename || '';
  const fileType = file.type || file.mimeType || '';
  
  // Extract extension from filename
  const extension = fileName.toLowerCase().split('.').pop();
  const validExtensions = ['png', 'jpeg', 'jpg'];
  
  // Also check mime type as fallback
  const validMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const isValidMimeType = validMimeTypes.includes(fileType.toLowerCase());

  if (!validExtensions.includes(extension) && !isValidMimeType) {
    return { isValid: false, error: 'File format must be .png, .jpeg, or .jpg' };
  }

  // Check file size (max 5MB = 5 * 1024 * 1024 bytes)
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  const fileSize = file.size || 0;

  if (fileSize > maxSize) {
    return { isValid: false, error: 'File size must not exceed 5MB' };
  }

  return { isValid: true, error: null };
}

/**
 * Validates skill name
 * @param {string} skillName - The skill name to validate
 * @returns {{isValid: boolean, error: string|null}} Validation result
 */
function validateSkillName(skillName) {
  if (!skillName || skillName.trim() === '') {
    return { isValid: false, error: 'Skill name is required' };
  }

  // Check length (between 3 and 50 characters)
  if (skillName.length < 3) {
    return { isValid: false, error: 'Skill name must be at least 3 characters long' };
  }

  if (skillName.length > 50) {
    return { isValid: false, error: 'Skill name must be at most 50 characters long' };
  }

  // Check if only letters and spaces (no numbers, special characters, etc.)
  if (!/^[a-zA-Z\s]+$/.test(skillName)) {
    return { isValid: false, error: 'Skill name can only contain letters and spaces' };
  }

  return { isValid: true, error: null };
}

module.exports = { validateEmail, validatePassword, validateSkillProof, validateSkillName };

