import { ArrowRight } from 'lucide-react'

function BlogCard({ blog }) {
  return (
    <div className="group cursor-pointer">
      {/* Blog Image */}
      <div className="relative rounded-lg overflow-hidden mb-3 aspect-[4/3]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Blog Info */}
      <div className="flex items-center gap-2 text-primary text-sm mb-2">
        <span>{blog.date}</span>
        <span>|</span>
        <span>Read in {blog.readTime} minutes</span>
      </div>

      <h3 className="text-lg font-bold text-dark mb-2 group-hover:text-primary transition-colors">
        {blog.title}
      </h3>

      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
        {blog.description}
      </p>

      <button className="flex items-center gap-2 text-dark font-medium text-sm hover:text-primary transition-colors">
        Read More
        <ArrowRight size={16} />
      </button>
    </div>
  )
}

export default BlogCard
