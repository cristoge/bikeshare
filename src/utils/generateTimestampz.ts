export const generateTimestampz = () => {
  let currentData = new Date().toISOString()
  return currentData
}
export const calculateEndTime = (startTime: string) => {
  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1);
  return endTime.toISOString();
}
