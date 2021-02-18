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
    output: ['first', 'previous', 1,'start-ellipsis', 6, 7, 8, 9, 10, 'next', 'last'],
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
