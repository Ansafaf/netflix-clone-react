import type { Movie } from "../types/movieType";
import type { movie } from "../types/tmdbType";

const base_url = 'https://api.themoviedb.org/3';

const token = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
    accept:'application/json',
    Authorization:`Bearer ${token}`,
}

const getMovieTrailerUrl = async (movieId: number): Promise<string> => {
    const response = await fetch(`${base_url}/movie/${movieId}/videos?language=en-US`, { headers });

    if (!response.ok) {
        return '';
    }

    const data = await response.json();
    const trailer = data.results?.find((video: { type?: string; site?: string; key?: string }) =>
        video.type === 'Trailer' && video.site === 'YouTube'
    );

    return trailer?.key ? `https://www.youtube.com/watch?v=${trailer.key}` : '';
};

export const getMovies = async(category: string): Promise<Movie []> =>{
    const response = await (fetch(
        `${base_url}/${category}`,
        {
            headers
        }
    ));

    if(!response.ok){
        throw new Error("failed to fetch movies");
    }

    const data = await response.json();

    const movies :Movie[] = await Promise.all(
        data.results.map(async (movie: movie): Promise<Movie> => ({
            id: movie.id,
            title: movie.title,
            image: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=500&q=80',
            trailerUrl: await getMovieTrailerUrl(movie.id),
        }))
    );

    return movies;
}

