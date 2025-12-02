import { useCallback, useRef, useEffect } from 'react'

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null)
  const isSupportedRef = useRef<boolean | null>(null)

  // 检测音频支持
  useEffect(() => {
    // 检测Web Audio API支持
    if (typeof window !== 'undefined') {
      isSupportedRef.current = !!(window.AudioContext || (window as any).webkitAudioContext)
    }
  }, [])

  // 初始化音频上下文
  const initAudioContext = useCallback(() => {
    try {
      if (!isSupportedRef.current) {
        console.warn('Web Audio API is not supported in this browser')
        return null
      }
      
      if (!audioContextRef.current && typeof window !== 'undefined') {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      
      // 确保上下文处于运行状态
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(e => console.warn('Failed to resume audio context:', e))
      }
      
      return audioContextRef.current
    } catch (error) {
      console.error('Error initializing audio context:', error)
      return null
    }
  }, []);

  // 安全播放声音的包装函数
  const safePlaySound = useCallback((playFunction: () => void) => {
    if (typeof window === 'undefined') return
    
    // 尝试初始化并播放
    try {
      playFunction()
    } catch (error) {
      console.warn('Error playing sound:', error)
    }
  }, [])

  // 播放开始冥想的声音 - 轻柔的起始音
  const playStartSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      // 使用和谐的频率组合
      const frequencies = [523.25, 659.25, 783.99] // C5, E5, G5 - 和弦

      frequencies.forEach((freq, index) => {
        setTimeout(() => {
          const osc = audioContext.createOscillator()
          const gain = audioContext.createGain()

          osc.connect(gain)
          gain.connect(audioContext.destination)

          osc.frequency.value = freq
          osc.type = 'sine'

          gain.gain.setValueAtTime(0, audioContext.currentTime)
          gain.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05)
          gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8)

          osc.start(audioContext.currentTime)
          osc.stop(audioContext.currentTime + 0.8)
        }, index * 100)
      })
    })
  }, [initAudioContext, safePlaySound])

  // 播放结束冥想的声音 - 三声轻柔的铃声
  const playEndSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      // 创建类似寺庙钟声的声音
      const fundamentalFreq = 440 // A4
      const harmonics = [1, 2, 3] // 基频和泛音

      harmonics.forEach((harmonic, index) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator()
          const gainNode = audioContext.createGain()

          oscillator.connect(gainNode)
          gainNode.connect(audioContext.destination)

          oscillator.frequency.value = fundamentalFreq * harmonic
          oscillator.type = harmonic === 1 ? 'sine' : 'triangle'

          // 音量包络 - 模拟钟声的衰减
          gainNode.gain.setValueAtTime(0, audioContext.currentTime)
          gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.02)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2)

          oscillator.start(audioContext.currentTime)
          oscillator.stop(audioContext.currentTime + 2)
        }, index * 400)
      })
    })
  }, [initAudioContext, safePlaySound])

  // 播放暂停声音 - 短促的提示音
  const playPauseSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = 600
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    })
  }, [initAudioContext, safePlaySound])

  // 播放重置声音 - 短促清脆的提示音
  const playResetSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // 快速上升后下降的音调，给人重置的感觉
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1)
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.15)
    })
  }, [initAudioContext, safePlaySound])

  

  // 播放呼吸阶段转换的声音 - 轻柔的提示音
  const playInhaleSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // 缓慢上升的音调，模拟吸气
      oscillator.frequency.setValueAtTime(261.63, audioContext.currentTime) // C4
      oscillator.frequency.linearRampToValueAtTime(392.00, audioContext.currentTime + 0.5) // G4
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.4)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    })
  }, [initAudioContext, safePlaySound])

  const playExhaleSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // 缓慢下降的音调，模拟呼气
      oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime) // G4
      oscillator.frequency.linearRampToValueAtTime(261.63, audioContext.currentTime + 0.5) // C4
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0.08, audioContext.currentTime + 0.4)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    })
  }, [initAudioContext, safePlaySound])

  const playHoldSound = useCallback(() => {
    safePlaySound(() => {
      const audioContext = initAudioContext()
      if (!audioContext) return

      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      // 稳定的音调，模拟屏住呼吸
      oscillator.frequency.value = 329.63 // E4
      oscillator.type = 'sine'

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    })
  }, [initAudioContext, safePlaySound])

    const playBreathingPhaseSound = useCallback((phase: 'inhale' | 'hold' | 'exhale') => {
      safePlaySound(() => {
        const audioContext = initAudioContext()
        if (!audioContext) return

        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        // 根据呼吸阶段设置不同的音调
        switch (phase) {
          case 'inhale':
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
            oscillator.frequency.linearRampToValueAtTime(660, audioContext.currentTime + 0.5)
            break
          case 'hold':
            oscillator.frequency.value = 550
            break
          case 'exhale':
            oscillator.frequency.setValueAtTime(660, audioContext.currentTime)
            oscillator.frequency.linearRampToValueAtTime(440, audioContext.currentTime + 0.5)
            break
        }

        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0, audioContext.currentTime)
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
      })
    }, [initAudioContext, safePlaySound])

  return {
    playStartSound,
    playEndSound,
    playPauseSound,
    playResetSound,
    playInhaleSound,
    playExhaleSound,
    playHoldSound,
    playBreathingPhaseSound
  }
}