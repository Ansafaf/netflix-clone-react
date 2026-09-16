import { useState, type FormEvent } from 'react'

type EmailFormProps = { compact?: boolean }

function EmailForm({ compact = false }: EmailFormProps) {
  const [email, setEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const inputId = compact ? 'footer-email' : 'hero-email'
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowError(!/^\S+@\S+\.\S+$/.test(email))
  }

  return <form className={compact ? 'email-form email-form--compact' : 'email-form'} onSubmit={submit} noValidate>
    <label className="email-form__label" htmlFor={inputId}>Ready to watch? Enter your email to create or restart your membership.</label>
    <div className="email-form__controls">
      <input id={inputId} type="email" placeholder="Email address" value={email} onChange={(event) => { setEmail(event.target.value); setShowError(false) }} aria-invalid={showError} />
      <button type="submit">Get Started <span aria-hidden="true">›</span></button>
    </div>
    {showError && <p className="email-form__error" role="alert">Please enter a valid email address.</p>}
  </form>
}

export default EmailForm
