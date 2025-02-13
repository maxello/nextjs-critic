'use client';

import {
  Pagination as PaginationWrapper,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from "./ui/button";

export default function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const allPages = generatePagination(currentPage, totalPages);
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <>
      {totalPages > 1 && (
        <PaginationWrapper>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={createPageURL(currentPage - 1)}
                aria-disabled={currentPage <= 1}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
            {allPages.map((page: number | string, index: number) => {
              let position: 'first' | 'last' | 'single' | 'middle' | undefined;

              if (index === 0) position = 'first';
              if (index === allPages.length - 1) position = 'last';
              if (allPages.length === 1) position = 'single';
              if (page === '...') position = 'middle';

              return (
                <PaginationNumber
                  key={page}
                  href={createPageURL(page)}
                  page={page}
                  position={position}
                  isActive={currentPage === page}
                />
              );
            })}

            <PaginationItem>
              <PaginationNext
                href={createPageURL(currentPage + 1)}
                aria-disabled={currentPage >= totalPages}
                className={
                  currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                }
              />
            </PaginationItem>
          </PaginationContent>
        </PaginationWrapper>
      )}
    </>
  );
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string;
  href: string;
  position?: 'first' | 'last' | 'middle' | 'single';
  isActive: boolean;
}) {
  return isActive || position === 'middle' ? (
    <PaginationItem>
      <Button className="pointer-events-none">{page}</Button>
    </PaginationItem>
  ) : (
    <PaginationItem>
      <PaginationLink href={href}>{page}</PaginationLink>
    </PaginationItem>
  );
}
