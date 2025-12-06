import { useCallback, useRef, useEffect, useState } from 'react'

interface BackgroundSound {
  id: string
  name: string
  file: string
  icon: string
}

interface BackgroundSoundStatus {
  loaded: boolean
  playing: boolean
  volume: number
  error: Error | null
  isSupported: boolean
}

export const BACKGROUND_SOUNDS: BackgroundSound[] = [
  { id: 'none', name: 'None', file: '', icon: '🔇' },
  { id: 'rain', name: 'Rain', file: '/sounds/rain.mp3', icon: '🌧️' },
  { id: 'forest', name: 'Forest', file: '/sounds/forest.wav', icon: '🌲' },
  { id: 'ocean', name: 'Ocean', file: '/sounds/ocean.wav', icon: '🌊' },
  { id: 'lake', name: 'Lake', file: '/sounds/lake.mp3', icon: '🏞️' },
  { id: 'insects', name: 'Insects', file: '/sounds/insects.mp3', icon: '🦗' },
  { id: 'temple', name: 'Temple', file: '/sounds/temple.mp3', icon: '⛩️' },
  { id: 'thunder', name: 'Thunder', file: '/sounds/thunder.wav', icon: '⛈️' }
]

export const useBackgroundSound = (
  soundId: string = 'none',
  soundEnabled: boolean = true,
  autoPlay: boolean = false
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [status, setStatus] = useState<BackgroundSoundStatus>({
    loaded: false,
    playing: false,
    volume: 0.3,
    error: null,
    isSupported: typeof window !== 'undefined' && 'Audio' in window
  })
  const userInteractionRef = useRef(false)

  // 获取当前声音配置
  const currentSound = BACKGROUND_SOUNDS.find(sound => sound.id === soundId) || BACKGROUND_SOUNDS[0]

  // 检测用户交互
  const handleUserInteraction = useCallback(() => {
    if (!userInteractionRef.current) {
      userInteractionRef.current = true
    }
  }, [])

  // 停止背景声音 - 最关键的函数
  const stopBackgroundSound = useCallback(() => {
    console.log('[Audio] Stopping background sound')
    if (audioRef.current) {
      try {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        console.log('[Audio] Stopped successfully')
      } catch (error) {
        console.warn('[Audio] Error stopping:', error)
      }
    }
    setStatus(prev => ({ ...prev, playing: false }))
  }, [])

  // 播放背景声音
  const playBackgroundSound = useCallback(async () => {
    console.log('[Audio] Play requested:', { soundId, soundEnabled, userInteraction: userInteractionRef.current })

    // 检查条件
    if (!soundEnabled) {
      console.log('[Audio] Sound disabled, stopping')
      stopBackgroundSound()
      return false
    }

    if (!status.isSupported) {
      console.log('[Audio] Audio not supported')
      return false
    }

    if (!userInteractionRef.current) {
      console.log('[Audio] No user interaction yet')
      return false
    }

    if (soundId === 'none' || !currentSound.file) {
      console.log('[Audio] Sound is none or no file')
      stopBackgroundSound()
      return false
    }

    try {
      // 如果音频对象不存在，创建新的
      if (!audioRef.current) {
        console.log('[Audio] Creating new audio object for:', currentSound.file)
        const audio = new Audio()
        audio.src = currentSound.file
        audio.volume = status.volume
        audio.loop = true
        audio.crossOrigin = 'anonymous'
        audioRef.current = audio
      }

      const audio = audioRef.current

      // 如果 src 不匹配，更新 src
      if (audio.src !== currentSound.file) {
        console.log('[Audio] Updating audio src to:', currentSound.file)
        audio.pause()
        audio.currentTime = 0
        audio.src = currentSound.file
        audio.loop = true
      }

      // 如果已经在播放，直接返回
      if (!audio.paused) {
        console.log('[Audio] Already playing')
        setStatus(prev => ({ ...prev, playing: true }))
        return true
      }

      // 播放
      console.log('[Audio] Starting playback')
      const playPromise = audio.play()
      if (playPromise) {
        await playPromise
      }
      setStatus(prev => ({ ...prev, playing: true }))
      console.log('[Audio] Playback started successfully')
      return true
    } catch (error) {
      console.error('[Audio] Error playing:', error)
      setStatus(prev => ({
        ...prev,
        playing: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      }))
      return false
    }
  }, [soundEnabled, status.isSupported, soundId, currentSound.file, status.volume, stopBackgroundSound])

  // 设置音量
  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    console.log('[Audio] Setting volume to:', clampedVolume)

    if (audioRef.current) {
      audioRef.current.volume = clampedVolume
    }

    setStatus(prev => ({ ...prev, volume: clampedVolume }))
    return clampedVolume
  }, [])

  // 切换播放状态
  const toggleBackgroundSound = useCallback(() => {
    if (status.playing) {
      return stopBackgroundSound()
    } else {
      return playBackgroundSound()
    }
  }, [status.playing, stopBackgroundSound, playBackgroundSound])

  // 添加用户交互监听器
  useEffect(() => {
    if (!userInteractionRef.current && status.isSupported) {
      const handleInteraction = () => {
        handleUserInteraction()
      }
      window.addEventListener('click', handleInteraction)
      window.addEventListener('touchstart', handleInteraction)
      window.addEventListener('keydown', handleInteraction)

      return () => {
        window.removeEventListener('click', handleInteraction)
        window.removeEventListener('touchstart', handleInteraction)
        window.removeEventListener('keydown', handleInteraction)
      }
    }
  }, [handleUserInteraction, status.isSupported])

  // 响应声音ID变化 - 立即停止
  useEffect(() => {
    console.log('[Audio] Sound ID changed to:', soundId)
    if (soundId === 'none') {
      console.log('[Audio] Sound is none, stopping')
      stopBackgroundSound()
    }
  }, [soundId, stopBackgroundSound])

  // 响应声音启用状态变化
  useEffect(() => {
    console.log('[Audio] Sound enabled changed to:', soundEnabled)
    if (!soundEnabled) {
      stopBackgroundSound()
    }
  }, [soundEnabled, stopBackgroundSound])

  // 响应音量变化
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = status.volume
    }
  }, [status.volume])

  // 清理函数
  useEffect(() => {
    return () => {
      console.log('[Audio] Cleaning up')
      if (audioRef.current) {
        try {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
          audioRef.current.src = ''
        } catch (error) {
          console.warn('[Audio] Error during cleanup:', error)
        }
      }
    }
  }, [])

  return {
    status,
    currentSound,
    playBackgroundSound,
    stopBackgroundSound,
    toggleBackgroundSound,
    setVolume,
    isSupported: status.isSupported
  }
}
