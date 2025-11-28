import Pagino from './index';

const expects = [
  {
    input: { count: 1, page: 1 },
    output: ['first', 'previous', 1, 'next', 'last'],
  },
  {
    input: { count: 2, page: 1 },
    output: ['first', 'previous', 1, 2, 'next', 'last'],
  },
  {
    input: { count: 3, page: 1 },
    output: ['first', 'previous', 1, 2, 3, 'next', 'last'],
  },
  {
    input: { count: 4, page: 1 },
    output: ['first', 'previous', 1, 2, 3, 4, 'next', 'last'],
  },
  {
    input: { count: 5, page: 1 },
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'next', 'last'],
  },
  {
    input: { count: 6, page: 1 },
    output: ['first', 'previous', 1, 2, 3, 4, 5, 6, 'next', 'last'],
  },
  {
    input: { count: 7, page: 1 },
    output: ['first', 'previous', 1, 2, 3, 4, 5, 6, 7, 'next', 'last'],
  },
  {
    input: { count: 8, page: 1 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 8, 'next', 'last'],
  },
  {
    input: { count: 9, page: 1 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 9, 'next', 'last'],
  },
  {
    input: { count: 10, page: 1 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 2 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 3 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 4 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 5 },
    //prettier-ignore
    output: ['first', 'previous', 1,'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 6 },
    //prettier-ignore
    output: ['first', 'previous', 1,'start-ellipsis', 5, 6, 7, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 7 },
    //prettier-ignore
    output: ['first', 'previous', 1,'start-ellipsis', 6, 7, 8, 9, 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 8 },
    //prettier-ignore
    output: ['first', 'previous', 1,'start-ellipsis', 6, 7, 8, 9, 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 9 },
    //prettier-ignore
    output: ['first', 'previous', 1,'start-ellipsis', 6, 7, 8, 9, 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 10 },
    //prettier-ignore
    output: ['first', 'previous', 1,'start-ellipsis', 6, 7, 8, 9, 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 0 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last'],
  },
  {
    input: { count: 10, page: 11 },
    //prettier-ignore
    output: ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last'],
  },
];

expects.forEach(({ input, output }) => {
  test(`Test count ${input.count} page ${input.page}`, () => {
    const pagino = new Pagino();
    expect(pagino.setCount(input.count).setPage(input.page).getPages()).toEqual(
      output
    );
  });
});

test(`Test next and previous method`, () => {
  const pagino = new Pagino();
  pagino.setCount(15).setPage(1);

  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 15, 'next', 'last']
  );

  pagino.previous();
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 15, 'next', 'last']
  );

  pagino.next().next().next().next();
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1,'start-ellipsis', 4, 5, 6, 'end-ellipsis', 15, 'next', 'last']
  );

  pagino.setPage(14).next().next();
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1,'start-ellipsis', 11, 12, 13, 14, 15, 'next', 'last']
  );

  pagino.previous().previous().previous().previous().previous().previous();
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1,'start-ellipsis', 8, 9, 10, 'end-ellipsis', 15, 'next', 'last']
  );
});

test(`Test first and last method`, () => {
  const pagino = new Pagino();
  pagino.setCount(15).setPage(1);

  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 15, 'next', 'last']
  );

  pagino.last();
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1,'start-ellipsis', 11, 12, 13, 14, 15, 'next', 'last']
  );

  pagino.first();
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 15, 'next', 'last']
  );
});

test(`Test onChange method`, () => {
  let expectedPage, expectedCount;

  const pagino = new Pagino({
    onChange: (page, count) => {
      expectedPage = page;
      expectedCount = count;
    },
  });

  pagino.setCount(30).setPage(1);

  pagino.next();
  expect(expectedPage).toBe(2);
  expect(expectedCount).toBe(30);

  pagino.previous();
  expect(expectedPage).toBe(1);

  pagino.setCount(40);
  expect(expectedCount).toBe(40);
});

test(`Test configuration: showFirst option`, () => {
  const pagino = new Pagino({
    showFirst: false,
  });
  pagino.setCount(10).setPage(1);

  const pages = pagino.getPages();
  expect(pages).not.toContain('first');
  expect(pages).toContain('previous');
});

test(`Test configuration: showPrevious option`, () => {
  const pagino = new Pagino({
    showPrevious: false,
  });
  pagino.setCount(10).setPage(1);

  const pages = pagino.getPages();
  expect(pages).not.toContain('previous');
  expect(pages).toContain('first');
});

test(`Test configuration: showNext option`, () => {
  const pagino = new Pagino({
    showNext: false,
  });
  pagino.setCount(10).setPage(5);

  const pages = pagino.getPages();
  expect(pages).not.toContain('next');
  expect(pages).toContain('last');
});

