import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

type HeroProps = {
  title: string
  description: string
}

function Hero({
  title = 'Unlimited movies, shows, and more',
  description = 'Starts at ₹149. Cancel at any time.',
}: Partial<HeroProps>) {
  return (
    <section className="home-hero">
      <div className="home-hero__shade" />
      <div className="home-hero__content">
        <h1>{title}</h1>
        <p className="home-hero__price">{description}</p>
        <Link className="home-register-link" to={ROUTES.REGISTER}>
          Create an account <span aria-hidden="true">›</span>
        </Link>
      </div>
    </section>
  )
}
export default Hero;
