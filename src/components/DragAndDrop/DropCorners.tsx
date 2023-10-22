import styled from 'styled-components'

export const DropCorners = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background:
    linear-gradient(to right, var(--F_Primary_Variant) .25rem, transparent .25rem) 0 0,
    linear-gradient(to right, var(--F_Primary_Variant) .25rem, transparent .25rem) 0 100%,
    linear-gradient(to left, var(--F_Primary_Variant) .25rem, transparent .25rem) 100% 0,
    linear-gradient(to left, var(--F_Primary_Variant) .25rem, transparent .25rem) 100% 100%,
    linear-gradient(to bottom, var(--F_Primary_Variant) .25rem, transparent .25rem) 0 0,
    linear-gradient(to bottom, var(--F_Primary_Variant) .25rem, transparent .25rem) 100% 0,
    linear-gradient(to top, var(--F_Primary_Variant) .25rem, transparent .25rem) 0 100%,
    linear-gradient(to top, var(--F_Primary_Variant) .25rem, transparent .25rem) 100% 100%;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  pointer-events: none;
`