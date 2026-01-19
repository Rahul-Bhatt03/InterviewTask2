import type { BlogsResponse } from "../../hooks/types";

interface BlogCardProps {
  blogs: BlogsResponse[];
}

export const BlogsCard = ({ blogs }: BlogCardProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {blogs?.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between border rounded-lg shadow-md p-4 bg-white h-64 hover:shadow-xl transition-all"
        >

          <h2 className="font-semibold text-lg mb-2 truncate" title={item.title}>
            {item.title}
          </h2>

         <div
            className="prose max-w-full mb-2"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          {/* Author & Date */}
          <div className="text-gray-500 text-xs flex justify-between mt-auto">
            <span className="truncate">{item.author}</span>
            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
