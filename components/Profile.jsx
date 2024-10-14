import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const getPaginationRange = (currentPage, totalPages) => {
  const delta = 2;
  const range = [];
  const startPage = Math.max(2, currentPage - delta);
  const endPage = Math.min(totalPages - 1, currentPage + delta);

  for (let i = startPage; i <= endPage; i++) {
    range.push(i);
  }

  return range;
};

const paginatePosts = (posts, pageNumber, postsPerPage) => {
  const startIndex = (pageNumber - 1) * postsPerPage;
  return posts.slice(startIndex, startIndex + postsPerPage);
};

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const totalPages = Math.ceil(data.length / postsPerPage);
  const paginatedPosts = paginatePosts(data, currentPage, postsPerPage);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_container ">
        {totalPages > 1 && (
        <div className="pagination flex justify-center items-center mt-5 space-x-2">
          <button
            className={`pagination_button px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            className={`pagination_button px-4 py-2 rounded-lg ${
              currentPage === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>

          {currentPage > 3 && <span className="px-2">...</span>}

          {paginationRange.map((page) => (
            <button
              key={page}
              className={`pagination_button px-4 py-2 rounded-lg ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && <span className="px-2">...</span>}

          {totalPages > 1 && (
            <button
              className={`pagination_button px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          )}

          <button
            className={`pagination_button px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500"
                : "bg-blue-500 text-white"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      <div className="prompt_layout">
        {paginatedPosts.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
      </div>
      
    </section>
  );
};

export default Profile;
