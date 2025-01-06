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

// Latitude validation rules
const latitudeRules: ValidationRule<string>[] = [
  {
    validate: (lat) => /^-?\d+(\.\d+)?$/.test(lat),
    errorMessage: 'Latitude must be a valid degree.',
  },
  {
    validate: (lat) => {
      const num = parseFloat(lat);
      return !isNaN(num) && num >= -90 && num <= 90;
    },
    errorMessage: 'Latitude must be between -90 and 90.',
  },
];

// Longitude validation rules
const longitudeRules: ValidationRule<string>[] = [
  {
    validate: (lon) => /^-?\d+(\.\d+)?$/.test(lon),
    errorMessage: 'Longitude must be a valid degree.',
  },
  {
    validate: (lon) => {
      const num = parseFloat(lon);
      return !isNaN(num) && num >= -180 && num <= 180;
    },
    errorMessage: 'Longitude must be between -180 and 180.',
  },
];

export const latitudeValidator = new Validator(latitudeRules);
export const longitudeValidator = new Validator(longitudeRules);
