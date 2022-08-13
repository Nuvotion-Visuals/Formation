import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ArticlePreview } from './ArticlePreview'
import { Empty } from '../Empty/Empty'
import { AspectRatio } from '../AspectRatio/AspectRatio'
import { Box } from '../Box/Box'

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
  summary: 'Formation is an open source project. That means anyone can submit a pull request to add features of fix bugs. Learn how to make pull requests to help improve Formation',
  href: '/?path=/story/article-article--regular'
}
