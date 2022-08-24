import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import README from '!raw-loader!../../../README.md'

import { Article, ParseHTML, Page } from '../../internal'

export default {
  title: 'Article/Article',
  component: Article,
} as ComponentMeta<typeof Article>

const Template: ComponentStory<typeof Article> = args => <Page>
  <Article {...args}>
    <ParseHTML markdown={String(README)} />
  </Article>  
</Page>

export const Readme = Template.bind({})
Readme.args = {
}
Readme.parameters = {
  layout: 'fullscreen'
}


