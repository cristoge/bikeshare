export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};
export const simulationLocation = process.env.EXPO_PUBLIC_SIMULATION_LOCATION || '';
