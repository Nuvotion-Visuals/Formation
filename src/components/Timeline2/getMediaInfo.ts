interface VideoProcessingResult {
  element: HTMLVideoElement,
  fileName: string,
  dimensions: { width: number, height: number },
  fileSize: number,
  duration: number,
  url: string
}

const loadVideo = async (file: File): Promise<HTMLVideoElement> => {
  return new Promise((resolve, reject) => {
    try {
      const video = document.createElement('video')
      // video.preload = 'metadata'
  
      video.onloadedmetadata = function() {
        resolve(this as HTMLVideoElement)
      }
  
      video.onerror = function() {
        reject("Invalid video. Please select a video file.")
      }
  
      video.src = window.URL.createObjectURL(file)
    }
    catch (e) {
      reject(e)
    }
  })
}

export async function getVideoInfo(file: File): Promise<VideoProcessingResult> {
  const video = await loadVideo(file)
  const videoDuration = video.duration
  // URL.revokeObjectURL(video.src) // Cleanup

  const dimensions: { width: number, height: number } = {
    width: video.videoWidth,
    height: video.videoHeight
  }

  const fileName = file.name
  const fileSize = file.size

  return {
    element: video,
    fileName,
    dimensions,
    fileSize,
    duration: videoDuration,
    url: video.src
  }
}


interface ImageProcessingResult {
  element: HTMLImageElement,
  fileName: string,
  dimensions: { width: number, height: number },
  fileSize: number,
  url: string
}

const loadImage = async (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Image()

      image.onload = function() {
        resolve(this as HTMLImageElement)
      }

      image.onerror = function() {
        reject("Invalid image. Please select an image file.")
      }

      image.src = window.URL.createObjectURL(file)
    }
    catch (e) {
      reject(e)
    }
  })
}

export async function getImageInfo(file: File): Promise<ImageProcessingResult> {
  const image = await loadImage(file)

  const dimensions = {
    width: image.width,
    height: image.height
  }

  const fileName = file.name
  const fileSize = file.size

  return {
    element: image,
    fileName,
    dimensions,
    fileSize,
    url: image.src
  }
}