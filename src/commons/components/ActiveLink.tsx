import {Link} from "@reach/router";
import React from "react";

const ActiveLink = props => {
  return <Link getProps={isActive(props.className)} {...props}/>
}

const isActive = className => {
  let allClassNames;
  if (typeof className === 'string')
    allClassNames = new Set(className.replace(/\s+/, ' ').split(' '));
  else
    allClassNames = new Set();

  return (props) => {
    if (props.isCurrent)
      allClassNames.add("active")
    else
      allClassNames.delete("active");

    return {className: Array.from(allClassNames).join(' ')}
  }
}
export {ActiveLink}