test(`Test configuration: showLast option`, () => {
  const pagino = new Pagino({
    showLast: false,
  });
  pagino.setCount(10).setPage(5);

  const pages = pagino.getPages();
  expect(pages).not.toContain('last');
  expect(pages).toContain('next');
});

test(`Test configuration: all navigation buttons disabled`, () => {
  const pagino = new Pagino({
    showFirst: false,
    showPrevious: false,
    showNext: false,
    showLast: false,
  });
  pagino.setCount(10).setPage(5);

  const pages = pagino.getPages();
  expect(pages).not.toContain('first');
  expect(pages).not.toContain('previous');
  expect(pages).not.toContain('next');
  expect(pages).not.toContain('last');
  expect(pages).toEqual([1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10]);
});

test(`Test configuration: initial page via config`, () => {
  const pagino = new Pagino({
    page: 5,
    count: 10,
  });

  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10, 'next', 'last']
  );
});

test(`Test configuration: custom siblingCount`, () => {
  const pagino = new Pagino({
    siblingCount: 2,
  });
  pagino.setCount(10).setPage(5);

  // With siblingCount: 2, should show 2 pages on each side of current page
  const pages = pagino.getPages();
  expect(pages).toContain(3);
  expect(pages).toContain(4);
  expect(pages).toContain(5);
  expect(pages).toContain(6);
  expect(pages).toContain(7);
});

test(`Test configuration: custom boundaryCount`, () => {
  const pagino = new Pagino({
    boundaryCount: 2,
  });
  pagino.setCount(10).setPage(5);

  const pages = pagino.getPages();
  // With boundaryCount: 2, should show first 2 and last 2 pages
  expect(pages).toContain(1);
  expect(pages).toContain(2);
  expect(pages).toContain(9);
  expect(pages).toContain(10);
});

test(`Test edge case: count is 1`, () => {
  const pagino = new Pagino();
  pagino.setCount(1).setPage(1);

  const pages = pagino.getPages();
  expect(pages).toEqual(['first', 'previous', 1, 'next', 'last']);
});

test(`Test edge case: getPages without setCount`, () => {
  const pagino = new Pagino();

  const pages = pagino.getPages();
  expect(pages).toEqual([]);
});

test(`Test edge case: setPage without setCount`, () => {
  const pagino = new Pagino();

  const result = pagino.setPage(1);
  expect(result).toBe(pagino);
});

test(`Test edge case: invalid setCount (negative)`, () => {
  const pagino = new Pagino();
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

  pagino.setCount(-5);
  expect(consoleSpy).toHaveBeenCalledWith('Count must be a positive number');

  consoleSpy.mockRestore();
});

test(`Test edge case: invalid setCount (zero)`, () => {
  const pagino = new Pagino();
  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

  pagino.setCount(0);
  expect(consoleSpy).toHaveBeenCalledWith('Count must be a positive number');

  consoleSpy.mockRestore();
});

test(`Test edge case: large page count`, () => {
  const pagino = new Pagino();
  pagino.setCount(100).setPage(50);

  const pages = pagino.getPages();
  // Should contain ellipsis and page numbers
  expect(pages).toContain('start-ellipsis');
  expect(pages).toContain('end-ellipsis');
  expect(pages).toContain(50);
});

test(`Test edge case: setPage out of bounds (higher)`, () => {
  const pagino = new Pagino();
  pagino.setCount(10).setPage(1);

  pagino.setPage(15);
  // Page should remain 1
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last']
  );
});

test(`Test edge case: setPage out of bounds (lower)`, () => {
  const pagino = new Pagino();
  pagino.setCount(10).setPage(5);

  pagino.setPage(-1);
  // Page should remain 5
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10, 'next', 'last']
  );
});

test(`Test navigation: next at last page`, () => {
  const pagino = new Pagino();
  pagino.setCount(5).setPage(5);

  pagino.next();
  // Should remain at page 5
  expect(pagino.getPages()).toEqual(
    ['first', 'previous', 1, 2, 3, 4, 5, 'next', 'last']
  );
});

test(`Test navigation: previous at first page`, () => {
  const pagino = new Pagino();
  pagino.setCount(5).setPage(1);

  pagino.previous();
  // Should remain at page 1
  expect(pagino.getPages()).toEqual(
    ['first', 'previous', 1, 2, 3, 4, 5, 'next', 'last']
  );
});

test(`Test method chaining with navigation methods`, () => {
  const pagino = new Pagino();
  pagino.setCount(15).setPage(1);

  pagino.next().next().previous().next().next();
  // Should be at page 3
  expect(pagino.getPages()[2]).toBe(1); // First page number in output
  expect(pagino.getPages()).toEqual(
    //prettier-ignore
    ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 15, 'next', 'last']
  );
});
