## Pagino

Pagino is a lightweight JavaScript library designed to handle pagination logic independently of any UI framework. It generates pagination arrays with intelligent page number grouping, supporting navigation buttons, ellipsis indicators, and customizable boundaries and sibling counts.

## Installation

```bash
npm i pagino
```

## Basic Usage

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
 * ['first', 'previous', 1, 'start-ellipsis', 4, 5, 6, 'end-ellipsis', 10, 'next', 'last']
 */
```

## Method Chaining

All setter methods support chaining for convenient configuration:

```js
pagino
  .setCount(10)
  .setPage(1)
  .getPages();
```

## Configuration Options

Initialize Pagino with custom options:

```js
const pagino = new Pagino({
  showFirst: true,        // Show 'first' button
  showPrevious: true,     // Show 'previous' button
  showNext: true,         // Show 'next' button
  showLast: true,         // Show 'last' button
  page: 1,                // Current page (default: 1)
  count: undefined,       // Total number of pages
  siblingCount: 1,        // Number of pages around current page
  boundaryCount: 1,       // Number of pages at start and end
});
```

## API Methods

### `setCount(count: number): Pagino`
Sets the total number of pages and triggers `onChange` callback.

### `setPage(page: number): Pagino`
Sets the current page. Invalid page numbers (≤ 0 or > count) are ignored. Triggers `onChange` callback.

### `getPages(): Array<number | string>`
Returns an array representing the pagination structure with:
- `'first'` - Jump to first page
- `'previous'` - Go to previous page
- `'next'` - Go to next page
- `'last'` - Jump to last page
- `'start-ellipsis'` - Indicates skipped pages at the start
- `'end-ellipsis'` - Indicates skipped pages at the end
- Numbers - Page numbers

### `first(): Pagino`
Jump to the first page.

```js
pagino.first();
```

### `last(): Pagino`
Jump to the last page.

```js
pagino.last();
```

### `next(): Pagino`
Move to the next page (if available).

```js
pagino.next();
```

### `previous(): Pagino`
Move to the previous page (if available).

```js
pagino.previous();
```

## Event Handling

Listen to page and count changes using the `onChange` callback:

```js
const pagino = new Pagino({
  onChange: (page, count) => {
    console.log(`Page: ${page}, Total Pages: ${count}`);
  }
});

pagino.setCount(30);  // Triggers onChange
pagino.setPage(5);    // Triggers onChange
pagino.next();        // Triggers onChange
```

## Usage with Deno

```js
import Pagino from 'https://raw.githubusercontent.com/pagino/pagino-js/main/src/index.ts';
```

## Features

- **Framework Agnostic**: No dependencies on any UI framework
- **Smart Pagination**: Automatically generates optimized pagination arrays
- **Customizable**: Configure boundaries, sibling counts, and visible buttons
- **Event Driven**: Subscribe to page and count changes
- **Chainable API**: Fluent interface for convenient method chaining
- **Lightweight**: Minimal bundle size with no external dependencies
- **Type Safe**: Full TypeScript support
