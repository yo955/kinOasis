const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
  
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  
    return (
      <div className="flex justify-center space-x-4 mt-5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded ${
              page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };
  
  export default Pagination;
  