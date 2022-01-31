import {BaseStore} from "commons/stores/BaseStore";
import {observable} from "mobx";

class SidebarStore extends BaseStore {
  @observable items = [
    {
      group: "Заявки",
      children: [
        {
          name: "Магазины",
          link: "/admin/stores"
        },
      ]
    },
    {
      group: "Настройки",
      children: [
        {
          name: "Параметры",
          link: "/admin/settings"
        }
      ]
    }
  ]
}

export {SidebarStore}