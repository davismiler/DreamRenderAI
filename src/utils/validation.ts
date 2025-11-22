// Input validation utilities

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validatePrompt = (prompt: string): ValidationResult => {
  const trimmed = prompt.trim();
  
  if (!trimmed) {
    return {
      isValid: false,
      error: 'Please enter a prompt to generate an image.',
    };
  }
  
  if (trimmed.length < 3) {
    return {
      isValid: false,
      error: 'Prompt must be at least 3 characters long.',
    };
  }
  
  if (trimmed.length > 1000) {
    return {
      isValid: false,
      error: 'Prompt must be less than 1000 characters.',
    };
  }
  
  return { isValid: true };
};

export const validateImageSize = (size: string): ValidationResult => {
  const validSizes = ['1024x1024', '1792x1024', '1024x1792'];
  
  if (!validSizes.includes(size)) {
    return {
      isValid: false,
      error: 'Invalid image size selected.',
    };
  }
  
  return { isValid: true };
};

export const validateModel = (model: string): ValidationResult => {
  const validModels = ['img3', 'img4'];
  
  if (!validModels.includes(model)) {
    return {
      isValid: false,
      error: 'Invalid model selected.',
    };
  }
  
  return { isValid: true };
};

