import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../context/auth'
import './register.css'

type FormValues = {
  name: string
  email: string
  password: string
}

const initialValues: FormValues = { name: '', email: '', password: '' }

function Register() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [submitted, setSubmitted] = useState(false);
  const [error , setError] = useState('');
  const navigate = useNavigate()
  const {register} = useAuth();

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current)=> ({...current, [field]:value}));
    setSubmitted(false);
  }
  const isValid = Boolean(values.name.trim()) && /^\S+@\S+\.\S+$/.test(values.email) && values.password.length >= 6;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setError('');


    if(!values.email.trim()){
      setError('Please enter your email');
      return;
    }
    if(!values.password){
      setError('Please enter your password');
      return;
    }
    if (!isValid) return;

    try{
      await register(values.email.trim(), values.password);
      navigate(ROUTES.HOME);
    }
    catch(err){
      console.log(err);
      setError('unable to create account');
    }

  }
  
  return (
    <main className="register-page">
      <header className="register-page__header">
        <Link className="register-page__brand" to={ROUTES.HOME} aria-label="Netflix home">NETFLIX</Link>
        <p>Already have an account? <Link to={ROUTES.LOGIN}>Sign in</Link></p>
      </header>

      <section className="register-page__content" aria-labelledby="register-title">
        <div className="register-page__step" aria-label="Step 1 of 3">STEP 1 OF 3</div>
        <h1 id="register-title">Create your account</h1>
        <p className="register-page__intro">Just a few more steps and you&apos;re done! We hate paperwork, too.</p>

        <form className="register-page__form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="register-name">Name</label>
          <input id="register-name" type="text" autoComplete="name" placeholder="Name" value={values.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={submitted && !values.name.trim()} />
          {submitted && !values.name.trim() && <p className="register-page__error" role="alert">Please enter your name.</p>}

          <label htmlFor="register-email">Email</label>
          <input id="register-email" type="email" autoComplete="email" placeholder="Email" value={values.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={submitted && !/^\S+@\S+\.\S+$/.test(values.email)} />
          {submitted && !/^\S+@\S+\.\S+$/.test(values.email) && <p className="register-page__error" role="alert">Please enter a valid email address.</p>}

          <label htmlFor="register-password">Add a password</label>
          <input id="register-password" type="password" autoComplete="new-password" placeholder="Add a password" value={values.password} onChange={(event) => updateField('password', event.target.value)} aria-invalid={submitted && values.password.length < 6} />
          {submitted && values.password.length < 6 && <p className="register-page__error" role="alert">Your password must contain between 6 and 60 characters.</p>}
          {error && <p className="register-page__error" role="alert">{error}</p>}

          <label className="register-page__consent"><input type="checkbox" /> <span>Please do not email me Netflix special offers.</span></label>
          <button type="submit">Next</button>
        </form>
      </section>

      <footer className="register-page__footer">
        <p>Questions? Call <a href="tel:0008009191743">###-###-###-###</a></p>
        <div><a href="#faq">FAQ</a><a href="#help-centre">Help Centre</a><a href="#terms">Terms of Use</a><a href="#privacy">Privacy</a></div>
      </footer>
    </main>
  )
}

export default Register
