import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

interface ProgressTimerProps {
  duration?: number
  initialProgress?: number,
  indeterminate?: boolean,
  onComplete?: () => void
}

export const ProgressTimer: React.FC<ProgressTimerProps> = ({
  duration = 0,
  initialProgress = 0,
  indeterminate,
  onComplete
}) => {
  const [progress, setProgress] = useState<number>(initialProgress)
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [completed, setCompleted] = useState<boolean>(false)

  const handleCompletion = useCallback(() => {
    if (!completed && onComplete) {
      onComplete()
      setCompleted(true)
    }
  }, [completed, onComplete])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
  
    if (duration > 0) {
      const interval = 1000 / 30
      const increment = (100 / duration) * (interval / 1000)
  
      intervalId = setInterval(() => {
        let shouldHandleCompletion = false
  
        setProgress((prevProgress) => {
          const newProgress = prevProgress + increment
          if (newProgress >= 100 && !indeterminate) {
            shouldHandleCompletion = true
            return 100
          }
          return newProgress
        })
  
        setElapsedTime((prevElapsedTime) => {
          const newTime = prevElapsedTime + (interval / 1000)
          if (newTime >= duration && !indeterminate) {
            shouldHandleCompletion = true
            return duration
          }
          return newTime
        })
  
        if (shouldHandleCompletion && !completed) {
          handleCompletion()
          if (!indeterminate) clearInterval(intervalId)
        }
      }, interval)
    }
  
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [duration, indeterminate, handleCompletion, completed])


  return (
    <S.ProgressContainer>
      <progress max='100' value={(progress > 100 ? 100 : progress)}  />
      <S.ElapsedTime>{elapsedTime.toFixed(1)} ∕ {duration}</S.ElapsedTime>
    </S.ProgressContainer>
  )
}


const S = {
  ProgressContainer: styled.div`
    position: relative;
    height: 100%;
    width: 100%;

    progress {
      width: 100%;
      border-radius: 0;
      height: 100%;
    }
    progress::-webkit-progress-bar {
      background-color: var(--F_Surface_0);
    }
    progress::-webkit-progress-value {
      background-color: var(--F_Surface_1);
      border-radius: 0;
    }
    progress::-moz-progress-bar {
      background-color: var(--F_Surface_1);
    }
  `,
  ElapsedTime: styled.div`
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--F_Font_Size);
    color: var(--F_Font_Color_Label);
  `,
}
