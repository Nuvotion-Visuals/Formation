import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ActivityType } from 'types'
import { renderRow, getFirstActivity } from '../../utils'

interface Props {
  currentActivities: ActivityType[]
}

export const AreaSurface = ({ currentActivities }: Props) => {
  const [activities, setActivities] = useState<ActivityType[]>()
  const intervals = [
    {
      display: '',
      value: 0.15
    },
    {
      display: '',
      value: 0.30 
    },
    {
      display: '',
      value: 0.45
    },
    {
      display: '1am',
      value: 1.00
    },
    {
      display: '',
      value: 1.15
    },
    {
      display: '',
      value: 1.30
    },
    {
      display: '',
      value: 1.45
    },
    {
      display: '2am',
      value: 2.00
    },
    {
      display: '',
      value: 2.15
    },
    {
      display: '',
      value: 2.30
    },
    {
      display: '',
      value: 2.45
    },
    {
      display: '3am',
      value: 3.00
    },
    {
      display: '',
      value: 3.15
    },
    {
      display: '',
      value: 3.30
    },
    {
      display: '',
      value: 3.45
    },
    {
      display: '4am',
      value: 4.00
    },
    {
      display: '',
      value: 4.15
    },
    {
      display: '',
      value: 4.30
    },
    {
      display: '',
      value: 4.45
    },
    {
      display: '5am',
      value: 5.00
    },
    {
      display: '',
      value: 5.15
    },
    {
      display: '',
      value: 5.30
    },
    {
      display: '',
      value: 5.45
    },
    {
      display: '6am',
      value: 6.00
    },
    {
      display: '',
      value: 6.15
    },
    {
      display: '',
      value: 6.30
    },
    {
      display: '',
      value: 6.45
    },
    {
      display: '7am',
      value: 7.00
    },
    {
      display: '',
      value: 7.15
    },
    {
      display: '',
      value: 7.30
    },
    {
      display: '',
      value: 7.45
    },
    {
      display: '8am',
      value: 8.00
    },
    {
      display: '',
      value: 8.15
    },
    {
      display: '',
      value: 8.30
    },
    {
      display: '',
      value: 8.45
    },
    {
      display: '9am',
      value: 9.00
    },
    {
      display: '',
      value: 9.15
    },
    {
      display: '',
      value: 9.30
    },
    {
      display: '',
      value: 9.45
    },
    {
      display: '10am',
      value: 10.00
    },
    {
      display: '',
      value: 10.15
    },
    {
      display: '',
      value: 10.30
    },
    {
      display: '',
      value: 10.45
    },
    {
      display: '11am',
      value: 11.00
    },
    {
      display: '',
      value: 11.15
    },
    {
      display: '',
      value: 11.30
    },
    {
      display: '',
      value: 11.45
    },
    {
      display: '12pm',
      value: 12.00
    },
    {
      display: '',
      value: 12.15
    },  
    {
      display: '',
      value: 12.30
    },
    {
      display: '',
      value: 12.45
    },
    {
      display: '1pm',
      value: 13.00
    },
    {
      display: '',
      value: 13.15
    },
    {
      display: '',
      value: 13.30
    },
    {
      display: '',
      value: 13.45
    },
    {
      display: '2pm',
      value: 14.00
    },
    {
      display: '',
      value: 14.15
    },
    {
      display: '',
      value: 14.30
    },
    {
      display: '',
      value: 14.45
    },
    {
      display: '3pm',
      value: 15.00
    },
    {
      display: '',
      value: 15.15
    },
    {
      display: '',
      value: 15.30
    },
    {
      display: '',
      value: 15.45
    },
    {
      display: '4pm',
      value: 16.00
    },
    {
      display: '',
      value: 16.15
    },
    {
      display: '',
      value: 16.30
    },
    {
      display: '',
      value: 16.45
    },
    {
      display: '5pm',
      value: 17.00
    },
    {
      display: '',
      value: 17.15
    },
    {
      display: '',
      value: 17.30
    },
    {
      display: '',
      value: 17.45
    },
    {
      display: '6pm',
      value: 18.00
    },
    {
      display: '',
      value: 18.15
    },
    {
      display: '',
      value: 18.30
    },
    {
      display: '',
      value: 18.45
    },
    {
      display: '7pm',
      value: 19.00
    },
    {
      display: '',
      value: 19.15
    },
    {
      display: '',
      value: 19.30
    },
    {
      display: '',
      value: 19.45
    },
    {
      display: '8pm',
      value: 20.00
    },
    {
      display: '',
      value: 20.15
    },
    {
      display: '',
      value: 20.30
    },
    {
      display: '',
      value: 20.45
    },
    {
      display: '9pm',
      value: 21.00
    },
    {
      display: '',
      value: 21.15
    },
    {
      display: '',
      value: 21.30
    },
    {
      display: '',
      value: 21.45
    },
    {
      display: '10pm',
      value: 22.00
    },
    {
      display: '',
      value: 22.15
    },
    {
      display: '',
      value: 22.30
    },
    {
      display: '',
      value: 22.45
    },
    {
      display: '11pm',
      value: 23.00
    },
    {
      display: '',
      value: 23.15
    },
    {
      display: '',
      value: 23.30
    },
    {
      display: '',
      value: 23.45
    },
    {
      display: '12am',
      value: 24.00
    },
    {
      display: '',
      value: 24.15
    },
    {
      display: '',
      value: 24.30
    },
    {
      display: '',
      value: 24.45
    },
    {
      display: '1am',
      value: 25.00
    },
    {
      display: '',
      value: 25.15
    },
    {
      display: '',
      value: 25.30
    },
    {
      display: '',
      value: 25.45
    },
    {
      display: '2am',
      value: 26.00
    },
    {
      display: '',
      value: 26.15
    },
    {
      display: '',
      value: 26.30
    },
    {
      display: '',
      value: 26.45
    },
    {
      display: '3am',
      value: 27.00
    },
    {
      display: '',
      value: 27.15
    },
    {
      display: '',
      value: 27.30
    },
    {
      display: '',
      value: 27.45
    },
    {
      display: '4am',
      value: 28.00
    }

  ]

  useEffect(() => {
    setActivities(currentActivities)
  }, [currentActivities])

  useEffect(() => {
    if (activities !== undefined) {
      let initScrollElement: string = getFirstActivity(activities)
      document.getElementById(initScrollElement)?.scrollIntoView({
        behavior: 'smooth'
      })
      console.log(initScrollElement, "<<INITSCROLLELEMENT>>")
    }
    

  }, [activities])

  const renderActivitiesByArea = (activities: ActivityType[]) => {
    
    return (
      <>
        {
          activities.map((activity, index) => 
            <S.Activity
              key={index}
              style={{
                gridColumnStart: 2,
                gridColumnEnd: 3,
                gridRowStart: renderRow(activity?.startTime),
                gridRowEnd: renderRow(activity?.endTime)
              }}>
              {activity.title}
            </S.Activity>
          )
        }
      </>
    )
  }
  

  return (
    <S.Container>
      <S.Grid>
        <>
          {
            intervals.map((interval, index) => {
              return (
                <S.Time key={index} style={{ gridColumnStart: 1, gridRowStart: index == 0 ? 1 : index + 1 }}>
                  <S.TimeSpan>
                    {interval.display}
                  </S.TimeSpan>
                </S.Time>
              )
            })
          }
        </>
        <>
          {
            intervals.map((interval, index) => {
              return (
                <S.Block
                  key={index}
                  id={index.toString()}
                  onClick={() => console.log(interval.value)}
                  style={{ gridColumnStart: 2, gridColumnEnd: 6, gridRowStart: index === 0 ? 1 : index + 1 }}
                />
              )
            })
          }
        </>
        <>
          {
            activities === undefined  
              ? () => null
              : renderActivitiesByArea(activities)
          }
        </>
      </S.Grid>
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    width: 100%;
    background: var(--F_Activity_Backdrop);
  `,
  Grid: styled.div<{}>`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 3rem repeat(4,1fr);
    grid-template-rows: repeat(113, 1fr);
    row-gap: 1px;
    column-gap: 1px;
  `,
  Time: styled.div<{}>`
    width: 3rem;
    font-size: var(--F_Font_Size_Label);
    height: 1rem;
    line-height: 12%;
    display: flex;
    justify-content: flex-end;
  `,
  TimeSpan: styled.div<{}>`
    padding-right: 0.5rem;
    padding-top: 1rem;
  `,  
  Block: styled.div<{}>`
    width: 100%;
    height: 1rem;
    z-index: 1;

    :nth-Child(4n+2) {
      border-bottom: 1px solid #cbcbcb;
    }

    :nth-child(4n+4) {
      border-bottom: 1px solid #bcbcbc;
    }
  `,
  Activity: styled.div<{}>`
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--F_Label_Light_Background_Blue);
    color: var(--F_Label_Background_Blue);
    font-size: 12px;
    padding: 0.15rem;
    z-index: 100;
    border-radius: 0.25rem;
  `
}
