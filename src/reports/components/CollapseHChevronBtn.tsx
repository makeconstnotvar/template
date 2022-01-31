import React from 'react';

const CollapseHChevronBtn = props => {
  return <div className="collapse-chevron-btn">
    {
      props.collapsed
        ? <i className="fas fa-caret-right"/>
        : <i className="fas fa-caret-left"/>
    }

  </div>
}
export {CollapseHChevronBtn};