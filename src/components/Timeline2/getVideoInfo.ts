interface VideoProcessingResult {
  videoElement: HTMLVideoElement,
  fileName: string,
  dimensions: { width: number, height: number },
  fileSize: number,
  duration: number
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
    videoElement: video,
    fileName,
    dimensions,
    fileSize,
    duration: videoDuration
  }
}
