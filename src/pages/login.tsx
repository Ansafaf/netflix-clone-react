

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/auth'
import './login.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]= useState('');
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    setError('');
    if(!email.trim() || !password.trim()) return

    try{
      await login(email.trim(), password);
      navigate(ROUTES.USER);
    }
    catch(err){
      console.log(err);
      setError(`Invalid email or password`);
    }
  }

  return (
    <main className="login-page">
      <header className="login-page__header">
        <Link className="login-page__brand" to={ROUTES.HOME} aria-label="Netflix home">NETFLIX</Link>
        <p className="login-page__signup">New to Netflix? <Link to={ROUTES.REGISTER}>Sign up now.</Link></p>
      </header>

      <section className="login-page__content" aria-labelledby="login-title">
        <form className="login-page__form" onSubmit={handleSubmit} noValidate>
          <p className="login-page__eyebrow">WELCOME BACK</p>
          <h1 id="login-title">Sign in to Netflix</h1>
          <p className="login-page__intro">Enter your email to continue watching your favorite stories.</p>
          <label className="login-page__field" htmlFor="email">
            <span>Email address</span>
            <input id="contact" name="contact" type="email" inputMode="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={(event) => { setEmail(event.target.value); setSubmitted(false) }} aria-invalid={submitted && !email.trim()} aria-describedby={submitted && !email.trim() ? 'contact-error' : undefined} />
          </label>
          <label htmlFor="password" className="login-page__field">
            <span>Password</span>
            <input id="password" type="password" autoComplete="current-password" placeholder="enter your password" value={password} onChange={(e)=> {
              setPassword(e.target.value)
              setSubmitted(false);
            }}/>
          </label>

          {submitted && !email.trim() && <p id="contact-error" className="login-page__error" role="alert">Please enter your email</p>}
          {submitted && !password.trim() && <p id="contact-error" className="login-page__error" role="alert">Please enter your password</p>}
          {error && <p className="login-page__error"
              role="alert">{error}</p>}
          <button className="login-page__continue" type="submit">Continue</button>
        </form>

        <p className="login-page__recaptcha">This page is protected by Google reCAPTCHA to ensure you&apos;re not a bot.</p>
      </section>
    </main>
  )
}

export default Login
