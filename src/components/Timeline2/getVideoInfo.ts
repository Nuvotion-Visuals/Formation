// @ts-ignore
import getVideoFrames from './mod'

interface VideoConfig {
  codedWidth: number,
  codedHeight: number
}

interface VideoFrame {
  close: () => void
}

interface VideoProcessingResult {
  frameCount: number,
  frameRate: number,
  fileName: string,
  dimensions: { width: number, height: number },
  fileSize: number,
  duration: number
}

const loadVideo = (file: File): Promise<HTMLVideoElement> => new Promise((resolve, reject) => {
  try {
    const video = document.createElement('video')
    video.preload = 'metadata'

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

export async function getVideoInfo(file: File, canvasEl: HTMLCanvasElement): Promise<VideoProcessingResult> {
  const video = await loadVideo(file)
  const videoDuration = video.duration
  URL.revokeObjectURL(video.src) // Cleanup

  let frameCount = 0
  let dimensions: { width: number, height: number } = { width: 0, height: 0 }

  const ctx = canvasEl.getContext("2d") as CanvasRenderingContext2D
  const videoUrl = URL.createObjectURL(file)

  await getVideoFrames({
    videoUrl,
    onFrame(frame: VideoFrame) {
      ctx.drawImage(frame as unknown as CanvasImageSource, 0, 0, canvasEl.width, canvasEl.height)
      frame.close()
      frameCount++
    },
    onConfig(config: VideoConfig) {
      dimensions.width = config.codedWidth
      dimensions.height = config.codedHeight
      canvasEl.width = config.codedWidth
      canvasEl.height = config.codedHeight
    },
    onFinish() {
    }
  })

  URL.revokeObjectURL(videoUrl) // Cleanup

  const frameRate = frameCount / videoDuration
  const fileName = file.name
  const fileSize = file.size

  return {
    frameCount,
    frameRate,
    fileName,
    dimensions,
    fileSize,
    duration: videoDuration
  }
}
