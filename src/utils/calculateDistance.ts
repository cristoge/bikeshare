export function calculateDistance(
  latInc: number,
  lonInc: number,
  latFin: number,
  lonFin: number
): number {
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const R = 6371;
  const dLat = toRadians(latFin - latInc);
  const dLon = toRadians(lonFin - lonInc);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(latInc)) *
      Math.cos(toRadians(latFin)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
}