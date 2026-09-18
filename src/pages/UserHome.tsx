import { useState } from "react"
import type { Movie } from "../types/movieType"
import Navbar from "../components/navbar";

function UserHome(){
    const [movies, setMovies] = useState<Movie[]>([]);
    return (
        <>
        <Navbar />
        
        </>
    )
}
export default UserHome;