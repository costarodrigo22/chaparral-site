import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../pagination';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={''}
            onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={''}
            onClick={() => handlePageChange(1)}
            className={currentPage === 1 ? 'font-bold text-blue-500' : ''}
          >
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage > 3 && <PaginationEllipsis />}
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          const isNearCurrent =
            page === currentPage ||
            page === currentPage - 1 ||
            page === currentPage + 1;

          if (isNearCurrent && page !== 1 && page !== totalPages) {
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={''}
                  onClick={() => handlePageChange(page)}
                  className={
                    page === currentPage ? 'font-bold text-blue-500' : ''
                  }
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          }
          return null;
        })}
        {currentPage < totalPages - 2 && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationLink
            href={''}
            onClick={() => handlePageChange(totalPages)}
            className={
              currentPage === totalPages ? 'font-bold text-blue-500' : ''
            }
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href={''}
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
