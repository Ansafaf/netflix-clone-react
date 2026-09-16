import './home.css'
import BenefitsSection, { type Benefit } from '../components/BenefitsSection'
import EmailForm from '../components/EmailForm'
import FaqSection, { type Faq } from '../components/FaqSection'
import Footer from '../components/footer'
import Hero from '../components/Hero'
import Navbar from '../components/navbar'
import TrendingSection from '../components/TrendingSection'
import { useAuth } from '../context/auth'
import type { Movie } from '../types/movieType'
import { getMovies } from '../services/movieApi'
import { useEffect, useState } from 'react'


const movies: Movie[] = [
  { id: 1, title: 'Ishq Vishk', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=420&q=80' },
  { id: 2, title: 'Dhamal', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=420&q=80' },
  { id: 3, title: 'Operation', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=420&q=80' },
  { id: 4, title: 'Alpha', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=420&q=80' },
  { id: 5, title: 'Comedy', image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=420&q=80' },
]

const benefits: Benefit[] = [
  { title: 'Enjoy on your TV', description: 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.', icon: '▣' },
  { title: 'Download your shows to watch offline', description: 'Save your favourites easily and always have something to watch.', icon: '↓' },
  { title: 'Watch everywhere', description: 'Stream unlimited movies and TV shows on your phone, tablet, laptop and TV.', icon: '◒' },
  { title: 'Create profiles for kids', description: 'Send kids on adventures with their favourite characters in a space made just for them.', icon: '♧' },
]

const questions: Faq[] = [
  { question: 'What is Netflix?', answer: 'Netflix is a streaming service with a wide variety of award-winning TV shows, movies and more.' },
  { question: 'How much does Netflix cost?', answer: 'Plans start at ₹149 per month. Watch on any device and cancel whenever you like.' },
  { question: 'Where can I watch?', answer: 'Watch anywhere, anytime. Sign in on the web or use the Netflix app on your favourite devices.' },
  { question: 'How do I cancel?', answer: 'Netflix is flexible. There are no contracts or cancellation fees, so you can cancel online anytime.' },
  { question: 'What can I watch?', answer: 'Enjoy feature films, documentaries, TV shows, anime and more.' },
  { question: 'Is Netflix good for kids?', answer: 'Netflix Kids gives parents control while children enjoy family-friendly entertainment.' },
]

function Home() {
  const { isAuthenticated } = useAuth();
  // const [movies, setMovies] = useState([]);

  // useEffect(()=>{
  //   getMovies()
  //   .then(setMovies)
  //   .then((m)=> console.log(m))
  //   .catch((err)=> console.log(err));
  // },[]);
  return <main className="home-page">
    <div className="home-page__site-name">Netflix Clone</div>
    {isAuthenticated && <Navbar activeItem="Home" />}
    <Hero />
    <div className="home-curve" aria-hidden="true" />
    <div className="home-content">
      <TrendingSection movies={movies} />
      <BenefitsSection benefits={benefits} />
      <FaqSection questions={questions} />
      <section className="home-cta"><EmailForm compact /></section>
      <Footer />
    </div>
  </main>
}

export default Home
