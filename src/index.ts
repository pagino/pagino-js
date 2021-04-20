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

  onChange?: (page: number, count: number) => void;
}

interface Pagino {
  setCount(count: number): Pagino;
  setPage(page: number): Pagino;
  getPages(): Array<number | string>;
}

function Pagino({
  showFirst = true,
  showPrevious = true,
  showNext = true,
  showLast = true,
  page = 1,
  count,
  siblingCount = 1,
  boundaryCount = 1,
  onChange = () => {},
}: Config = {}) {
  this.showFirst = showFirst;
  this.showPrevious = showPrevious;
  this.showNext = showNext;
  this.showLast = showLast;
  this.siblingCount = siblingCount;
  this.boundaryCount = boundaryCount;
  this.onChange = onChange;

  this.page = page;
  this.count = count;

  this.setCount = (count: number) => {
    this.count = count;

    onChange(this.page, this.count);
    return this;
  };

  this.setPage = function (page: number) {
    if (page <= 0 || page > this.count) {
      return this;
    }

    this.page = page;

    onChange(this.page, this.count);
    return this;
  };

  this.first = function () {
    this.setPage(1);

    return this;
  };

  this.last = function () {
    this.setPage(this.count);

    return this;
  };

  this.next = function () {
    this.setPage(this.page + 1);
    return this;
  };

  this.previous = function () {
    this.setPage(this.page - 1);
    return this;
  };

  this.getPages = (): Array<number | string> => {
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

    let pages = [];

    pages = pages.concat(this.showFirst ? ['first'] : []);
    pages = pages.concat(this.showPrevious ? ['previous'] : []);
    pages = pages.concat(startPages);
    pages = pages.concat(
      siblingsStart > this.boundaryCount + 2
        ? ['start-ellipsis']
        : this.boundaryCount + 1 < this.count - this.boundaryCount
        ? [this.boundaryCount + 1]
        : []
    );
    pages = pages.concat(createRange(siblingsStart, siblingsEnd));
    pages = pages.concat(
      siblingsEnd < this.count - this.boundaryCount - 1
        ? ['end-ellipsis']
        : this.count - this.boundaryCount > this.boundaryCount
        ? [this.count - this.boundaryCount]
        : []
    );
    pages = pages.concat(endPages);
    pages = pages.concat(this.showNext ? ['next'] : []);
    pages = pages.concat(this.showLast ? ['last'] : []);

    return pages;
  };
}

export default Pagino;
