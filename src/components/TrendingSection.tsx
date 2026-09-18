import type { Movie } from "../types/movieType"
import MovieCard from './movieCard'

type TrendingSectionProps = { movies: Movie[] }

function TrendingSection({ movies }: TrendingSectionProps) {
  return <section className="content-section trending-section" aria-labelledby="trending-title">
    <h2 id="trending-title">Trending Now</h2>
    <div className="trending-row">
      {movies.map((movie, index) => <MovieCard key={movie.id} movie={movie} rank={index + 1} />)}
    </div>
  </section>
}

export default TrendingSection;
