/**
 * Date utility functions
 */

export const getCurrentDate = (): string => {
  const today = new Date();
  return today.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const getDateSevenDaysAhead = (): string => {
  const today = new Date();
  const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return sevenDaysLater.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateForDisplay = (dateString: string): string => {
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const [day, month, year] = parts;
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
  return dateString;
};
