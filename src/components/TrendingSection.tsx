import type { Movie } from "../types/movieType"

type TrendingSectionProps = { movies: Movie[] }

function TrendingSection({ movies }: TrendingSectionProps) {
  return <section className="content-section trending-section" aria-labelledby="trending-title">
    <h2 id="trending-title">Trending Now</h2>
    <div className="trending-row">
      {movies.map(({ title, image }, index) => <article className="trending-card" key={title}>
        <img src={image} alt={title} />
        <span className="trending-card__number">{index + 1}</span>
      </article>)}
    </div>
  </section>
}

export default TrendingSection;
