interface Config {
  showFirst?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  showLast?: boolean;
  page?: number;
  count?: number;
  siblingCount?: number;
  boundaryCount?: number;
  onChange?: (page: number, count: number) => void;
}

interface Pagino {
  setCount(count: number): Pagino;
  setPage(page: number): Pagino;
  next(): Pagino;
  previous(): Pagino;
  first(): Pagino;
  last(): Pagino;
  getPages(): Array<number | string>;
}

declare function Pagino({
  showFirst,
  showPrevious,
  showNext,
  showLast,
  page,
  count,
  siblingCount,
  boundaryCount,
  onChange,
}?: Config): Pagino;

export default Pagino;
