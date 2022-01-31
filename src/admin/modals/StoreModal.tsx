import React, {Fragment} from 'react'
import moment from 'moment'

interface IStoreCard {
  store: any

  onClose(e): void,
}

const StoreModal = (props: IStoreCard) => {
  const {store, onClose} = props;
  return (
    <Fragment>

      <div className="modal-header">
        <div className="filter-title mb-10">Магазин №{store.no}</div>
        <div className="btn btn-light info-card-close ml-auto" onClick={onClose}><i className="fas fa-times"/></div>
      </div>
      <div className="modal-body drops">
        <div className="info-card-form mb-20">
          <span>Адрес</span>
          <input className="form-control" type="text" value={store.address} disabled/>

          <span>Метро</span>
          <input className="form-control" type="text" value={store.metro} disabled/>

          <span>Телефон</span>
          <input className="form-control" type="text" value={store.phone} disabled/>

          <span>Код магазина</span>
          <input className="form-control" type="text" value={store.no} disabled/>

          <span>Код магазина в SAP</span>
          <input className="form-control" type="text" value={store.sapId} disabled/>

          <span>Кластер</span>
          <input className="form-control" type="text" value={store.clusterName} disabled/>

          <span>Дивизион</span>
          <input className="form-control" type="text" value={`${store.divisionName} (${store.divisionCode})`} disabled/>

          <span>Запись действует с</span>
          <input className="form-control" type="text" value={moment(store.actualDateFrom).format('DD.MM.YYYY')} disabled/>

          <span>Запись действует по</span>
          <input className="form-control" type="text" value={moment(store.actualDateTo).format('DD.MM.YYYY')} disabled/>

          <span>Последнее обновление</span>
          <input className="form-control" type="text" value={moment(store.updateAt).format('DD.MM.YYYY HH:mm:SS')} disabled/>
        </div>
        {
          store.users &&
          <Fragment>
            <div className="filter-title-mini mb-10">Пользователи</div>
            <div className="base-table-box">
              <table className="base-table">
                <thead>
                <tr>
                  <th>Логин</th>
                  <th>Имя</th>
                  <th>Телефон</th>
                  <th>Роль</th>
                </tr>
                </thead>
                <tbody>
                {
                  store.users.map((u, i) => (
                    <tr key={i}>
                      <td>{u.login}</td>
                      <td>{u.fullName}</td>
                      <td>{u.phone}</td>
                      <td>{u.position}</td>
                    </tr>
                  ))
                }
                </tbody>
              </table>
            </div>
          </Fragment>
        }
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onClose}>Закрыть</button>
      </div>
    </Fragment>
  )
}

export {StoreModal}