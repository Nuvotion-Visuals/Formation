import React, { useEffect, useState } from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AutocompleteDropdown } from '../../internal'

export default {
  title: 'Input/AutocompleteDropdown',
  component: AutocompleteDropdown,
} as ComponentMeta<typeof AutocompleteDropdown>

const searchTerms: string[] = ["JavaScript","HTML","CSS","C#","TypeScript","Python","Java","React","Angular","Vue","Node.js","Express","MongoDB","MySQL","PostgreSQL","GraphQL","REST","API","JSON","AJAX","Webpack","Babel","ESLint","Jest","Mocha","Chai","Redux","Flux","Docker","Kubernetes","AWS","Azure","Git","GitHub","GitLab","Bitbucket","Testing","Debugging","Performance","Security","Responsive","Mobile-first","Accessibility","UI","UX","Design","Front-end","Back-end","Full-stack","Serverless","Microservices","Machine learning","Artificial intelligence","Data science","Big data","Internet of things","Cloud computing","Cybersecurity","Privacy","Open source","Software development","Web development","Mobile development","Desktop development","Database","Web design","UI design","UX design","Product design","Graphic design","Motion design","Animation","Video","Audio","Blogging","Content marketing","Social media","SEO","E-commerce","Crowdfunding","Startup","Venture capital","Entrepreneurship","Leadership","Management","Remote work","Productivity","Self-improvement","Mindfulness","Meditation","Fitness","Nutrition","Health","Wellness","Philosophy","Psychology","Creativity","Innovation","Prototyping","Design thinking","Agile methodologies","Lean methodologies","Continuous improvement","Quality management","Supply chain management","Operations","Manufacturing","Engineering","Architecture","Construction","Real estate","Finance","Accounting","Investing","Personal finance","Money management","Taxation","Insurance","Legal","Human resources","Recruiting","Employee retention","Performance management","Compensation"];

function generateSearchSuggestions(input) {
  const suggestions: string[] = [];
  for (let i = 0; i < searchTerms.length; i++) {
    if (searchTerms[i].toLowerCase().includes(input.toLowerCase())) {
      suggestions.push(searchTerms[i]);
    }
  }
  return suggestions;
}

const Template: ComponentStory<typeof AutocompleteDropdown> = args => {
  const [value, set_value] = useState<string>('')
  const [suggestions, set_suggestions] = useState<any[]>([])
  const handleInputChange = (newValue: string) => {
    set_value(newValue)
    const newSuggestions = generateSearchSuggestions(newValue)
    set_suggestions(newSuggestions.map(suggestion => ({
      value: suggestion,
      text: suggestion,
      icon: 'search'
    })))
  }

  useEffect(() => {
    const newSuggestions = generateSearchSuggestions('')
    set_suggestions(newSuggestions.map(suggestion => ({
      value: suggestion,
      text: suggestion,
      icon: 'search',
      indent: true,
      iconPrefix: 'fas',
      src: 'https://app.lexi.studio/image/prompt/wireframe%20tall%20mountain%20made%20of%20node%20wireframes%20glowing'
    })))
  }, [])

  return (
    <AutocompleteDropdown 
      {...args} 
      value={value} 
      onChange={handleInputChange} 
      items={suggestions}
    />
  )
}

export const Search = Template.bind({})
Search.args = {
  placeholder: 'Search',
  icon: 'search',
  iconPrefix: 'fas'
}