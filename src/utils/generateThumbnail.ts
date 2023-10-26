import { resourceUrlToDataUrl } from '../internal';

let Thumbo: any
let Transfer: any
if (typeof window !== 'undefined') {
  const ThumboLib = require('thumbo')
  Thumbo = ThumboLib.default
  Transfer = ThumboLib.Transfer
  Thumbo.init()
}

const generateImageThumbnail = async (file: File, callback: (image: string) => void, maxDimension = 256) => {
  const ext = file.type.split('/')[1]

  try {
    const thumbnailBuffer = await Thumbo.thumbnail(
      Transfer(
        await (
          await fetch(URL.createObjectURL(file))
        ).arrayBuffer()
      ),
      ext === 'jpeg' ? Thumbo.ImageFormat.Jpeg : Thumbo.ImageFormat.Png,
      maxDimension,
      maxDimension
    )
  
    const dataUrl = await resourceUrlToDataUrl(URL.createObjectURL(new Blob([thumbnailBuffer])))
    callback(dataUrl)
  }
  catch (error) {
    console.error('Error generating thumbnail:', error)
  }
}

const generateVideoThumbnail = (file: File, callback: (image: string) => void, maxDimension = 256) => {
  let ratio = 1;
  const snapImage = () => {
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = maxDimension * ratio;
    canvas.height = maxDimension;
    canvas.getContext('2d')!.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL();
    callback(image);
  };

  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);

  const timeupdate = () => {
    ratio = video.videoWidth / video.videoHeight;
    snapImage();
    video.removeEventListener('timeupdate', timeupdate);
    video.pause();
  };

  video.addEventListener('loadeddata', () => {
    ratio = video.videoWidth / video.videoHeight;
    snapImage();
    video.removeEventListener('timeupdate', timeupdate);
  });

  video.addEventListener('timeupdate', timeupdate);
  video.preload = 'metadata';
  video.muted = true;
  video.playsInline = true;
  video.play();
};

export const generateVideoThumbnails = async (
  file: File,
  maxDimension = 256,
  timestamps: number[] = [0, 20, 40, 60, 80, 100],
  useObjectUrl?: boolean
): Promise<{image: string | Blob, timestamp: number}[]> => {
  return new Promise((resolve) => {
    let ratio = 1
    const thumbnails: {image: string | Blob, timestamp: number}[] = []

    const snapImage = (time: number) => {
      const canvas = document.createElement('canvas') as HTMLCanvasElement
      canvas.width = maxDimension * ratio
      canvas.height = maxDimension
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      if (useObjectUrl) {
        canvas.toBlob(blob => {
          if (blob) {
            const objectUrl = URL.createObjectURL(blob)
            thumbnails.push({ image: objectUrl, timestamp: time })
          }
        })
      } else {
        const dataUrl = canvas.toDataURL()
        thumbnails.push({ image: dataUrl, timestamp: time })
      }
    }

    const video = document.createElement('video')
    video.src = URL.createObjectURL(file)
    video.preload = 'metadata'
    video.muted = true
    video.playsInline = true

    const processTimestamps = (index: number, timestamps: number[]) => {
      if (index < timestamps.length) {
        video.currentTime = timestamps[index]
        video.addEventListener('seeked', function onSeeked() {
          snapImage(timestamps[index])
          video.removeEventListener('seeked', onSeeked)
          processTimestamps(index + 1, timestamps)
        })
      } else {
        resolve(thumbnails)
      }
    }

    video.addEventListener('loadeddata', () => {
      ratio = video.videoWidth / video.videoHeight
      const actualTimestamps = timestamps.map(t => (video.duration * t) / 100)
      processTimestamps(0, actualTimestamps)
    })

    video.play()
  })
}



export const generateThumbnail = (file: File, callback: (image: string) => void, maxDimension = 256) => {
  const type = file.type.split('/')[0];
  if (type === 'image') {
    generateImageThumbnail(file, (src) => callback(src), maxDimension);
  }
  if (type === 'video') {
    generateVideoThumbnail(file, (src) => callback(src), maxDimension);
  }
};
