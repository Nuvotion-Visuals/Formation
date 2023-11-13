import React from 'react'

import { RichTextEditor } from '../../internal'

interface Props {
  value: string
}

/**
 * `Article` is a component that renders a `RichTextEditor` in read-only mode. 
 * This is typically used to display rich text content such as articles or formatted text inputs.
 *
 * @component
 * @param {string} value - The rich text content to be displayed by the `RichTextEditor`.
 *
 * @example
 * // To display an article with formatted text content
 * <Article value="<p>This is an <strong>example</strong> article content.</p>" />
 */
export const Article = ({ value }: Props) => {
  return (
    <RichTextEditor value={value} readOnly />
  )
}