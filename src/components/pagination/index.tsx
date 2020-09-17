import * as React from 'react';
import './index.less';

type IProps = {
  showTotal: boolean | Function;
  total: number;
  current: number;
  pageSize: number;
  onChange: any;
  prevIcon: string | React.ReactNode;
  nextIcon: string | React.ReactNode;
  style: object;
};
type IState = {
  current: number;
  pageSize: number;
  groupCount: number;
  total: number;
  startPage: number;
  totalPage: number;
};
interface Pagination {
  showTotal: boolean | Function;
  total: number;
  current: number;
  pageSize: number;
  onChange: any;
  prevIcon: string | React.ReactNode;
  nextIcon: string | React.ReactNode;
  style: object;
}

class Pagination extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      current: 1, // 当前页码
      pageSize: 10, // 每页条数
      groupCount: 5, // 页码分组，显示7个页码，其余用省略号显示
      total: 0, // 总条数
      startPage: 1, // 分页起始位置
      totalPage: 1, // 总页码
    };
  }

  componentDidMount() {
    if (
      this.props.showTotal &&
      typeof this.props.showTotal !== 'function' &&
      typeof this.props.showTotal !== 'boolean'
    ) {
      throw new Error('The showTotal type must be a function or boolean');
    }
    this.setState({
      total: this.props.total || 0,
      current: this.props.current || 1,
      pageSize: this.props.pageSize || 10,
      totalPage: Math.ceil(this.props.total / this.props.pageSize) || 1,
    });
  }

  pageClick = (currentPage: number) => {
    const { groupCount } = this.state;
    const getCurrentPage = this.props.onChange;
    // 当 当前页码 大于 分组的页码 时，使 当前页 前面 显示 两个页码
    if (currentPage >= groupCount) {
      this.setState({
        startPage: currentPage - 2,
      });
    }
    if (currentPage < groupCount) {
      this.setState({
        startPage: 1,
      });
    }
    // 第一页时重新设置分组的起始页
    if (currentPage === 1) {
      this.setState({
        current: 1,
      });
    }
    this.setState({
      current: currentPage,
    });
    // 将当前页码返回父组件
    getCurrentPage && getCurrentPage(currentPage, this.state.pageSize);
  };

  renderPage = (totalPage: number) => {
    const { current, groupCount, startPage } = this.state;
    const { prevIcon = '上一页', nextIcon = '下一页' } = this.props;
    let prevClass: string =
      'pagination-item pagination-item-prev pagination-item-active';
    let nextClass: string =
      'pagination-item pagination-item-next pagination-item-active';
    let lastClass: string =
      'pagination-item pagination-item-last pagination-item-active';
    if (current === 1) {
      prevClass += ' pagination-item-disabled';
    }
    if (current === totalPage) {
      nextClass += ' pagination-item-disabled';
      lastClass += ' pagination-item-disabled';
    }
    const pages = [];
    pages.push(
      <li
        className={prevClass}
        onClick={() => {
          this.handlePrev();
        }}
        key="prev"
      >
        {prevIcon}
      </li>
    );
    if (totalPage < 10) {
      // 总页数小于10，全部显示
      for (let i = 1; i <= totalPage; i++) {
        let classNames = 'pagination-item';
        if (current === i) {
          classNames += ' pagination-item-active';
        }
        pages.push(
          <li
            className={classNames}
            key={i}
            onClick={() => {
              this.pageClick(i);
            }}
          >
            {i}
          </li>
        );
      }
    } else {
      // 否则显示部分
      pages.push(
        <li
          className={
            current === 1
              ? 'pagination-item pagination-item-active'
              : 'pagination-item'
          }
          key={1}
          onClick={() => {
            this.pageClick(1);
          }}
        >
          1
        </li>
      );
      let pageLength: number = 0;
      if (groupCount + startPage > totalPage) {
        pageLength = totalPage;
      } else {
        pageLength = groupCount + startPage;
      }
      // 前面省略号(当当前页码比分组的页码大时显示省略号)
      if (current >= groupCount) {
        pages.push(
          <li className="pagination-item" key={-1}>
            ···
          </li>
        );
      }
      // 非第一页和最后一页显示
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPage - 1 && i > 1) {
          pages.push(
            <li
              className={
                current === i
                  ? 'pagination-item pagination-item-active'
                  : 'pagination-item'
              }
              key={i}
              onClick={() => this.pageClick(i)}
            >
              {i}
            </li>
          );
        }
      }
      // 后面省略号
      if (totalPage - startPage >= groupCount + 1) {
        pages.push(
          <li className="pagination-item" key={-2}>
            ···
          </li>
        );
      }
      pages.push(
        <li
          className={
            current === totalPage
              ? 'pagination-item pagination-item-active'
              : 'pagination-item'
          }
          key={totalPage}
          onClick={() => {
            this.pageClick(totalPage);
          }}
        >
          {totalPage}
        </li>
      );
    }
    pages.push(
      <li
        className={nextClass}
        key="next"
        onClick={() => {
          this.handleNext();
        }}
      >
        {nextIcon}
      </li>
    );
    pages.push(
      <li
        className={lastClass}
        key="last"
        onClick={() => {
          this.handleLast();
        }}
      >
        末页
      </li>
    );
    return pages;
  };
  handlePrev = () => {
    let { current } = this.state;
    if (current === 1) {
      return;
    }
    this.setState({
      current: current > 1 ? --current : 1,
    });
    this.pageClick(current);
  };
  handleNext = () => {
    let { current, totalPage } = this.state;
    if (current >= totalPage) {
      return;
    }
    this.setState({
      current: ++current,
    });
    this.pageClick(current);
  };
  handleLast = () => {
    let { totalPage } = this.state;
    this.setState({
      current: totalPage,
    });
    this.pageClick(totalPage);
  };

  render() {
    const { style, showTotal = true, total } = this.props;
    const { totalPage, pageSize, current } = this.state;
    const pageList = this.renderPage(totalPage);
    return (
      <div className="pagination-wrapper" style={style}>
        <ul className="pagination-content">
          {showTotal ? (
            typeof showTotal !== 'function' ? (
              <span className="total-counter">共{totalPage}页</span>
            ) : (
              showTotal(
                Math.ceil(total / pageSize),
                (current - 1) * pageSize + 1,
                current === totalPage ? total : current * pageSize
              )
            )
          ) : (
            ''
          )}
          {pageList}
        </ul>
      </div>
    );
  }
}

export default Pagination;
