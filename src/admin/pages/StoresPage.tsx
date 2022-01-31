import React, {Component, Fragment} from "react"
import qs from "qs";
import {inject, observer} from "mobx-react";
import {navigate} from "@reach/router";
import {Pager} from "commons/components/Pager";
import {Progress} from "commons/components/Progress";
import {StoreModal} from "admin/modals/StoreModal";
import {makeUrl} from "utils/url";
import {cleanText} from "utils/string";
import cn from 'classnames';
import {Switch} from 'commons/components/Switch';

@inject('$stores', '$modal')
@observer
class StoresPage extends Component<any, any> {
  constructor(props) {
    super(props);
    const {$stores, location} = props;
    let {
      page = 1, storeId,
      no = "", sapId = "", metro = "", address = "",
      includeClosed = false
    } = qs.parse(location.search, {ignoreQueryPrefix: true});
    $stores.currentPage = page;
    $stores.setSelectedValue(storeId);
    this.state = {
      no,
      address,
      sapId,
      metro,
      includeClosed
    }
  }

  async componentDidMount() {
    await this.fetch()
  }

  pageChangeHandler = async page => {
    const {$stores} = this.props;
    $stores.currentPage = page;
    window.scrollTo(0, 90);
    await this.fetch();
  }

  fetch = async () => {
    const {$stores} = this.props;
    const {no, address, sapId, metro, includeClosed} = this.state;
    await $stores.fetchItems({
      includeClosed,
      no: cleanText(no),
      sapId: cleanText(sapId),
      metro: cleanText(metro),
      address: cleanText(address),
      page: $stores.currentPage - 1
    });
    if ($stores.selectedValue)
      this.showModal()
    await this.updateUrl();
  }

  selectHandler = async (store) => {
    const {$stores} = this.props;
    $stores.setSelected(store);
    this.showModal();
    await this.updateUrl();
  }

  closeHandler = () => {
    const {$modal} = this.props;
    this.selectHandler({});
    $modal.hide();
  }

  updateUrl = async () => {
    const {$stores} = this.props;
    const {no, address, sapId, metro, includeClosed} = this.state;
    await navigate(makeUrl('/admin/stores', {
      includeClosed,
      no: cleanText(no),
      sapId: cleanText(sapId),
      metro: cleanText(metro),
      address: cleanText(address),
      page: $stores.currentPage,
      storeId: $stores.selectedValue,
    }));
  }

  showModal = () => {
    const {$stores, $modal} = this.props;
    $modal.show(StoreModal, {className: 'modal-lg', onClose: this.closeHandler, store: $stores.selected})
  }

  cleanHandler = (stateFieldName) => {
    this.setState({[stateFieldName]: ''}, async () => {
      this.props.$stores.currentPage = 1;
      await this.fetch();
    });
  }

  changeActiveHandler = (includeClosed) => {
    this.setState({includeClosed}, async () => {
      await this.fetch();
    });
  }

  searchChangeHandler = (stateFieldName, value) => {
    this.setState({[stateFieldName]: value}, async () => {
      this.props.$stores.currentPage = 1;
      await this.fetch();
    });
  }

  searchHandler = async () => {
    this.props.$stores.currentPage = 1;
    await this.fetch();
  }

  enterHandler = (e) => {
    if (e.key === 'Enter') {
      this.searchHandler();
    }
  }

