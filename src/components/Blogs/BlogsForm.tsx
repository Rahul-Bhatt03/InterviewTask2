import { useState } from "react";
import type { CreateBlog } from "../../hooks/types"
import { BlogInput } from "../ui/BlogInput"
import { useCreateBlogMutation } from "../../hooks/Blogs.hooks";
import { RichTextEditor } from "../ui/TextEditor";
import { CrossIcon } from "lucide-react";

interface BlogsFormProps extends CreateBlog {
    onClose: () => void;
}

export const BlogsForm = ({ onClose }: BlogsFormProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const [createBlog, { isLoading }] = useCreateBlogMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createBlog({ title, content, author });
        onClose();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer"
                    >
                        <CrossIcon className="w-5 h-5" />
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Title</label>
                    <BlogInput value={title} onChange={setTitle} placeholder="Enter blog title" />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Content</label>
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write your article content"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Author</label>
                    <BlogInput value={author} onChange={setAuthor} placeholder="Author name" />
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {isLoading ? "Publishing..." : "Publish Blog"}
                    </button>
                </div>
            </form>
        </div>
    );
};
