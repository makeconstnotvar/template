import React from 'react';
import cn from 'classnames';

interface ISwitchProps {
  isEnabled: boolean;
  disabled?: boolean;
  className?: string;
  toggle: () => void;
}

const Switch: React.FC<ISwitchProps> = (props) => {
  const {isEnabled = false, toggle = () => {}, className = '', children, disabled} = props;

  const onClick = () => {
    if (!disabled) {
      toggle();
    }
  };

  return (
    <div className={'switch-button-control ' + className}>
      <div className={cn('switch-button', {enabled: isEnabled, disabled})} onClick={onClick}>
        <div className="button"></div>
      </div>
      <div className="switch-button-label">{children}</div>
    </div>
  );
};

export {Switch};
