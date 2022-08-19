import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticlePreview } from '../../internal'
import { Empty } from '../../internal'
import { AspectRatio } from '../../internal'

export default {
  title: 'Article/ArticlePreview',
  component: ArticlePreview,
} as ComponentMeta<typeof ArticlePreview>

const Template: ComponentStory<typeof ArticlePreview> = args => 
  <ArticlePreview {...args}>
    <AspectRatio ratio={1/3}>
      <Empty />
    </AspectRatio>  
  
  </ArticlePreview>

export const Regular = Template.bind({})
Regular.args = {
  title: 'Learn How to Contribute to Formation',
  previewSrc: 'https://user-images.githubusercontent.com/18317587/184470102-db7c9a55-123a-4cef-88f2-497ba2181864.png',
  summary: 'Formation is an open source project. Learn how you can submit a pull request to add features or fix bugs.',
  href: '/?path=/story/article-article--README'
}
