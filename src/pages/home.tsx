import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import './home.css'

const trending = [
  ['Ishq Vishk', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=420&q=80'],
  ['Dhamal', 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=420&q=80'],
  ['Operation', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=420&q=80'],
  ['Alpha', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=420&q=80'],
  ['Comedy', 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=420&q=80'],
]

const benefits = [
  ['Enjoy on your TV', 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.', '▣'],
  ['Download your shows to watch offline', 'Save your favourites easily and always have something to watch.', '↓'],
  ['Watch everywhere', 'Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.', '◒'],
  ['Create profiles for kids', 'Send kids on adventures with their favourite characters in a space made just for them.', '♧'],
]

const questions = [
  ['What is Netflix?', 'Netflix is a streaming service with a wide variety of award-winning TV shows, movies and more.'],
  ['How much does Netflix cost?', 'Plans start at ₹149 per month. Watch on any device and cancel whenever you like.'],
  ['Where can I watch?', 'Watch anywhere, anytime. Sign in on the web or use the Netflix app on your favourite devices.'],
  ['How do I cancel?', 'Netflix is flexible. There are no contracts or cancellation fees, so you can cancel online anytime.'],
  ['What can I watch on Netflix?', 'Enjoy feature films, documentaries, TV shows, anime and more.'],
  ['Is Netflix good for kids?', 'Netflix Kids gives parents control while children enjoy family-friendly entertainment.'],
]

function EmailForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false)
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setShowError(!/^\S+@\S+\.\S+$/.test(email))
  }
  return <form className={compact ? 'email-form email-form--compact' : 'email-form'} onSubmit={submit} noValidate>
    <label className="email-form__label" htmlFor={compact ? 'footer-email' : 'hero-email'}>Ready to watch? Enter your email to create or restart your membership.</label>
    <div className="email-form__controls">
      <input id={compact ? 'footer-email' : 'hero-email'} type="email" placeholder="Email address" value={email} onChange={(event) => { setEmail(event.target.value); setShowError(false) }} aria-invalid={showError} />
      <button type="submit">Get Started <span aria-hidden="true">›</span></button>
    </div>
    {showError && <p className="email-form__error" role="alert">Please enter a valid email address.</p>}
  </form>
}

function Home() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  return <main className="home-page">
    <section className="home-hero">
      <div className="home-hero__shade" />
      <header className="home-header">
        <Link to="/" className="home-header__brand" aria-label="Netflix home">NETFLIX</Link>
        <div className="home-header__actions">
          <button className="language-button" type="button">Aあ English <span>▾</span></button>
          <Link className="sign-in-button" to="/login">Sign In</Link>
        </div>
      </header>
      <div className="home-hero__content">
        <h1>Unlimited movies,<br />shows, and more</h1>
        <p className="home-hero__price">Starts at ₹149. Cancel at any time.</p>
        <EmailForm />
      </div>
    </section>

    <div className="home-curve" aria-hidden="true" />
    <div className="home-content">
      <section className="content-section trending-section" aria-labelledby="trending-title">
        <h2 id="trending-title">Trending Now</h2>
        <div className="trending-row">
          {trending.map(([title, image], index) => <article className="trending-card" key={title}>
            <img src={image} alt={title} />
            <span className="trending-card__number">{index + 1}</span>
          </article>)}
        </div>
      </section>

      <section className="content-section" aria-labelledby="benefits-title">
        <h2 id="benefits-title">More reasons to join</h2>
        <div className="benefit-grid">
          {benefits.map(([title, text, icon]) => <article className="benefit-card" key={title}>
            <h3>{title}</h3><p>{text}</p><span className="benefit-card__icon" aria-hidden="true">{icon}</span>
          </article>)}
        </div>
      </section>

      <section className="content-section faq-section" aria-labelledby="faq-title">
        <h2 id="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {questions.map(([question, answer], index) => <article className="faq-item" key={question}>
            <button type="button" aria-expanded={openQuestion === index} aria-controls={`answer-${index}`} onClick={() => setOpenQuestion(openQuestion === index ? null : index)}>
              {question}<span aria-hidden="true">{openQuestion === index ? '×' : '+'}</span>
            </button>
            {openQuestion === index && <p id={`answer-${index}`}>{answer}</p>}
          </article>)}
        </div>
      </section>

      <section className="home-cta"><EmailForm compact /></section>
      <footer className="home-footer">
        <p>Questions? Call <a href="tel:0008009191743">000-800-919-1743</a></p>
        <div className="footer-links">
          {['FAQ', 'Help Centre', 'Account', 'Media Centre', 'Investor Relations', 'Jobs', 'Ways to Watch', 'Terms of Use', 'Privacy', 'Cookie Preferences', 'Corporate Information', 'Contact Us', 'Speed Test', 'Legal Notices', 'Only on Netflix'].map((item) => <a href={`#${item.toLowerCase().replaceAll(' ', '-')}`} key={item}>{item}</a>)}
        </div>
        <button className="language-button" type="button">Aあ English <span>▾</span></button>
        <p>Netflix India</p>
      </footer>
    </div>
  </main>
}

export default Home
