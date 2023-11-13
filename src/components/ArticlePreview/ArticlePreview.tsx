import React from 'react'
import styled from 'styled-components'

import { AspectRatio } from '../../internal'
import { StyleHTML } from '../../internal'

interface Props {
  title: string,
  previewSrc?: string,
  summary: string,
  href: string
}

/**
 * `ArticlePreview` is a component for showcasing article highlights such as title, a summary, 
 * and an optional image. It's designed to be used as a clickable item that redirects to the full article.
 *
 * @component
 * @param {string} title - The title of the article to be displayed.
 * @param {string} [previewSrc] - The source URL for the preview image of the article.
 * @param {string} summary - A brief summary or excerpt of the article content.
 * @param {string} href - The URL that the article preview links to, usually the full article page.
 *
 * @example
 * // An article preview with an image, title, and summary that links to the full article
 * <ArticlePreview
 *   title="Exploring the great outdoors"
 *   previewSrc="/images/outdoors.jpg"
 *   summary="Discover the joy of outdoor activities..."
 *   href="/articles/outdoor-activities"
 * />
 */
export const ArticlePreview = ({
  title,
  previewSrc,
  summary,
  href
} : Props) => {
  return (
    <S_Featured>
      <StyleHTML>
        <a href={href}>
          <S_Preview>
              <S_Container>
                <S_MediaContainer>
                  <AspectRatio 
                    ratio={16/9} 
                    backgroundSrc={previewSrc}
                    coverBackground={true}
                  >
                  </AspectRatio>
                </S_MediaContainer>

                <S_Meta>
                  <S_MetaInner>
                    <S_Name>{title}</S_Name>
                    <S_Description>{summary}</S_Description>
                  </S_MetaInner>
                </S_Meta>
              </S_Container>
          </S_Preview> 
        </a>
      </StyleHTML>
    </S_Featured>
  )
}

const S_Featured = styled.div`
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;

  &:hover {
    h3 {
      text-decoration: underline;
    }
  }
`

const S_Preview = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  max-width: 900px;
`

const S_Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  width: 100%;
  max-width: var(--F_Page_Width);

  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
`

const S_MediaContainer = styled.div`
  display: flex;
  padding: 0 1em;

  * {
    border-radius: .5rem;
  }
`

const S_Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1em;
  padding-top: 0;
`

const S_MetaInner = styled.div`
  display: block;
  flex-wrap: wrap;
`

const S_Name = styled.h2`
  margin: 0;
  padding: 0;
  display: block;
  font-size: var(--F_Font_Size_Title_Large);
  font-weight: 600;
  width: 100%;
  color: var(--F_Font_Color);
  margin-bottom: 1rem;
  text-underline-offset: 1px;
`

const S_Description = styled.p`
  display: block;
  width: 100%;
  color: var(--F_Font_Color_Label);
  line-height: 1.9em;
  margin-bottom: 1rem;
`