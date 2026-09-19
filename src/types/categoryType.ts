import type { Movie } from "./movieType"

export type MoviesByCategory={
    trending: Movie[]
    popular: Movie[]
    topRated: Movie[]
}