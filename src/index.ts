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

class Pagino {
  private showFirst: boolean;
  private showPrevious: boolean;
  private showNext: boolean;
  private showLast: boolean;
  private siblingCount: number;
  private boundaryCount: number;
  private onChange: (page: number, count: number) => void;
  private page: number;
  private count: number | undefined;

  constructor({
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
  }

  setCount(count: number): Pagino {
    if (count <= 0) {
      console.warn('Count must be a positive number');
      return this;
    }
    this.count = count;
    this.onChange(this.page, this.count);
    return this;
  }

  setPage(page: number): Pagino {
    if (!this.count || page <= 0 || page > this.count) {
      return this;
    }
    this.page = page;
    this.onChange(this.page, this.count);
    return this;
  }

  first(): Pagino {
    this.setPage(1);
    return this;
  }

  last(): Pagino {
    this.setPage(this.count!);
    return this;
  }

  next(): Pagino {
    this.setPage(this.page + 1);
    return this;
  }

  previous(): Pagino {
    this.setPage(this.page - 1);
    return this;
  }

  getPages(): Array<number | string> {
    if (!this.count) {
      return [];
    }

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

    const pages: Array<number | string> = [];

    this.addIfCondition(pages, this.showFirst, 'first');
    this.addIfCondition(pages, this.showPrevious, 'previous');
    pages.push(...startPages);

    if (siblingsStart > this.boundaryCount + 2) {
      pages.push('start-ellipsis');
    } else if (
      this.boundaryCount + 1 < this.count - this.boundaryCount
    ) {
      pages.push(this.boundaryCount + 1);
    }

    pages.push(...createRange(siblingsStart, siblingsEnd));

    if (siblingsEnd < this.count - this.boundaryCount - 1) {
      pages.push('end-ellipsis');
    } else if (this.count - this.boundaryCount > this.boundaryCount) {
      pages.push(this.count - this.boundaryCount);
    }

    pages.push(...endPages);
    this.addIfCondition(pages, this.showNext, 'next');
    this.addIfCondition(pages, this.showLast, 'last');

    return pages;
  }

  private addIfCondition(
    pages: Array<number | string>,
    condition: boolean,
    value: string
  ): void {
    if (condition) {
      pages.push(value);
    }
  }
}

export default Pagino;
