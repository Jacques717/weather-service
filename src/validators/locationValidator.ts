/**
 * Validates latitude and longitude values.
 * @param lat - The latitude value as a string.
 * @param lon - The longitude value as a string.
 * @returns An array of error messages if the input is invalid, otherwise an empty array.
 */
export const validateLatLon = (lat: string, lon: string): string[] => {
  const validNumberPattern = /^-?\d+(\.\d+)?$/;
  const errors: string[] = [];

  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);

  // Validate latitude
  if (!validNumberPattern.test(lat) || isNaN(latNum)) {
    errors.push('Latitude must be a valid degree.');
  } else if (latNum < -90 || latNum > 90) {
    errors.push('Latitude must be between -90 and 90.');
  }

  // Validate longitude
  if (!validNumberPattern.test(lon) || isNaN(lonNum)) {
    errors.push('Longitude must be a valid degree.');
  } else if (lonNum < -180 || lonNum > 180) {
    errors.push('Longitude must be between -180 and 180.');
  }

  return errors;
};
