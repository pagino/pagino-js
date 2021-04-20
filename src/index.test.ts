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
