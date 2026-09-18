import { useEffect, useState } from "react"
import type { Movie } from "../types/movieType"
import Navbar from "../components/navbar";
import MovieRow from "../components/movieRow";
import { getMovies } from "../services/movieApi";

function UserHome(){
    const [movies, setMovies] = useState<Movie[]>([]);
    useEffect( ()=>{
        const fetching = async()=>{
            const data = await getMovies();
            setMovies(data);
        }
        fetching();
    },[])
    return (
        <>
        <Navbar />
        <MovieRow title="Trending now" movies={movies} />
        </>
    )
}
export default UserHome;