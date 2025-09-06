import React from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "../../components/ui/Panigation";

 const ProductsPagination = ({ currentPage, setCurrentPage, totalPages, productsPerPage = 10, totalProducts }) => {
  if (!totalProducts || totalPages <= 1) {
    return null;
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (endPage - startPage < 4) {
      if (startPage === 1) {
        endPage = Math.min(5, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - 4);
      }
    }

    if (startPage > 1) {
      pageNumbers.push(
        <PaginationItem key="first">
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(1)}
            className={1 === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            className={i === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <PaginationItem key="last">
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(totalPages)}
            className={totalPages === currentPage ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : ""}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">
          Hiển thị {Math.min(currentPage * productsPerPage, totalProducts) - productsPerPage + 1} - {Math.min(currentPage * productsPerPage, totalProducts)} trên tổng số {totalProducts} sản phẩm
        </div>
        <div className="text-sm">
          Trang {currentPage} / {totalPages}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={handlePrevious}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {renderPageNumbers()}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={handleNext}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
export default ProductsPagination;