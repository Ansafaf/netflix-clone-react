import Navbar from './navbar'
import './browse.css'

const rows = [
  { title: 'Popular on Netflix', movies: ['The Night Agent', 'Wednesday', 'Stranger Things', 'Money Heist', 'The Witcher'] },
  { title: 'Continue Watching', movies: ['Dark', 'The Crown', 'Lupin', 'Ozark', 'Narcos'] },
  { title: 'Only on Netflix', movies: ['Arcane', 'Black Mirror', 'Bridgerton', 'Cobra Kai', 'You'] },
]

function Browse() {
  return <main className="browse-page">
    <Navbar activeItem="Home" />
    <section className="browse-hero" aria-labelledby="browse-title"><div className="browse-hero__content"><p className="browse-hero__eyebrow">NETFLIX SERIES</p><h1 id="browse-title">The stories everyone is talking about</h1><p>Discover something new, pick up where you left off, and enjoy your next favorite.</p><button type="button" className="browse-hero__play">▶ Play</button></div></section>
    <div className="browse-rows">{rows.map((row, rowIndex) => <section className="browse-row" key={row.title} aria-labelledby={`row-${rowIndex}`}><h2 id={`row-${rowIndex}`}>{row.title}</h2><div className="browse-row__items">{row.movies.map((movie, movieIndex) => <article className={`browse-card browse-card--${(movieIndex + rowIndex) % 5}`} key={movie}><span>{movie}</span></article>)}</div></section>)}</div>
  </main>
}

export default Browse
