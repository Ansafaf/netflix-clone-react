import EmailForm from './EmailForm'

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
        <EmailForm />
      </div>
    </section>
  )
}
export default Hero;
