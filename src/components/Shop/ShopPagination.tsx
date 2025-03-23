import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type IShopPaginate = {
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
};

export default function ShopPagination({ page, totalPages, onPageChange }: IShopPaginate) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            // href={`?page=${Math.max(1, page - 1)}&limit=${limit}`}
            isActive={page > 1}
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) onPageChange(page - 1);
            }}
          />
        </PaginationItem>

        {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              // href={`?page=${index + 1}&limit=${limit}`}
              isActive={index + 1 === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
          className="cursor-pointer"
            // href={`?page=${Math.min(totalPages, page + 1)}&limit=${limit}`}
            isActive={page < totalPages}
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPages) onPageChange(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
