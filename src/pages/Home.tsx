import { useState, useEffect, useCallback } from "react";
import { BlogsCard } from "../components/ui/BlogsCard";
import { useGetBlogsQuery } from "../hooks/Blogs.hooks";
import { Pagination } from "../components/table/Pagination";
import { PlusIcon, PenSquare } from "lucide-react";
import { BlogsForm } from "../components/Blogs/BlogsForm";
import { Filter } from "../components/ui/Filters";
import type { BlogsResponse } from "../hooks/types";

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredBlogs, setFilteredBlogs] = useState<BlogsResponse[]>([]);
    const [allBlogs, setAllBlogs] = useState<BlogsResponse[]>([]);
    const itemsPerPage = 8;

    // Fetch ALL data
    const { data: fetchedBlogs = [], isFetching, isLoading } = useGetBlogsQuery({
        page: 1,
        limit: 100,
    });

    useEffect(() => {
        if (fetchedBlogs && Array.isArray(fetchedBlogs) && fetchedBlogs.length > 0) {
            setAllBlogs(fetchedBlogs);
            setFilteredBlogs(fetchedBlogs);
            setCurrentPage(1);
        }
    }, [fetchedBlogs]);

    const handleFilterChange = useCallback((filteredData: BlogsResponse[]) => {
        setFilteredBlogs(filteredData);
        setCurrentPage(1); 
    }, []);

    const totalItems = filteredBlogs.length;
    const totalPages = totalItems > 0 ? Math.ceil(totalItems / itemsPerPage) : 0;
    const validCurrentPage = Math.min(currentPage, totalPages) || 1;

    const startIndex = (validCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredBlogs.slice(startIndex, endIndex);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
            <header className="max-w-7xl mx-auto mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                            Blog<span className="text-blue-600">.</span>Space
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Thoughts, stories and ideas from our community
                        </p>
                    </div>
                    <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all duration-300 self-start md:self-auto">
                        <PenSquare size={20} />
                        Write a story
                    </button>
                </div>

                {!isLoading && allBlogs.length > 0 && (
                    <div className="mb-8">
                        <Filter 
                            data={allBlogs}
                            onFilterChange={handleFilterChange} 
                        />
                    </div>
                )}

                <div className="flex flex-wrap gap-6 mb-8">
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-gray-500 text-sm">Total Posts</p>
                        <p className="text-2xl font-bold text-gray-800">{allBlogs.length}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-gray-500 text-sm">Showing</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {filteredBlogs.length}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                        <p className="text-gray-500 text-sm">This Page</p>
                        <p className="text-2xl font-bold text-gray-800">
                            {paginatedData.length}
                        </p>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto">
                {isLoading || isFetching ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-100 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                        </div>
                    </div>
                ) : paginatedData.length > 0 ? (
                    <>
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                {filteredBlogs.length < allBlogs.length ? "Filtered Stories" : "Latest Stories"}
                                {filteredBlogs.length < allBlogs.length && (
                                    <span className="text-blue-600 text-lg ml-2">
                                        ({filteredBlogs.length} results)
                                    </span>
                                )}
                            </h2>
                            <BlogsCard 
                                blogs={paginatedData}
                                onBlogUpdated={() => {
                                }}
                            />
                        </div>

                        {totalPages > 1 && (
                            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                                <Pagination
                                    currentPage={validCurrentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={totalItems}
                                />
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <p className="text-gray-600 text-lg font-medium">
                                {allBlogs.length === 0 ? "No blogs available" : "No blogs found"}
                            </p>
                            <p className="text-gray-500 text-sm mt-2">
                                {allBlogs.length === 0 ? "Check back soon!" : "Try adjusting your filters"}
                            </p>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setIsModalOpen(!isModalOpen)}
                    className="fixed bottom-8 right-8 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full w-16 h-16 shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 group"
                    aria-label="Create new post"
                >
                    <PlusIcon size={28} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </main>

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 p-4">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl animate-fadeIn">
                        <div className="p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl">
                            <div className="bg-white rounded-t-xl p-8">
                                <BlogsForm
                                    mode="create"
                                    onClose={() => setIsModalOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};