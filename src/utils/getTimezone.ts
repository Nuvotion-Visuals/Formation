/**
 * @function getTimezone
 * 
 * This function returns the IANA timezone identifier corresponding to the default timezone
 * for the user's device. The time zone is based on the system settings of the user's environment.
 * 
 * It's generally used to display or convert times based on the user's local timezone, thus ensuring 
 * that date and time values are accurately represented, regardless of the user's location.
 *
 * @returns {string} The IANA time zone name for the user's system setting.
 *
 * @example
 * getTimezone() // E.g. Output: 'America/New_York'
 */
export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone
