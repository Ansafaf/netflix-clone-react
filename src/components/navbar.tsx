import { useState } from 'react'
import './navbar.css'

const navigationItems = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List'] as const

type NavigationItem = (typeof navigationItems)[number]

type NavbarProps = {
  activeItem?: NavigationItem
  onNavigate?: (item: NavigationItem) => void
}

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </svg>
  )
}

/** A responsive, dependency-free navigation bar for the Netflix clone. */
function Navbar({ activeItem = 'Home', onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const selectItem = (item: NavigationItem) => {
    onNavigate?.(item)
    setIsMenuOpen(false)
  }

  return (
    <header className="netflix-navbar">
      <a className="netflix-navbar__brand" href="/" aria-label="Netflix home">
        NETFLIX
      </a>

      <button
        className="netflix-navbar__browse-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        Browse
        <span aria-hidden="true">▾</span>
      </button>

      <nav id="primary-navigation" className={isMenuOpen ? 'netflix-navbar__links is-open' : 'netflix-navbar__links'} aria-label="Primary navigation">
        {navigationItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
            className={item === activeItem ? 'is-active' : undefined}
            aria-current={item === activeItem ? 'page' : undefined}
            onClick={() => selectItem(item)}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="netflix-navbar__actions">
        <button className="netflix-navbar__icon-button" type="button" aria-label="Search">
          <SearchIcon />
        </button>
        <a className="netflix-navbar__kids-link" href="#kids">Kids</a>
        <button className="netflix-navbar__icon-button" type="button" aria-label="Notifications">
          <BellIcon />
        </button>
        <button className="netflix-navbar__profile" type="button" aria-label="Open profile menu">
          <span aria-hidden="true">N</span>
          <span className="netflix-navbar__caret" aria-hidden="true">▾</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
