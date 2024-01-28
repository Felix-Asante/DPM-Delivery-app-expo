import {getPreciseDistance} from 'geolib';

import {Position} from '../../types';

interface CalculateDistance {
  position: Position;
  userPosition: Position;
}
export function calculateDistance({position, userPosition}: CalculateDistance) {
  if (!userPosition) {
    return;
  }

  const distance = getPreciseDistance(position, userPosition, 1); // distance in m
  // console.log(getDistance(position, userPosition, 1) / 1000);
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
