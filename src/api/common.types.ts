export interface ISort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface IPageable {
  offset: number
  pageNumber: number,
  pageSize: number,
  paged: boolean,
  sort: ISort,
  unpaged: boolean,
}

export interface IPage<TContentItem> {
  content: TContentItem[]
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: IPageable;
  size: number;
  sort:	ISort;
  totalElements: number;
  totalPages: number;
}