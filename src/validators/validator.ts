export interface ValidationRule<T> {
  validate: (value: T) => boolean;
  errorMessage: string;
}

export class Validator<T> {
  constructor(private rules: ValidationRule<T>[]) {}

  validate(value: T): string[] {
    return this.rules
      .filter((rule) => !rule.validate(value))
      .map((rule) => rule.errorMessage);
  }
}

// Usage example for location validator:
const latitudeRules: ValidationRule<string>[] = [
  {
    validate: (lat) => /^-?\d+(\.\d+)?$/.test(lat),
    errorMessage: 'Latitude must be a valid degree.',
  },
  {
    validate: (lat) => {
      const num = parseFloat(lat);
      return num >= -90 && num <= 90;
    },
    errorMessage: 'Latitude must be between -90 and 90.',
  },
];

export const validateLatitude = new Validator(latitudeRules);
