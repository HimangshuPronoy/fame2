export interface ValidationError {
  field: string;
  message: string;
}

export function validateListingForm(form: {
  title: string;
  subtitle?: string;
  description?: string;
  category: string;
  location?: string;
  phone?: string;
  website?: string;
  price?: string;
  image_url?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  // Title validation
  if (!form.title.trim()) {
    errors.push({ field: "title", message: "Title is required" });
  } else if (form.title.trim().length < 3) {
    errors.push({ field: "title", message: "Title must be at least 3 characters" });
  } else if (form.title.trim().length > 100) {
    errors.push({ field: "title", message: "Title must be less than 100 characters" });
  }

  // Website URL validation
  if (form.website && form.website.trim()) {
    try {
      new URL(form.website.trim());
    } catch {
      errors.push({ field: "website", message: "Please enter a valid URL (e.g., https://example.com)" });
    }
  }

  // Image URL validation
  if (form.image_url && form.image_url.trim()) {
    try {
      new URL(form.image_url.trim());
    } catch {
      errors.push({ field: "image_url", message: "Please enter a valid image URL" });
    }
  }

  // Phone validation (basic)
  if (form.phone && form.phone.trim()) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(form.phone.trim())) {
      errors.push({ field: "phone", message: "Please enter a valid phone number" });
    }
  }

  return errors;
}

export function getErrorMessage(errors: ValidationError[], field: string): string | null {
  const error = errors.find(e => e.field === field);
  return error ? error.message : null;
}
