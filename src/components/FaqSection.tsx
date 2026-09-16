import { useState } from 'react'

export type Faq = { question: string; answer: string }
type FaqSectionProps = { questions: Faq[] }

function FaqSection({ questions }: FaqSectionProps) {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)
  return <section className="content-section faq-section" aria-labelledby="faq-title">
    <h2 id="faq-title">Frequently Asked Questions</h2>
    <div className="faq-list">
      {questions.map(({ question, answer }, index) => {
        const isOpen = openQuestion === index
        const answerId = `answer-${index}`
        return <article className="faq-item" key={question}>
          <button type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenQuestion(isOpen ? null : index)}>
            {question}<span aria-hidden="true">{isOpen ? '×' : '+'}</span>
          </button>
          {isOpen && <p id={answerId}>{answer}</p>}
        </article>
      })}
    </div>
  </section>
}

export default FaqSection
