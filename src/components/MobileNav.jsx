import { Link, useLocation } from 'react-router-dom'
import { Home, Heart, ShoppingCart, User } from 'lucide-react'

function MobileNav() {
  const location = useLocation()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Heart, label: 'Wishlist', path: '/wishlist' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart' },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-primary'
              }`}
            >
              <Icon size={22} fill={isActive && item.label === 'Home' ? 'currentColor' : 'none'} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
      
      {/* Floating Action Button */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2">
        <button className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-dark transition-colors">
          <ShoppingCart size={24} />
        </button>
      </div>
    </nav>
  )
}

export default MobileNav
