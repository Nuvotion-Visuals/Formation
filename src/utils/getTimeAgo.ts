import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

/**
 * @function getTimeAgo
 * 
 * This function returns a string representing how long ago a date was from the present time.
 * The output is localized to English. It leverages the "javascript-time-ago" Node.js library for 
 * computing and formatting relative dates.
 * 
 * It can be used in any scenario where one needs to cogently display the temporal distance 
 * in natural language (like '2 minutes ago', 'yesterday', '3 months ago', 'last year') 
 * between a specified date and the current time. It's particularly useful for messaging interfaces, comments, 
 * and live blogs, where it's necessary to denote when a message or an event occurred.
 * 
 * @param {Date} date - A JavaScript Date object you want to compare to the present time.
 * @returns {string} The string representing how long ago the date was from the current time.
 *
 * @example
 * const two_days_ago = new Date()
 * two_days_ago.setDate(two_days_ago.getDate() - 2)
 * 
 * getTimeAgo(two_days_ago) // Outputs: '2 days ago'
 */
export const getTimeAgo = (date : Date) : string => {
  try { TimeAgo.addDefaultLocale(en) } catch(e) {}
  const timeAgo = new TimeAgo('en-US')
  return timeAgo.format(new Date(date), 'round')  
}
