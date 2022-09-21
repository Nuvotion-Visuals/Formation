import React, { useEffect, useState } from 'react'
import { act } from 'react-dom/test-utils'
import styled from 'styled-components'
import { ActivityType } from 'types'

interface Props {
  currentActivities: ActivityType[]
}

export const AreaSurface = ({ currentActivities }: Props) => {

  const intervals = [
    '', '', '1am', '', '2am', '', '3am', '', '4am', '', '5am', '', '6am', '', '7am', '', '8am', '', '9am', '', '10am', '', '11am', '', '12pm', '', '1pm',
    '', '2pm', '', '3pm', '', '4pm', '', '5pm', '', '6pm', '', '7pm', '',
    '8pm', '', '9pm', '','10pm', '', '11pm', ''
  ]

  const [activities, setActivities] = useState<ActivityType>()

  useEffect(() => {
    setActivities(currentActivities)
  }, [currentActivities])

  const renderActivitiesByArea = (activities: ActivityType[]) => {
    activities === undefined
      ? null
      : console.log(currentActivities, "<<AREASTATE @ RENDERMETHOD - AREA SURFACE")
    
    const renderRow = (time: string) => {
      switch (time) {
        case "0.30am":
          return 2;
          break;
        case "1am":
          return 3;
          break;
        case "1.30am":
          return 4;
          break;
        case "2am":
          return 5;
          break;
        case "2.30am":
            return 6;
            break;
        case "3am":
          return 7;
          break;
        case "3.30am":
            return 8;
            break;
        case "4am":
          return 9;
          break;
        case "4.30am":
          return 10;
        break;
        case "5am":
          return 11;
        break;
        case "5.30am":
          return 12;
        break;
        case "6am":
          return 13;
        break;
        case "6.30am":
          return 14;
        break;
        case "7am":
          return 15;
        break;
        case "7.30am":
          return 16;
        break;
        case "8am":
          return 17;
        break;
        case "8.30am":
          return 18;
        break;
        case "9am":
          return 219;
        break;
        case "9.30am":
          return 20;
        break;
        case "10am":
          return 21;
        break;
        case "10.30am":
          return 22;
        break;
        case "11am":
          return 23;
        break;
        case "11.30am":
          return 24;
        break;
        case "12pm":
          return 25;
          break;
          case "0.30pm":
          return 26;
            break;
          case "1pm":
            return 27;
            break;
          case "1.30pm":
            return 28;
            break;
          case "2pm":
            return 29;
            break;
          case "2.30pm":
              return 30;
              break;
          case "3pm":
            return 31;
            break;
          case "3.30pm":
              return 32;
              break;
          case "4pm":
            return 33;
            break;
          case "4.30pm":
            return 34;
          break;
          case "5pm":
            return 35;
          break;
          case "5.30pm":
            return 36;
          break;
          case "6pm":
            return 37;
          break;
          case "6.30pm":
            return 38;
          break;
          case "7pm":
            return 39;
          break;
          case "7.30pm":
            return 40;
          break;
          case "8pm":
            return 41;
          break;
          case "8.30pm":
            return 42;
          break;
          case "9pm":
            return 43;
          break;
          case "9.30pm":
            return 44;
          break;
          case "10pm":
            return 45;
          break;
          case "10.30pm":
            return 46;
          break;
          case "11pm":
            return 47;
          break;
          case "11.30pm":
            return 48;
          break;
          case "12am":
            return 50;
            break;
      }
    }
    
    return (
      <>
        {
          activities.map((activity) => 
            <S.Activity
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
                <S.Time style={{ gridColumnStart: 1, gridRowStart: index == 0 ? 1 : index + 1 }}>
                  <S.TimeSpan>
                  {interval}
                  </S.TimeSpan>
                </S.Time>
              )
            })
          }
          {
            intervals.map((index) => {
              return (
                <S.Block style={{ gridColumnStart: 2, gridColumnEnd: 6, gridRowStart: index}}></S.Block>
              )
            })
          }
          <>
            {
              activities === undefined  
                ? () => null
                : renderActivitiesByArea(activities)
            }
          </>
        </>
      </S.Grid>
    </S.Container>
  )
}

const S = {
  Container: styled.div<{}>`
    width: 100%;
    background: #e4e4e4;
  `,
  Grid: styled.div<{}>`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 3rem repeat(4,1fr);
    grid-template-rows: repeat(48, 1fr);
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
  `,  
  Block: styled.div<{}>`
    width: 100%;
    height: 1rem;
    z-index: 1;

    :nth-Child(odd) {
      border-bottom: 1px solid #d6d6d6;
    }

    :nth-child(even) {
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
    padding: 0.5rem;
    z-index: 100;
    border-radius: 0.25rem;
  `
}
