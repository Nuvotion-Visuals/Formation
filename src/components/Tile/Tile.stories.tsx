import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button, Dropdown, Fit, Grid, GroupRadius, Tile } from '../../internal'

export default {
  title: 'Items/Tile',
  component: Tile,
} as ComponentMeta<typeof Tile>

const Template: ComponentStory<typeof Tile> = args => {
  return <Grid maxWidth={8}>
    <Tile
      {...args}
    />
  </Grid>
}

export const Scene = Template.bind({})
Scene.args = {
  onClick: () => alert('clicked'),
  header: {
    text: 'Scene Name Long',
    disableTextWrap: true,
    absoluteRightChildren: true,
    compact: true,
    index:33,
    iconPrefix: 'fas',
    disablePadding: true,
    children: <Dropdown
      icon='ellipsis-v'
      iconPrefix='fas'
      disableBorderRadius
      square
      compact
      items={[
        {
          text: 'Properties',
          icon: 'ellipsis-v',
          compact: true,
        },
        {
          text: 'Duplicate',
          icon: 'copy',
          compact: true
        },
        {
          text: 'Rename',
          icon: 'edit',
          compact: true
        },
        {
          text: 'Delete',
          icon: 'trash-alt',
          compact: true
        },
      ]}
    />
  },
  contentProps: {
    backgroundSrc: `/blendPreviews/Difference.jpg`
  },
  footers: [
    {
      disablePadding: true,
      children: <Fit disableRadius>
        <Button
          icon='square-check'
          iconPrefix='fas'
          compact
          disablePadding
        />
        <Button
          text='A'
          iconPrefix='fas'
          compact
          disablePadding
        />
        <Button
          text='B'
          iconPrefix='fas'
          compact
          disablePadding
        />
        <Button
          icon='repeat'
          iconPrefix='fas'
          compact
          disablePadding
        />
      </Fit>
    },
    {
      disablePadding: true,
      children: <Fit disableRadius>
        <Button
          icon='share'
          iconPrefix='fas'
          compact
          text='Transition'
          disableCenter
          expand
        />
      </Fit>
    }
  ]
}

export const BlendMode = Template.bind({})
BlendMode.args = {
  onClick: () => alert('clicked'),
  header: {
    text: 'Difference',
    compact: true
  },
  contentProps: {
    backgroundSrc: `/blendPreviews/Difference.jpg`
  }
}

export const LongTitle = Template.bind({})
LongTitle.args = {
  onClick: () => alert('clicked'),
  header: {
    text: 'The Name of this is Difference',
    compact: true,
    disableTextWrap: true
  },
  contentProps: {
    backgroundSrc: `/blendPreviews/Difference.jpg`
  }
}

export const Active = Template.bind({})
Active.args = {
  onClick: () => alert('clicked'),
  active: true,
  header: {
    text: 'Difference',
    compact: true
  },
  contentProps: {
    backgroundSrc: `/blendPreviews/Screen.jpg`
  }
}
