import React, {Component, Fragment} from 'react';
import {inject, observer} from 'mobx-react';
import {StoresModal} from '../modals/StoresModal';
import {Progress} from 'commons/components/Progress';
import {autorun} from 'mobx';

@inject('$modalStores', '$macroRegion', '$cluster', '$modal', '$user', '$reports')
@observer
class StoresBlock extends Component<any, any> {

  pageSize = 20;

  async componentDidMount() {
    const {$modalStores, $macroRegion, $cluster, $user, $reports, macroRegionId, clusterId, storeId} = this.props;
    const isPresetStores = $user.stores?.length && $reports.needDisable('stores');

    const run = async (macroRegionId, clusterId) => {

      await $macroRegion.fetchItems();
      $macroRegion.setSelectedValue(macroRegionId);

      if (macroRegionId) {
        await $cluster.fetchItems(macroRegionId);
      }

      $cluster.setSelectedValue(clusterId);

      const storeIds = storeId ? storeId.map(x => +x) : [];
      $modalStores.setSelectedValues(storeIds);

      if (isPresetStores) {
        $modalStores.presetStore($user.stores);
        this.updateHandler();
      } else {
        await this.fetch();
      }
    };

    if ($user.isDvrt) {
      autorun(() => {
        // Если у пользователя ограничения используем только его макрорегион (получается асинхронно)
        run($user.item?.macroRegionId, $user.item?.clusterId);
      });
    } else {
      await run(macroRegionId, clusterId);
    }
  }

  fetch = async (no?, address?, sapId?, metro?) => {
    const {$modalStores, $macroRegion, $cluster} = this.props;

    await $modalStores.fetchItems({
      no,
      address,
      sapId,
      metro,
      page: $modalStores.currentPage - 1,
      macroRegionId: $macroRegion.selectedValue,
      clusterId: $cluster.selectedValue,
      size: this.pageSize
    });
    this.updateHandler();
  };

  updateHandler = () => {
    const {$modalStores, $macroRegion, $cluster, onUpdateState, isStore, isCluster, isMacroRegion} = this.props;
    onUpdateState({
      macroRegionId: isMacroRegion ? $macroRegion.selectedValue : null,
      clusterId: isCluster ? $cluster.selectedValue : null,
      storeId: isStore ? $modalStores.selectedValue : null
    });
  };

  toggleSelectedItemHandler = store => {
    const {$modalStores} = this.props;
    $modalStores.toggleSelectedItem(store);
    this.updateHandler();
  };

  render() {
    const {$modalStores, $macroRegion, $cluster, $modal, isMacroRegion, isCluster, isStore} = this.props;
    const {macroRegionId, clusterId, storeId} = this.props;
    const modalProps = {
      macroRegionId,
      clusterId,
      storeId,
      filterHandler: this.fetch,
      toggleSelectedItemHandler: this.toggleSelectedItemHandler,
      className: 'stores-modal drops'
    };
    return (
      <Fragment>
        <div className="flex-unshrink flex-row">
          <button className="btn btn-secondary mr-10" onClick={() => $modal.show(StoresModal, modalProps)}>
            Выбрать магазин
          </button>
          <div className="flex-row flex-vcenter" style={{minHeight: '38px'}}>
            <Progress isProgress={$modalStores.fetchProgress}/>
          </div>
        </div>
        <div className="flex-unshrink flex-row flex-top mr-10">
          {
            isStore && $modalStores.fetchDone &&
            <div className="flex-col flex-top mr-10 flex-unshrink" style={{fontSize: '14px'}}>
              <span>Всего магазинов {$modalStores.total}</span>
              {
                $modalStores.fetchDone && $modalStores.isAllSelected &&
                <span>Выбраны все магазины</span>
              }
              {
                $modalStores.fetchDone && $modalStores.selectedCount > 0 &&
                <span>Выбрано {$modalStores.selectedCount}</span>
              }
            </div>
          }
        </div>
        <div className="flex-col">
          <div className="store-badges for-filter mr-auto mb-5">
            {
              isMacroRegion && $macroRegion.selected &&
              <div className="store-badge" title="Макрорегион">
                <span className="store-badge-info for-filter">{$macroRegion.selected.label}</span>
              </div>
            }
            {
              isCluster && $cluster.selected &&
              <div className="store-badge" title="Кластер">
                <span className="store-badge-info for-filter">{$cluster.selected.label}</span>
              </div>
            }
          </div>
          <div className="store-badges mr-auto">
            {
              $modalStores.selected.map(store => <div key={store.id}>
                <div className="store-badge">
                  <span className="store-badge-close unselectable" onClick={() => this.toggleSelectedItemHandler(store)}>Х</span>
                  <span className="store-badge-info no">{store.no || '--'}</span>
                  <span className="store-badge-info">{store.address || 'адрес не указан'}</span>
                </div>
              </div>)
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

// @ts-ignore
StoresBlock.defaultProps = {
  isMacroRegion: true,
  isCluster: true,
  isStore: true
};

export {StoresBlock};
