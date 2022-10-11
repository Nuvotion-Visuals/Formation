export type ColorType = 
  'red' | 'pink' | 'purple' | 'darkpurple' | 'indigo' | 'blue' | 'lightblue' | 'cyan' | 'teal' | 'orange' | string

export type LabelType = {
  name: string,
  description: string,
  color: string
}

export type AreaType = {
  area: string,
  activities: ActivityType[],
}

export type ActivityType = {
  title: string,
  startTime: string,
  endTime: string,
  id: string,
  people: PersonType[],
}

export type PersonType = {
  name: string,
  position: string,
}

export type ActivitiesByAreaType = {
  
}