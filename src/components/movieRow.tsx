import type { Movie } from "../types/movieType";
import MovieCard from "./movieCard";
import './movieRow.css'

type MovieRowProps = {
    title: string
    movies:Movie[]
}

function MovieRow({title, movies} : MovieRowProps){

    return (
        <section className="movie-row-section">
            <h2 className="movie-row-section__title">{title}</h2>

            <div className="movie-row">
                {movies.map((movie)=>{
                    return <MovieCard key={movie.id} movie={movie}/>
                })}
            </div>
        </section>
    )
}
export default MovieRow;
