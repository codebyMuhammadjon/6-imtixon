import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Search } from 'lucide-react'

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  const imageUrl = product.image || product.image_url || product.main_image || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=300&h=300&fit=crop'
  const discount = product.discount_percentage || product.discount || 0

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square mb-3">
        <Link to={`/product/${product.id}`}>
          <img
            src={imageUrl}
            alt={product.title || product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}

        {/* Like Button (Mobile visible, desktop on hover) */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-all ${
            isLiked ? 'text-red-500' : 'text-gray-400'
          } lg:opacity-0 lg:group-hover:opacity-100`}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
        </button>

        {/* Hover Actions (Desktop only) */}
        <div
          className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          } hidden lg:flex`}
        >
          <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors">
            <ShoppingCart size={16} />
          </button>
          <button className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors">
            <Heart size={16} />
          </button>
          <Link
            to={`/product/${product.id}`}
            className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Search size={16} />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.id}`}>
        <h3 className="text-base font-medium text-dark hover:text-primary transition-colors mb-1">
          {product.title || product.name}
        </h3>
      </Link>
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">
          ${product.price?.toFixed(2) || '0.00'}
        </span>
        {product.old_price && (
          <span className="text-gray-400 line-through text-sm">
            ${product.old_price.toFixed(2)}
          </span>
        )}
      </div>
    </div>
  )
}

export default ProductCard
