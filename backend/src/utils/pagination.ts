export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export const getPagination = (
  page = 1,
  limit = 10
) => {
  const currentPage = Math.max(Number(page), 1);
  const perPage = Math.max(Number(limit), 1);

  return {
    skip: (currentPage - 1) * perPage,
    take: perPage,
    page: currentPage,
    limit: perPage,
  };
};

export const getPaginationMeta = (
  total: number,
  page: number,
  limit: number
) => ({
  total,
  page,
  limit,
  totalPages: Math.ceil(total / limit),
  hasNext: page * limit < total,
  hasPrevious: page > 1,
});
