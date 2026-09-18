import type { Movie } from '../types/movieType'
import './movieCard.css'

type MovieCardProps = {
  movie: Movie
  rank?: number
}

function MovieCard({ movie, rank }: MovieCardProps) {
  return (
    <article className="movie-card">
      <img className="movie-card__image" src={movie.image} alt={movie.title} />
      <div className="movie-card__shade" aria-hidden="true" />
      {rank && <span className="movie-card__rank" aria-label={`Number ${rank}`}>{rank}</span>}
      <div className="movie-card__content">
        <span className="movie-card__badge">TOP 10</span>
        <h3 className="movie-card__title">{movie.title}</h3>
        <span className="movie-card__meta">Movie</span>
      </div>
    </article>
  )
}

export default MovieCard
