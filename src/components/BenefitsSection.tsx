export type Benefit = { title: string; description: string; icon: string }
type BenefitsSectionProps = { benefits: Benefit[] }

function BenefitsSection({ benefits }: BenefitsSectionProps) {
  return <section className="content-section" aria-labelledby="benefits-title">
    <h2 id="benefits-title">More reasons to join</h2>
    <div className="benefit-grid">
      {benefits.map(({ title, description, icon }) => <article className="benefit-card" key={title}>
        <h3>{title}</h3><p>{description}</p><span className="benefit-card__icon" aria-hidden="true">{icon}</span>
      </article>)}
    </div>
  </section>
}

export default BenefitsSection
