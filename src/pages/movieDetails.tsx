import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/navbar'
import Loader from '../components/loader'
import { getMovieDetails, type MovieDetailData } from '../services/movieDetailApi'
import './movieDetails.css'

function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [movie, setMovie] = useState<MovieDetailData | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        setError('Movie id is missing.');
        setIsLoading(false);
        return
      }

      try {
        setIsLoading(true)
        setError('')
        const movieDetails = await getMovieDetails(id)
        setMovie(movieDetails)
      } catch (err) {
        console.error(err)
        setError('Unable to load movie details right now. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMovie();
  }, [id]);
  if (isLoading) return (
    <>
      <Navbar />
      <Loader />
    </>
  )

  if (error || !movie) {
    return (
      <>
        <Navbar />
        <main className="movie-detail__fallback">
          <div className="movie-detail__fallback-box">
            <h1>Movie not found</h1>
            <p>{error || 'The movie you are looking for is unavailable.'}</p>
            <button type="button" className="movie-detail__back-button" onClick={() => navigate(-1)}>
              Go back
            </button>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="movie-detail-page">
        <section
          className="movie-detail__hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.86), rgba(0,0,0,0.46) 48%, rgba(0,0,0,0.72)), url(${movie.backdrop})`,
          }}
        >
          <div className="movie-detail__content">
            <div className="movie-detail__poster-wrap">
              <img src={movie.image} alt={movie.title} className="movie-detail__poster" />
            </div>

            <div className="movie-detail__info">
              <div className="movie-detail__meta-row">
                <button type="button" className="movie-detail__back-button" onClick={() => navigate(-1)}>
                  ← Back
                </button>
                <span>{movie.releaseDate.slice(0, 4) || 'New'}</span>
                <span>{movie.runtime ? `${movie.runtime} min` : 'Movie'}</span>
                <span>{movie.voteAverage ? `★ ${movie.voteAverage.toFixed(1)}` : '★ New'}</span>
              </div>

              <h1>{movie.title}</h1>

              {movie.tagline && <p className="movie-detail__tagline">{movie.tagline}</p>}

              <div className="movie-detail__genre-list">
                {movie.genres.length ? (
                  movie.genres.map((genre) => (
                    <span key={genre} className="movie-detail__genre">
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="movie-detail__genre">Drama</span>
                )}
              </div>

              <p className="movie-detail__overview">{movie.overview}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default MovieDetail;