import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingCart, Menu, X, LogIn } from 'lucide-react'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/' },
    { name: 'Plant Care', path: '/' },
    { name: 'Blogs', path: '/' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#46A358"/>
              <path d="M16 8C12 8 9 12 9 16C9 20 12 24 16 24C20 24 24 20 24 16C24 12 20 8 16 8Z" fill="white"/>
              <path d="M16 10C16 10 14 14 14 16C14 18 15 20 16 20C17 20 18 18 18 16C18 14 16 10 16 10Z" fill="#46A358"/>
            </svg>
            <span className="text-xl font-bold text-primary">GREENSHOP</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors relative pb-1 ${
                  isActive(link.path) && link.name === 'Home'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center gap-6">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button className="relative text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition-colors">
              <LogIn size={18} />
              <span className="text-sm font-medium">Login</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button className="text-gray-600 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <button className="relative text-gray-600 hover:text-primary transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium transition-colors ${
                    isActive(link.path) && link.name === 'Home'
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button className="flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md w-fit hover:bg-primary-dark transition-colors">
                <LogIn size={18} />
                <span className="text-sm font-medium">Login</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
