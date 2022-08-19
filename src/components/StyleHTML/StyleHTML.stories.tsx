import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { StyleHTML } from '../../internal'

export default {
  title: 'Layout/StyleHTML',
  component: StyleHTML,
} as ComponentMeta<typeof StyleHTML>

const Template: ComponentStory<typeof StyleHTML> = args => 
  <StyleHTML>
    {
      args.children
    }
  </StyleHTML>
    
export const BasicHTMLTags = Template.bind({})
BasicHTMLTags.args = {
  children: <>
    <h1>This is heading 1</h1>
    <h2>This is heading 2</h2>
    <h3>This is heading 3</h3>
    <h4>This is heading 4</h4>
    <h5>This is heading 5</h5>
    <h6>This is heading 6</h6>

    <p>This is a paragraph</p>

    To break<br />lines<br />in a<br />paragraph,<br />use the br element.<br />

    <hr />
    The hr tag creates a horizontal line in an HTML page.
  

    <ol>
      <li>This is an</li>
      <li>Ordered</li>
      <li>List</li>
    </ol>

    <ul>
      <li>This is an</li>
      <li>Unordered</li>
      <li>List</li>
    </ul>

    <code>This is a code element</code><br />

    <em>This is an em element</em> <br />

    <mark>This is a mark element</mark> <br />

    <small>This is a small element</small> <br />

    <strong>This is a strong element</strong> <br />

    <sub>This is a sub element</sub><br />

    <sup>This is a sup element</sup><br />

    <a href="http://www.newschool.edu">This is an a element</a>

    <blockquote>This is a blockquote element</blockquote>
    <button>This is a button element</button>

    <pre>This is a pre element</pre>

    <figure>
      <img src="https://user-images.githubusercontent.com/18317587/184470102-db7c9a55-123a-4cef-88f2-497ba2181864.png" alt="image" />
      <figcaption>This is a <code>figcaption</code> element below an <code>img</code> element inside a <code>figure </code>element</figcaption>
    </figure>


    <table>
      <tr>
        <th>th element</th>
        <th>inside tr element</th>
        <th>inside table element</th>
      </tr>
      <tr>
        <td>td element</td>
        <td>td element</td>
        <td>td element</td>
      </tr>
      <tr>
        <td>td element</td>
        <td>td element</td>
        <td>td element</td>
      </tr>
    </table>
  </>
}
