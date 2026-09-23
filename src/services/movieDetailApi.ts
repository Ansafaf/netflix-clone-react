export type MovieDetailData = {
  id: number
  title: string
  image: string
  backdrop: string
  overview: string
  releaseDate: string 
  voteAverage: number
  runtime: number
  tagline: string
  genres: string[]
  trailerUrl: string
}

const baseUrl = 'https://api.themoviedb.org/3'
const token = import.meta.env.VITE_TMDB_TOKEN

export const getMovieDetails = async (id: string): Promise<MovieDetailData> => {
  const response = await fetch(`${baseUrl}/movie/${id}?language=en-US`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('failed to fetch movie details')
  }

  const movie = await response.json()
  const trailerResponse = await fetch(`${baseUrl}/movie/${id}/videos?language=en-US`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  let trailerUrl = ''

  if (trailerResponse.ok) {
    const trailerData = await trailerResponse.json()
    const trailer = trailerData.results?.find(
      (video: { type?: string; site?: string; key?: string }) =>
        video.type === 'Trailer' && video.site === 'YouTube'
    )

    trailerUrl = trailer?.key ? `https://www.youtube.com/watch?v=${trailer.key}` : ''
  }

  return {
    id: movie.id,
    title: movie.title,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
    backdrop: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1800&q=85',
    overview: movie.overview || 'No overview available for this movie yet.',
    releaseDate: movie.release_date || 'N/A',
    voteAverage: movie.vote_average ?? 0,
    runtime: movie.runtime ?? 0,
    tagline: movie.tagline || 'A Netflix-inspired cinematic experience',
    genres: Array.isArray(movie.genres) ? movie.genres.map((genre: { name: string }) => genre.name) : [],
    trailerUrl,
  }
}