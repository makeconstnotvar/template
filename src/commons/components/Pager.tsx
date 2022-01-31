import {inject, observer} from "mobx-react";
import React, {Component} from 'react';
import cn from 'classnames';

@inject("$pager")
@observer
class Pager extends Component<any, any> {

  componentDidMount() {
    let {$pager, currentPage, pageSize, total} = this.props;
    $pager.setup(currentPage, total, pageSize);
  }

  componentDidUpdate(prevProps) {
    let {$pager, currentPage, total} = this.props;
    if (prevProps.currentPage !== +currentPage || prevProps.total !== +total) {
      $pager.setup(currentPage, total);
    }
  }

  render() {
    let {$pager, onPageChange, className} = this.props;
    if (!$pager.showPager)
      return null;
    return (
      <div className={`pagination unselectable ${className}`}>
        {
          $pager.isPrev &&
          <div className="page-item">
            <a className="page-link" onClick={() => onPageChange($pager.prev())}>
              <i className="fas fa-arrow-circle-left"/>
            </a>
          </div>
        }
        {
          $pager.pages.map(page => <div key={page} className={cn('page-item', {'active': page === $pager.currentPage})}>
            <a className="page-link"
               onClick={() => onPageChange($pager.setPage(page))}
               key={page}>{page}</a>
          </div>)
        }
        {
          $pager.isNext &&
          <div className="page-item">
            <a className="page-link" onClick={() => onPageChange($pager.next())}>
              <i className="fas fa-arrow-circle-right"/>
            </a>
          </div>
        }
      </div>
    )
  }
}

// @ts-ignore
Pager.defaultProps = {
  onPageChange: () => {
  },
  className: "",
  currentPage: 1,
  total: 0
}
export {Pager}