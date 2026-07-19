/**
 * Validation utility functions
 */

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateClientName = (name: string): boolean => {
  return name.trim().length > 0;
};

export const validateAddress = (address: string): boolean => {
  return address.trim().length > 0;
};

export const validateEmail = (email: string): boolean | string => {
  if (email.trim() === '') {
    return true; // Optional field
  }
  return isValidEmail(email) || 'Invalid email format';
};

export const validatePhone = (phone: string): boolean | string => {
  if (phone.trim() === '') {
    return true; // Optional field
  }
  return isValidPhoneNumber(phone) || 'Invalid phone number';
};