  render() {
    const {$stores} = this.props;
    const {no, address, sapId, metro, includeClosed} = this.state;
    return (
      <Fragment>
        <div className="filter-box">
          <div className="flex-row flex-vcenter mb-10">
            <div className="filter-title mr-20">Магазины</div>
            <Switch isEnabled={includeClosed} toggle={() => this.changeActiveHandler(!includeClosed)}>
              Показать закрытые
            </Switch>
          </div>
          <div className="mb-10 flex-row" style={{zIndex: 1}}>
            <div className="input-group mr-20 flex-unshrink w300p">
              <input type="text"
                     className="form-control"
                     onChange={e => this.searchChangeHandler('no', e.currentTarget.value)}
                     value={no}
                     placeholder="Номер магазина"/>
              <div className="input-group-append">
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => this.cleanHandler('no')}><i className="fas fa-times"/>
                </button>
              </div>
            </div>
            <div className="input-group mr-20 flex-unshrink w300p">
              <input type="text"
                     className="form-control"
                     onChange={e => this.searchChangeHandler('sapId', e.currentTarget.value)}
                     value={sapId}
                     placeholder="Номер SAP"/>
              <div className="input-group-append">
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => this.cleanHandler('sapId')}><i className="fas fa-times"/>
                </button>
              </div>
            </div>
            <div className="input-group mr-20 flex-unshrink w300p">
              <input type="text"
                     className="form-control"
                     onChange={e => this.searchChangeHandler('metro', e.currentTarget.value)}
                     value={metro}
                     placeholder="Метро"/>
              <div className="input-group-append">
                <button type="button"
                        className="btn btn-secondary"
                        onClick={() => this.cleanHandler('metro')}><i className="fas fa-times"/>
                </button>
              </div>
            </div>

          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text relative" style={{width: '50px'}}>
                <Progress className="absolute" isProgress={$stores.fetchProgress}/>
                {
                  !$stores.fetchProgress &&
                  <i className="fas fa-map-marker-alt" style={{width: '24px', fontSize: '23px'}}/>
                }
              </span>
            </div>
            <input type="text"
                   className="form-control"
                   onChange={e => this.searchChangeHandler('address', e.currentTarget.value)}
                   onKeyDown={this.enterHandler}
                   value={address}
                   placeholder="Адрес магазина"/>
            <div className="input-group-append">
              <button className="btn btn-secondary" onClick={this.cleanHandler}><i className="fas fa-times"/></button>
            </div>
            <div className="input-group-append">
              <button className="btn btn-success" onClick={this.searchHandler}>Найти</button>
            </div>
          </div>
        </div>
        {
          $stores.fetchError &&
          <div className="alert alert-danger">
            Ошибка при получении магазинов
          </div>
        }
        {
          $stores.fetchDone && $stores.noItems &&
          <div className="alert alert-warning">
            По заданным критериям результатов не найдено
          </div>
        }
        <Pager className="mb-20" onPageChange={this.pageChangeHandler} total={$stores.total} currentPage={$stores.currentPage}/>
        {
          !$stores.noItems &&
          <div className={cn('base-table-box w-100 mb-20', {'hidden': $stores.fetchProgress})}>
            <table className="base-table w-100">
              <thead>
              <tr>
                <th></th>
                <th>Номер</th>
                <th>SAP</th>
                <th>Адрес</th>
                <th>Метро</th>
                <th>Тел&nbsp;магазина</th>
                <th>Директор</th>
                <th>Супервайзер</th>
                <th>Время&nbsp;работы</th>
                <th>Макрорегион</th>
                <th>Кластер</th>
              </tr>
              </thead>
              <tbody>
              {
                $stores.items.map(store => {
                  return (
                    <tr className="hoverable" key={store.id}>
                      <td className={cn('action', {'active': store.id == $stores.selectedValue})}
                          onClick={() => this.selectHandler(store)}><i className="fas fa-edit"/></td>
                      <td>{store.no}</td>
                      <td>{store.sapId}</td>
                      <td>{store.address}</td>
                      <td>{store.metro}</td>
                      <td>{store.phone}</td>
                      <td>
                        <div>{store.dm}</div>
                        <div>{store.dmPhone}</div>
                      </td>
                      <td>
                        <div>{store.spv}</div>
                        <div>{store.spvPhone}</div>
                      </td>
                      <td>{store.workTime}</td>
                      <td>{store.macroName}</td>
                      <td>{store.clusterName}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        }
        <Pager className="mt-auto" onPageChange={this.pageChangeHandler} total={$stores.total} currentPage={$stores.currentPage}/>
      </Fragment>
    )
  }

}

export {StoresPage}