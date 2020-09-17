import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MyPagination, MyCalendar } from '../.';
import '../dist/moyi-components.min.css';

const App = () => {
  return (
    <div>
      <MyPagination
        showTotal={false}
        prevIcon="<"
        nextIcon=">"
        style={{}}
        total={100}
        pageSize={10}
        onChange={() => {}}
        current={1}
      />
      <MyCalendar />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
