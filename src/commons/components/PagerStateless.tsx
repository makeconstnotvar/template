import React, {memo} from 'react';
import first from "lodash/first";
import last from "lodash/last";
import cn from 'classnames';

interface IPagerStatelessProps {
  currentPage: number
  total: number
  className?: string
  pageSize?: number
  visiblePagesCount?: number

  onPageChange(page: number)
}

const Pager = memo((props: IPagerStatelessProps) => {
  const {currentPage, total, className, pageSize, visiblePagesCount, onPageChange} = props;
  const offset = Math.floor(visiblePagesCount / 2);
  const maxPagesCount = Math.ceil(total / pageSize) || 1;

  let start = 1;
  let count = visiblePagesCount;
  let pages = [];

  if (currentPage > offset) {
    start = currentPage - offset;
    if (start > maxPagesCount - visiblePagesCount + 1 && maxPagesCount >= visiblePagesCount) {
      start = maxPagesCount - visiblePagesCount + 1;
    }
  }

  if (start + count > maxPagesCount) {
    count = Math.abs(maxPagesCount - start) + 1;
  }
  for (let i = 0; i < count; ++i) {
    pages.push(i + start);
  }

  const isPrev = first(pages) > 1;
  const isNext = last(pages) < maxPagesCount;
  const isVisible = pages.length > 1;

  const getPage = (page): number => {
    let current;
    if (page > maxPagesCount) {
      current = maxPagesCount;
    } else if (page < 1) {
      current = 1;
    } else {
      current = page;
    }
    return current;
  }
  const prev = () => isPrev ? getPage(currentPage - visiblePagesCount) : currentPage;
  const next = () => isNext ? getPage(currentPage + visiblePagesCount) : currentPage;
  return (
    isVisible &&
    <div className={`pagination unselectable ${className}`}>
      {
        isPrev &&
        <div className="page-item">
          <a className="page-link" onClick={() => onPageChange(prev())}>
            <i className="fas fa-arrow-circle-left"/>
          </a>
        </div>
      }
      {
        pages.map(page => <div key={page} className={cn('page-item', {'active': page === currentPage})}>
          <a className="page-link"
             onClick={() => onPageChange(getPage(page))}
             key={page}>{page}</a>
        </div>)
      }
      {
        isNext &&
        <div className="page-item">
          <a className="page-link" onClick={() => onPageChange(next())}>
            <i className="fas fa-arrow-circle-right"/>
          </a>
        </div>
      }
    </div>
  )
})

// @ts-ignore
Pager.defaultProps = {
  onPageChange: (page) => {
    console.log('не задан метод onPageChange');
  },
  className: "",
  currentPage: 1,
  total: 0,
  visiblePagesCount: 10,
  pageSize: 20
}

export {Pager}