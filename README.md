<h1 align="center">Welcome to moyi-components 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/moyi-pagination" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/moyi-pagination.svg">
  </a>
  <img src="https://img.shields.io/badge/node-%3E%3D10-blue.svg" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

## Prerequisites

- node >=10

## Install

```sh
yarn install moyi-components
```

## Usage

```js
import { MyPagination } from 'moyi-components';
ReactDOM.render(<MyPagination />, container);
```

## API

| Parameter | Description                         | Type                                              | Default |
| --------- | ----------------------------------- | ------------------------------------------------- | ------- |
| current   | current page                        | Number                                            | 1       |
| pageSize  | items per page                      | Number                                            | 10      |
| total     | items total count                   | Number                                            | 0       |
| onChange  | page change callback                | Function(current, pageSize)                       | -       |
| showTotal | show total records and range        | Function(total, [from, to])                       | -       |
| style     | the style of pagination             | Object                                            | {}      |
| prevIcon  | specifict the default previous icon | ReactNode \|(props: PaginationProps) => ReactNode |         |
| nextIcon  | specifict the default next icon     | ReactNode \|(props: PaginationProps) => ReactNode |         |

## Run tests

```sh
yarn run test
```

## Author

👤 **moyiwpb**
