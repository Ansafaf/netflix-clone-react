import type { Movie } from "../types/movieType";
import "./topPicks.css";

type TopPicksProps = {
  movies: Movie[];
};

function TopPicks({ movies }: TopPicksProps) {
  const topMovies = movies.length ? movies.slice(0, 3) : [];

  if (!topMovies.length) {
    return null;
  }

  return (
    <div className="top-picks">
      <div className="top-picks__header">
        <h3>Top Picks</h3>
        <span className="top-picks__pill">Today</span>
      </div>

      <div className="top-picks__list">
        {topMovies.map((movie, index) => (
          <div className="top-picks__item" key={movie.id}>
            <strong>{index + 1}</strong>
            <span>{movie.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopPicks;
