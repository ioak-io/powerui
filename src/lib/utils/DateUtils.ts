import { format, parseISO, isThisYear, isValid } from 'date-fns';

export const formatDate = (input?: string | Date | null): string => {
  if (!input) return 'Invalid date';

  let date: Date;

  if (input instanceof Date) {
    date = input;
  } else if (typeof input === 'string') {
    date = parseISO(input);
  } else {
    return 'Invalid date';
  }

  if (!isValid(date)) return 'Invalid date';

  return isThisYear(date)
    ? format(date, 'dd MMM')
    : format(date, 'dd MMM yyyy');
}
