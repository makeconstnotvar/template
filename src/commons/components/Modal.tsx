import React, {Fragment} from 'react'
import {inject, observer} from 'mobx-react'
import cn from 'classnames'

const Modal = inject('$modal')(observer((props) => {
  const {$modal} = props
  const Component = $modal.component

  const onMouseDown = (e) => {
    if (e.target === e.currentTarget) hide()
  }

  const hide = () => {
    if ($modal.props.hide) {
      $modal.props.hide()
    } else {
      $modal.hide()
    }
  }

  if (!$modal.isVisible) return null
  return (
    <Fragment>
      <div className={cn('modal-backdrop in', {show: $modal.isVisible})} onClick={hide} />
      <div className={cn('modal', {show: $modal.isVisible})} tabIndex={-1} onMouseDown={onMouseDown}>
        <div className={`dialog-box ${$modal.className}`}>
          <Component hide={() => $modal.hide()} {...$modal.props} />
        </div>
      </div>
    </Fragment>
  )
}))

export {Modal}
