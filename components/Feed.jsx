"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";

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

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout h-full">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const { data: session } = useSession();

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    if (!searchValue) {
      setFilteredPosts(posts);
    } else {
      const filteredSearch = posts.filter(
        (p) =>
          p.prompt.toLowerCase().includes(searchValue) ||
          p.tag.toLowerCase().includes(searchValue) ||
          p.creator?.username.toLowerCase().includes(searchValue)
      );
      setFilteredPosts(filteredSearch);
    }
    setCurrentPage(1);
  };

  const paginatePosts = (posts, pageNumber, postsPerPage) => {
    const startIndex = (pageNumber - 1) * postsPerPage;
    return posts.slice(startIndex, startIndex + postsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchposts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
      setFilteredPosts(data);
    };

    fetchposts();
  }, []);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const paginatedPosts = paginatePosts(
    filteredPosts,
    currentPage,
    postsPerPage
  );

  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={paginatedPosts} handleTagClick={() => {}} />

      {totalPages > 1 && (
        <div className="pagination flex justify-center items-center mt-8 space-x-2">
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
    </section>
  );
};

export default Feed;
