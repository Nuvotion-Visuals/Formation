import React, { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Article, Page, markdownToHTML } from '../../internal';

export default {
  title: 'Article/Article',
  component: Article,
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = args => {
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    import('../../../README.md').then(res => {
      // @ts-ignore
      const url = res.default as string;
      fetch(url)
        .then(response => response.text())
        .then(text => {
          // Convert Markdown to HTML and update state
          setMarkdownContent(markdownToHTML(text));
        });
    });
  }, []);

  return (
    <Page>
      <Article {...args} value={markdownContent} />
    </Page>
  );
};

export const Readme = Template.bind({});
Readme.parameters = {
  layout: 'fullscreen',
};
