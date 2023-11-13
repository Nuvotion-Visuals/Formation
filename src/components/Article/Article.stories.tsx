import React, { useState, useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Article, Page, markdownToHTML } from '../../internal';

export default {
  title: 'Article/Article',
  component: Article,
} as ComponentMeta<typeof Article>;

const Template: ComponentStory<typeof Article> = args => {
  const [markdownString, setMarkdownString] = useState('');

  useEffect(() => {
    async function fetchReadme() {
      try {
        const response = await fetch('README.md');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        setMarkdownString(text)
      } catch (error) {
        console.error('Error fetching README:', error);
      }
    }

    fetchReadme();
  }, []);

  return (
    <Page>
      <Article {...args} markdownString={markdownString} />
    </Page>
  );
};

export const Readme = Template.bind({});
Readme.parameters = {
  layout: 'fullscreen',
};
