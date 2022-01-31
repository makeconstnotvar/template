import {BaseStore} from "commons/stores/BaseStore";
import {action, computed, observable} from "mobx";

class TicketFlagsStore extends BaseStore {
  @observable items = [
    {
      code: 'hasNps',
      label: 'NPS',
      value: false,
      visibleCode: 'showNps'
    },
    {
      code: 'hasGoodsCompensation',
      label: 'Возврат',
      value: false,
      visibleCode: 'showGoodsCompensation'
    },
    {
      code: 'hasSorryCompensation',
      label: 'Компенсация',
      value: false,
      visibleCode: 'showSorryCompensation'
    },
    {
      code: 'hasSpyClub',
      label: 'Шпионский клуб',
      value: false,
      visibleCode: 'showSpyClub'
    },
    {
      code: 'hasBlackList',
      label: 'Черный список',
      value: false,
      visibleCode: 'showBlackList'
    },
    {
      code: 'hasChatBot',
      label: 'Закрыто роботом',
      value: false,
      visibleCode: 'showChatBot'
    },
    {
      code: 'hasLoyaltyExecutor',
      label: 'Исполнители',
      value: false,
      visibleCode: 'showLoyaltyExecutor'
    }
  ]

  @computed get selectedValues() {
    return this.items.reduce((acc, cur) => {
      acc[cur.code] = cur.value;
      return acc
    }, {})
  }

  @action setSelectedValues(flagsObj: Record<string, string | boolean | undefined>) {
    this.items.forEach(item => {
      const flagName = item.code;
      if (flagName in flagsObj) {
        item.value = [true, 'true'].includes(flagsObj[flagName]);
      }
    })
  }

}

export {TicketFlagsStore}
