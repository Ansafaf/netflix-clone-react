import type { Movie } from "../types/movieType";

interface TrailerModalProps{
    movie:Movie;
    onClose: ()=> void;
}


export const TrailerModal = ({movie, onClose}: TrailerModalProps)=>{
    return (
        <div className="trailer-overlay">
            <div className="trailer-modal">

                <button onClick={onClose}>
                    x
                </button>

                <h2>{movie.title}</h2>

                <iframe src={movie.trailerUrl} title={`${movie.title} trailer`} allowFullScreen />
            </div>
        </div>
    )
}