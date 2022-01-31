import {BaseStore} from "commons/stores/BaseStore";
import {action, computed, observable} from "mobx";
import {refbookApi} from "api/refbookApi";
import {ECallCenterGroup} from "reports/entities/commons";

class CallCenterStore extends BaseStore {
  fetchMethod = refbookApi.getCallCenters;

  fetchSuccess = response => {
    this.items = response.content.filter(c => c.callCenterGroup !== ECallCenterGroup.DELIVERY)
  }

  callCentersNameByIds(ids) {
    return (this.fetchDone && !this.noItems && ids)
      ? this.items.filter(x => ids.includes(x.id)).map(x => x.name)
      : [];
  }

  @action fetchItems(params?): Promise<void> {
    return (!this.fetchDone || this.noItems)
      ? super.fetchItems(params)
      : Promise.resolve();
  }

  @observable selected = [];

  @observable selectedSite = [];

  @computed get selectedValue() {
    return this.selected.length ? this.selected.map(x => x.id) : []
  }

  @computed get selectedSiteValue() {
    return this.selectedSite.length > 0 ? this.selectedSite.map(x => x.id) : [];
  }

  @action setSelectedSite(site) {
    this.selectedSite = site;
  }

  @computed get allSites(): any[] {
    let sites = [];
    this.items.forEach(s => {
      const filtered = s.children.filter(item => !item.isDeleted)
      sites = sites.concat(filtered)
    })
    return sites;
  };

  @computed get sites(): any[] {
    let sites = [];
    this.selected.forEach(s => {
      const filtered = s.children.filter(item => !item.isDeleted)
      sites = sites.concat(filtered)
    })
    return sites;
  };

  @computed get sitesValue(): any[] {
    return this.sites.map(x => x.id)

  };

  @computed get hasSelected(): boolean {
    return !!this.selected.length;
  }

  @computed get hasSelectedSites(): boolean {
    return !!this.selectedSite.length;
  }

  @computed get hasSites(): boolean {
    let hasSites = false;
    this.selected.forEach(s => {
      if (s.children && s.children.length > 0)
        hasSites = true;
    })
    return hasSites;
  };

  @computed get hasSelectedSite(): boolean {
    return !!this.selectedSite.length;
  }

  @computed get selectedValues(): string[] {
    return this.selected.map(item => item.id);
  }

  @computed get selectedSiteValues(): string[] {
    return this.selectedSite.map(item => item.id);
  }

  @action reset() {
    this.selected = [];
    this.selectedSite = [];
  }

  @action setSelectedValues(callCenterIds = [], siteIds = []) {
    this.selected = this.items.filter(i => callCenterIds.includes(i.id)) || [];
    if (this.selected.length == 0)
      this.selectedSite = [];
    else {
      this.selectedSite = this.sites.filter(site => siteIds.includes(site.id) && this.sites.includes(site))
    }
  }

  @action setSelected(callCenter) {
    this.selected = callCenter;
    if (this.selected.length == 0)
      this.selectedSite = [];
    else
      this.selectedSite = this.selectedSite.filter(site => this.sites.includes(site))
  }
}

export {CallCenterStore}
