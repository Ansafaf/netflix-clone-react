

import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/auth'
import './login.css'

function ChevronDown() {
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
}

function Login() {
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    if (contact.trim()) {
      login(contact.trim())
      navigate(ROUTES.HOME)
    }
  }

  return (
    <main className="login-page">
      <header className="login-page__header">
        <a className="login-page__brand" href="/" aria-label="Netflix home">NETFLIX</a>
      </header>

      <section className="login-page__content" aria-labelledby="login-title">
        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <h1 id="login-title">Enter your info to sign in</h1>
          <p className="login-page__subtitle">Or get started with a new account.</p>
          <label className="login-page__field" htmlFor="contact">
            <span className="sr-only">Email or mobile number</span>
            <input id="contact" name="contact" type="text" inputMode="email" autoComplete="username" placeholder="Email or mobile number" value={contact} onChange={(event) => { setContact(event.target.value); setSubmitted(false) }} aria-invalid={submitted && !contact.trim()} aria-describedby={submitted && !contact.trim() ? 'contact-error' : undefined} />
          </label>
          {submitted && !contact.trim() && <p id="contact-error" className="login-page__error" role="alert">Please enter your email or mobile number.</p>}
          <button className="login-page__continue" type="submit">Continue</button>
        </form>

        <details className="login-page__help">
          <summary>Get Help <ChevronDown /></summary>
          <p>Having trouble? Make sure the email or mobile number is linked to your Netflix account.</p>
        </details>
        <p className="login-page__recaptcha">This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.</p>
      </section>
    </main>
  )
}

export default Login
