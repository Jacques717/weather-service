/**
 * Categorizes the temperature into a string based on the temperature value.
 * @param temperature - The temperature value as a number.
 * @returns The temperature category as a string.
 */
export const categorizeTemperature = (temperature: number): string => {
  if (temperature < 10) {
    return 'cold';
  } else if (temperature >= 10 && temperature <= 25) {
    return 'moderate';
  } else {
    return 'hot';
  }
};
