import {DAYS_OF_THE_WEEK} from '../../constants';
import {OpeningHours} from '../../types/place';

export function getCurrentDayOpeningHours(
  openingHours: OpeningHours | null | undefined,
) {
  if (!openingHours) return {};

  const {createdAt, updatedAt, deletedAt, id, ...rest} = openingHours;
  const openingDays = {...rest};
  const currentDate = (new Date().getUTCDay() + 6) % 7;
  const currentDayOpeningHours =
    openingDays?.[DAYS_OF_THE_WEEK[currentDate]?.en];

  return currentDayOpeningHours;
}
