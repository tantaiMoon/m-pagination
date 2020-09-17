import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MyPagination } from '../.';
import '../dist/moyi-pagination.min.css';

const App = () => {
  return (
    <div>
      <MyPagination total={100} current={1} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
