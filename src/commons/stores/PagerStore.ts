import first from "lodash/first";
import last from "lodash/last";
import {action, computed, observable} from "mobx";

class PagerStore {
  @observable currentPage = 1;
  @observable pageSize = 20;
  @observable visiblePagesCount = 10;
  @observable total = 0;

  changePageHandler(page) {
    /*
     * можно подключиться из вне к событию изменения страницы, без использования пропсов.
     * см. FilterWrap constructor
     */
    return page;
  }

  @action setup(currentPage, total, pageSize) {
    this.currentPage = +currentPage || this.currentPage;
    this.total = +total ?? this.total;
    this.pageSize = +pageSize || this.pageSize;
  }

  @computed get getSelectedValue() {
    /*
     * currentPage - значение для пользователя
     * selectedValue - значение для запроса
     * selectedValue = currentPage - 1
     */
    return this.currentPage - 1;
  }

  @computed get maxPagesCount() {
    let count = Math.ceil(this.total / this.pageSize);
    return count || 1;
  }

  @computed get showPager() {
    return this.total > this.pageSize;
  }

  @computed get pages() {
    let start = 1;
    if (this.currentPage > this.offset) {
      start = this.currentPage - this.offset;
      if (start > this.maxPagesCount - this.visiblePagesCount + 1 && this.maxPagesCount >= this.visiblePagesCount) {
        start = this.maxPagesCount - this.visiblePagesCount + 1;
      }
    }

    let count = this.visiblePagesCount;
    let pages = [];
    if (start + count > this.maxPagesCount) {
      count = Math.abs(this.maxPagesCount - start) + 1;
    }
    for (let i = 0; i < count; ++i) {
      pages.push(i + start);
    }
    return pages;
  }

  @computed get isNext() {
    return last(this.pages) < this.maxPagesCount;
  }

  @computed get isPrev() {
    return first(this.pages) > 1;
  }

  @computed get offset() {
    return Math.floor(this.visiblePagesCount / 2)
  }

  @computed get from() {
    return (this.currentPage - 1) * this.pageSize;
  }

  @computed get to() {
    return (this.currentPage - 1) * this.pageSize + this.pageSize;
  }

  @action reset() {
    this.currentPage = 1;
    this.total = 0;
  }

  @action setSelectedValue(value) {
    /*
     * currentPage - значение для пользователя
     * selectedValue - значение для запроса
     * selectedValue = currentPage - 1
     */
    this.currentPage = value ? +value + 1 : 1;
  }

  @action setCurrentPage(page) {
    /*
     * currentPage - значение для пользователя
     * selectedValue - значение для запроса
     * selectedValue = currentPage - 1
     */
    this.currentPage = page ? +page : 1;
  }

  @action prev() {
    if (this.isPrev) {
      let page = -this.visiblePagesCount;
      this.setPage(page);
    }
    return this.currentPage;
  }

  @action next() {
    if (this.isNext) {
      let page = this.currentPage + this.visiblePagesCount;
      this.setPage(page);
    }
    return this.currentPage;
  }

  @action setPage(page) {
    if (page > this.maxPagesCount) {
      this.currentPage = this.maxPagesCount;
    } else if (page < 1) {
      this.currentPage = 1;
    } else {
      this.currentPage = page;
    }
    this.changePageHandler(this.currentPage);
    return this.currentPage;
  }
}

export {PagerStore}