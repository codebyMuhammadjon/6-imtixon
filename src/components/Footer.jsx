import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone } from 'lucide-react'

function Footer() {
  const accountLinks = [
    { name: 'My Account', path: '/' },
    { name: 'Our stores', path: '/' },
    { name: 'Contact us', path: '/' },
    { name: 'Career', path: '/' },
    { name: 'Specials', path: '/' },
  ]

  const helpLinks = [
    { name: 'Help Center', path: '/' },
    { name: 'How to Buy', path: '/' },
    { name: 'Shipping & Delivery', path: '/' },
    { name: 'Product Policy', path: '/' },
    { name: 'How to Return', path: '/' },
  ]

  const categoryLinks = [
    { name: 'House Plants', path: '/' },
    { name: 'Potter Plants', path: '/' },
    { name: 'Seeds', path: '/' },
    { name: 'Small Plants', path: '/' },
    { name: 'Accessories', path: '/' },
  ]

  return (
    <footer className="bg-secondary">
      {/* Services Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-primary/20 pb-8">
          {/* Garden Care */}
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 mx-auto lg:mx-0 mb-4">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="48" r="12" stroke="#46A358" strokeWidth="2" fill="none"/>
                <path d="M32 36V20M24 28L32 20L40 28" stroke="#46A358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20 16C20 16 24 12 32 12C40 12 44 16 44 16" stroke="#46A358" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">Garden Care</h3>
            <p className="text-gray-500 text-sm">
              We are an online plant shop offering a wide range of cheap and trendy plants.
            </p>
          </div>

          {/* Plant Renovation */}
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 mx-auto lg:mx-0 mb-4">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 52V32" stroke="#46A358" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 40C24 32 28 28 32 28C36 28 40 32 40 40" stroke="#46A358" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 32C20 24 24 18 32 18C40 18 44 24 44 32" stroke="#46A358" strokeWidth="2" strokeLinecap="round"/>
                <path d="M28 26L32 22L36 26" stroke="#46A358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="32" cy="40" r="8" stroke="#46A358" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">Plant Renovation</h3>
            <p className="text-gray-500 text-sm">
              We are an online plant shop offering a wide range of cheap and trendy plants.
            </p>
          </div>

          {/* Watering Garden */}
          <div className="text-center lg:text-left">
            <div className="w-16 h-16 mx-auto lg:mx-0 mb-4">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 52V36" stroke="#46A358" strokeWidth="2" strokeLinecap="round"/>
                <path d="M26 46L32 52L38 46" stroke="#46A358" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M24 32C24 24 28 16 32 12C36 16 40 24 40 32C40 40 36 44 32 44C28 44 24 40 24 32Z" stroke="#46A358" strokeWidth="2" fill="none"/>
                <path d="M30 28L34 32M34 28L30 32" stroke="#46A358" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-dark mb-2">Watering Garden</h3>
            <p className="text-gray-500 text-sm">
              We are an online plant shop offering a wide range of cheap and trendy plants.
            </p>
          </div>

          {/* Newsletter */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-bold text-dark mb-2">Would you like to join newsletters?</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="email"
                placeholder="enter your email address..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-primary text-sm"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors text-sm font-medium">
                Join
              </button>
            </div>
            <p className="text-gray-500 text-sm">
              We usually post offers and challenges in newsletter. We're your online houseplant destination.
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-6 border-b border-primary/20 gap-4">
          <Link to="/" className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#46A358"/>
              <path d="M16 8C12 8 9 12 9 16C9 20 12 24 16 24C20 24 24 20 24 16C24 12 20 8 16 8Z" fill="white"/>
              <path d="M16 10C16 10 14 14 14 16C14 18 15 20 16 20C17 20 18 18 18 16C18 14 16 10 16 10Z" fill="#46A358"/>
            </svg>
            <span className="text-xl font-bold text-primary">GREENSHOP</span>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>70 West Buckingham Ave. Farmingdale, NY 11735</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <span>contact@greenshop.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span>+88 01911 717 490</span>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8">
          <div>
            <h4 className="font-bold text-dark mb-4">My Account</h4>
            <ul className="space-y-2">
              {accountLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-4">Help & Guide</h4>
            <ul className="space-y-2">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-4">Categories</h4>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-dark mb-4">Social Media</h4>
            <div className="flex gap-3 mb-6">
              {['facebook', 'instagram', 'twitter', 'linkedin', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-60"></div>
                </a>
              ))}
            </div>

            <h4 className="font-bold text-dark mb-3">We accept</h4>
            <div className="flex gap-2">
              {['PayPal', 'Mastercard', 'Visa', 'Amex'].map((payment) => (
                <div
                  key={payment}
                  className="px-2 py-1 bg-white rounded text-xs font-medium text-gray-500 border border-gray-200"
                >
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            © 2021 GreenShop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
