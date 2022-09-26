import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { ActivityType, AreaType } from 'types'

interface Props {
  value: AreaType[],
  areaIndex: number,
  onChange: (time: any) => void
}

export const AreaSurface = ({ value, areaIndex, onChange }: Props) => {
  const intervals = [
    {
      display: '',
      value: 0
    },
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
  const getFirstActivity = (activities: ActivityType[]): string => {
    if (activities !== undefined) {
      let firstActivityStartTime = activities.reduce((prev, curr) => prev.startTime < curr.startTime ? prev : curr).startTime
  
      let firstActivityGridPosition = renderRow(firstActivityStartTime)
      
      if (firstActivityGridPosition) {
        return (firstActivityGridPosition - 5).toString()
      }
      return '6'
    }  
    return '6'
  }
  const renderRow = (time: number) => {
    switch (time) {
      case 0.00:
        return 1;
        break;
      case 0.15:
        return 2;
        break;
      case 0.30:
        return 3;
        break;
      case 0.45:
        return 4;
        break;
      case 1.00:
        return 5;
        break;
      case 1.15:
        return 6;
        break;
      case 1.30:
        return 7;
        break;
      case 1.45:
        return 8;
        break;
      case 2.00:
        return 9;
        break;
      case 2.15:
        return 10;
        break;
      case 2.30:
        return 11;
        break;
      case 2.45:
        return 12;
        break;
      case 3.00:
        return 13;
        break;
      case 3.15:
        return 14;
        break;
      case 3.30:
        return 15;
        break;
      case 3.45:
        return 16;
        break;
      case 4.00:
        return 17;
        break;
      case 4.15:
        return 18;
        break;
      case 4.30:
        return 19;
        break;
      case 4.45:
        return 20;
        break;
      case 5.15:
        return 21;
        break;
      case 5.15:
        return 22;
        break;
      case 5.30:
        return 23;
        break;
      case 5.45:
        return 24;
        break;
      case 6.00:
        return 25;
        break;
      case 6.15:
        return 26;
        break;
      case 6.30:
        return 27;
        break;
      case 6.45:
        return 28;
        break;
      case 7.00:
        return 29;
        break;
      case 7.15:
        return 30;
        break;
      case 7.30:
        return 31;
        break;
      case 7.45:
        return 32;
        break;
      case 8.00:
        return 33;
        break;
      case 8.15:
        return 34;
        break;
      case 8.30:
        return 35;
        break;
      case 8.45:
        return 36;
        break;
      case 9.00:
        return 37;
        break;
      case 9.15:
        return 38;
        break;
      case 9.30:
        return 39;
        break;
      case 9.45:
        return 40;
        break;
      case 10.00:
        return 41;
        break;
      case 10.15:
        return 42;
        break;
      case 10.30:
        return 43;
        break;
      case 10.45:
        return 44;
        break;
      case 11.00:
        return 45;
        break;
      case 11.15:
        return 46;
        break;
      case 11.30:
        return 47;
        break;
      case 11.45:
        return 48;
        break;
      case 12.00:
        return 49;
        break;
      case 12.15:
        return 50;
        break;
      case 12.30:
        return 51;
        break;
      case 12.45:
        return 52;
        break;
      case 13.00:
        return 53;
        break;
      case 13.15:
        return 54;
        break;
      case 13.30:
        return 55;
        break;
      case 13.45:
        return 56;
        break;
      case 14.00:
        return 57;
        break;
      case 14.15:
        return 58;
        break;
      case 14.30:
        return 59;
        break;
      case 14.45:
        return 60;
        break;
      case 15.00:
        return 61;
        break;
      case 15.15:
        return 62;
        break;
      case 15.30:
        return 63;
        break;
      case 15.45:
        return 64;
        break;
      case 16.00:
        return 65;
        break;
      case 16.15:
        return 66;
        break;
      case 16.30:
        return 67;
        break;
      case  16.45:
        return 68;
        break;
      case 17.00:
        return 69;
        break;
      case 17.15:
        return 70;
        break;
      case 17.30:
        return 71;
        break;
      case 17.45:
        return 72;
        break;
      case 18.00:
        return 73;
        break;
      case 18.15:
        return 74;
        break;
      case 18.30:
        return 75;
        break;
      case 18.45:
        return 76;
        break;
      case 19.00:
        return 77;
        break;
      case 19.15:
        return 78;
        break;
      case 19.30:
        return 79;
        break;
      case 19.45:
        return 80;
        break;
      case 20.00:
        return 81;
        break;
      case 20.15:
        return 82;
        break;
      case 20.30:
        return 83;
        break;
      case 20.45:
        return 84;
        break;
      case 21.00:
        return 85;
        break;
      case 21.15:
        return 86;
        break;
      case 21.30:
        return 87;
        break;
      case 21.45:
        return 88;
        break;
      case 22.00:
        return 89;
        break;
      case 22.15:
        return 90;
        break;
      case 22.30:
        return 91;
        break;
      case 22.45:
        return 92;
        break;
      case 23.00:
        return 93;
        break;
      case 23.15:
        return 94;
        break;
      case 23.30:
        return 95;
        break;
      case 23.45:
        return 96;
        break;
      case 24.00:
        return 97;
        break;
      case 24.15:
        return 98;
        break;
      case 24.30:
        return 99;
        break;
      case 24.45:
        return 100;
        break;
      case 25.00:
        return 101;
        break;
      case 25.15:
        return 102;
        break;
      case 25.30:
        return 103;
        break;
      case 25.45:
        return 104;
        break;
      case 26.00:
        return 105;
        break;
      case 26.15:
        return 106;
        break;
      case 26.30:
        return 107;
        break;
      case 26.45:
        return 108;
        break;
      case 27.00:
        return 109;
        break;
      case 27.15:
        return 110;
        break;
      case 27.30:
        return 111;
        break;
      case 27.45:
        return 112;
        break;
      case 28.00:
        return 113;
    }
  }

  const [internalValue, setInternalValue] = useState<AreaType[]>(value)

  let activities = internalValue[areaIndex].activities

  const handleClick = (interval: ActivityType[]) => {
    setInternalValue({...internalValue, interval})
    onChange(interval)
  }

  useEffect(() => {
    console.log(internalValue)
  })

  useEffect(() => {
    if (activities !== undefined) {
      let initScrollElement: string = getFirstActivity(activities)
      document.getElementById(initScrollElement)?.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }, [activities])

  return (
    <S.Container>
      <S.Grid>
          {
            intervals.map((interval, index) => 
                <S.TimeDisplay key={index} style={{ gridColumnStart: 1, gridRowStart: index == 0 ? 1 : index + 1 }}>
                  <S.TimeSpan>
                    {interval.display}
                  </S.TimeSpan>
                </S.TimeDisplay>
              )
          }
          {
            intervals.map((interval, index) => 
                <S.IntervalBlock
                  key={index}
                  id={index.toString()}
                  onClick={() => handleClick(interval)}
                  style={{ gridColumnStart: 2, gridColumnEnd: 6, gridRowStart: index === 0 ? 1 : index + 1 }}
                />
              )
          }    
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
    grid-template-columns: 3rem repeat(1,1fr);
    grid-template-rows: repeat(113, 1fr);
    row-gap: 1px;
    column-gap: 1px;
  `,
  TimeDisplay: styled.div<{}>`
    width: 3rem;
    font-size: var(--F_Font_Size_Label);
    height: 1rem;
    margin-top: -1.65rem;
    display: flex;
    justify-content: flex-end;
  `,
  TimeSpan: styled.div<{}>`
    padding-right: 0.5rem;
    padding-top: 1rem;
  `,  
  IntervalBlock: styled.div<{}>`
    width: 100%;
    height: 1rem;
    z-index: 1;

    :nth-Child(2n+3) {
      border-bottom: 1px solid #cbcbcb;
    }

    :nth-child(2n+6) {
      border-bottom: 1px solid #d6d6d6;
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
