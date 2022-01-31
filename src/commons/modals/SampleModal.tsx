import React, {Fragment} from "react";

const SampleModal = props => {
  return <Fragment>
    <div className="modal-header">
      <div className="modal-title">Тестовое модальное окно</div>
    </div>
    <div className="modal-body">
      <div>Woohoo, you're reading this text in a modal!</div>
    </div>
    <div className="modal-footer">

      <button className="btn btn-secondary" onClick={props.hide}>Закрыть</button>
      <button className="btn btn-success">Применить</button>
    </div>
  </Fragment>
}
export {SampleModal}