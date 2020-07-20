# m-pagination

基于 react 的分页器组件

React Pagination Component

# Development

```shell
git pull https://github.com/tantaiMoon/m-pagination.git

npm install
# OR
yarn install

npm start
```

# Example

# Usage

```js
import Pagination from 'm-pagination';
ReactDOM.render(<Pagination />, container);
```

# API

| Parameter | Description                         | Type                                            | Default |
| --------- | ----------------------------------- | ----------------------------------------------- | ------- |
| current   | current page                        | Number                                          | 1       |
| pageSize  | items per page                      | Number                                          | 10      |
| total     | items total count                   | Number                                          | 0       |
| onChange  | page change callback                | Function(current, pageSize)                     | -       |
| showTotal | show total records and range        | Function(total, [from, to])                     | -       |
| style     | the style of pagination             | Object                                          | {}      |
| prevIcon  | specifict the default previous icon | ReactNode \|\r(props: PaginationProps) => ReactNode |         |
| nextIcon  | specifict the default next icon     | ReactNode \|\r(props: PaginationProps) => ReactNode |         |
