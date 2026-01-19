import { useState } from "react";
import { BlogsCard } from "../components/ui/BlogsCard";
import { useGetBlogsQuery } from "../hooks/Blogs.hooks"
import { Pagination } from "../components/table/Pagination";
import { PlusIcon } from "lucide-react";
import { BlogsForm } from "../components/Blogs/BlogsForm";

export const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const itemsPerPage = 6;

    const { data: blogsData = [], isFetching } = useGetBlogsQuery({
        page: currentPage,
        limit: itemsPerPage,
    });

    const totalItems = 50; // total blogs in MockAPI
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>

            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <>
                    <BlogsCard blogs={blogsData} />
                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="fixed bottom-8 right-8 flex items-center justify-center bg-blue-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        <PlusIcon size={24} />
                    </button>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setCurrentPage(page)}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                    />
                </>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-start sm:items-center pt-20 sm:pt-0 z-50 bg-transparent bg-opacity-50 overflow-auto">
                    <div className="w-full sm:w-[90%] md:w-4/5 lg:w-2/4 max-w-4xl mt-8 sm:mt-0 mb-8 sm:mb-0">
                        <BlogsForm
                            title=""
                            content=""
                            author=""
                            onClose={() => setIsModalOpen(false)}
                        />
                    </div>
                </div>
            )}


        </div>
    );
};