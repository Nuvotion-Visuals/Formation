import React from 'react'
import { render } from '@testing-library/react'

import { Button } from '../../internal'

describe('Button', () => {
  test('renders the Button component', () => {
    render(<Button text='Hello world!' />)
  })
})