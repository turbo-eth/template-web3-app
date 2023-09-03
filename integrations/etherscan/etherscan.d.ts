interface BlockPagination {
  chainId?: number
  startblock?: number
  endblock?: number
  sort?: "asc" | "desc"
  page?: number
  offset?: number
}
