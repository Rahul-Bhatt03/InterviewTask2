import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import type { BlogsResponse } from "../../hooks/types";
import { useDeleteBlogMutation } from "../../hooks/Blogs.hooks";
import { BlogsForm } from "../Blogs/BlogsForm";

interface BlogCardProps {
  blogs: BlogsResponse[];
  onBlogUpdated?: () => void;
}

export const BlogsCard = ({ blogs, onBlogUpdated }: BlogCardProps) => {
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [deleteBlog, { isLoading: isDeleting }] = useDeleteBlogMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await deleteBlog(Number(id)).unwrap();
        onBlogUpdated?.();
      } catch (error) {
        console.error("Failed to delete blog:", error);
        alert("Failed to delete blog. Please try again.");
      }
    }
  };

  const blogToEdit = editingBlogId ? blogs.find(b => b.id === editingBlogId) : null;

  return (
    <>
      {editingBlogId && blogToEdit ? (
        <div className="fixed inset-0 flex justify-center items-center z-50 p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <BlogsForm
              mode="edit"
              initialData={{
                id: blogToEdit.id,
                title: blogToEdit.title,
                content: blogToEdit.content,
                author: blogToEdit.author,
              }}
              onClose={() => {
                setEditingBlogId(null);
                onBlogUpdated?.();
              }}
            />
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {blogs?.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col border border-gray-100 rounded-2xl shadow-lg p-6 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-[320px] overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
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

              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => setEditingBlogId(item.id)}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0"
                  title="Edit blog"
                  aria-label="Edit blog"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={isDeleting}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Delete blog"
                  aria-label="Delete blog"
                >
                  <Trash2 size={16} />
                </button>
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
    </>
  );
};