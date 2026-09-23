import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/auth'
import { ROUTES } from '../constants/routes'
import './navbar.css'

const navigationItems = ['Home'] as const

type NavigationItem = (typeof navigationItems)[number]

type NavbarProps = {
  activeItem ?: NavigationItem
  onNavigate ?: (item: NavigationItem) => void
}

function Navbar({ activeItem = 'Home', onNavigate }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  }

  const selectItem = (item: NavigationItem) => {
    onNavigate?.(item)
    setIsMenuOpen(false)
  }
  
  return (
    <header className="netflix-navbar">
      <a className="netflix-navbar__brand" href="/" aria-label="Netflix home">
        NETFLIX
      </a>

    

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
        <button className="netflix-navbar__profile" type="button" aria-label="Sign out" onClick={handleLogout}>
          <span className="netflix-navbar__profile-avatar" aria-hidden="true">N</span>
          <span className="netflix-navbar__caret">Sign out</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
