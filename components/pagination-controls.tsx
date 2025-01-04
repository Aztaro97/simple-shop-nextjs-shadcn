'use client';

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	disabled?: boolean;
	createPageUrl: (page: number) => string;
}

export function PaginationControls({
	currentPage,
	totalPages,
	onPageChange,
	disabled,
	createPageUrl
}: PaginationControlsProps) {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	
	const visiblePages = pages.filter(page => {
		if (page === 1 || page === totalPages) return true;
		if (page >= currentPage - 1 && page <= currentPage + 1) return true;
		return false;
	});

	const handlePageClick = (e: React.MouseEvent, page: number) => {
		e.preventDefault();
		if (disabled || page < 1 || page > totalPages) return;
		onPageChange(page);
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={createPageUrl(currentPage - 1)}
						onClick={(e) => handlePageClick(e, currentPage - 1)}
						className={cn(
							disabled || currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
						)}
						aria-disabled={disabled || currentPage <= 1}
					/>
				</PaginationItem>
				
				{visiblePages.map((page, index) => {
					if (index > 0 && page - visiblePages[index - 1] > 1) {
						return (
							<PaginationItem key={`ellipsis-${page}`}>
								<PaginationEllipsis />
							</PaginationItem>
						);
					}
					
					return (
						<PaginationItem key={page}>
							<PaginationLink
								href={createPageUrl(page)}
								isActive={page === currentPage}
								onClick={(e) => handlePageClick(e, page)}
								className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
								aria-disabled={disabled}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<PaginationNext
						href={createPageUrl(currentPage + 1)}
						onClick={(e) => handlePageClick(e, currentPage + 1)}
						className={cn(
							disabled || currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
						)}
						aria-disabled={disabled || currentPage >= totalPages}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}