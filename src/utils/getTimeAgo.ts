import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

export const getTimeAgo = (date : Date) : string => {
  try { TimeAgo.addDefaultLocale(en) } catch(e) {}
  const timeAgo = new TimeAgo('en-US')
  return timeAgo.format(new Date(date), 'round')  
}
