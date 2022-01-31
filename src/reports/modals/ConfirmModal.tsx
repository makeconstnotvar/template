import React, {Fragment, FC} from 'react';

export interface IConfirmModalProps {
  title?: React.ReactNode,
  bodyText?: string,
  hide?: () => void,
  confirm?: () => void,
}

const ConfirmModal: FC<IConfirmModalProps> = props => {
  const {title = 'Внимание', bodyText = 'Текст алерта'} = props;
  return <Fragment>
    <div className="modal-header">
      <div className="modal-title">{title}</div>
    </div>
    <div className="modal-body">
      <div>{bodyText}</div>
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary" onClick={props.hide}>Отмена</button>
      <button className="btn btn-success" onClick={props.confirm}>Подтвердить</button>
    </div>
  </Fragment>;
};

export {ConfirmModal};
