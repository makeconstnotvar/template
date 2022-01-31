import React, {Fragment} from 'react'

type TPropsModal = {
  text?: string
  title?: string
  apply?: () => {}
  hide: () => {}
}

const ConfirmModal = (props: TPropsModal) => {
  const {text = '', title = '', apply = () => {}} = props

  const onApply = () => {
    apply()
    props.hide()
  }

  return (
    <Fragment>
      <div className="modal-header">
        <div className="modal-title">{title}</div>
      </div>
      <div className="modal-body">
        <div>{text}</div>
      </div>
      <div className="modal-footer">
          <button className="btn btn-secondary" onClick={props.hide}>
            Закрыть
          </button>
        <button className="btn btn-success" onClick={onApply}>
          Подтвердить
        </button>
      </div>
    </Fragment>
  )
}
export {ConfirmModal}
