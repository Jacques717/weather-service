import { validateLatLon } from '../src/validators/locationValidator';

describe('validateLatLon', () => {
  it('should return an error for invalid latitude', () => {
    const errors = validateLatLon('invalid', '0');
    expect(errors).toContain('Latitude must be a valid degree.');
  });

  it('should return an error for latitude out of range', () => {
    const errors = validateLatLon('100', '0');
    expect(errors).toContain('Latitude must be between -90 and 90.');
  });

  it('should return an error for invalid longitude', () => {
    const errors = validateLatLon('0', 'invalid');
    expect(errors).toContain('Longitude must be a valid degree.');
  });

  it('should return an error for longitude out of range', () => {
    const errors = validateLatLon('0', '200');
    expect(errors).toContain('Longitude must be between -180 and 180.');
  });

  it('should return no errors for valid latitude and longitude', () => {
    const errors = validateLatLon('45', '90');
    expect(errors).toHaveLength(0);
  });
});
