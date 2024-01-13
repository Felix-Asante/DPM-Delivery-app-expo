import {Position} from '../../types';

interface CalculateDistance {
  position: Position;
  userPosition: Position;
}
export function calculateDistance({position, userPosition}: CalculateDistance) {
  if (!userPosition) {
    return;
  }

  const earthRadius = 6371;

  const currentUserLat = userPosition.latitude;
  const currentUserLong = userPosition.longitude;

  const deliveryLat = position.latitude;
  const deliveryLong = position.longitude;

  const lonDelta = ((deliveryLong - currentUserLong) * Math.PI) / 180;
  const latDelta = ((deliveryLat - currentUserLat) * Math.PI) / 180;

  const a =
    Math.sin(latDelta / 2) * Math.sin(latDelta / 2) +
    Math.cos((currentUserLat * Math.PI) / 180) *
      Math.cos((deliveryLat * Math.PI) / 180) *
      Math.sin(lonDelta / 2) *
      Math.sin(lonDelta / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = earthRadius * c;

  return distance.toFixed(2);
}

interface EstimatedTime {
  distance: number;
  averageSpeed?: number;
  prepTime?: number;
}
export const getEstimatedDeliveryTime = ({
  distance,
  averageSpeed = 30,
  prepTime = 15,
}: EstimatedTime) => {
  const trafficFactor = 1.2;
  const distanceKm = distance / 1000;
  const travelTimeHours = distanceKm / (averageSpeed * trafficFactor);

  return Math.floor(travelTimeHours * 60 + prepTime);
};
