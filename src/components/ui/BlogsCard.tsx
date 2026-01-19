import type { BlogsResponse } from "../../hooks/types";

interface BlogCardProps {
  blogs: BlogsResponse[];
}

export const BlogsCard = ({ blogs }: BlogCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {blogs?.map((item) => (
        <div
          key={item.id}
          className="group flex flex-col border border-gray-100 rounded-2xl shadow-lg p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-[320px] overflow-hidden"
        >

          <div className="mb-4">
            <h2 
              className="font-bold text-xl mb-3 line-clamp-2 text-gray-800 group-hover:text-blue-600 transition-colors"
              title={item.title}
            >
              {item.title}
            </h2>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {item.author.charAt(0).toUpperCase()}
              </div>
              <span className="text-gray-600 text-sm font-medium">{item.author}</span>
            </div>
          </div>


          <div className="flex-grow overflow-hidden">
            <div 
              className="prose prose-sm max-w-none text-gray-600 line-clamp-4"
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          </div>

          <div className="pt-4 mt-auto border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">
                {new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1 transition-colors">
                Read more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};