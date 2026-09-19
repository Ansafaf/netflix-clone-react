import { useEffect, useState } from "react"
import Navbar from "../components/navbar";
import MovieRow from "../components/movieRow";
import { getMovies } from "../services/movieApi";
import Loader from "../components/loader";
import TopPicks from "../components/TopPicks";
import "./userHome.css";
import type { MoviesByCategory } from "../types/categoryType";

function UserHome(){
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [moviesByCategory, setMoviesByCategory] = useState<MoviesByCategory>({trending: [], popular:[], topRated: []});

    const categories = [
    {
        title: "Trending Now",
        endpoint:'trending/movie/week',
    },
    {
        title:'Popular Movies',
        endpoint: 'movie/popular'
    },
    {
        title:'top rated',
        endpoint:'movie/top_rated'
    }

    ]
    useEffect(() => {
        const fetching = async () => {
            try {
              const data = await Promise.all(
                categories.map((category)=> getMovies(category.endpoint))
              )

              setMoviesByCategory({
                trending: data[0],
                popular: data[1],
                topRated: data[2]
              })
            }
            catch(err){
                setError('failed to fetch movies');
                console.log(err);
            }
            finally{
                setIsLoading(false);
            }
        }
        fetching();
    },[])

    const spotlightMovie = {
        id: 1,
        title: 'Midnight City',
        image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80'
    };


    return (
        <div className="user-home">
            <Navbar />

            {isLoading && <Loader />}
            {error && <p className="user-home__error">{error}</p>}

            {!isLoading && (
                <>
                    <section
                        className="user-home__hero"
                        style={{ backgroundImage: `url(${spotlightMovie.image})` }}
                    >
                        <div className="user-home__hero-content">
                            <p className="user-home__eyebrow">New Release</p>
                            <h1>{spotlightMovie.title}</h1>
                            <p>
                                A high-stakes thriller follows a desperate crew racing through the city
                                to stop a conspiracy before the night unfolds.
                            </p>
                            <div className="user-home__hero-actions">
                                <button type="button">Play</button>
                                <button type="button">My List</button>
                            </div>
                        </div>
                    </section>

                    <main className="user-home__content">
                        <div className="user-home__top-grid">
                            <TopPicks movies={moviesByCategory.topRated} />
                        </div>

                        <MovieRow title="Trending now" movies={moviesByCategory.trending} />
                        <MovieRow title="Popular on Netflix" movies={moviesByCategory.popular} />
                    </main>
                </>
            )}
        </div>
    )
}
export default UserHome;