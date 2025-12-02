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
      if (soundEnabled && status.isSupported && currentSound.file) {
        loadBackgroundSound()
      }
    }
  }, [soundEnabled, status.isSupported, currentSound.file])

  // 加载背景声音
  const loadBackgroundSound = useCallback(() => {
    if (!status.isSupported || !currentSound.file || !userInteractionRef.current) return

    try {
      // 清理之前的音频
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }

      // 创建新的音频对象
      const audio = new Audio()
      audio.src = currentSound.file
      audio.preload = 'auto'
      audio.volume = status.volume
      audio.loop = true // 背景声音循环播放
      audio.crossOrigin = 'anonymous'

      // 加载成功
      audio.onloadeddata = () => {
        audioRef.current = audio
        setStatus(prev => ({ ...prev, loaded: true, error: null }))

        // 如果设置了自动播放，尝试播放
        if (autoPlay && soundEnabled) {
          playBackgroundSound()
        }
      }

      // 加载错误
      audio.onerror = (error) => {
        console.warn(`Failed to load background sound ${soundId}:`, error)
        setStatus(prev => ({
          ...prev,
          loaded: false,
          error: error instanceof Error ? error : new Error(`Failed to load background sound: ${soundId}`)
        }))
      }

      // 播放结束事件（对于循环音频不应该触发）
      audio.onended = () => {
        if (!audio.loop) {
          setStatus(prev => ({ ...prev, playing: false }))
        }
      }

      // 开始加载
      audio.load()
    } catch (error) {
      console.error(`Error creating background audio for ${soundId}:`, error)
      setStatus(prev => ({
        ...prev,
        loaded: false,
        error: error instanceof Error ? error : new Error('Unknown background audio error')
      }))
    }
  }, [status.isSupported, currentSound.file, soundId, status.volume, autoPlay, soundEnabled])

  // 播放背景声音
  const playBackgroundSound = useCallback(async () => {
    if (!soundEnabled ||
        !status.isSupported ||
        !userInteractionRef.current ||
        !currentSound.file ||
        soundId === 'none') {
      return false
    }

    const audio = audioRef.current
    if (!audio) {
      // 如果音频未加载，尝试重新加载
      if (status.loaded === false) {
        loadBackgroundSound()
      }
      return false
    }

    try {
      // 如果已经在播放，不重复播放
      if (!audio.paused) {
        return true
      }

      // 设置音量
      audio.volume = status.volume

      // 播放音频
      const playPromise = audio.play()
      if (playPromise) {
        await playPromise
        setStatus(prev => ({ ...prev, playing: true }))
        return true
      }
      setStatus(prev => ({ ...prev, playing: true }))
      return true
    } catch (error) {
      console.warn(`Error playing background sound ${soundId}:`, error)

      // 处理浏览器音频限制
      if (error instanceof Error &&
          (error.name === 'NotAllowedError' ||
           error.message.includes('play() failed'))) {
        console.info('Browser blocked background audio playback - user interaction required')
      }
      return false
    }
  }, [soundEnabled, status.isSupported, userInteractionRef, currentSound.file, soundId, status.volume, status.loaded, loadBackgroundSound])

  // 停止背景声音
  const stopBackgroundSound = useCallback(() => {
    const audio = audioRef.current
    if (audio) {
      try {
        audio.pause()
        audio.currentTime = 0
        setStatus(prev => ({ ...prev, playing: false }))
        return true
      } catch (error) {
        console.warn('Error stopping background sound:', error)
        return false
      }
    }
    return false
  }, [])

  // 设置音量
  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume))

    if (audioRef.current) {
      try {
        audioRef.current.volume = clampedVolume
      } catch (error) {
        console.warn('Error setting background sound volume:', error)
      }
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
      window.addEventListener('click', handleUserInteraction)
      window.addEventListener('touchstart', handleUserInteraction)
      window.addEventListener('keydown', handleUserInteraction)

      return () => {
        window.removeEventListener('click', handleUserInteraction)
        window.removeEventListener('touchstart', handleUserInteraction)
        window.removeEventListener('keydown', handleUserInteraction)
      }
    }
  }, [handleUserInteraction, status.isSupported])

  // 响应声音ID变化
  useEffect(() => {
    if (soundId === 'none' || !currentSound.file) {
      stopBackgroundSound()
      if (audioRef.current) {
        audioRef.current.src = ''
        audioRef.current = null
      }
      setStatus(prev => ({ ...prev, loaded: false, playing: false }))
    } else if (userInteractionRef.current && soundEnabled) {
      loadBackgroundSound()
    }
  }, [soundId, currentSound.file, soundEnabled, loadBackgroundSound, stopBackgroundSound])

  // 响应声音开关变化
  useEffect(() => {
    if (!soundEnabled) {
      stopBackgroundSound()
    } else if (userInteractionRef.current && currentSound.file && autoPlay) {
      playBackgroundSound()
    }
  }, [soundEnabled, stopBackgroundSound, playBackgroundSound, currentSound.file, autoPlay])

  // 清理函数
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
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