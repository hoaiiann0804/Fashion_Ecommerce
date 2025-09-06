export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded hover:bg-slate-100"
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span className="text-sm text-slate-600">
          Trang {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded hover:bg-slate-100"
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
    );
  }
  