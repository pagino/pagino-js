## Pagino
Pagino is a JavaScript class designed to handle pagination logic independently.

## Installation
```bash
npm i pagino
```

## How It Works

## Basic Usage:
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

## Chain Mode:
You can chain multiple methods together
```js
pagino
  .setCount(10)
  .setPage(1)
  .getPages();
```

## Options:

The following values are the default options
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

## Navigate
Instead of using `setPage`, you can use the `next`, `previous`, `first`, and `last` methods:
```js
pagino.next();
pagino.previous();
pagino.first();
pagino.last();
```

## Event
You can listen for `page` and `count` changes
```js
const pagino = new Pagino({
  ...
  onChange: (page, count) => {
    console.log(page, count)
  },
  ...
});
```


## Using with Deno
```js
import Pagino from 'https://raw.githubusercontent.com/pagino/pagino-js/main/src/index.ts';
```
