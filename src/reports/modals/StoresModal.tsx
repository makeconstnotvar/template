import React, {Component, Fragment} from "react";
import {inject, observer} from "mobx-react";
import {MacrosDrop} from "reports/drops/MacrosDrop";
import {ClustersDrop} from "reports/drops/ClustersDrop";
import {Pager} from "commons/components/PagerStateless";
import {Progress} from "commons/components/Progress";
import cn from 'classnames';

function parseSearchTexts(str: string = ''): string {
  return str.trim().replace(/\s\s+/g, ' ');
}

@inject("$modalStores", "$macroRegion", "$cluster", "$user", "$reports")
@observer
class StoresModal extends Component<any, any> {
  state = {
    no: '',
    address: '',
    sapId: '',
    metro: ''
  }

  pageChangeHandler = page => {
    const {$modalStores} = this.props;
    $modalStores.currentPage = page;
    this.filterHandler();
  }

  cleanHandler = (stateFieldName) => {
    const {$modalStores} = this.props;

    this.setState(state => ({[stateFieldName]: ''}), () => {
      this.filterHandler();
      $modalStores.currentPage = 1;
    })
  }

  filterHandler = () => {
    let {filterHandler} = this.props;
    let {no, address, sapId, metro} = this.state;
    filterHandler(parseSearchTexts(no), parseSearchTexts(address), parseSearchTexts(sapId), parseSearchTexts(metro));
  }

  searchChangeHandler = (stateFieldName, value) => {
    let {$modalStores} = this.props;

    this.setState({[stateFieldName]: value}, () => {
      this.filterHandler();
      $modalStores.currentPage = 1;
    });
  }

  changeMacroHandler = async () => {
    let {$macroRegion, $cluster} = this.props;
    $cluster.reset();
    if ($macroRegion.selectedValue)
      await $cluster.fetchItems($macroRegion.selectedValue);
    this.filterHandler();
  }

  render() {
    const {$modalStores, $macroRegion, $user, $reports, toggleSelectedItemHandler} = this.props;
    const isDisabledMacro = $user.item?.macroRegionId && $reports.needDisable('macros');
    const isDisabledCluster = isDisabledMacro && $user.item?.clusterId && $reports.needDisable('clusters');
    const isDisabledStores = isDisabledCluster && $user.stores?.length && $reports.needDisable('stores');
    const {no, address, sapId, metro} = this.state

    return (
      <Fragment>
        <div className="modal-header">
          <div className="modal-title">Список магазинов</div>
        </div>
        <div className="modal-body">
          <div className="flex-row mb-10" style={{position: 'relative', zIndex: 2}}>
            <div className="mr-20">
              <label className="filter-label">Макрорегион магазина</label>
              <MacrosDrop onChange={this.changeMacroHandler} isDisabled={isDisabledCluster || isDisabledMacro}/>
            </div>
            <div className="mr-20">
              <label className="filter-label">Кластер магазина</label>
              <ClustersDrop onChange={this.filterHandler} isDisabled={!$macroRegion.hasMacroSelected || isDisabledCluster}/>
            </div>
          </div>
          <div className="mb-10 flex-row" style={{zIndex: 1}}>
            <div className="input-group mr-20 flex-unshrink w300p">
              <input type="text"
                     className="form-control"
                     onChange={e => this.searchChangeHandler('no', e.currentTarget.value)}
                     value={no}
                     disabled={isDisabledStores}
                     placeholder="Номер магазина"/>
              <div className="input-group-append">
                <button type="button"
                        disabled={isDisabledStores}
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
                     disabled={isDisabledStores}
                     placeholder="Номер SAP"/>
              <div className="input-group-append">
                <button type="button"
                        className="btn btn-secondary"
                        disabled={isDisabledStores}
                        onClick={() => this.cleanHandler('sapId')}><i className="fas fa-times"/>
                </button>
              </div>
            </div>
            <div className="input-group mr-20 flex-unshrink w300p">
              <input type="text"
                     className="form-control"
                     onChange={e => this.searchChangeHandler('metro', e.currentTarget.value)}
                     value={metro}
                     disabled={isDisabledStores}
                     placeholder="Метро"/>
              <div className="input-group-append">
                <button type="button"
                        disabled={isDisabledStores}
                        className="btn btn-secondary"
                        onClick={() => this.cleanHandler('metro')}><i className="fas fa-times"/>
                </button>
              </div>
            </div>

          </div>
          <div className="mb-10 flex-row" style={{zIndex: 1}}>
            <div className="input-group">
              <input type="text"
                     className="form-control"
                     onChange={e => this.searchChangeHandler('address', e.currentTarget.value)}
                     value={address}
                     disabled={isDisabledStores}
                     placeholder="Адрес магазина"/>
              <div className="input-group-append">
                <button type="button"
                        disabled={isDisabledStores}
                        className="btn btn-secondary"
                        onClick={() => this.cleanHandler('address')}><i className="fas fa-times"/>
                </button>
              </div>
            </div>
          </div>
          <div className="mb-10 position-relative">
            <div className="flex-row flex-vcenter position-absolute">
              <Progress className="mr-10" isProgress={$modalStores.fetchProgress}/>
              {$modalStores.fetchProgress && <span>Подождите...</span>}
            </div>
            {
              $modalStores.fetchDone && $modalStores.noItems &&
              <div className="alert alert-warning p-10">
                По заданным критериям магазинов не найдено
              </div>
            }
            {
              !$modalStores.noItems &&
              <div className={cn('base-table-box w-100', {'hidden': $modalStores.fetchProgress})}>
                <table className="base-table w-100">
                  <thead>
                  <tr>
                    <th></th>
                    <th>№</th>
                    <th>Адрес</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    $modalStores.items.map(store => {
                      return <tr key={store.id}>
                        <td title="Выбрать" className={cn('cell-check', {'active': store.selected})}
                            onClick={() => toggleSelectedItemHandler(store)}
                        ><i className="fas fa-check"/>
                        </td>
                        <td>{store.no || "--"}</td>
                        <td>{store.address || "адрес не указан"}</td>
                      </tr>
                    })
                  }
                  </tbody>
                </table>
              </div>
            }
          </div>
          <Pager className="mt-auto" onPageChange={this.pageChangeHandler} total={$modalStores.total} currentPage={$modalStores.currentPage}/>
        </div>
        <div className="modal-footer">
          <button className="btn btn-success" onClick={this.props.hide}>Закрыть</button>
        </div>
      </Fragment>
    )
  }
}

export {StoresModal}