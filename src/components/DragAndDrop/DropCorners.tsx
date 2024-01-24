import styled from 'styled-components'

/**
 * `DropCorners` is a styled component that renders visual cues in the corners of a drop zone.
 * It is typically used in conjunction with the `FileDrop` component to indicate that the drop zone is active
 * when the user is dragging files over it. It does not handle any functionality itself, serving purely as a UI enhancement.
 *
 * @component
 *
 * @example
 * // Usage within the FileDrop component to provide visual feedback
 */
export const DropCorners = styled.div<{ secondary?: boolean }>`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  background:
    linear-gradient(to right, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 0 0,
    linear-gradient(to right, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 0 100%,
    linear-gradient(to left, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 100% 0,
    linear-gradient(to left, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 100% 100%,
    linear-gradient(to bottom, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 0 0,
    linear-gradient(to bottom, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 100% 0,
    linear-gradient(to top, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 0 100%,
    linear-gradient(to top, ${props => props.secondary ? 'var(--F_Font_Color)' : 'var(--F_Primary_Variant)'} .25rem, transparent .25rem) 100% 100%;
  background-repeat: no-repeat;
  background-size: 16px 16px;
  pointer-events: none;
`