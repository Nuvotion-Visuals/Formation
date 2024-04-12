import { resourceUrlToDataUrl } from '../internal'

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

/**
 * @async
 * @function generateVideoThumbnails
 *
 * A helper function to generate a series of video thumbnails at specified timestamps. Thumbnails are captured as video frames at the specified points in the video.
 * 
 * @param {File} file - The video file for which thumbnails are to be generated.
 * @param {number} [maxDimension = 256] - The maximum dimension to which the video frames should be resized.
 * @param {number[]} [timestamps = [0, 20, 40, 60, 80, 100]] - An array of points (represented in percentage of total video duration) at which to capture video frames.
 * @param {boolean} [useObjectUrl = false] - If true, returns the captured frames as object URLs; if false, returns as data URLs.
 *
 * @throws {Error} If there's an error in fetching the video data or manipulating DOM for video frame capture.
 * @returns {Promise<{image: string | Blob, timestamp: number}[]>} A promise that resolves to an array of objects containing the generated thumbnail (as a base64 encoded string or object URL, depending on useObjectUrl) and the corresponding timestamp.
 *
 * @example
 * const vidFile = new File([...], "sample.mp4");
 * generateVideoThumbnails(vidFile, 128, [0, 25, 50, 75, 100]).then(thumbnails => { console.log(thumbnails); });
 */
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


/**
 * @function generateThumbnail
 * 
 * A helper function to generate thumbnail for a media file (image or video). It detects the file type and internally calls the appropriate function to generate the thumbnail.
 * 
 * @param {File} file - The media file for which thumbnail is to be generated.
 * @param {Function} callback - The callback to execute when thumbnail generation is complete. The generated thumbnail (as a base64 encoded string) will be passed as argument to the callback.
 * @param {number} [maxDimension = 256] - The maximum dimension to which the image should be resized. This is applicable to both images and video frames.
 * 
 * @throws {Error} If there's an error in fetching the image data or manipulating DOM for video thumbnail generation.
 *
 * @example
 * const imgFile = new File([...], "sample.png");
 * generateThumbnail(imgFile, result => console.log(`Thumbnail data: ${result}`));  // Logs base64 encoded thumbnail data
 * generateThumbnail(imgFile, result => { document.getElementById("thumbnail").src = result; });  // Sets thumbnail as source for an <img> element
 */

export const generateThumbnail = (file: File, callback: (image: string) => void, maxDimension = 256) => {
  const type = file.type.split('/')[0];
  if (type === 'image') {
    generateImageThumbnail(file, (src) => callback(src), maxDimension);
  }
  if (type === 'video') {
    generateVideoThumbnail(file, (src) => callback(src), maxDimension);
  }
};
