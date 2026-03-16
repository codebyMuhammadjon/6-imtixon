import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Heart, Minus, Plus, Star, Facebook, Twitter, Linkedin, Mail, Search } from 'lucide-react'
import { fetchProduct, fetchProducts, fetchProductComments } from '../services/api'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('S')
  const [activeTab, setActiveTab] = useState('description')
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  
  // Touch swipe state
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const imageContainerRef = useRef(null)

  const sizes = ['S', 'M', 'L', 'XL']
  const tabs = [
    { id: 'description', label: 'Product Description' },
    { id: 'reviews', label: 'Reviews' },
  ]

  useEffect(() => {
    loadProductData()
  }, [id])

  const loadProductData = async () => {
    setLoading(true)
    
    const productData = await fetchProduct(id)
    setProduct(productData?.data || productData)
    
    const relatedData = await fetchProducts(1, 4)
    setRelatedProducts((relatedData?.data || relatedData?.products || []).slice(0, 4))
    
    const recommendedData = await fetchProducts(1, 5)
    setRecommendedProducts((recommendedData?.data || recommendedData?.products || []).slice(0, 5))
    
    const commentsData = await fetchProductComments(id)
    setComments(commentsData?.data || commentsData || [])
    
    setLoading(false)
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50
    const images = getProductImages()

    if (diff > threshold && selectedImage < images.length - 1) {
      setSelectedImage(prev => prev + 1)
    } else if (diff < -threshold && selectedImage > 0) {
      setSelectedImage(prev => prev - 1)
    }
  }

  const getProductImages = () => {
    if (!product) return []
    const mainImage = product.image || product.image_url || product.main_image
    const images = product.images || product.detailed_images || []
    return mainImage ? [mainImage, ...images] : images.length > 0 ? images : ['https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&h=500&fit=crop']
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-100 rounded w-48 mb-8"></div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-gray-100 rounded-lg aspect-square"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="h-8 bg-gray-100 rounded w-64"></div>
              <div className="h-6 bg-gray-100 rounded w-32"></div>
              <div className="h-20 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-dark mb-4">Product not found</h1>
        <Link to="/" className="text-primary hover:underline">Go back to home</Link>
      </div>
    )
  }

  const productImages = getProductImages()

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <span className="text-dark">Shop</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 flex-1">
            {/* Thumbnails - Desktop */}
            <div className="hidden lg:flex flex-col gap-3">
              {productImages.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title || product.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative">
              {/* Mobile Back & Like buttons */}
              <div className="lg:hidden absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
                <Link
                  to="/"
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600"
                >
                  <ChevronLeft size={20} />
                </Link>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center ${
                    isLiked ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Swipeable Image Container */}
              <div
                ref={imageContainerRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="bg-gray-50 rounded-lg overflow-hidden aspect-square relative touch-pan-y"
              >
                <img
                  src={productImages[selectedImage]}
                  alt={product.title || product.name}
                  className="w-full h-full object-contain p-8"
                />
                
                {/* Search/Zoom button - Desktop */}
                <button className="hidden lg:flex absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md items-center justify-center text-gray-600 hover:text-primary transition-colors">
                  <Search size={18} />
                </button>
              </div>

              {/* Mobile Pagination Dots */}
              <div className="flex items-center justify-center gap-2 mt-4 lg:hidden">
                {productImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      selectedImage === index ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-dark">
                {product.title || product.name}
              </h1>
              
              {/* Mobile Rating */}
              <div className="flex items-center gap-1 lg:hidden bg-gray-100 px-3 py-1 rounded-full">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
                <span className="text-sm text-gray-500">(19)</span>
              </div>
            </div>

            {/* Price & Rating */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-primary">
                ${product.price?.toFixed(2) || '119.00'}
              </span>
              
              {/* Desktop Rating */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-primary">19 Customer Review</span>
              </div>
            </div>

            {/* Short Description */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-dark mb-2">Short Description:</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {product.short_description || product.description || 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.'}
              </p>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-dark mb-3">Size:</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full border-2 font-medium text-sm transition-colors ${
                      selectedSize === size
                        ? 'border-primary text-primary bg-primary/5'
                        : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 flex-1">
                <button className="flex-1 bg-primary text-white py-3 px-6 rounded-md font-medium hover:bg-primary-dark transition-colors">
                  BUY NOW
                </button>
                <button className="flex-1 border-2 border-primary text-primary py-3 px-6 rounded-md font-medium hover:bg-primary/5 transition-colors">
                  ADD TO CART
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hidden lg:flex w-12 h-12 border-2 rounded-md items-center justify-center transition-colors ${
                    isLiked
                      ? 'border-red-500 text-red-500'
                      : 'border-gray-200 text-gray-400 hover:border-primary hover:text-primary'
                  }`}
                >
                  <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* Product Meta */}
            <div className="space-y-2 text-sm text-gray-500 mb-6">
              <p>
                <span className="text-gray-400">SKU:</span> {product.sku || '1995751877966'}
              </p>
              <p>
                <span className="text-gray-400">Categories:</span>{' '}
                <span className="text-primary">{product.category || 'Potter Plants'}</span>
              </p>
              <p>
                <span className="text-gray-400">Tags:</span>{' '}
                <span className="text-primary">Home, Garden, Plants</span>
              </p>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-dark">Share this products:</span>
              <div className="flex gap-3">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description & Reviews Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 font-medium text-sm transition-colors relative ${
                activeTab === tab.id
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-primary'
              }`}
            >
              {tab.label} {tab.id === 'reviews' && `(${comments.length || 19})`}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'description' ? (
          <div className="prose prose-sm max-w-none text-gray-500">
            <p className="mb-4">
              {product.description || 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper.'}
            </p>
            <p className="mb-4">
              Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque.
            </p>
            
            <h4 className="font-bold text-dark mt-6 mb-2">Living Room:</h4>
            <p className="mb-4">
              The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            
            <h4 className="font-bold text-dark mt-6 mb-2">Dining Room:</h4>
            <p className="mb-4">
              The benefits of houseplants are endless. In addition to cleaning the air of harmful toxins, they can help to improve your mood, reduce stress and provide you with better sleep. Fill every room of your home with houseplants and their restorative qualities will improve your life.
            </p>
            
            <h4 className="font-bold text-dark mt-6 mb-2">Office:</h4>
            <p>
              The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {(comments.length > 0 ? comments : [
              { id: 1, author: 'John Doe', rating: 5, text: 'Great plant! Exactly as described and arrived in perfect condition.', date: '2024-01-15' },
              { id: 2, author: 'Jane Smith', rating: 4, text: 'Beautiful plant, but took a bit longer to ship than expected.', date: '2024-01-10' },
              { id: 3, author: 'Mike Johnson', rating: 5, text: 'My new favorite houseplant! Highly recommend.', date: '2024-01-05' },
            ]).map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {(comment.name || comment.author || comment.user_name || 'A')[0]}
                  </div>
                  <div>
                    <h4 className="font-medium text-dark">{comment.name || comment.author || comment.user_name || 'Anonymous'}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < (comment.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">{comment.date || comment.created_at}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 ml-13">{comment.comment || comment.text || comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-bold text-primary mb-6 pb-4 border-b border-primary/20">
          Related Products
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {recommendedProducts.map((item) => (
            <Link
              key={item.id || item._id}
              to={`/product/${item.id || item._id}`}
              className="group"
            >
              <div className="bg-gray-50 rounded-lg overflow-hidden aspect-square mb-2">
                <img
                  src={item.image || item.image_url || item.main_image || 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop'}
                  alt={item.title || item.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-sm font-medium text-dark group-hover:text-primary transition-colors">
                {item.title || item.name}
              </h3>
              <p className="text-primary font-bold text-sm">
                ${item.price?.toFixed(2) || '99.00'}
              </p>
            </Link>
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button className="w-3 h-3 rounded-full bg-gray-300"></button>
          <button className="w-3 h-3 rounded-full bg-primary"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300"></button>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
