import React from "react";
import cn from "classnames";

interface IProgress {
  isProgress: boolean,
  className?: string
  text?: string
}

const Progress = (props: IProgress) =>
  <span className={cn("progress-bar flex-row inline", props.className, {hide: !props.isProgress})}>
    {
      props.text &&
      <span className="mr-10">{props.text}</span>
    }
    <span><i className="fas fa-cog fa-spin"/></span>
  </span>;

Progress.defaultProps = {
  className: "",
  text: "",
  isProgress: true
};

export {Progress};
