import React, { useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Box, NumberSliderVertical } from '../../internal'

export default {
  title: 'Input/NumberSliderVertical',
  component: NumberSliderVertical,
} as ComponentMeta<typeof NumberSliderVertical>

const Template: ComponentStory<typeof NumberSliderVertical> = (args) => {
  const [value, setValue] = useState<number>(args.value)
  return <Box height='90px' width='2rem'>
    <NumberSliderVertical 
    {...args} 
    onChange={newValue => setValue(newValue)}
    value={value}
  />
  </Box>
}

export const Default = Template.bind({})
Default.args = {
  min: 0,
  max: 100,
  value: 50
}