
const base_url = 'https://api.themoviedb.org/3';

const token = import.meta.env.VITE_TMDB_TOKEN;

const headers = {
    accept:'application/json',
    Authorization:`Bearer ${token}`,
}

export const getMovies = async()=>{
    const response = await fetch(
        `${base_url}/trending/movie/week`,
        {
            headers
        }
    )

    if(!response.ok){
        throw new Error("failed to fetch movies");
    }

    const data = await response.json();
    return data.results
}

