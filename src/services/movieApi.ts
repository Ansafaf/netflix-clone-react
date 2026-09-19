import type { Movie } from "../types/movieType";
import type { movie } from "../types/tmdbType";

const base_url = 'https://api.themoviedb.org/3';

const token = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
    accept:'application/json',
    Authorization:`Bearer ${token}`,
}

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

    const movies :Movie[] = data.results.map((movie: movie)=>{
        return {
            id: movie.id,
            title: movie.title,
            image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
    })
    return movies;
}

