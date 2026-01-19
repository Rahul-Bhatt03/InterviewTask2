import { useState, useEffect } from "react";
import { BlogInput } from "../ui/BlogInput"
import { useCreateBlogMutation, useUpdateBlogMutation } from "../../hooks/Blogs.hooks";
import { RichTextEditor } from "../ui/TextEditor";
import { X } from "lucide-react";

interface BlogsFormProps {
    mode?: "create" | "edit";
    initialData?: {
        id: string;
        title: string;
        content: string;
        author: string;
    };
    onClose: () => void;
}

export const BlogsForm = ({ 
    mode = "create", 
    initialData, 
    onClose 
}: BlogsFormProps) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState("");

    const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();

    const isLoading = isCreating || isUpdating;

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title);
            setContent(initialData.content);
            setAuthor(initialData.author);
        }
    }, [mode, initialData]);

    const validateForm = (): boolean => {
        if (!title.trim()) {
            setError("Title is required");
            return false;
        }
        if (!content.trim()) {
            setError("Content is required");
            return false;
        }
        if (!author.trim()) {
            setError("Author is required");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const blogData = { title, content, author };

            if (mode === "create") {
                await createBlog(blogData).unwrap();
            } else if (mode === "edit" && initialData) {
                await updateBlog({
                    id: Number(initialData.id),
                    data: blogData
                }).unwrap();
            }

            onClose();
        } catch (err) {
            console.error("Error:", err);
            setError("Failed to save blog. Please try again.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-linear-to-br from-gray-50 to-white rounded-2xl shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {mode === "create" ? "Create New Blog" : "Edit Blog"}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1 rounded hover:bg-gray-100 cursor-pointer transition-colors"
                        aria-label="Close form"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                )}

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                    </label>
                    <BlogInput 
                        value={title} 
                        onChange={setTitle} 
                        placeholder="Enter blog title"
                        // disabled={isLoading}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Content
                    </label>
                    <RichTextEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write your article content"
                    />
                </div>


                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Author
                    </label>
                    <BlogInput 
                        value={author} 
                        onChange={setAuthor} 
                        placeholder="Author name"
                        // disabled={isLoading}
                    />
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <span className="animate-spin">⏳</span>
                                {mode === "create" ? "Publishing..." : "Updating..."}
                            </span>
                        ) : (
                            mode === "create" ? "Publish Blog" : "Update Blog"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};