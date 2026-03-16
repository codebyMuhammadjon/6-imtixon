import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import BlogCard from '../components/BlogCard'
import { fetchProducts, fetchCategories } from '../services/api'

function Home() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [activeTab, setActiveTab] = useState('All Plants')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [priceRange, setPriceRange] = useState([39, 1230])

  const tabs = ['All Plants', 'New Arrivals', 'Sale']

  const blogs = [
    {
      id: 1,
      title: 'Cactus & Succulent Care Tips',
      description: 'Cacti are succulents are easy care plants for any home or patio.',
      date: 'September 12',
      readTime: 6,
      image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: 'Top 10 Succulents for Your Home',
      description: 'Best in hanging baskets. Prefers medium to high light.',
      date: 'September 13',
      readTime: 2,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: 'Cacti & Succulent Care Tips',
      description: 'Cacti and succulents thrive in containers and because most are..',
      date: 'September 15',
      readTime: 3,
      image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=400&h=300&fit=crop',
    },
    {
      id: 4,
      title: 'Best Houseplants Room By Room',
      description: 'The benefits of houseplants are endless. In addition to..',
      date: 'September 15',
      readTime: 2,
      image: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=300&fit=crop',
    },
  ]

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [currentPage, selectedCategory])

  const loadProducts = async () => {
    setLoading(true)
    const data = await fetchProducts(currentPage, 9, selectedCategory)
    setProducts(data.data || data.products || [])
    setTotalPages(Math.ceil((data.total || data.totalCount || 9) / 9))
    setLoading(false)
  }

  const loadCategories = async () => {
    const data = await fetchCategories()
    setCategories(data.data || data || [])
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              <p className="text-sm font-medium text-dark tracking-wider mb-2">
                WELCOME TO GREENSHOP
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark mb-4">
                LET'S MAKE A<br />
                BETTER <span className="text-primary">PLANET</span>
              </h1>
              <p className="text-gray-500 mb-6 max-w-md mx-auto lg:mx-0">
                We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plants!
              </p>
              <button className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">
                SHOP NOW
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="flex-1 relative">
              <img
                src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=500&fit=crop"
                alt="Hero plant"
                className="w-full max-w-lg mx-auto"
              />
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=150&h=150&fit=crop"
                alt="Small plant"
                className="absolute bottom-0 left-0 w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg shadow-lg hidden sm:block"
              />
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button className="w-3 h-3 rounded-full bg-primary"></button>
            <button className="w-3 h-3 rounded-full bg-primary/30 hover:bg-primary/50 transition-colors"></button>
            <button className="w-3 h-3 rounded-full bg-primary/30 hover:bg-primary/50 transition-colors"></button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-dark mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id || category._id}>
                      <button
                        onClick={() => handleCategoryClick(category.id || category._id)}
                        className={`flex items-center justify-between w-full text-sm py-1 transition-colors ${
                          selectedCategory === (category.id || category._id)
                            ? 'text-primary font-bold'
                            : 'text-gray-600 hover:text-primary'
                        }`}
                      >
                        <span>{category.title || category.name}</span>
                        <span className="text-gray-400">({category.count || category.product_count || 0})</span>
                      </button>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-center justify-between text-sm text-primary font-bold">
                      <span>House Plants</span>
                      <span className="text-gray-400">(33)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Potter Plants</span>
                      <span className="text-gray-400">(12)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Seeds</span>
                      <span className="text-gray-400">(65)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Small Plants</span>
                      <span className="text-gray-400">(39)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Big Plants</span>
                      <span className="text-gray-400">(23)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Succulents</span>
                      <span className="text-gray-400">(17)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Terrariums</span>
                      <span className="text-gray-400">(19)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Gardening</span>
                      <span className="text-gray-400">(13)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                      <span>Accessories</span>
                      <span className="text-gray-400">(18)</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-dark mb-4">Price Range</h3>
              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="1500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>
              <p className="text-sm text-dark mb-3">
                Price: <span className="text-primary font-medium">${priceRange[0]} - ${priceRange[1]}</span>
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors">
                Filter
              </button>
            </div>

            {/* Size */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-dark mb-4">Size</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                  <span>Small</span>
                  <span className="text-gray-400">(119)</span>
                </li>
                <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                  <span>Medium</span>
                  <span className="text-gray-400">(86)</span>
                </li>
                <li className="flex items-center justify-between text-sm text-gray-600 hover:text-primary cursor-pointer">
                  <span>Large</span>
                  <span className="text-gray-400">(78)</span>
                </li>
              </ul>
            </div>

            {/* Super Sale Banner */}
            <div className="bg-primary/10 rounded-lg p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>
              <h3 className="text-2xl font-black text-primary mb-2">Super Sale</h3>
              <p className="text-dark font-bold mb-4">UP TO 75% OFF</p>
              <img
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200&h=250&fit=crop"
                alt="Sale plant"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                      activeTab === tab
                        ? 'text-primary border-primary'
                        : 'text-gray-500 border-transparent hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Short by:</span>
                <select className="border-none bg-transparent font-medium text-dark focus:outline-none cursor-pointer">
                  <option>Default sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-100 rounded-lg aspect-square mb-3"></div>
                    <div className="h-4 bg-gray-100 rounded mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {[...Array(Math.min(4, totalPages))].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded font-medium text-sm transition-colors ${
                    currentPage === i + 1
                      ? 'bg-primary text-white'
                      : 'border border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:border-primary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-50 rounded-lg p-6 lg:p-8 flex items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200&h=200&fit=crop"
                alt="Summer cactus"
                className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-dark mb-2">
                SUMMER CACTUS<br />& SUCCULENTS
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                We are an online plant shop offering a wide range of cheap and trendy plants
              </p>
              <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors">
                Find More
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50 rounded-lg p-6 lg:p-8 flex items-center gap-6">
            <div className="flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=200&h=200&fit=crop"
                alt="Styling trends"
                className="w-32 h-32 lg:w-40 lg:h-40 object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-lg lg:text-xl font-bold text-dark mb-2">
                STYLING TRENDS<br />& MUCH MORE
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                We are an online plant shop offering a wide range of cheap and trendy plants
              </p>
              <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors">
                Find More
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-dark mb-2">Our Blog Posts</h2>
          <p className="text-gray-500">
            We are an online plant shop offering a wide range of cheap and trendy plants.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
