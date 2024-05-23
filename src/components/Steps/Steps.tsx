import React from 'react'
import styled from 'styled-components'

type Props = {
  numberOfSteps: number,
  activeStepIndex: number
}

export const Steps = React.memo(({ 
  numberOfSteps,
  activeStepIndex
}: Props) => {

  return (
    <S.Steps>
      {
        new Array(numberOfSteps).fill(0).map((_, stepIndex) =>
          <S.Step 
            key={stepIndex}
            active={stepIndex <= activeStepIndex} 
          />
        )
      }
    </S.Steps>
  )
})

const S = {
  Steps: styled.div`
    width: 100%;
    display: flex;
    height: .325rem;
    gap: .25rem;
  `,
  Step: styled.div<{
    active?: boolean
  }>`
    display: flex;
    height: 100%;
    width: 1rem;
    flex-grow: 1;
    background: ${props => props.active ? 'var(--F_Primary)' : 'var(--F_Surface_0)'};
    border-radius: .1625rem;
  `
}