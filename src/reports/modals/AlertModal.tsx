import React, {FC, Fragment} from "react";

export interface IAlertModalProps {
  title?: React.ReactNode,
  bodyText?: string,
  hide?: () => void,
}

const AlertModal: FC<IAlertModalProps> = props => {
  const {title = 'Внимание', bodyText = 'Текст алерта'} = props;
  return <Fragment>
    <div className="modal-header">
      <div className="modal-title">{title}</div>
    </div>
    <div className="modal-body">
      <div>{bodyText}</div>
    </div>
    <div className="modal-footer">
      <button className="btn btn-secondary" onClick={props.hide}>Закрыть</button>
    </div>
  </Fragment>
}
export {AlertModal}