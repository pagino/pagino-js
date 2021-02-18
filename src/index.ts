const { min, max } = Math;

const createRange = (start: number, end: number): Array<number> => {
  const length: number = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const createStartPages = (
  boundaryCount: number,
  count: number
): Array<number> => createRange(1, min(boundaryCount, count));

const createEndPages = (boundaryCount: number, count: number): Array<number> =>
  createRange(max(count - boundaryCount + 1, boundaryCount + 1), count);

const createSiblingsStart = (
  boundaryCount: number,
  count: number,
  page: number,
  siblingCount: number
): number =>
  max(
    min(page - siblingCount, count - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );

const createSiblingsEnd = (
  boundaryCount: number,
  count: number,
  page: number,
  siblingCount: number,
  endPages: Array<number>
): number =>
  min(
    max(page + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

interface Config {
  showFirst?: boolean;
  showPrevious?: boolean;
  showNext?: boolean;
  showLast?: boolean;

  page?: number;
  count?: number;
  siblingCount?: number;
  boundaryCount?: number;
}

class Pagino {
  page: number;
  count: number;
  siblingCount: number;
  boundaryCount: number;

  showFirst: boolean = true;
  showPrevious: boolean = true;
  showNext: boolean = true;
  showLast: boolean = true;

  constructor({
    showFirst = true,
    showPrevious = true,
    showNext = true,
    showLast = true,
    siblingCount = 1,
    boundaryCount = 1,
  }: Config = {}) {
    this.showFirst = showFirst;
    this.showPrevious = showPrevious;
    this.showNext = showNext;
    this.showLast = showLast;
    this.siblingCount = siblingCount;
    this.boundaryCount = boundaryCount;
  }

  setCount(count: number) {
    this.count = count;
    return this;
  }

  setPage(page: number) {
    if (page <= 0 || page > this.count) {
      return this;
    }

    this.page = page;
    return this;
  }

  getPages(): Array<number | string> {
    const startPages = createStartPages(this.boundaryCount, this.count);
    const endPages = createEndPages(this.boundaryCount, this.count);

    const siblingsStart = createSiblingsStart(
      this.boundaryCount,
      this.count,
      this.page,
      this.siblingCount
    );

    const siblingsEnd = createSiblingsEnd(
      this.boundaryCount,
      this.count,
      this.page,
      this.siblingCount,
      endPages
    );

    return [
      ...(this.showFirst ? ['first'] : []),
      ...(this.showPrevious ? ['previous'] : []),
      ...startPages,

      // Start ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsStart > this.boundaryCount + 2
        ? ['start-ellipsis']
        : this.boundaryCount + 1 < this.count - this.boundaryCount
        ? [this.boundaryCount + 1]
        : []),

      // Sibling pages
      ...createRange(siblingsStart, siblingsEnd),

      // End ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsEnd < this.count - this.boundaryCount - 1
        ? ['end-ellipsis']
        : this.count - this.boundaryCount > this.boundaryCount
        ? [this.count - this.boundaryCount]
        : []),

      ...endPages,
      ...(this.showNext ? ['next'] : []),
      ...(this.showLast ? ['last'] : []),
    ];
  }
}

export default Pagino;
