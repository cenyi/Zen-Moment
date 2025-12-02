import { useCallback, useRef, useEffect, useMemo, useState } from 'react'

interface SoundFiles {
  meditationStart: string
  meditationEnd: string
  pause: string
  reset: string
  inhale: string
  hold: string
  exhale: string
}

interface AudioStatus {
  loaded: boolean
  error: Error | null
  isSupported: boolean
}

export const usePreRecordedSound = (soundEnabled: boolean = true) => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({})
  const [status, setStatus] = useState<AudioStatus>({
    loaded: false,
    error: null,
    isSupported: typeof window !== 'undefined' && 'Audio' in window
  })
  const userInteractionRef = useRef(false)

  // 音频文件路径
  const soundFiles: SoundFiles = useMemo(() => ({
    meditationStart: '/sounds/meditation_start.wav',
    meditationEnd: '/sounds/meditation_end.wav',
    pause: '/sounds/pause.wav',
    reset: '/sounds/reset.wav',
    inhale: '/sounds/inhale.wav',
    hold: '/sounds/hold.wav',
    exhale: '/sounds/exhale.wav'
  }), [])

  // 检测用户交互以解决浏览器音频限制
  const handleUserInteraction = useCallback(() => {
    if (!userInteractionRef.current) {
      userInteractionRef.current = true
      // 尝试在用户交互后初始化音频
      if (soundEnabled && status.isSupported) {
        preloadAudios()
      }
    }
  }, [soundEnabled, status.isSupported])

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

  // 预加载音频函数
  const preloadAudios = useCallback(() => {
    if (!status.isSupported || !userInteractionRef.current) return

    let loadedCount = 0
    const totalFiles = Object.keys(soundFiles).length

    // 预加载所有音频文件
    Object.entries(soundFiles).forEach(([key, path]) => {
      try {
        const audio = new Audio(path)
        audio.preload = 'auto'
        audio.volume = 0.6
        audio.crossOrigin = 'anonymous'

        // 加载成功处理
        audio.onloadeddata = () => {
          audioRefs.current[key] = audio
          loadedCount++
          if (loadedCount === totalFiles) {
            setStatus(prev => ({ ...prev, loaded: true }))
          }
        }

        // 加载错误处理
        audio.onerror = (error) => {
          console.warn(`Failed to load audio ${key}:`, error)
          audioRefs.current[key] = null
          loadedCount++
          
          // 即使有文件加载失败，也标记为已加载（降级处理）
          if (loadedCount === totalFiles) {
            setStatus(prev => ({ 
              ...prev, 
              loaded: true, 
              error: error instanceof Error ? error : new Error(`Failed to load audio: ${key}`)
            }))
          }
        }

        // 触发加载
        audio.load()
      } catch (error) {
        console.error(`Error creating audio for ${key}:`, error)
        loadedCount++
        if (loadedCount === totalFiles) {
          setStatus(prev => ({ 
            ...prev, 
            loaded: true, 
            error: error instanceof Error ? error : new Error('Unknown audio error')
          }))
        }
      }
    })
  }, [soundFiles, status.isSupported])

  // 初始化和清理
  useEffect(() => {
    if (typeof window === 'undefined' || !soundEnabled) return

    // 如果已经有用户交互，则预加载音频
    if (userInteractionRef.current) {
      preloadAudios()
    }

    // 清理函数
    return () => {
      const currentAudios = Object.values(audioRefs.current)
      currentAudios.forEach(audio => {
        if (audio) {
          audio.pause()
          audio.currentTime = 0
          audio.src = '' // 释放资源
        }
      })
      audioRefs.current = {}
      setStatus(prev => ({ ...prev, loaded: false }))
    }
  }, [soundEnabled, preloadAudios])

  // 通用播放函数 - 添加重试逻辑和错误处理
  const playSound = useCallback(async (soundKey: keyof SoundFiles, volume: number = 0.6) => {
    // 基本检查
    if (!soundEnabled || 
        typeof window === 'undefined' || 
        !status.isSupported || 
        !userInteractionRef.current) {
      return false
    }

    const audio = audioRefs.current[soundKey]
    if (!audio) {
      // 如果音频未加载但状态显示已加载，尝试重新创建
      if (status.loaded) {
        try {
          console.warn(`Audio ${soundKey} not available, creating new instance...`)
          const newAudio = new Audio(soundFiles[soundKey])
          newAudio.volume = Math.max(0, Math.min(1, volume))
          newAudio.crossOrigin = 'anonymous'
          audioRefs.current[soundKey] = newAudio
          
          const playPromise = newAudio.play()
          if (playPromise) await playPromise
          return true
        } catch (retryError) {
          console.error(`Failed to recreate and play audio ${soundKey}:`, retryError)
          return false
        }
      }
      console.warn(`Audio file not found or not loaded yet: ${soundKey}`)
      return false
    }

    try {
      // 暂停当前可能正在播放的音频
      if (!audio.paused) {
        audio.pause()
      }
      
      // 设置音量
      audio.volume = Math.max(0, Math.min(1, volume))

      // 重置播放位置
      audio.currentTime = 0

      // 播放音频 - 使用 async/await 处理
      const playPromise = audio.play()
      if (playPromise) {
        await playPromise
        return true
      }
      return true
    } catch (error) {
      console.warn(`Error playing sound ${soundKey}:`, error)
      
      // 尝试恢复音频上下文（处理浏览器自动暂停）
      if (error instanceof Error && 
          (error.name === 'NotAllowedError' || 
           error.message.includes('play() failed') ||
           error.message.includes('The play() request was interrupted'))) {
        console.info('Attempting to handle browser audio restrictions...')
        // 触发用户交互后再尝试播放
        return false
      }
      return false
    }
  }, [soundEnabled, status.isSupported, userInteractionRef, soundFiles, status.loaded])

  // 播放开始冥想声音
  const playStartSound = useCallback(() => {
    playSound('meditationStart', 0.7)
  }, [playSound])

  // 播放结束冥想声音
  const playEndSound = useCallback(() => {
    playSound('meditationEnd', 0.8)
  }, [playSound])

  // 播放暂停声音
  const playPauseSound = useCallback(() => {
    playSound('pause', 0.5)
  }, [playSound])

  // 播放重置声音
  const playResetSound = useCallback(() => {
    playSound('reset', 0.6)
  }, [playSound])

  // 播放呼吸阶段声音
  const playBreathingPhaseSound = useCallback((phase: 'inhale' | 'hold' | 'exhale') => {
    const volumeMap = {
      'inhale': 0.6,
      'hold': 0.5,
      'exhale': 0.7
    }

    playSound(phase, volumeMap[phase])
  }, [playSound])

  // 单独的呼吸阶段声音函数
  const playInhaleSound = useCallback(() => {
    playSound('inhale', 0.6)
  }, [playSound])

  const playHoldSound = useCallback(() => {
    playSound('hold', 0.5)
  }, [playSound])

  const playExhaleSound = useCallback(() => {
    playSound('exhale', 0.7)
  }, [playSound])

  // 停止所有正在播放的声音
  const stopAllSounds = useCallback(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        try {
          if (!audio.paused) {
            audio.pause()
          }
          audio.currentTime = 0
        } catch (error) {
          console.warn('Error stopping audio:', error)
        }
      }
    })
  }, [])

  // 设置全局音量
  const setGlobalVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        try {
          audio.volume = clampedVolume
        } catch (error) {
          console.warn('Error setting audio volume:', error)
        }
      }
    })
    return clampedVolume
  }, [])

  // 重新加载音频文件
  const reloadAudios = useCallback(() => {
    if (!status.isSupported || !userInteractionRef.current) return
    
    setStatus(prev => ({ ...prev, loaded: false, error: null }))
    
    // 清理当前音频对象
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
        audio.src = ''
      }
    })
    
    audioRefs.current = {}
    
    // 重新预加载
    setTimeout(() => preloadAudios(), 100)
  }, [status.isSupported, userInteractionRef, preloadAudios])

  // 获取音频加载状态
  const getAudioStatus = useCallback(() => {
    return status
  }, [status])

  return {
    playStartSound,
    playEndSound,
    playPauseSound,
    playResetSound,
    playBreathingPhaseSound,
    playInhaleSound,
    playHoldSound,
    playExhaleSound,
    stopAllSounds,
    setGlobalVolume,
    reloadAudios,
    getAudioStatus
  }
}