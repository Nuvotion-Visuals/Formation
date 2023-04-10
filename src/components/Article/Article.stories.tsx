import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import README from '!raw-loader!../../../README.md'

import { Article, ParseHTML, Page, markdownToHTML } from '../../internal'

export default {
  title: 'Article/Article',
  component: Article,
} as ComponentMeta<typeof Article>

const Template: ComponentStory<typeof Article> = args => <Page>
  <Article {...args}>
    
  </Article>  
</Page>

export const Readme = Template.bind({})
Readme.args = {
  value: markdownToHTML(String(README))
}
Readme.parameters = {
  layout: 'fullscreen'
}


