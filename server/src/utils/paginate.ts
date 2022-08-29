export const paginate = (page: number) => {
  const currentPage = page <= 0 ? 1 : page;
  return 10 * (currentPage - 1);
};
