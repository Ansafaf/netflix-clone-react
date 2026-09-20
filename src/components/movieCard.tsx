import { useNavigate } from 'react-router'
import type { Movie } from '../types/movieType'
import './movieCard.css'


type MovieCardProps = {
  movie: Movie
  rank?: number
}

function MovieCard({ movie, rank }: MovieCardProps) {
  const navigate = useNavigate();

  const handleTrailerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (movie.trailerUrl) {
      window.open(movie.trailerUrl, '_blank','noopener, noreferrer');
      return;
    }

    navigate(`/movie/${movie.id}`);
  };

  return (
    <article className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img className="movie-card__image" src={movie.image} alt={movie.title} />
      <div className="movie-card__shade" aria-hidden="true" />
      {rank && <span className="movie-card__rank" aria-label={`Number ${rank}`}>{rank}</span>}
      <div className="movie-card__content">
        <span className="movie-card__badge">TOP 10</span>
        <h3 className="movie-card__title">{movie.title}</h3>
        <span className="movie-card__meta">Movie</span>
      </div>
      {movie.trailerUrl && (
        <button type="button" className="movie-card__trailer-button" onClick={handleTrailerClick}>
        Watch trailer
      </button>
      )}

    </article>
  )
}

export default MovieCard;
