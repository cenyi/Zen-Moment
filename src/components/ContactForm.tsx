'use client'

import { useState, FormEvent } from 'react'
import { useTimerStore } from '../store/timerStore'
import { useToast } from './Toast'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export function ContactForm() {
  const { theme } = useTimerStore()
  const { showToast } = useToast()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<keyof FormData>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 实时验证函数
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) {
          return 'Name is required'
        }
        if (value.trim().length < 2) {
          return 'Name must be at least 2 characters'
        }
        if (value.trim().length > 50) {
          return 'Name must be less than 50 characters'
        }
        return undefined

      case 'email':
        if (!value.trim()) {
          return 'Email is required'
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address'
        }
        return undefined

      case 'subject':
        if (!value.trim()) {
          return 'Subject is required'
        }
        if (value.trim().length < 5) {
          return 'Subject must be at least 5 characters'
        }
        if (value.trim().length > 100) {
          return 'Subject must be less than 100 characters'
        }
        return undefined

      case 'message':
        if (!value.trim()) {
          return 'Message is required'
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters'
        }
        if (value.trim().length > 1000) {
          return 'Message must be less than 1000 characters'
        }
        return undefined

      default:
        return undefined
    }
  }

  const handleBlur = (name: keyof FormData) => {
    setTouched(prev => new Set([...prev, name]))
    const error = validateField(name, formData[name])
    setErrors(prev => ({
      ...prev,
      [name]: error
    }))
  }

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))

    // 如果已经触摸过，实时验证
    if (touched.has(name)) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 标记所有字段为已触摸
    setTouched(new Set(['name', 'email', 'subject', 'message']))

    // 验证所有字段
    const newErrors: FormErrors = {}
    let hasError = false

    ;(['name', 'email', 'subject', 'message'] as const).forEach(field => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
        hasError = true
      }
    })

    setErrors(newErrors)

    if (hasError) {
      showToast('error', 'Please fix the errors before submitting')
      return
    }

    // 模拟提交
    setIsSubmitting(true)

    try {
      // 这里可以调用实际的 API
      // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })

      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1500))

      showToast('success', 'Message sent successfully! We\'ll get back to you within 24-48 hours.')

      // 重置表单
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      setTouched(new Set())
      setErrors({})
    } catch (error) {
      showToast('error', 'Failed to send message. Please try again or email us directly at support@zenmoment.net')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputStyles = (fieldName: keyof FormData) => {
    const hasError = errors[fieldName]
    const isTouched = touched.has(fieldName)

    return {
      base: `w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none min-h-[44px] ${
        theme === 'dark'
          ? 'bg-gray-900 border-gray-700 text-white'
          : 'bg-white border-gray-300 text-gray-900'
      }`,
      normal: '',
      error: 'border-red-500 focus:border-red-500',
      success: 'border-green-500 focus:border-green-500',
      focused: 'ring-2 ring-blue-500 ring-offset-2'
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          Name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          className={`${getInputStyles('name').base} ${
            errors.name ? getInputStyles('name').error : touched.has('name') && !errors.name ? getInputStyles('name').success : getInputStyles('name').normal
          } ${touched.has('name') ? getInputStyles('name').focused : ''}`}
          placeholder="John Doe"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          Email <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`${getInputStyles('email').base} ${
            errors.email ? getInputStyles('email').error : touched.has('email') && !errors.email ? getInputStyles('email').success : getInputStyles('email').normal
          } ${touched.has('email') ? getInputStyles('email').focused : ''}`}
          placeholder="john@example.com"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          Subject <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          onBlur={() => handleBlur('subject')}
          className={`${getInputStyles('subject').base} ${
            errors.subject ? getInputStyles('subject').error : touched.has('subject') && !errors.subject ? getInputStyles('subject').success : getInputStyles('subject').normal
          } ${touched.has('subject') ? getInputStyles('subject').focused : ''}`}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          disabled={isSubmitting}
        >
          <option value="">Select a subject</option>
          <option value="feedback">Feedback</option>
          <option value="question">Question</option>
          <option value="support">Technical Support</option>
          <option value="feature">Feature Request</option>
          <option value="other">Other</option>
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-neumorphic-tips-dark' : 'text-neumorphic-tips-light'
        }`}>
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          onBlur={() => handleBlur('message')}
          rows={5}
          className={`${getInputStyles('message').base} ${
            errors.message ? getInputStyles('message').error : touched.has('message') && !errors.message ? getInputStyles('message').success : getInputStyles('message').normal
          } ${touched.has('message') ? getInputStyles('message').focused : ''} resize-none`}
          placeholder="How can we help you?"
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.message}
          </p>
        )}
        <p className={`text-xs mt-1 ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          {formData.message.length}/1000 characters
        </p>
      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-neumorphic-dark'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-neumorphic'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 0-.642 3.74 6.48L12 21.35l7.422-7.422c.657-.656 1.716-.969 2.632-.293.916-.676.677-1.605.98-2.632.293-1.916-.676-2.632-.98-.293-.677-.969-1.716.293-2.632V4c0-2.21 3.582-4 8-4s8 1.79 8 4v.081c0 1.916-.676 2.632-.98A8.001 8.001 0 0016 8v.081z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0l2.74-7.17a2.5 2.5 0 00-3.21-3.21L8.34 4.66a2.002 2.002 0 00-2.83-2.83l-4.66-4.66a2.5 2.5 0 00-3.21-3.21L2.81 7.16a2.5 2.5 0 00-.36 3.64L5.68 15.68a2.002 2.002 0 002.22 0l8.34-8.34c.677.676 1.696.969 2.632.293.916.676.677 1.605.98 2.632.293.916.676 2.632-.98 2.632-3.64V8c0-2.21-3.582-4-8-4s-4 1.79-4 4v.081c0 1.916.676 2.632.98 2.632.293.916.677.969 1.716.293 2.632-.293 1.916.676 2.632.969 2.632.293.677 1.969 1.605.98 2.632-.293.916-.676.677-1.605.98-2.632-.293-.677-.969-1.716-.293-2.632l-4.66-4.66z" />
              </svg>
              Send Message
            </>
          )}
        </button>
      </div>

      {/* Form Info */}
      <p className={`text-xs text-center mt-4 ${
        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
      }`}>
        All fields marked with <span className="text-red-500" aria-hidden="true">*</span> are required
      </p>
    </form>
  )
}
