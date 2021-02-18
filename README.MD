## Pagino
A Class for handle pagination's logic in Javascript independent of UI

## Install
```bash
npm i pagino
```

## How work

## Basic:
```js
import Pagino from 'pagino';

const pagino = new Pagino();
pagino.setCount(10);
pagino.setPage(1);
pagino.getPages();
/**
 * ['first', 'previous', 1, 2, 3, 4, 5, 'end-ellipsis', 10, 'next', 'last']
 */

pagino.setPage(5);
pagino.getPages();
/**
 * ['first', 'previous', 1,'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10, 'next', 'last']
 */
```

## Chain mode:
You can call all methods as chain
```js
pagino
  .setCount(10)
  .setPage(1)
  .getPages();
```

## Options:

All values in below is default
```js
const pagino = new Pagino({
  showFirst: true,
  showPrevious: true,
  showNext: true,
  showLast: true,
  page: 1,
  count: undefined,
  siblingCount: 1,
  boundaryCount: 1,
});
```
