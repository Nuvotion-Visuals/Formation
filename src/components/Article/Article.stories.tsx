import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Page } from '../../internal'
import { Article } from '../../internal'

export default {
  title: 'Article/Article',
  component: Article,
} as ComponentMeta<typeof Article>

const Template: ComponentStory<typeof Article> = args => 
  <Page>
  <Article {...args}>
    <>
  <h1 id="formation">Formation</h1>
  <p>
    <a href="https://avsync-live.github.io/formation">Storybook</a> |&nbsp;
    <a href="https://github.com/AVsync-LIVE/formation">GitHub Repository</a> |&nbsp;
    <a href="https://www.npmjs.com/package/@avsync.live/formation">
      NPM Package
    </a>
  </p>
  <p>
    Formation is a component library based on React, Styled Components and CSS
    variables.
  </p>
  <figure>
  <img src="https://user-images.githubusercontent.com/18317587/184470102-db7c9a55-123a-4cef-88f2-497ba2181864.png" alt="image" />
  <figcaption>Formation uses Storybook, React, and Jest</figcaption>
</figure>
  <blockquote>Note: This library is early in development and is subject to breaking changes until v1.0.0</blockquote>
  <h2 id="installation">Installation</h2>
  <pre>
    <code className="language-shell">
      yarn add @avsync.live/formation{"\n"}
    </code>
  </pre>
  <h2 id="usage">Usage</h2>
  <pre>
    <code className="language-jsx">
      {"  "}import React from 'react'{"\n"}
      {"  "}import {"{"} Button {"}"} from '@avsync.live/formation'{"\n"}
      {"\n"}
      {"  "}const MyComponent = () =&gt; {"{"}
      {"\n"}
      {"    "}return &lt;Button text='Click me' /&gt;{"\n"}
      {"  "}
      {"}"}
      {"\n"}
    </code>
  </pre>
  <h2 id="icons">Icons</h2>
  <p>
    Formation uses{" "}
    <a href="https://fontawesome.com/v6/search?m=free">FontAwesome v6</a> and
    supports both pro and free icons.
  </p>
  <pre>
    <code className="language-jsx">
      // import FontAwesome in your project{"\n"}import
      '@fortawesome/fontawesome-svg-core/styles.css'{"\n"}import {"{"} library{" "}
      {"}"} from '@fortawesome/fontawesome-svg-core'{"\n"}
      {"\n"}import {"{"} faHeart {"}"} from '@fortawesome/free-solid-svg-icons'
      {"\n"}
      {"\n"}library.add(faHeart){"\n"}
      {"\n"}// in your component{"\n"}import React from 'react'{"\n"}import{" "}
      {"{"} Button {"}"} from '@avsync.live/formation'{"\n"}
      {"\n"}const MyComponent = () =&gt; {"{"}
      {"\n"}
      {"  "}return &lt;Button {"\n"}
      {"    "}text='Click me' {"\n"}
      {"    "}icon='heart' // name of the icon without the "fa" and in
      kebab-case{"\n"}
      {"    "}iconPrefix='fas' // fas, far, fal, etc{"\n"}
      {"   "}/&gt;;{"\n"}
      {"}"}
      {"\n"}
    </code>
  </pre>
  <h2 id="theming">Theming</h2>
  <p>Theming is based on CSS variables.</p>
  <h2 id="why-formation">Why Formation?</h2>
  <ul>
    <li>
      Responsive from the smallest of phones to the largest of multi-window 4K
      monitors
    </li>
    <li>Touch-first</li>
    <li>No reliance on right clicks</li>
    <li>No reliance on hover states</li>
    <li>
      Allow for hold-to-drag and swiping, but also provide tap/click-only
      alternatives
    </li>
    <li>Minimal use of animations</li>
    <li>Easily modify the styling using css variables</li>
    <li>Prefer a small inline dropdown over a context-changing modal popup.</li>
  </ul>
  <h2 id="implementation">Implementation</h2>
  <ul>
    <li>
      <a href="https://reactjs.org/docs/getting-started.html">React</a>
    </li>
    <li>
      <a href="https://styled-components.com/docs">Styled Components</a>
    </li>
    <li>
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties">
        CSS variables
      </a>
    </li>
    <li>Surface-based background-color system</li>
    <li>
      Use of Storybook to develop, manage, and visualize components outside of
      an application
    </li>
    <li>[TODO] Code sandbox examples for all components</li>
    <li>
      [TODO] Design system guide similar to{" "}
      <a href="https://material.io/design/environment/elevation.html">
        Material Design documentation
      </a>
    </li>
  </ul>
  <h2 id="philosophy">Philosophy</h2>
  <p>
    The name <a href="https://www.etymonline.com/word/formation">Formation</a>{" "}
    expresses both the <em>form</em> embodied by the user interface, and the
    process by which user interaction <em>forms</em> the desired outcome of the
    application. The layout of the document is also composed of a{" "}
    <em>formation</em> of components.
  </p>
  <p>
    Formation adheres to the Unimpeded Design System philosophy, where users do
    not have to wait for animations to complete, or for the app to finishing
    changing modes in order to proceed with their task. The user is only limited
    physically by their reaction time.
  </p>
</>

  </Article>  
</Page>

export const README = Template.bind({})
README.args = {
}
README.parameters = {
  layout: 'fullscreen'
}


