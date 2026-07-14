import { useState } from 'react'
import { sendContactMessage } from '@/services/email'

export interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialState: ContactFormState = { name: '', email: '', subject: '', message: '' }

function validate(state: ContactFormState) {
  const errors: Partial<Record<keyof ContactFormState, string>> = {}
  if (!state.name.trim()) errors.name = 'Name is required.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) errors.email = 'Enter a valid email address.'
  if (!state.subject.trim()) errors.subject = 'Subject is required.'
  if (state.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

export function useContactForm() {
  const [values, setValues] = useState<ContactFormState>(initialState)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function update<K extends keyof ContactFormState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const validation = validate(values)
    setErrors(validation)
    if (Object.keys(validation).length > 0) return

    setStatus('submitting')
    try {
      await sendContactMessage(values)
      setStatus('success')
      setValues(initialState)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return { values, errors, status, errorMessage, update, submit }
}
