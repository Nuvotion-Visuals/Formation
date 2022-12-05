import React from 'react'

import { Button, Spacer, Notification, AspectRatio, Box, Gap, NumberSlider } from '../../internal'

// libraries
import styled from 'styled-components'
import { useState, useCallback, useRef, useEffect } from 'react'
import Cropper from 'react-easy-crop'

const createImage = (url : string) : HTMLImageElement =>
  // @ts-ignore
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

const getRadianAngle = (degreeValue : number) => {
  return (degreeValue * Math.PI) / 180
}

export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

export const cropImage = async (
  imageSrc: string, 
  pixelCrop: { x: number, y: number, width: number, height: number }, 
  rotation = 0
) => {
  
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const maxSize = Math.max(image.width, image.height)
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
  
    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea
    canvas.height = safeArea
  
    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2)
    ctx.rotate(getRadianAngle(rotation))
    ctx.translate(-safeArea / 2, -safeArea / 2)
  
    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5
    )
    const data = ctx.getImageData(0, 0, safeArea, safeArea)
  
    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
  
    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
      Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
    )
  
    // As Base64 string
    return canvas.toDataURL('image/png')
  }
}

interface CroppedAreaPixels {
  x: number,
  y: number,
  width: number,
  height: number
}

interface Props {
  onChange: (src: string) => void,
  value: string
}

export const ImagePicker = ({
  onChange,
  value
} : Props) => {

  const [loading, setLoading] = useState(false)
  const [editing, set_editing] = useState(false)
  const [error, setError] = useState(null)

  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })

  const [file, setFile] = useState<File | null>(null)

  

  const onClickHandler = () => {
    (document.querySelector('#fileInput') as HTMLInputElement)?.click()
  }

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const onCropComplete = useCallback((croppedArea: any, new_croppedAreaPixels: CroppedAreaPixels) => {
    setCroppedAreaPixels(new_croppedAreaPixels)
  }, [])

  const onCrop = () => {
    set_editing(false);

    (async () => {
      const newSrc = await cropImage(value, croppedAreaPixels, rotation)
      if (newSrc) {
        onChange(newSrc)
        setZoom(1)
        setRotation(0)
      }
    })()
  }

  return (<S_Container>
    <Gap gap={.75}>
      {
        !editing &&
          <Gap gap={.75} disableWrap={true} autoWidth>
            <Button
              text={value ? 'Change image' : 'Upload image'}
              onClick={onClickHandler}
            />

            {
              value &&
                <Button
                  text={'Clear'}
                  onClick={() => {
                    onChange('')
                    set_editing(false)
                  }}
                />
            }

            {
              value &&
                <Button
                  icon='crop'
                  iconPrefix='fas'
                  onClick={() => set_editing(true)}
                />
            }
          </Gap>
      }

      <input type='file' id='fileInput' accept='image/*'
        style={{display: 'none'}}
        onChange={e => {
          const newFile = (e.target as HTMLInputElement).files?.[0]
          if (newFile) {
            setFile(newFile)
            onChange(URL.createObjectURL(newFile))
            set_editing(true)
          }
        }}
      />

      {
        value && editing
          ? <Gap disableWrap={true}>
            <Button
              text={'Cancel'}
              disabled={loading}
              secondary={true}
              onClick={onCrop}
            />
            <Button
              text={loading ? 'Saving...' : 'Save'}
              disabled={loading}
              primary={!loading}
              onClick={onCrop}
              blink={!loading}
            />
            </Gap>
          : null
      }

      <Spacer />

    {
      error
        ? <Notification type='error' iconPrefix='fas'>
            {
              error
            }
          </Notification>
        : null
    }

    {
      value && !editing &&
        <AspectRatio backgroundSrc={value} ratio={2} coverBackground={true}>
        </AspectRatio>
    }

{
  editing && <NumberSlider value={rotation} onChange={setRotation} min={0} max={100} />
}

    </Gap>
    

    {
      value && editing
        ?  <S_CropperContainer>
            <AspectRatio ratio={4/3}>
              <Cropper
                image={value}
                crop={crop}
                zoom={zoom}
                aspect={2 / 1}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                rotation={rotation}
                onRotationChange={setRotation}
                onZoomChange={setZoom}
                objectFit={'horizontal-cover'}
              />
            </AspectRatio>
          </S_CropperContainer>
        : null
    }



  </S_Container>)
}

const S_Container = styled.div`
  width: 100%;
  position: relative;
`

const S_CropperContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const S_Image = styled.img`
  width: 100%;
  margin-top: .7rem;
`