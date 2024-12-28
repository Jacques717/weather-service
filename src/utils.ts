export const categorizeTemperature = (temperature: number): string => {
  if (temperature < 10) {
    return 'cold';
  } else if (temperature >= 10 && temperature <= 25) {
    return 'moderate';
  } else {
    return 'hot';
  }
};
